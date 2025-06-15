import { newError } from "../utils/apiResponse.js";
import * as Validator from "../utils/validators.js";
import * as Repository from "../repositoires/transactions.js";

export const createTransaction = async (req, res) => {
  const { title, amount, category, user_id } = req.body;

  const { error, value } = Validator.validateCreateTransaction({
    title,
    amount,
    category,
    user_id,
  });
  if (error) {
    const errorMessages = error.details.map((err) => err.message);

    return newError(errorMessages[0], 403);
  }

  const transactionData = {
    title: value.title,
    amount: category === 'income' ? value.amount : - value.amount,
    category: value.category,
    user_id: value.user_id,
  };

    await Repository.createTransaction(transactionData);
};


export const getTransactions = async (req) => {
  const { userId } = req.params;

  const transactions =  await Repository.getTransactionByUserId(userId);

  if (transactions.length === 0) {
    newError('No Transaction Found', 404);
    return;
  }
  

  return transactions;
}

export const getTransactionsSummary = async (req) => {
  const { userId } = req.params;

  const transactions =  await Repository.getTransactionsSummary(userId);

  if (transactions.length === 0) {
    newError('No Transaction Found', 404);
    return;
  }
  

  return transactions;
}


export const deleteTransaction = async (req) => {
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    return newError('Id should be a number',  403)
  }

  const transaction = await Repository.getTransactionById(id);

  if (transaction.length === 0) {
    return newError('This Transaction does not Exist', 404)
  }

  await Repository.deleteTransactionById(id);
}