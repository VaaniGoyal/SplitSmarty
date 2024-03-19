const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Split extends Model {}
    Split.init({
        Split_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: DataTypes.STRING,
        amount: DataTypes.FLOAT,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        date: DataTypes.DATE,
        equal_split: DataTypes.BOOLEAN,
        balance: DataTypes.FLOAT
    }, { sequelize, modelName: 'Split' });

    Split.associate = (models) => {
        Split.belongsTo(models.SplitGroup);
        Split.hasOne(models.User, {
            as: 'SplitRequester'
        });
        Split.hasMany(models.User, {
            as: 'SplitMembers',
            foreignKey: 'splitId',
            scope: {
                '$Split.SplitGroup.id$': sequelize.col('users.splitGroupId')
            }
        });
    };

    return Split;
};
