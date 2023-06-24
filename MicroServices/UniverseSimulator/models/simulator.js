const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const { generateBrightStar } = require("../controllers/brightStar");
//# eventTypes
const eventTypes = [
  "GRB",
  "Rise Brightness Apparent",
  "UV (Rise UV)",
  "Rise Ray-X",
  "Comet",
];
//# telescopeNotifying list
const telescopesList = [
  "MMT",
  "Gemini Observatory Telescopes",
  "Very Large Telescope",
  "Subaru Telescope",
  "Large Binocular Telescope",
  "Southern African Large Telescope",
  "Keck 1 and 2",
  "Hobby-Eberly Telescope",
  "Gran Telescopio Canarias",
  "The Giant Magellan Telescope",
  "Thirty Meter Telescope",
  "European Extremely Large Telescope",
];

const generateAstroEvent = () => {
  //the model of astro should like something like it.
  const hr = _.random(10, 21).toString().padStart(2, "0");
  const mn = _.random(0, 59).toString().padStart(2, "0");
  const time = "" + hr + ":" + mn;

  const currentDate = new Date();
  const year = currentDate.getUTCFullYear();
  const month = currentDate.getUTCMonth();
  const day = currentDate.getUTCDate();
  const date = new Date(Date.UTC(year, month, day)).toJSON().split("T")[0]; // Get the current UTC date as a string
  const { selectedStar } =  generateBrightStar();
  const astro = {
    "Astroid's Id": uuidv4(),
    "Telescope's Name": _.sampleSize(telescopesList, 1)[0],
    "Date": date,
    "Time": time,
    "Ra": selectedStar["RA Proper Motion"], 
    "Dec": selectedStar["DEC Proper Motion"], 
    "Event Type": _.sampleSize(eventTypes, 1)[0],
    "Urgency": getRandomNumber(),
    "Title HD": selectedStar["Title HD"]
  };

  return { astro: astro, Topic: "astro" };
};
const getRandomNumber = () => {
  const randomNumber = Math.random();
  if (randomNumber < 0.3) {
    return 1;
  } else if (randomNumber < 0.55) {
    return 2;
  } else if (randomNumber < 0.75) {
    return 3;
  } else if (randomNumber < 0.9) {
    return 4;
  } else {
    return 5;
  }
};

const generateOrder = () => {
  const hr = _.random(10, 21).toString().padStart(2, "0");
  const mn = _.random(00, 59).toString().padStart(2, "0");
  const time = "" + hr + ":" + mn;
  const date = JSON.stringify(new Date()).substring(1, 11);
  const branch = _.sample(Branches);
  return {
    order_id: uuidv4(),
    branch_id: branch.id,
    branch: branch.branch,
    region: branch.region,
    date: date,
    time: time,
    amount: _.random(0, 10),
    toppings: _.sampleSize(toppings, Math.floor(_.random(0, 5))),
    completed: Math.random() > 0.15,
    handle_time: _.random(0, 30),
    topic: "orders",
  };
};

const generateBranchEvent = () => {
  randomEvent = _.random(0, 1, true) > 0.2 ? "Open" : "Close";
  randomBranch = _.sample(Branches).branch;
  return { branch: randomBranch, eventType: randomEvent, topic: "events" };
};

module.exports = {
  generateOrder,
  generateBranchEvent,
  generateAstroEvent,
};
