const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense.controller.js");

router.post("/groups/:groupid/expenses/:payerid", expenseController.addExpense);
router.delete("/expense/:expense_id", expenseController.deleteExpense);

module.exports = (app) => {
  app.use("/api/exp", router);
};
