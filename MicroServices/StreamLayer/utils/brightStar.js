const axios = require("axios");

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

module.exports = getBrightStars;
