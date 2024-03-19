const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    // Define Expense model
    class Expense extends Model { }
    Expense.init({
        expense_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        payer_id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        type: DataTypes.STRING,
        amount: DataTypes.FLOAT,
        date_time: DataTypes.DATE,

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        group_id: { 
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, { sequelize, modelName: 'Expense' });

    // Define associations
    Expense.associate = (models) => {
        // Expense.hasOne(models.User);
    };

    return Expense;
}