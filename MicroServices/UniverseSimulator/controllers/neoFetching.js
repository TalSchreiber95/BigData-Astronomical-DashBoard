const axios = require("axios");
const fs = require("fs");
const neoData = require("./neoData.json");
const neoDataComparator = require("./neoDataComparator.json");

const fetchJSONData = async () => {
  const startDate = "2015-09-07";
  const endDate = "2015-09-08";
  const apiKey = "DEMO_KEY";
  const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

  try {
    // const response = await axios.get(apiUrl);
    // console.log(response)
    // const jsonData = response.data;
    const jsonData = neoData;
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

const fetchFromApi = async () => {
  try {
    const jsonData = await fetchJSONData();
    if (jsonData) {
      const neoArray = convertJSONtoNEOArray(jsonData);
      console.log(neoArray);

      fs.writeFile(
        "neoData.json",
        JSON.stringify(neoArray),
        { flag: "w" },
        (err) => {
          if (err) throw err;
          console.log("neoArray saved to neoData.json");
        }
      );

      if (!fs.existsSync("neoDataComparator.json")) {
        fs.writeFileSync("neoDataComparator.json", JSON.stringify([]));
        console.log("neoDataComparator initialized successfully");
      }

      return neoArray;
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

const generateNeo = () => {
  if (!fs.existsSync("neoData.json")) {
    console.log("neoData.json file is missing");
    return null;
  }

  if (!fs.existsSync("neoDataComparator.json")) {
    console.log("neoDataComparator.json file is missing");
    return null;
  }

  let neoData;
  let neoDataComparator;

  try {
    neoData = require("./neoData.json");
    neoDataComparator = require("./neoDataComparator.json");
  } catch (error) {
    console.log("Error reading JSON files:", error);
    return null;
  }

  if (!Array.isArray(neoData)) {
    console.log("neoData.json is not correctly formatted");
    return null;
  }

  if (!Array.isArray(neoDataComparator)) {
    console.log("neoDataComparator.json is not correctly formatted");
    return null;
  }

  const neoArray = neoData.filter((neo) => {
    const neoId = neo["Neo ID"];
    return !neoDataComparator.some((obj) => obj["Neo ID"] === neoId);
  });

  if (neoArray.length === 0) {
    console.log("No new NEOs available");
    return null;
  }

  const randomIndex = Math.floor(Math.random() * neoArray.length);
  const randomNeo = neoArray[randomIndex];

  neoDataComparator.push(randomNeo);

  fs.writeFile(
    "neoDataComparator.json",
    JSON.stringify(neoDataComparator),
    { flag: "w" },
    (err) => {
      if (err) throw err;
      console.log("Random NEO saved to neoDataComparator.json");
    }
  );

  return randomNeo;
};

module.exports = { fetchFromApi, generateNeo };
