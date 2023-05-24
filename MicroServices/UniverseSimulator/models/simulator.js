const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");

const Branches = [
  { id: 0, branch: "Haifa", region: "North" },
  { id: 1, branch: "Karmiel", region: "North" },
  { id: 2, branch: "Tel Aviv", region: "Dan" },
  { id: 3, branch: "Beer Sheva", region: "South" },
  { id: 4, branch: "Ramat Gan", region: "Dan" },
  { id: 5, branch: "Yoqneam", region: "Haifa" },
  { id: 6, branch: "Petah Tikva", region: "Dan" },
  { id: 7, branch: "Jerusalem", region: "Center" },
  { id: 8, branch: "Rishon Letzion", region: "Dan" },
  { id: 9, branch: "Givatayim", region: "Dan" },
  { id: 10, branch: "Nahariya", region: "North" },
  { id: 11, branch: "Acre", region: "North" },
  { id: 12, branch: "Rehovot", region: "Center" },
  { id: 13, branch: "Ariel", region: "Center" },
  { id: 14, branch: "Gedera", region: "South" },
  { id: 15, branch: "Sderot", region: "South" },
  { id: 16, branch: "Ashkelon", region: "South" },
  { id: 17, branch: "Ashdod", region: "South" },
  { id: 18, branch: "Afula", region: "North" },
  { id: 19, branch: "Hadera", region: "Haifa" },
  { id: 20, branch: "Netanya", region: "Center" },
  { id: 21, branch: "Zichron", region: "Haifa" },
  { id: 22, branch: "Beit Shemesh", region: "South" },
  { id: 23, branch: "Herzliya", region: "Dan" },
  { id: 24, branch: "Raanana", region: "Dan" },
];

const toppings = ["onion", "olives", "tomato", "corn", "mushrooms"];

//# eventTypes
const eventTypes = [
  "התפרצות קרינת גאמא (GRB) ",
  "עליה משמעותית ברמת הארה נצפית (Rise Brightness Apparent)",
  " עליה משמעותית בקרינת UV ( Rise UV )",
  "עליה משמעותית בקרינת רנטגן (Rise Ray-X)",
  "גילוי כוכב שביט (Comet)",
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
  const mn = _.random(00, 59).toString().padStart(2, "0");
  const time = "" + hr + ":" + mn;
  const date = JSON.stringify(new Date(Date.UTC())).substring(1, 11);
  return {
    event_id: uuidv4(),
    telescope: _.sampleSize(telescopesList, Math.floor(_.random(0, 12))),
    date: date,
    time: time,
    ra: Number, // 0-24 hours might be better as string 6.75 = 6h 45m // ### need to check what to do
    dec: Number, // degrees such as -16.7167 = -16° 43 // ### need to check what to do
    eventType: _.sampleSize(eventTypes, Math.floor(_.random(0, 5))),
    urgency: Math.floor(_.random(0, 5)),
  };
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
