const { fetchFromApi } = require("./neoController");
const { getSunInfo } = require("./sunController");
const getBrightStar = require("./brightStar");
const kafkaProducer = require("../models/kafkaProducer");
const interval1 = -1;

initializeData = async () => {
  // await scrapeWeatherData();
  kafkaProducer.publish(await fetchFromApi(), "events");
  // need to publish to sunActivitiesTopic
  kafkaProducer.publish(await getSunInfo(), "events");
  await getBrightStar();
  console.log("data initialized successfully! ");
};

module.exports = {
  initializeData,
};
