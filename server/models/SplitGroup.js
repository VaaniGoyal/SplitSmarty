import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

const SplitGroup = sequelize.define(
  "SplitGroup",
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    group_describe: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default SplitGroup;
