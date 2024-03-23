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
    
    const listSettle = [];

    for (const expenseId of expenseIds) {
      const splitExpenses = await Split.findAll({
        where: { isSettled: 0, expense_id: expenseId },
      });
      splitExpenses.forEach((splitExpense) => {
        listSettle.push({
          from_id: parseInt(splitExpense.from_id),
          to_id: parseInt(splitExpense.to_id),
          share_expense: parseInt(splitExpense.share_expense),
        });
      });      
    }

    const uniquePersons = new Set();
    listSettle.forEach((expense) => {
      uniquePersons.add(expense.from_id);
      uniquePersons.add(expense.to_id);
    });

    const personIds = Array.from(uniquePersons);
    const N = personIds.length;

    const graph = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));

    listSettle.forEach((expense) => {
      const fromIndex = personIds.indexOf(expense.from_id);
      const toIndex = personIds.indexOf(expense.to_id);
      graph[fromIndex][toIndex] += expense.share_expense;
    });

    const settle=[];
 
    function minCashFlow(graph) {
      var amount = Array.from({ length: N }, (_, i) => 0);
      for (p = 0; p < N; p++)
        for (i = 0; i < N; i++) amount[p] += graph[i][p] - graph[p][i];
      
      minCashFlowRec(amount);
    }

    function minCashFlowRec(amount) {
      var mxCredit = getMax(amount),
        mxDebit = getMin(amount);
      if (amount[mxCredit] == 0 && amount[mxDebit] == 0) return;
      var min = minOf2(-amount[mxDebit], amount[mxCredit]);
      amount[mxCredit] -= min;
      amount[mxDebit] += min;

      const x =[personIds[mxDebit], personIds[mxCredit], min];
      settle.push(x);
      minCashFlowRec(amount);
    }

    function getMax(arr) {
      var maxInd = 0;
      for (i = 1; i < N; i++) if (arr[i] > arr[maxInd]) maxInd = i;
      return maxInd;
    }

    function getMin(arr) {
      var minInd = 0;
      for (i = 1; i < N; i++) if (arr[i] < arr[minInd]) minInd = i;
      return minInd;
    }

    function minOf2(x, y) {
      return x < y ? x : y;
    }

    minCashFlow(graph);

    res.status(200).json(settle);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Failed" });
  }
}

module.exports = { settleup };
