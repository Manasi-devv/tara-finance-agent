import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const getPortfolioValueTool = createTool({
  id: "portfolio-value",

  description: "Calculate current portfolio value",

  inputSchema: z.object({}),

  outputSchema: z.any(),

  execute: async () => {
    const result = await pool.query(`
      SELECT
        h.fund_id,
        h.fund_name,
        h.units,
        fn.nav
      FROM holdings h
      JOIN (
        SELECT DISTINCT ON (fund_id)
          fund_id,
          nav
        FROM fund_navs
        ORDER BY fund_id, nav_date DESC
      ) fn
      ON h.fund_id = fn.fund_id
    `);

    let total = 0;

    const funds = result.rows.map((row) => {
      const value =
        Number(row.units) * Number(row.nav);

      total += value;

      return {
        fund: row.fund_name,
        value,
      };
    });

    return {
      portfolioValue: total,
      funds,
    };
  },
});