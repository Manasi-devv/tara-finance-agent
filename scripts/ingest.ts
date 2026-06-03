import fs from "fs-extra";
import path from "path";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const DATA_DIR = process.env.DATA_DIR || "./data/sample_a";

async function main() {
  console.log(`Loading data from ${DATA_DIR}`);

  const transactions = await fs.readJson(
    path.join(DATA_DIR, "transactions.json")
  );

  const funds = await fs.readJson(
    path.join(DATA_DIR, "funds.json")
  );

  const holdings = await fs.readJson(
    path.join(DATA_DIR, "holdings.json")
  );

  console.log(
    `Transactions: ${transactions.length}, Funds: ${funds.length}, Holdings: ${holdings.length}`
  );

  // Clear existing data
  await pool.query("DELETE FROM fund_navs");
  await pool.query("DELETE FROM holdings");
  await pool.query("DELETE FROM funds");
  await pool.query("DELETE FROM transactions");

  // Transactions
  for (const txn of transactions) {
    await pool.query(
      `
      INSERT INTO transactions
      (
        id,
        transaction_date,
        merchant,
        normalized_merchant,
        category,
        amount,
        currency,
        memo
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      `,
      [
        txn.id,
        txn.date,
        txn.merchant,
        txn.merchant?.toLowerCase(),
        txn.category,
        txn.amount,
        txn.currency,
        txn.memo,
      ]
    );
  }

  // Funds + NAVs
  for (const fund of funds) {
    await pool.query(
      `
      INSERT INTO funds
      (
        fund_id,
        fund_name,
        category
      )
      VALUES ($1,$2,$3)
      `,
      [
        fund.id,
        fund.name,
        fund.category,
      ]
    );

    for (const nav of fund.nav) {
      await pool.query(
        `
        INSERT INTO fund_navs
        (
          fund_id,
          nav_date,
          nav
        )
        VALUES ($1,$2,$3)
        `,
        [
          fund.id,
          nav.date,
          nav.value,
        ]
      );
    }
  }

  // Holdings
  for (const holding of holdings) {
    await pool.query(
      `
      INSERT INTO holdings
      (
        fund_id,
        fund_name,
        units,
        purchase_date,
        purchase_nav
      )
      VALUES ($1,$2,$3,$4,$5)
      `,
      [
        holding.fund_id,
        holding.fund_name,
        holding.units,
        holding.purchase_date,
        holding.purchase_nav,
      ]
    );
  }

  console.log("Data loaded successfully");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});