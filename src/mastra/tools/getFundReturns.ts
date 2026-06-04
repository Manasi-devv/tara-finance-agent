import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const getFundReturnsTool = createTool({
  id: "get-fund-returns",

  description: "Calculate mutual fund returns",

  inputSchema: z.object({
    fundId: z.string(),
  }),

  outputSchema: z.any(),

  execute: async (input) => {
    const fundResult = await pool.query(
      `
      SELECT *
      FROM funds
      WHERE fund_id = $1
      `,
      [input.fundId]
    );

    if (fundResult.rows.length === 0) {
      throw new Error("Fund not found");
    }

    const firstNavResult = await pool.query(
      `
      SELECT nav, nav_date
      FROM fund_navs
      WHERE fund_id = $1
      ORDER BY nav_date ASC
      LIMIT 1
      `,
      [input.fundId]
    );

    const latestNavResult = await pool.query(
      `
      SELECT nav, nav_date
      FROM fund_navs
      WHERE fund_id = $1
      ORDER BY nav_date DESC
      LIMIT 1
      `,
      [input.fundId]
    );

    if (
      firstNavResult.rows.length === 0 ||
      latestNavResult.rows.length === 0
    ) {
      throw new Error("NAV history not found");
    }

    const startNav = Number(firstNavResult.rows[0].nav);
    const endNav = Number(latestNavResult.rows[0].nav);

    const returnPercent =
      ((endNav - startNav) / startNav) * 100;

    return {
      fundId: input.fundId,
      fundName: fundResult.rows[0].fund_name,
      startDate: firstNavResult.rows[0].nav_date,
      endDate: latestNavResult.rows[0].nav_date,
      startNav,
      endNav,
      returnPercent: Number(returnPercent.toFixed(2)),
    };
  },
});