const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    // Define SplitGroup model
    class SplitGroup extends Model { }
    SplitGroup.init({
        group_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        expenses_pending: DataTypes.FLOAT // Assuming expenses are represented as float values
    }, { sequelize, modelName: 'splitGroup' });

    // Define associations
    SplitGroup.associate = (models) => {
        SplitGroup.belongsToMany(models.User, { through: 'Udhaari', foreignKey: 'group_id' });
        SplitGroup.hasMany(models.Split, { foreignKey: 'group_id' });
    };

    return SplitGroup;
};


