const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    // Define Invite model
    class Invite extends Model {}
    Invite.init({
      invite_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      url: DataTypes.STRING,
      status: DataTypes.STRING,
      sent_date: DataTypes.DATE,
      accepted_date: DataTypes.DATE
    }, { sequelize, modelName: 'invite' });

    // Define associations
    Invite.associate = (models) => {
        // Invite.belongsTo(models.User, { as: 'host', foreignKey: 'host_user_id' });
        // Invite.belongsTo(models.User, { as: 'invitee', foreignKey: 'invitee_user_id' });
    };

    return Invite;
}