const { fetchFromApi } = require("../models/neo");
const { getSunInfo } = require("../models/sun");
const { getSunInfoForAnalyze } = require("../models/sunForAnalyze");
const { getBrightStars } = require("../models/brightStar");
const kafkaProducer = require("../models/kafkaProducer");

initializeData = async (req, res) => {
  try {
    kafkaProducer.publish(await fetchFromApi(), "events");
    kafkaProducer.publish(await getSunInfoForAnalyze(), "events");
    kafkaProducer.publish(await getSunInfo(), "events");
    await getBrightStars();
    res.status(200).send("data initialized successfully! ");
  } catch {
    (error) => {
      res.status(500).send("error: data initialized faild!: \n", error);
    };
  }
};

module.exports = {
  initializeData,
};
