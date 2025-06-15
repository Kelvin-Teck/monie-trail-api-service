import { sql } from "../config/database.js";

export const createTransaction = async (data) => {
  const transaction =
    await sql`INSERT INTO transactions(user_id, title, amount, category)
               VALUES(${data.user_id}, ${data.title}, ${data.amount}, ${data.category})
               RETURNING *
    `;

  return transaction;
};

export const getTransactionById = async (id) => {
  const transaction =
    await sql`SELECT * FROM transactions WHERE id= ${id} ORDER BY created_at DESC`;

  return transaction;
};

export const getTransactionByUserId = async (userId) => {
  const transaction =
    await sql`SELECT * FROM transactions WHERE user_id= ${userId} ORDER BY created_at DESC`;

  return transaction;
};

export const getTransactionsSummary = async (userId) => {
  const balanceResult =
    await sql`SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id= ${userId}`;
  const incomeResult =
    await sql`SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE user_id= ${userId} AND amount > 0`;
  const expenseResult =
    await sql`SELECT COALESCE(SUM(amount), 0) as expense FROM transactions WHERE user_id= ${userId} AND amount < 0`;


  
  return {
    balance: balanceResult[0].balance,
    income: incomeResult[0].income,
    expense: expenseResult[0].expense,
  };
};

export const deleteTransactionById = async (id) => {
  await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;
  return;
};
