const axios = require("axios");
const data = require("./data.json");

const fetchJSONData = async () => {
  const startDate = "2015-09-07";
  const endDate = "2015-09-08";
  const apiKey = "DEMO_KEY";
  const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

  try {
    //     const response = await axios.get(apiUrl);
    //     console.log(response)
    //     const jsonData = response.data;
    const jsonData = data;
    return jsonData;
  } catch (error) {
    console.log("Error fetching JSON data:", error);
    return null;
  }
};

const convertJSONtoNEOArray = (jsonData) => {
  const neoArray = [];

  const nearEarthObjects = jsonData.near_earth_objects;
  for (const date in nearEarthObjects) {
    if (nearEarthObjects.hasOwnProperty(date)) {
      const neoList = nearEarthObjects[date];
      for (const neo of neoList) {
        const neoObject = {
          "Neo ID": neo.neo_reference_id,
          "Asteroid's Name": neo.name,
          "Absolute Magnitude (H)": neo.absolute_magnitude_h,
          "Min Estimated Diameter (meters)":
            neo.estimated_diameter.kilometers.estimated_diameter_min,
          "Max Estimated Diameter (meters)":
            neo.estimated_diameter.kilometers.estimated_diameter_max,
          "Potentially Hazardous": neo.is_potentially_hazardous_asteroid
            ? "Yes"
            : "No",
          "Close Approach Date": neo.close_approach_data[0].close_approach_date,
          "Close Approach Time": neo.close_approach_data[0].close_approach_time,
          "Miss Distance": neo.close_approach_data[0].miss_distance.kilometers,
          "Orbiting Body": neo.close_approach_data[0].orbiting_body,
        };
        neoArray.push(neoObject);
      }
    }
  }

  return neoArray;
};

const run = async () => {
  try {
    const jsonData = await fetchJSONData();
    if (jsonData) {
      const neoArray = convertJSONtoNEOArray(jsonData);
      console.log(neoArray);
      return neoArray;
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
run();
module.exports = { run };
