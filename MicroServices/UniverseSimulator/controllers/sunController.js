const axios = require("axios");
const fs = require("fs");

const cheerio = require("cheerio");
const scrapeWeatherData = async () => {
  try {
    const url =
      "https://weather.com/he-IL/weather/hourbyhour/l/cca0801d9062db761eb0521ed6bf5549ed4c546211046d09b9ac7ad09a6c556d";
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const element = $(
      "#WxuHourlyCard-main-74f43669-10ed-4577-a8c4-85ad9d041036"
    );
    const hourDetails = [];

    for (let i = 1; i <= 24; i++) {
      const detailId = `#detailIndex${i}`;
      const detailElement = $(detailId);
      const time = detailElement.find("h3[data-testid='daypartName']").text();

      const temperature = detailElement
        .find("span[data-testid='TemperatureValue']")
        .text()
        .split("°")[1];
      let condition = detailElement
        .find("div[data-testid='wxIcon'] span")
        .text();
      condition = setCondition(condition);
      const precip = detailElement
        .find("div[data-testid='Precip'] span")
        .text()
        .split("%")[0];
      let wind = detailElement.find("div[data-testid='wind'] span").text();
      wind = setWind(wind);
      hourDetails.push({
        time,
        temperature,
        condition,
        precip,
        wind,
      });
    }
    console.log("Hourly Details:", hourDetails);
    return hourDetails;
  } catch (error) {
    console.log("Error:", error);
  }
};
const setCondition = (conditionText) => {
  switch (conditionText) {
    case "שמש":
      return 1;
    case "בהיר":
      return 2;
    case "מעונן חלקית":
      return 3;
    case "טיפטופים":
      return 4;
    case "גשם":
      return 5;
    default:
  }
};
const setWind = (wind) => {
  const numberPattern = /\d+/;
  const matches = wind.match(numberPattern);

  if (matches && matches.length > 0) {
    return parseInt(matches[0]);
  } else {
    // Handle case where no number is found
    return 0;
  }
};
const getSunXRayActivities = async () => {
  try {
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    const startTime = twoHoursAgo.toISOString();
    const endTime = now.toISOString();

    const response = await axios.get(
      `https://services.swpc.noaa.gov/json/goes/primary/xrays-6-hour.json`
    );

    const xrayData = response.data;

    // Filter data within the desired time range
    const filteredData = xrayData.filter(
      (event) => event.time_tag >= startTime && event.time_tag <= endTime
    );

    // Sort the filteredData based on the time_tag
    const sortedData = filteredData.sort((a, b) => {
      return new Date(a.time_tag) - new Date(b.time_tag);
    });

    // Create the desired object structure
    const result = await sortedData.map((event) => {
      const timeTag = new Date(event.time_tag).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const xRayRate = event.flux;
      return { timeTag, xRayRate };
    });

    // Save the result data to sunXray.json
    //     fs.writeFileSync("./controllers/sunXray.json", JSON.stringify(result));

    return result;
  } catch (error) {
    console.error("Error fetching X-Ray activities:", error);
    throw error;
  }
};
const getSunInfo = async () => {
  const weatherData = await scrapeWeatherData();
  const sunXRayActivities = await getSunXRayActivities();
  return {
    weatherData: weatherData,
    sunXRayActivities: sunXRayActivities,
    Topic: "sunInfo",
  };
};
module.exports = { getSunInfo, getSunXRayActivities, scrapeWeatherData };
