const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const initializeController = require("../controllers/initializeController");
const sunController = require("../controllers/sunController");

router.get("/startSimulator", controller.startSimulator);
router.get("/stopSimulator", controller.stopSimulator);
router.get("/getSimulatorStatus", controller.getSimulatorStatus);
router.get("/initialize", initializeController.initializeData);
router.get("/getSunXRayActivities", sunController.getSunXRayActivities); // use for batch layer maybe

module.exports = {
  routes: router,
};
