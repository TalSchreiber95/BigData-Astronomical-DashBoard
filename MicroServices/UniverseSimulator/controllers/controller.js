const kafkaProducer = require("../models/kafkaProducer");
const {
  generateOrder,
  generateBranchEvent,
  generateAstroEvent,
} = require("../models/simulator");
const neoController = require("./neoController");

let interval1 = -1;
let interval2 = -1;
// let interval3 = -1;
let ordersRate = 2;
let eventsRate = 3;
let isRunning = false;
let status = `Simulator is Running.
Orders Rate: message per ${ordersRate} Seconds.
Events Rate: message per ${eventsRate} Seconds.`;

const startSimulator = (req, res) => {
  isRunning = true;
  clearInterval(interval1);
  clearInterval(interval2);
  // clearInterval(interval3);
  if (req.query.hasOwnProperty("ordersRate")) {
    ordersRate = req.query.ordersRate;
    eventsRate = req.query.eventsRate;
  }

  interval1 = setInterval(() => {
    kafkaProducer.publish(generateAstroEvent(), "events");
  }, 12 * 1000);

  // need to work on it.
  interval2 = setInterval(() => {
    const neoGenerated = neoController.generateNeo();
    if (neoGenerated !== null) kafkaProducer.publish(neoGenerated, "orders");
    else clearInterval(interval2);
  }, 10 * 1000);

  status = `Simulator is Running.
  Orders Rate: message per ${ordersRate} Seconds.
  Events Rate: message per ${eventsRate} Seconds.`;
  console.log(status);
  res.send(status);
};

const stopSimulator = (req, res) => {
  clearInterval(interval1);
  clearInterval(interval2);
  isRunning = false;
  console.log("Simulator Stopped");
  res.send("Simulator Stopped");
};

const getSimulatorStatus = (req, res) => {
  if (isRunning) res.status(200).send(status);
  else res.status(200).send("Simulator is not Running");
};
module.exports = { startSimulator, stopSimulator, getSimulatorStatus };
