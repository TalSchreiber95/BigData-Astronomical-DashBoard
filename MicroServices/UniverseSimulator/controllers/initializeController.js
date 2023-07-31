const { fetchFromApi } = require("../models/neo");
const { getSunInfo } = require("../models/sun");
const { getSunInfoForAnalyze } = require("../models/sunForAnalyze");
const { getBrightStars } = require("../models/brightStar");
const kafkaProducer = require("../models/kafkaProducer");

initializeData = async (req, res) => {
  try {
    kafkaProducer.publish(await fetchFromApi());
    kafkaProducer.publish(await getSunInfoForAnalyze());
    kafkaProducer.publish(await getSunInfo());
    await getBrightStars();
    res.status(200).send("Data initialized successfully! ");
  } catch {
    (error) => {
      res.status(500).send("error: Data initialized faild!: \n", error);
    };
  }
};

module.exports = {
  initializeData,
};
