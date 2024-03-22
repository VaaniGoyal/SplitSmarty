const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');


router.post('/:groupId/expenses', expenseController.addExpense);
router.delete('/:groupId/expenses/:expenseId', expenseController.deleteExpense);
router.put('/:groupId/expenses/:expenseId/pay', expenseController.payExpense);
router.get('/:groupId/splits', expenseController.getAllSplits);

module.exports = router;
