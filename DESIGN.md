# DESIGN DOCUMENT

## System Overview

Tara Finance Agent is designed as a tool-augmented AI finance assistant. The architecture combines a Large Language Model with structured PostgreSQL data and specialized financial tools.

The agent translates natural language queries into tool executions and returns grounded financial insights.

---

## Architecture

User Query
↓
Tara Agent (Mastra)
↓
Financial Tools
↓
PostgreSQL Database
↓
Response Generation

---

## Components

### 1. Data Layer

PostgreSQL stores:

#### Transactions

* Transaction ID
* Date
* Merchant
* Category
* Amount
* Currency
* Memo

#### Funds

* Fund metadata
* Fund categories

#### NAV History

* Historical NAV records
* Monthly NAV values

#### Holdings

* Units owned
* Purchase NAV
* Purchase date

---

### 2. Ingestion Pipeline

The ingestion process loads JSON datasets into PostgreSQL.

Supported datasets:

* transactions.json
* funds.json
* holdings.json

Process:

1. Read JSON files
2. Validate records
3. Clear existing records
4. Insert transactions
5. Insert funds
6. Insert NAV history
7. Insert holdings

---

### 3. AI Agent

The Tara Agent is implemented using Mastra.

Responsibilities:

* Understand user intent
* Select appropriate tools
* Execute database queries
* Generate grounded responses

Model:

google/gemini-2.5-flash

---

### 4. Tools

#### queryTransactionsTool

Supports:

* Category filtering
* Merchant filtering
* Date filtering

#### aggregateTransactionsTool

Provides:

* Category-wise spend totals
* Transaction counts

#### topMerchantsTool

Provides:

* Highest-spending merchants
* Merchant rankings

#### getPortfolioValueTool

Calculates:

* Current portfolio value
* Fund-wise breakdown

#### getHoldingReturnsTool

Calculates:

* Invested value
* Current value
* Gain/Loss

#### getFundReturnsTool

Calculates:

* Historical fund return %
* Start NAV
* End NAV

---

### 5. API Layer

POST /ask

Accepts natural language financial questions and returns AI-generated answers.

Example:

```json
{
  "question": "Show spending by category"
}
```

---

## Design Decisions

### Tool-Based Architecture

Financial calculations are performed by tools instead of the LLM to ensure correctness and prevent hallucinations.

### PostgreSQL

Chosen for:

* Structured financial data
* Efficient aggregation
* Reliable querying

### Mastra

Chosen for:

* Agent orchestration
* Tool integration
* Observability support

---

## Scalability

Future improvements:

* Real-time portfolio updates
* Investment recommendations
* Budget tracking
* Multi-user support
* Authentication
* Dashboard UI

---

## Conclusion

The system provides a reliable, tool-driven financial assistant capable of answering portfolio, spending, and transaction-related questions using grounded data from PostgreSQL.
