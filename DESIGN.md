# DESIGN DOCUMENT

## System Overview

Tara Finance Agent is a tool-augmented financial assistant built using Mastra, PostgreSQL, TypeScript, and Groq.

The system combines a Large Language Model with structured financial data and specialized financial tools. User questions are translated into tool executions, allowing the agent to provide grounded financial insights instead of relying on model-generated assumptions.

---

## Architecture

```text
User
  │
  ▼
Web UI / API
  │
  ▼
Tara Agent (Mastra)
  │
  ▼
Financial Tools
  │
  ▼
PostgreSQL
  │
  ▼
Grounded Response
```

---

## Components

### 1. Data Layer

PostgreSQL serves as the primary storage system.

#### Transactions

Stores:

* Transaction ID
* Transaction Date
* Merchant
* Category
* Amount
* Currency
* Memo

#### Funds

Stores:

* Fund ID
* Fund Name
* Fund Category

#### NAV History

Stores:

* Historical NAV values
* NAV date
* Fund references

#### Holdings

Stores:

* Units owned
* Purchase NAV
* Purchase date
* Fund references

---

## 2. Data Ingestion Pipeline

The ingestion pipeline loads financial datasets into PostgreSQL.

Supported files:

* transactions.json
* funds.json
* holdings.json

Process:

1. Read dataset files
2. Validate records
3. Clear existing data
4. Insert transactions
5. Insert funds
6. Insert NAV history
7. Insert holdings

This allows switching between sample datasets without modifying application logic.

---

## 3. AI Agent

The Tara Agent is implemented using Mastra.

Responsibilities:

* Understand user intent
* Select appropriate tools
* Execute database queries
* Aggregate results
* Generate grounded responses

### Model

Groq

Model:

```text
llama-3.3-70b-versatile
```

---

## 4. Financial Tools

### queryTransactionsTool

Capabilities:

* Category filtering
* Merchant filtering
* Date range filtering
* Transaction lookup

### aggregateTransactionsTool

Capabilities:

* Spending aggregation
* Category summaries
* Transaction counts

### topMerchantsTool

Capabilities:

* Merchant rankings
* Highest spending merchants

### getPortfolioValueTool

Capabilities:

* Portfolio valuation
* Fund-wise breakdown

### getHoldingReturnsTool

Capabilities:

* Invested value calculation
* Current value calculation
* Gain/Loss calculation

Formula:

```text
Gain/Loss = Current Value - Invested Value
```

### getFundReturnsTool

Capabilities:

* NAV retrieval
* Fund performance analysis
* Return calculations

---

## 5. API Layer

### POST /ask

Accepts natural language financial questions.

Example:

```json
{
  "question": "Show spending by category"
}
```

Response:

```json
{
  "answer": "..."
}
```

### GET /health

Health check endpoint.

Response:

```json
{
  "status": "ok"
}
```

---

## Design Decisions

### Tool-Based Architecture

Financial calculations are executed by tools rather than the LLM.

Benefits:

* Reduced hallucinations
* Accurate calculations
* Reliable financial results

### PostgreSQL

Chosen because it provides:

* Structured financial storage
* Aggregation support
* Efficient querying
* Reliability

### Mastra

Chosen because it provides:

* Agent orchestration
* Tool integration
* Evaluation support
* Observability

### Groq

Chosen because it provides:

* Fast inference
* Reliable tool calling
* Easy API integration

---

## Evaluation Strategy

The project includes an evaluation script that sends representative financial questions to the `/ask` endpoint.

Evaluation scenarios include:

* Spending analysis
* Merchant analysis
* Portfolio valuation
* Transaction retrieval
* Holding return calculations
* Fund analysis

---

## Observability

The system provides:

* API request logs
* Error logs
* Railway deployment logs
* Mastra tracing support

These logs help diagnose tool failures and API issues.

---

## Scalability

Future enhancements:

* Multi-user support
* Authentication
* Budget tracking
* Investment recommendations
* Portfolio dashboards
* Real-time market updates

---

## Conclusion

Tara Finance Agent provides a reliable financial assistant that combines LLM reasoning, tool execution, and PostgreSQL-backed financial data to generate grounded and accurate responses for portfolio, transaction, and spending-related queries.
