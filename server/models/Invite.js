const { DataTypes, Model } = require('sequelize');
const SplitGroup = require('./SplitGroup');

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
    }, { sequelize, modelName: 'Invite' });

    // Define associations
    Invite.associate = (models) => {
      Invite.belongsTo(models.SplitGroup);
      Invite.belongsTo(models.User, { as: 'Sender', foreignKey: 'senderId' });
      Invite.belongsTo(models.User, { as: 'Receiver', foreignKey: 'receiverId' });
    };

    return Invite;
}