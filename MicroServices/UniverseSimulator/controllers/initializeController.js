const { fetchFromApi } = require("./neoController");
const { getSunInfo } = require("./sunController");
const { getSunInfoForAnalyze } = require("./sunControllersForAnalyze");
const { getBrightStar } = require("./brightStar");
const kafkaProducer = require("../models/kafkaProducer");

initializeData = async () => {
  kafkaProducer.publish(await fetchFromApi(), "events");
  kafkaProducer.publish(await getSunInfoForAnalyze(), "events");
  kafkaProducer.publish(await getSunInfo(), "events");
  await getBrightStar();
  console.log("data initialized successfully! ");
};

module.exports = {
  initializeData,
};
