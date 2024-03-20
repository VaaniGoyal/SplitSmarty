import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import GroupExpense from "./GroupExpense";
import User from "./User";

const Expense = sequelize.define(
  "Expense",
  {
    expense_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    payer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Expense.belongsTo(GroupExpense, {
  foreignKey: "expense_id",
  onDelete: "CASCADE",
  as: "groupExpense",
});

Expense.belongsTo(User, {
  foreignKey: "payer_id",
  onDelete: "CASCADE",
  as: "payer",
});

export default Expense;
