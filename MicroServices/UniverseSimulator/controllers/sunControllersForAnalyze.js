const axios = require("axios");
const fs = require("fs");

const cheerio = require("cheerio");
const scrapeWeatherDataForAnalyze = async () => {
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
        // get current day
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        //  let day = String(currentDate.getDate()).padStart(2, '0');
       let day = String(currentDate.getDate()-1).padStart(2, '0');     // JUST FOR DEBUG !!! since sun data is yesterday and weather is forcast



        for (let i = 1; i <= 24; i++) {
            const detailId = `#detailIndex${i}`;
            const detailElement = $(detailId);
            const time = detailElement.find("h3[data-testid='daypartName']").text();
            if (time == '0:00') 
                day = String(currentDate.getDate()+1).padStart(2, '0');
            let dateWeather = `${year}-${month}-${day}`;
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
                dateWeather,
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
            return "Sunny";
        case "בהיר":
            return "Clear";
        case "מעונן חלקית":
            return "Cloudy";
        case "מעונן":
            return "Inclement";
        case "ממטרים":
            return "Drizzly";
        case "גשם":
            return "Rainy";
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
const getSunXRayActivitiesForAnalyze = async () => {
    try {
        const response = await axios.get(
            `https://services.swpc.noaa.gov/json/goes/primary/xrays-1-day.json`
        );

        const xrayData = response.data;

        // Filter data within the desired time range
        const filteredData = xrayData.filter(item => {
            const timeTag = new Date(item.time_tag);
            return timeTag.getMinutes() === 0 && timeTag.getSeconds() === 0;
          });

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
            const xRayRate = event.observed_flux;
           const electron_correction = event.electron_correction;
           // Extract the two numbers from the range xRayEnergy
           const pattern = /-|(?<=\d)(?=[a-zA-Z])/;
           const [start, end] = event.energy.split(pattern);
           // Calculate the midpoint
           const xRayEnergy = (parseFloat(start) + parseFloat(end)) / 2;
           // Convert the midpoint back to a string

            const date = event.time_tag.slice(0, 10);
            return { date, timeTag, xRayRate, xRayEnergy, electron_correction };
        });

        // Save the result data to sunXray.json
        //     fs.writeFileSync("./controllers/sunXray.json", JSON.stringify(result));

        return result;
    } catch (error) {
        console.error("Error fetching X-Ray activities:", error);
        throw error;
    }
};

const getSunInfoForAnalyze = async () => {
    const weatherData = await scrapeWeatherDataForAnalyze();
    const sunXRayActivities = await getSunXRayActivitiesForAnalyze();
    return {
        weatherData: weatherData,
        sunXRayActivities: sunXRayActivities,
        Topic: "sunInfoForAnalyze",
    };
};
module.exports = { getSunInfoForAnalyze, getSunXRayActivitiesForAnalyze, scrapeWeatherDataForAnalyze };
