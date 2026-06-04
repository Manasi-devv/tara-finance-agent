import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const aggregateTransactionsTool = createTool({
  id: "aggregate-transactions",

  description:
    "Aggregate transactions by category and calculate spending totals",

  inputSchema: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),

  outputSchema: z.any(),

  execute: async (input) => {
    let sql = `
      SELECT
        category,
        COUNT(*) as transaction_count,
        SUM(amount) as total_amount
      FROM transactions
      WHERE 1=1
    `;

    const values: any[] = [];
    let index = 1;

    if (input.startDate) {
      sql += ` AND transaction_date >= $${index++}`;
      values.push(input.startDate);
    }

    if (input.endDate) {
      sql += ` AND transaction_date <= $${index++}`;
      values.push(input.endDate);
    }

    sql += `
      GROUP BY category
      ORDER BY total_amount DESC
    `;

    const result = await pool.query(sql, values);

    return {
      categories: result.rows,
    };
  },
});