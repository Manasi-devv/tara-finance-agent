# Tara Finance Agent

## Overview

Tara Finance Agent is an AI-powered personal finance assistant built using Mastra, PostgreSQL, and TypeScript.

The system allows users to analyze transaction history, spending patterns, merchant activity, mutual fund performance, and portfolio returns through natural language queries.

## Features

### Transaction Analysis

* Query transactions by category
* Query transactions by merchant
* Query transactions by date range
* View transaction history

### Spending Analytics

* Category-wise spending summary
* Top merchants by spend
* Spending aggregation

### Mutual Fund Analytics

* Fund NAV analysis
* Fund return calculation
* Holding return calculation
* Portfolio valuation

### AI Agent

* Natural language financial queries
* Tool-driven responses
* Database-backed insights

### API

POST /ask endpoint for external evaluation and integrations.

---

## Tech Stack

* Mastra
* TypeScript
* PostgreSQL
* Node.js
* Express
* Zod

---

## Project Structure

src/
├── mastra/
│ ├── agents/
│ ├── tools/
│ ├── workflows/
│ └── index.ts
├── server.ts
scripts/
└── ingest.ts
data/
├── sample_a/
├── sample_b/
└── sample_c/

---

## Installation

```bash
npm install
```

## Environment Variables

Create a .env file:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/tara_finance
GOOGLE_API_KEY=your_google_api_key
DATA_DIR=./data/sample_a
```

## Data Ingestion

```bash
npm run ingest
```

## Run Development Server

```bash
npm run dev
```

Mastra Studio:

http://localhost:4111

## Run API Server

```bash
npm run api
```

API Base URL:

http://localhost:3000

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

* Show spending by category
* Top 5 merchants by spend
* Show health transactions
* What is my portfolio worth today?
* Return for fund_bluechip
* What is the return on my holding in fund_bluechip?

---

## Build

```bash
npm run build
```

---

## Author

Manasi Aroskar
