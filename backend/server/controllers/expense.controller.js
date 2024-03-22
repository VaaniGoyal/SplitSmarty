const { Expense: _Expense, GroupExpense,Split } = require("../models");
const Expense = _Expense;

async function addExpense(req, res) {
  try {
    const { amount, type, splitAmount } = req.body;
    const groupId = req.params.groupid;
    const payerId = req.params.payerid;

    const expense_id = Math.floor(Math.random() * 1000000);
    const date_time = new Date().toISOString();

    const newExpense = await GroupExpense.create({
      group_id: groupId,
      expense_id: expense_id,
    });

    await Expense.create({
      expense_id: expense_id,
      payer_id: payerId,
      date_time: date_time,
      amount: amount,
      type: type,
    });

    const userIds = Object.keys(splitAmount);
    for (const userId of userIds) {
      const amount = splitAmount[userId];
      if (amount != 0 && userId != payerId) {
        await Split.create({
          expense_id: expense_id,
          share_expense: parseInt(amount),
          to_id: parseInt(payerId),
          from_id: parseInt(userId),
        });
      }
    }

    res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error adding split:", error);
    res.status(500).json({ error: "Failed to add split to group." });
  }
}

async function deleteExpense(req, res) {
  try {
    const groupId = req.params.groupId;
    const expenseId = req.params.expenseId;
    // Find the split by ID and group ID
    const expense = await Expense.findOne({
      where: { id: expenseId, groupId: groupId },
    });
    if (!expense) {
      return res.status(404).json({ error: "expense not found in group." });
    }
    await expense.destroy();
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: "Failed to delete expense." });
  }
}

// Pay a expense if the member is included in it
async function payExpense(req, res) {
  try {
    const groupId = req.params.groupId;
    const expenseId = req.params.expenseId;
    // Find the expense by ID and group ID
    const expense = await Expense.findOne({
      where: { id: expenseId, groupId: groupId },
    });
    if (!expense) {
      return res.status(404).json({ error: "expense not found in group." });
    }
    // Update expense payment status here
    // Example: expense.paid = true;
    await expense.save();
    res.status(200).json({ message: "expense paid successfully." });
  } catch (error) {
    console.error("Error paying split:", error);
    res.status(500).json({ error: "Failed to pay split." });
  }
}

// get all splits in a group
async function getAllSplits(req, res, next) {
  try {
    const groupId = req.params.groupId;
    const groupMembers = await GroupExpense.findAll({
      where: {
        group_id: groupId,
      },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occured while getting data. Please try again!",
        });
      });
    res.json(groupMembers);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllSplits,
  addExpense,
  deleteExpense,
  payExpense,
};
