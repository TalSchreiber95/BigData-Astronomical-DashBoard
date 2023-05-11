const express = require("express");
const router = express.Router();
const bigMlController = require("../controllers/bigML.controller");
const elasticController = require("../controllers/elasticSearch.controller");

router.get("/buildModel", bigMlController.buildModel);
router.get("/ordersByDate", elasticController.getOrdersByDate);

module.exports = {
  routes: router,
};
