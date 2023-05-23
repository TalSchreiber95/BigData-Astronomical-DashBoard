const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/startSimulator", controller.startSimulator);
router.get("/stopSimulator", controller.stopSimulator);
router.get("/getSimulatorStatus", controller.getSimulatorStatus);

module.exports = {
  routes: router,
};
