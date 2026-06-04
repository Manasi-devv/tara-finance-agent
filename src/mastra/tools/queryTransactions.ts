import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const queryTransactionsTool = createTool({
  id: "query-transactions",

  description:
    "Query transactions by category, merchant or date range",

  inputSchema: z.object({
    category: z.string().optional(),
    merchant: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    limit: z.number().default(20),
  }),

  outputSchema: z.any(),

  execute: async (input) => {
    let sql = `
      SELECT *
      FROM transactions
      WHERE 1=1
    `;

    const values: any[] = [];
    let index = 1;

    if (input.category) {
      sql += ` AND category = $${index++}`;
      values.push(input.category);
    }

    if (input.merchant) {
      sql += ` AND merchant ILIKE $${index++}`;
      values.push(`%${input.merchant}%`);
    }

    if (input.startDate) {
      sql += ` AND transaction_date >= $${index++}`;
      values.push(input.startDate);
    }

    if (input.endDate) {
      sql += ` AND transaction_date <= $${index++}`;
      values.push(input.endDate);
    }

    sql += `
      ORDER BY transaction_date DESC
      LIMIT $${index}
    `;

    values.push(input.limit);

    const result = await pool.query(sql, values);

    return {
      count: result.rows.length,
      transactions: result.rows,
    };
  },
});