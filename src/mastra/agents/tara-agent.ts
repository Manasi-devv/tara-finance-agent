import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";

import { queryTransactionsTool } from "../tools/queryTransactions";
import { aggregateTransactionsTool } from "../tools/aggregateTransactions";
import { getFundReturnsTool } from "../tools/getFundReturns";
import { getHoldingReturnsTool } from "../tools/getHoldingReturns";
import { topMerchantsTool } from "../tools/topMerchants";
import { getPortfolioValueTool } from "../tools/getPortfolioValue";

export const taraAgent = new Agent({
  id: "tara-agent",

  name: "Tara Financial Assistant",

  instructions: `
You are Tara, a personal finance assistant.

You help users analyze:

1. Spending patterns
2. Transaction history
3. Category-wise expenses
4. Merchant spending
5. Mutual fund performance
6. Portfolio performance
7. Holding returns

Guidelines:

- Always use tools when financial data is required.
- Never make up transaction information.
- Use queryTransactionsTool for transaction searches.
- Use aggregateTransactionsTool for spend summaries.
- Use getFundReturnsTool for mutual fund analysis.
- Use getHoldingReturnsTool for portfolio return calculations.
- Give concise but useful explanations.
- Show calculations clearly.
- Mention assumptions if data is incomplete.
`,

  model: "google/gemini-2.5-flash",

  tools: {
    queryTransactionsTool,
    aggregateTransactionsTool,
    getFundReturnsTool,
    getHoldingReturnsTool,
     topMerchantsTool,
  getPortfolioValueTool,
  },

  //memory: new Memory(),
});