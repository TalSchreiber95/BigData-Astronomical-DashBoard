const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const initializeController = require("../controllers/initializeController");

router.get("/startSimulator", controller.startSimulator);
router.get("/stopSimulator", controller.stopSimulator);
router.get("/getSimulatorStatus", controller.getSimulatorStatus);
router.get("/initialize", initializeController.initializeData);


module.exports = {
  routes: router,
};
