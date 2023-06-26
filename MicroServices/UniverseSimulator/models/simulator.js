const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const {
  getBrightStar,
  generateBrightStar,
} = require("../controllers/brightStar");
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

const generateAstroEvent = async () => {
  //the model of astro should like something like it.
  const hr = _.random(10, 21).toString().padStart(2, "0");
  const mn = _.random(0, 59).toString().padStart(2, "0");
  const time = "" + hr + ":" + mn;

  const currentDate = new Date();
  const year = currentDate.getUTCFullYear();
  const month = currentDate.getUTCMonth();
  const day = currentDate.getUTCDate();
  const date = new Date(Date.UTC(year, month, day)).toJSON().split("T")[0]; // Get the current UTC date as a string
  const { selectedStar } = await generateBrightStar();
  if (selectedStar !== null) {
    const astro = {
      "Event's Id": uuidv4(),
      "Telescope's Name": _.sampleSize(telescopesList, 1)[0],
      Date: date,
      Time: time,
      Ra: selectedStar["RA Proper Motion"],
      Dec: selectedStar["DEC Proper Motion"],
      "Event Type": _.sampleSize(eventTypes, 1)[0],
      Urgency: getRandomNumber(),
      "Title HD": selectedStar["Title HD"],
    };

    return { astro: astro, Topic: "astro" };
  } else {
    return null;
  }
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

module.exports = generateAstroEvent;
