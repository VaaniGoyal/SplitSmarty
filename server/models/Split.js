const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    // Define Expense model
    class Split extends Model { }
    Split.init({
        Split_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: DataTypes.STRING,
        amount: DataTypes.FLOAT,
        date: DataTypes.DATE,
        equal_split: DataTypes.BOOLEAN,
        balance: DataTypes.FLOAT
    }, { sequelize, modelName: 'Split' });

    // Define associations
    Split.associate = (models) => {
        Split.belongsTo(models.SplitGroup, { foreignKey: 'group_id' });
    };

    return Split;
}