const axios = require("axios");

const cheerio = require("cheerio");
require("dotenv").config();

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

      const temperature = parseNumber(
        detailElement
          .find("span[data-testid='TemperatureValue']")
          .text()
          .split("°")[1]
      );
      let condition = detailElement
        .find("div[data-testid='wxIcon'] span")
        .text();
      condition = setCondition(condition);
      const precip = parseNumber(
        detailElement
          .find("div[data-testid='Precip'] span")
          .text()
          .split("%")[0]
      );
      let wind = detailElement.find("div[data-testid='wind'] span").text();
      wind = parseNumber(wind);

      const humidity = parseNumber(
        detailElement
          .find(
            "li[data-testid='HumiditySection'] span[data-testid='PercentageValue']"
          )
          .text()
          .split("%")[0]
      );
      const uvLevel = parseNumber(
        detailElement
          .find(
            "li[data-testid='uvIndexSection'] span[data-testid='UVIndexValue']"
          )
          .text()
          .split(" מתוך ")[0]
      );
      const cloudPercentage = parseNumber(
        detailElement
          .find(
            "li[data-testid='CloudCoverSection'] span[data-testid='PercentageValue']"
          )
          .text()
          .split("%")[0]
      );
      const rainCm = parseNumber(
        detailElement
          .find(
            "li[data-testid='AccumulationSection'] span[data-testid='AccumulationValue']"
          )
          .text()
          .split(" ")[0]
      );

      hourDetails.push({
        time,
        temperature,
        condition,
        precip,
        wind,
        humidity,
        uvLevel,
        cloudPercentage,
        rainCm,
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
    case "מעונן":
      return 4;
    case "ממטרים":
      return 5;
    case "גשם":
      return 6;
    default:
  }
};
const parseNumber = (str) => {
  const numberPattern = /\d+/;
  const matches = str.match(numberPattern);

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

    return result;
  } catch (error) {
    console.error("Error fetching X-Ray activities:", error);
    throw error;
  }
};

const getSunImageLink = async () => {
  try {
    const channels = [
      "211193171",
      "f_304_211_171_1024",
      "f_094_335_193_1024",
      "f_HMImag_171_1024",
      "0304",
      "0193",
      "0171",
      "0211",
      "0131",
      "0335",
      "0094",
      "1600",
      "1700",
      "HMIB",
      "HMIIF",
      "HMIIC",
      "HMII",
    ];
    const imagePromises = channels.map(async (channel) => {
      const encodedChannel = encodeURIComponent(channel);
      const imageUrl = `https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_${encodedChannel}.jpg`;
      try {
        const response = await axios.get(imageUrl, {
          responseType: "arraybuffer",
        });
        return { channel, error: false, imageUrl };
      } catch (error) {
        // console.error(`Error fetching ${channel} image:`, error);
        return { channel, error: true };
      }
    });

    let images = await Promise.all(imagePromises);
    console.log("Sun images:", images);
    images = images.map((img) => (img.error == false ? img.imageUrl : "null")).filter((img)=>img!=="null");
    return images;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};


const getSunInfo = async () => {
  const weatherData = await scrapeWeatherData();
  const sunXRayActivities = await getSunXRayActivities();
  const sunImageLinks = await getSunImageLink();
  return {
    weatherData: weatherData,
    sunXRayActivities: sunXRayActivities,
    sunImageLinks: sunImageLinks,
    Topic: "sunInfo",
  };
};
module.exports = { getSunInfo, getSunXRayActivities, scrapeWeatherData };
