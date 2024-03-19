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
        group_name: DataTypes.STRING,
        description: DataTypes.STRING,
        timestamps: true,
        createdAt: true,
        group_icon: {
            type: DataTypes.STRING,
            defaultValue: './public/default_group_icon.jpg'
        },
        expenses_pending: DataTypes.FLOAT // Assuming expenses are represented as float values
    }, { sequelize, modelName: 'SplitGroup' });

    // Define associations
    SplitGroup.associate = (models) => {
        SplitGroup.belongsToMany(models.User, { through: 'Udhaari'});
        SplitGroup.hasMany(models.Split);
        SplitGroup.hasMany(models.User, {as: 'GroupAdmin'});
        SplitGroup.hasOne(models.Invite);
    };

    return SplitGroup;
};


