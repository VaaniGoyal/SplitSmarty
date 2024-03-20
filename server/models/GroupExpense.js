import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import SplitGroup from "./SplitGroup";

const GroupExpense = sequelize.define(
  "GroupExpense",
  {
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    expense_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

GroupExpense.belongsTo(SplitGroup, {
  foreignKey: "group_id",
  onDelete: "CASCADE",
  as: "splitGroup",
});

export default GroupExpense;
