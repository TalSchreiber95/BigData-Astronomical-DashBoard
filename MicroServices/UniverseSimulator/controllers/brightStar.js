const axios = require("axios");
const kafkaProducer = require("../models/kafkaProducer");

let brightStarsArray;
let interval1 = -1;
const getBrightStar = async () => {
  try {
    clearInterval(interval1);
    const response = await axios.get(
      "https://raw.githubusercontent.com/aduboisforge/Bright-Star-Catalog-JSON/master/BSC.json"
    );
    const starData = response.data;

    brightStarsArray = starData.map((star) => ({
      "Harvard Reference Number": star["harvard_ref_#"],
      RA: star["RA"],
      DEC: star["DEC"],
      Epoch: star["Epoch"],
      "RA Proper Motion": star["RA PM"],
      "DEC Proper Motion": star["DEC PM"],
      Magnitude: star["MAG"],
      "Title HD": star["Title HD"],
    }));
    interval1 = setInterval(() => {
      const selectedStar = generateBrightStar();
      console.log(selectedStar);
      if (selectedStar !== null) kafkaProducer.publish(selectedStar, "events");
      else clearInterval(interval1);
    }, 5 * 1000);
    return brightStarsArray;
  } catch (error) {
    console.error("Error fetching the BrightStar.json file:", error.message);
    return null;
  }
};

const generateBrightStar = () => {
  if (brightStarsArray && brightStarsArray.length > 0) {
    const randomIndex = Math.floor(Math.random() * brightStarsArray.length);
    const selectedStar = brightStarsArray.splice(randomIndex, 1)[0];
    return { selectedStar: selectedStar, Topic: "brightStar" };
  }
  return null;
};

module.exports = getBrightStar;
