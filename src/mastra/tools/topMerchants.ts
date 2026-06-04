import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const topMerchantsTool = createTool({
  id: "top-merchants",

  description: "Get top merchants by spending",

  inputSchema: z.object({
    limit: z.number().default(5),
  }),

  outputSchema: z.any(),

  execute: async ({ limit }) => {
    const result = await pool.query(
      `
      SELECT merchant,
             SUM(amount) as total_spend
      FROM transactions
      WHERE amount > 0
AND category != 'transfer'
      GROUP BY merchant
      ORDER BY total_spend DESC
      LIMIT $1
      `,
      [limit]
    );

    return result.rows;
  },
});