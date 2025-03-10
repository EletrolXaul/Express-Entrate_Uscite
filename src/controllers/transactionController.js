// src/controllers/transactionController.js
import { PrismaClient } from '@prisma/client';
import { startOfMonth, endOfMonth, parseISO } from 'date-fns';

const prisma = new PrismaClient();

// GET - Lista transazioni filtrate per mese/anno
export const getTransactions = async (req, res) => {
  const { month, year } = req.query;
  const date = new Date();
  
  const startDate = startOfMonth(
    month && year ? new Date(year, month - 1) : date
  );
  const endDate = endOfMonth(
    month && year ? new Date(year, month - 1) : date
  );

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: { date: 'desc' }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST - Crea nuova transazione
export const createTransaction = async (req, res) => {
  const { description, amount, date, type = 'altro' } = req.body;
  try {
    const transaction = await prisma.transaction.create({
      data: {
        description,
        amount: parseFloat(amount),
        date: parseISO(date),
        type: type || 'altro' // Usa 'altro' come valore predefinito se type è null o undefined
      }
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT - Aggiorna transazione esistente
export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { description, amount, date, type = 'altro' } = req.body;
  try {
    const transaction = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: {
        description,
        amount: parseFloat(amount),
        date: parseISO(date),
        type: type || 'altro' // Usa 'altro' come valore predefinito se type è null o undefined
      }
    });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Elimina transazione
export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.transaction.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

