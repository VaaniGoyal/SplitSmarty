/* eslint-disable no-unused-vars */
import express from "express";
import * as dotenv from "dotenv";
import sequelize from "./config/database.js";
import userController from "./controllers/user.controller"; // ! import statement giving error
import authRoutes from "./routes/requireAuth"; // ! import statement giving error

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

async function ConnectToDatabaseAuthentication() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    console.log("All model was just checked!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// ! Convert properly to ESM format

import routes from controllers

routes
app.post("/signup", userController.signUp);
app.post("/login", userController.login);
app.get("/logout", userController.logout);

app.use("/auth", authRoutes);

require("./routes/user.routes")(app);
require("./routes/splitgroup.routes")(app);
require("./routes/split.routes")(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
ConnectToDatabaseAuthentication();

// TODO: Convert the codebase to ESM format so that import statements can be used.
// TODO: Make a seperate file for routing.
// TODO: Update the controllers according to the architecture of databases.
// TODO: Implementing simplified transaction algorithm.
// TODO: Try to structurise the codebase to mvc architecture.