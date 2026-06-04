# Tara Finance Agent

## Overview

Personal finance assistant built using Mastra and PostgreSQL.

## Features

- Transaction analysis
- Category spending summaries
- Merchant insights
- Portfolio valuation
- Fund analysis

## Setup

### Install

```bash
npm install
```

### Database

```sql
CREATE DATABASE provue_tara;
```

### Environment

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/provue_tara
GOOGLE_API_KEY=your_key
```

### Load Data

```bash
set DATA_DIR=./data/sample_a
npm run ingest
```

### Run

```bash
npm run dev
```

## Sample Questions

- Show spending by category
- Show health transactions
- Top 5 merchants by spend
- What is my portfolio worth today?
- Show holding return for fund_bluechip

## Tech Stack

- Mastra
- PostgreSQL
- TypeScript
- Gemini