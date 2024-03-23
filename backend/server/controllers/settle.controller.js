const { Op } = require("sequelize");
const {
  Expense: _Expense,
  User,
  GroupExpense,
  SplitGroup,
  Split,
} = require("../models");
const Expense = _Expense;

async function settleup(req, res) {
  try {
    const groupId = req.params.id;
    const expense = await GroupExpense.findAll({
      where: { group_id: groupId },
    });
    const expenseIds = [];
    for (const expenses of expense) {
      expenseIds.push(expenses.expense_id);
    }
    // console.log(expenseIds);
    const listSettle = [];

    for (const expenseId of expenseIds) {
      const splitExpenses = await Split.findAll({
        where: { isSettled: 0, expense_id: expenseId },
      });
      splitExpenses.forEach((splitExpense) => {
        listSettle.push([
          splitExpense.from_id,
          splitExpense.to_id,
          splitExpense.share_expense,
        ]);
      });
    }
    console.log(listSettle);
    res.status(200).json(listSettle);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Failed" });
  }
}

module.exports = { settleup };
