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

  description: "Calculate mutual fund return using latest NAV",

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

    const navResult = await pool.query(
      `
      SELECT *
      FROM fund_navs
      WHERE fund_id = $1
      ORDER BY nav_date DESC
      LIMIT 1
      `,
      [input.fundId]
    );

    if (
      fundResult.rows.length === 0 ||
      navResult.rows.length === 0
    ) {
      throw new Error("Fund not found");
    }

    return {
      fund: fundResult.rows[0],
      latestNav: navResult.rows[0],
    };
  },
});