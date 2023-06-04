const axios = require("axios");
const fs = require("fs");
const neoDataRes = require("./neoDataRes.json");

let neoDataComparator = [];
const fetchJSONData = async () => {
  let startDate;
  let endDate = new Date().toISOString().split("T")[0];
  startDate = getStartDate();
  console.log(`startDate= ${startDate} , endDate= ${endDate}`);
  const apiKey = "DEMO_KEY";
  const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

  try {
    // const response = await axios.get(apiUrl);
    // console.log(response)
    // const jsonData = response.data;
    const jsonData = neoDataRes;
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
            neo.estimated_diameter.kilometers.estimated_diameter_min * 100,
          "Max Estimated Diameter (meters)":
            neo.estimated_diameter.kilometers.estimated_diameter_max * 100,
          "Potentially Hazardous": neo.is_potentially_hazardous_asteroid
            ? "Yes"
            : "No",
          "Close Approach Date": neo.close_approach_data[0].close_approach_date,
          "Close Approach Time":
            neo?.close_approach_data[0]?.close_approach_date_full?.split(
              " "
            )[1],
          "Miss Distance": neo.close_approach_data[0].miss_distance.kilometers,
          "Orbiting Body": neo.close_approach_data[0].orbiting_body,
        };
        neoArray.push(neoObject);
      }
    }
  }

  return neoArray;
};

const getStartDate = () => {
  const currentDate = new Date();
  let startDate;

  if (currentDate.getMonth() === 0) {
    // Current month is January
    const previousYear = currentDate.getFullYear() - 1;
    startDate = new Date(previousYear, 11, currentDate.getDate() + 1)
      .toISOString()
      .split("T")[0];
  } else {
    startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate() + 1
    )
      .toISOString()
      .split("T")[0];
  }

  return startDate;
};
const fetchFromApi = async () => {
  try {
    const jsonData = await fetchJSONData();
    if (jsonData) {
      const neoArray = convertJSONtoNEOArray(jsonData);

      neoArray.sort((a, b) => {
        const dateA = new Date(
          `${a["Close Approach Date"]} ${a["Close Approach Time"]}`
        );
        const dateB = new Date(
          `${b["Close Approach Date"]} ${b["Close Approach Time"]}`
        );
        return dateA - dateB;
      });

      // console.log(neoArray);

      fs.writeFile(
        "./controllers/neoData.json",
        JSON.stringify(neoArray),
        { flag: "w" },
        (err) => {
          if (err) throw err;
          console.log("neoArray saved to neoData.json");
        }
      );

      if (neoDataComparator.length > 0) {
        neoDataComparator = [];
        console.log("neoDataComparator initialized successfully");
      }

      return neoArray;
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

const generateNeo = () => {
  if (!fs.existsSync("./controllers/neoData.json")) {
    console.log("neoData.json file is missing");
    return null;
  }

  let neoData;

  try {
    neoData = require("./neoData.json");
    if (!Array.isArray(neoData)) {
      console.log("neoData.json is not correctly formatted");
      return null;
    }
  } catch (error) {
    console.log("Error reading JSON files:", error);
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

  const firstNeo = neoArray[0];

  neoDataComparator.push(firstNeo);

  return firstNeo;
};

module.exports = { fetchFromApi, generateNeo };
