const axios = require("axios");

let brightStarsArray;

const getBrightStars = async () => {
  try {
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
    return brightStarsArray;
  } catch (error) {
    console.error("Error fetching the BrightStar.json file:", error.message);
    return null;
  }
};
const generateBrightStar = async () => {
  if (brightStarsArray && brightStarsArray.length > 0) {
    const randomIndex = Math.floor(Math.random() * brightStarsArray.length);
    return { selectedStar: brightStarsArray[randomIndex] };
  }
  return null;
};
module.exports = { getBrightStars, generateBrightStar };
