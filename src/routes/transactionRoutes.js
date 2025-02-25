// src/routes/transactionRoutes.js
import express from 'express';
import * as transactionController from '../controllers/transactionController.js';

const router = express.Router();

// Rimuovi '/transactions' dal percorso poiché viene già gestito in server.js
router.get('/', transactionController.getTransactions);
router.post('/', transactionController.createTransaction);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

// Rimuovi gli esempi di fetch e aggiungi l'export default
export default router;