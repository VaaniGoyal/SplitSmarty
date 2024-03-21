const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const SplitGroup = require("./SplitGroup");

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

module.exports = Member;
