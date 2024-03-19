import { Sequelize } from "sequelize";

const databaseConfig = {
  database: "SplitSmarty",
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

export default sequelize;
