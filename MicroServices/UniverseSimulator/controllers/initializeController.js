const neoController = require("./neoController");
const { getSunInfo,scrapeWeatherData } = require("./sunController");
const kafkaProducer = require("../models/kafkaProducer");
const interval1 = -1;

initializeData = async () => {
  await scrapeWeatherData();
  await neoController.fetchFromApi();
  console.log("data initialized successfully! ");
  // need to publish to sunActivitiesTopic
  // kafkaProducer.publish(await getSunInfo(), "orders");
};

module.exports = {
  initializeData,
};
