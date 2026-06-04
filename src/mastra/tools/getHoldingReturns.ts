import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const getHoldingReturnsTool = createTool({
  id: "get-holding-returns",

  description:
    "Calculate gain or loss for a holding",

  inputSchema: z.object({
    fundId: z.string(),
  }),

  outputSchema: z.any(),

  execute: async (input) => {
    const holdingResult = await pool.query(
      `
      SELECT *
      FROM holdings
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
      holdingResult.rows.length === 0 ||
      navResult.rows.length === 0
    ) {
      throw new Error("Holding not found");
    }

    const holding = holdingResult.rows[0];
    const latestNav = Number(navResult.rows[0].nav);

    const invested =
      Number(holding.units) *
      Number(holding.purchase_nav);

    const currentValue =
      Number(holding.units) *
      latestNav;

    const gainLoss =
      currentValue - invested;

    return {
      fundId: holding.fund_id,
      fundName: holding.fund_name,
      invested,
      currentValue,
      gainLoss,
      latestNav,
    };
  },
});