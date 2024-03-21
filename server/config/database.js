const { Sequelize } = require("sequelize");

const databaseConfig = {
  database: "FakeData",
  username: "DeShaw",
  password: "Ko@130404",
  host: "localhost",
  dialect: "mysql",
};

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    dialect: "mysql",
  }
);

module.exports = sequelize;
