const express = require("express");
const router = express.Router();
const settleController = require("../controllers/settle.controller.js");

router.get("/expense/:id", settleController.settleup);

module.exports = (app) => {
    app.use("/api/stl", router);
  };
  