import * as TransactionService from "../services/transactions.js";
import { sendError, sendSuccess } from "../utils/apiResponse.js";

export const createTransaction = async (req, res) => {
  try {
    const response = await TransactionService.createTransaction(req);

    res
      .status(201)
      .json(sendSuccess("Transactions Created Succesfully", response));
  } catch (error) {
    const status = error ? error.code : 500;
    const errorMessage = error ? error.message : "An unknown error occured";
    console.log(errorMessage);
    // const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(status).json(sendError(errorMessage, status));
  }
};

export const getTransactions = async (req, res) => {
  try {
    const response = await TransactionService.getTransactions(req);

    res
      .status(200)
      .json(sendSuccess("Transactions Retrieved Succesfully", response));
  } catch (error) {
    const status = error ? error.code : 500;
    const errorMessage = error ? error.message : "An unknown error occured";
    console.log(errorMessage);
    // const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(status).json(sendError(errorMessage, status));
  }
};

export const getTransactionsSummary = async (req, res) => {
  try {
    const response = await TransactionService.getTransactionsSummary(req);

    res
      .status(200)
      .json(sendSuccess("Transactions Summary Retrieved Succesfully", response));
  } catch (error) {
    const status = error ? error.code : 500;
    const errorMessage = error ? error.message : "An unknown error occured";
    console.log(errorMessage);
    // const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(status).json(sendError(errorMessage, status));
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const response = await TransactionService.deleteTransaction(req);

    res
      .status(200)
      .json(sendSuccess("Transactions Deleted Succesfully", response));
  } catch (error) {
    const status = error ? error.code : 500;
    const errorMessage = error ? error.message : "An unknown error occured";
    console.log({ errorMessage });
    // const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(status).json(sendError(errorMessage, status));
  }
};
