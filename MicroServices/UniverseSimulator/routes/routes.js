const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const neoFetching = require("../controllers/neoFetching");

router.get("/startSimulator", controller.startSimulator);
router.get("/stopSimulator", controller.stopSimulator);
router.get("/getSimulatorStatus", controller.getSimulatorStatus);
router.get("/neoFetching", neoFetching.run);

module.exports = {
  routes: router,
};
