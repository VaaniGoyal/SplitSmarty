const { Expense: _Expense, GroupExpense } = require("../models");
const Expense = _Expense;

// Add a new split to a group
async function addExpense(req, res) {
  try {
    const { description, amount } = req.body;
    const groupId = req.params.groupId;
    // Create the split with the provided group ID
    const newExpense = await Expense.create({
      description: description,
      amount: amount,
      groupId: groupId,
    });
    res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error adding split:", error);
    res.status(500).json({ error: "Failed to add split to group." });
  }
}

// Delete a split from the group
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

const spltController = {
  getAllSplits,
  addExpense,
  deleteExpense,
  payExpense,
};

module.exports = spltController;
