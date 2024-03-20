import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import SplitGroup from "./SplitGroup";

const Member = sequelize.define(
  "Member",
  {
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Member.belongsTo(User, {
  foreignKey: "member_id",
  onDelete: "CASCADE",
});

Member.belongsTo(SplitGroup, {
  foreignKey: "group_id",
  onDelete: "CASCADE",
});

export default Member;
