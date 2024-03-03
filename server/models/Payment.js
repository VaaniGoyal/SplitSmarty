const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    // Define Expense model
    class Payment extends Model { }
    Payment.init({
        payment_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        amount: DataTypes.FLOAT,
        date: DataTypes.DATE,
        status: DataTypes.STRING
      }, { sequelize, modelName: 'payment' });

    // Define associations
    Payment.associate = (models) => {
        // payment relations here
    };

    return Payment;
}