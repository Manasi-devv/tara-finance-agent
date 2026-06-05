import { Agent } from "@mastra/core/agent";
import { groq } from "@ai-sdk/groq";

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

Always use tools for financial questions.
Never make up financial data.
Use tool results to answer.
`,

  model: groq("llama-3.3-70b-versatile"),

  tools: {
    queryTransactionsTool,
    aggregateTransactionsTool,
    getFundReturnsTool,
    getHoldingReturnsTool,
    topMerchantsTool,
    getPortfolioValueTool,
  },
});