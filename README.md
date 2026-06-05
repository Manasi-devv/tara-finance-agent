# Tara Finance Agent

## Overview

Tara Finance Agent is an AI-powered personal finance assistant built using Mastra, PostgreSQL, TypeScript, and Groq.

The system enables users to analyze transaction history, spending patterns, merchant activity, mutual fund performance, portfolio valuation, and holding returns through natural language queries.

The agent uses tool-based reasoning to retrieve and calculate financial information directly from PostgreSQL, ensuring grounded and reliable responses.

---

## Features

### Transaction Analysis

* Query transactions by category
* Query transactions by merchant
* Query transactions by date range
* View transaction history

### Spending Analytics

* Category-wise spending summary
* Spending aggregation
* Top merchants by spend
* Expense breakdown analysis

### Mutual Fund Analytics

* Fund NAV analysis
* Fund return calculations
* Holding return calculations
* Portfolio valuation

### AI Agent

* Natural language financial questions
* Tool-based reasoning
* Database-backed responses
* Grounded financial calculations

### API

* POST /ask endpoint
* JSON request/response format
* External evaluator compatible

---

## Tech Stack

* Mastra
* TypeScript
* PostgreSQL
* Node.js
* Express
* Zod
* Groq LLM

---

## Project Structure

```text
src/
├── mastra/
│   ├── agents/
│   ├── tools/
│   ├── workflows/
│   └── index.ts
├── public/
│   └── index.html
├── server.ts

scripts/
├── ingest.ts
└── evaluate.ts

data/
├── sample_a/
├── sample_b/
└── sample_c/
```

---

## Installation

```bash
npm install
```

---

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/tara_finance
GROQ_API_KEY=your_groq_api_key
DATA_DIR=./data/sample_a
```

---

## Data Ingestion

Load the dataset into PostgreSQL:

```bash
npm run ingest
```

---

## Run Development Server

```bash
npm run dev
```

Mastra Studio:

```text
http://localhost:4111
```

---

## Run API Server

```bash
npm run api
```

API Base URL:

```text
http://localhost:3000
```

---

## Database Schema

### transactions

* id
* transaction_date
* merchant
* normalized_merchant
* category
* amount
* currency
* memo

### funds

* fund_id
* fund_name
* category

### fund_navs

* fund_id
* nav_date
* nav

### holdings

* fund_id
* fund_name
* units
* purchase_date
* purchase_nav

---

## API Usage

### Request

POST /ask

```json
{
  "question": "What is my portfolio worth today?"
}
```

### Response

```json
{
  "answer": "Your portfolio is worth 119983.80 today."
}
```

---

## Example Queries

* What is my portfolio worth today?
* Show spending by category
* Top 5 merchants by spend
* Show grocery transactions
* Show health transactions
* Show food expenses
* Show holding return for fund_bluechip
* Show transactions for Apollo
* Fund return analysis

---

## Evaluation

Run:

```bash
npm run evaluate
```

The evaluation script sends multiple financial questions to the `/ask` endpoint and verifies that the agent produces valid responses using its tools.

---

## Build

```bash
npm run build
```

---

## Deployment

Public URL:

https://tara-finance-agent-lfal.onrender.com

Health Endpoint:

```text
GET /health
```

Ask Endpoint:

```text
POST /ask
```

---

## Observability

The system provides:

* Request logging
* Tool execution visibility
* Error logging
* Railway deployment logs
* Mastra tracing support

---

## Author

Manasi Aroskar
