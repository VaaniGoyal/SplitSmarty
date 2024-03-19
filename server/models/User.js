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
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        timestamps: true,
        createdAt: true,
        profile_picture: DataTypes.STRING,
        name: DataTypes.STRING,
        self_description: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        upi_id: DataTypes.STRING
    }, { sequelize, modelName: 'User' });

    // Define associations
    User.associate = (models) => {
        User.belongsToMany(models.SplitGroup, { through: 'Udhaari' });
        User.belongsToMany(models.Invite, { through: 'SentInvites', foreignKey: 'senderId' });
        User.belongsToMany(models.Invite, { through: 'ReceivedInvites', foreignKey: 'receiverId' });
    };

    return User;
}