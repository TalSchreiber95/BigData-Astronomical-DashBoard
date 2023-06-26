const kafkaProducer = require("../models/kafkaProducer");
const generateAstroEvent = require("../models/simulator");

let interval1 = -1;
let eventsRate = 3;
let isRunning = false;
let status = `Simulator is Running.
Events Rate: message per ${eventsRate} Seconds.`;

const startSimulator = async (req, res) => {
  isRunning = true;
  clearInterval(interval1);
  if (req.query.hasOwnProperty("eventsRate")) {
    eventsRate = req.query.eventsRate;
  }
  interval1 = setInterval(async () => {
    const astroGenerated = await generateAstroEvent();
    astroGenerated !== null && kafkaProducer.publish(astroGenerated, "events");
  }, eventsRate * 1000);

  status = `Simulator is Running.
  Events Rate: message per ${eventsRate} Seconds.`;
  console.log(status);
  res.send(status);
};

const stopSimulator = (req, res) => {
  clearInterval(interval1);
  isRunning = false;
  console.log("Simulator Stopped");
  res.send("Simulator Stopped");
};

const getSimulatorStatus = (req, res) => {
  if (isRunning) res.status(200).send(status);
  else res.status(200).send("Simulator is not Running");
};
module.exports = { startSimulator, stopSimulator, getSimulatorStatus };
