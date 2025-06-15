import express from 'express'
import * as TransactionController from '../controllers/transactions.js';
const router = express.Router();


router.get('/:userId', TransactionController.getTransactions).get('/summary/:userId', TransactionController.getTransactionsSummary)

router.post('/', TransactionController.createTransaction);
router.delete('/:id', TransactionController.deleteTransaction)


export default router 