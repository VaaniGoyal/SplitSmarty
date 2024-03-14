const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    // Define User model
    class User extends Model { }
    User.init({
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: DataTypes.STRING,
        creation_date: DataTypes.DATE,
        profile_picture: DataTypes.STRING,
        name: DataTypes.STRING,
        self_description: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        upi_id: DataTypes.STRING
    }, { sequelize, modelName: 'user' });

    // Define associations
    User.associate = (models) => {
        User.belongsToMany(models.SplitGroup, { through: 'Udhaari', foreignKey: 'user_id' });
        User.hasMany(models.Invite, { foreignKey: 'invitee_user_id' });
        User.hasMany(models.Invite, { foreignKey: 'host_user_id' });
    };

    return User;
}