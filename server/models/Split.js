import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import GroupExpense from "./GroupExpense";
import User from "./User";

const Split = sequelize.define(
  "Split",
  {
    expense_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    share_expense: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    from_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    to_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isSettled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Split.belongsTo(GroupExpense, {
  foreignKey: "expense_id",
  onDelete: "CASCADE",
  as: "groupExpense",
});

Split.belongsTo(User, {
  foreignKey: "from_id",
  onDelete: "CASCADE",
  as: "fromUser",
});

Split.belongsTo(User, {
  foreignKey: "to_id",
  onDelete: "CASCADE",
  as: "toUser",
});

export default Split;
