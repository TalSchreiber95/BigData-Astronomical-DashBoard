const processEventsData = (eventsData, newEvent) => {
  let newEventsData = eventCounters(eventsData, newEvent);
  newEventsData = lastEvent(eventsData, newEvent);
  newEventsData = eventDistributions(eventsData, newEvent);
  newEventsData = eventUrgency(eventsData, newEvent);
  newEventsData["astroEventTableObject"].body.push(newEvent);
  return newEventsData;
};
const makeText = (event) => {
  let txt = "Event's Id: " + event["Event's Id"] + "\n";
  txt += "Telescope's Name: " + event["Telescope's Name"] + "\n";
  txt += "Date: " + event["Date"] + event["Time"] + "\n";
  txt += "Dec: " + event["Dec"] + " Ra: " + event["Ra"] + "\n";
  txt += "Urgency: " + event["Urgency"] + "\n";
  txt += "Title HD: "+event["Title HD"]
  return txt;
};
const showMatchPic = (eventType) => {
  switch (eventType) {
    case "GRB":
      return "https://www.hayadan.org.il/images/content3/2023/01/Artists-Conception-of-a-Gamma-Ray-Burst-777x4081-1.webp";
    case "Rise Brightness Apparent":
      return "https://www.space.fm/astronomy/images/diagrams/apparent.gif";
    case "UV (Rise UV)":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/UV_Index_NYC.png/1200px-UV_Index_NYC.png";
    case "Rise Ray-X":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/PIA20061_-_Andromeda_in_High-Energy_X-rays%2C_Figure_1.jpg/500px-PIA20061_-_Andromeda_in_High-Energy_X-rays%2C_Figure_1.jpg";
    case "Comet":
      return "https://exact-sciences.m.tau.ac.il/sites/exactsci.tau.ac.il/files/styles/reaserch_main_image_580_x_330/public/shavit_580X330.jpg?itok=rE7s0Cdx";
    default:
      return "";
  }
};

const lastEvent = (eventsData, newEvent) => {
  eventsData["Last Event"] = {
    title: newEvent["Event Type"],
    img: showMatchPic(newEvent["Event Type"]),
    text: makeText(newEvent),
  };
  return eventsData;
};

const eventCounters = (eventsData, newEvent) => {
  eventsData["Today's Events"]++;
  return eventsData;
};

const eventDistributions = (eventsData, newEvent) => {
  switch (newEvent["Event Type"]) {
    case "GRB":
      eventsData["Events Distribution"].series[0].data[0]++;
      break;
    case "Rise Brightness Apparent":
      eventsData["Events Distribution"].series[0].data[1]++;
      break;
    case "UV (Rise UV)":
      eventsData["Events Distribution"].series[0].data[2]++;
      break;
    case "Rise Ray-X":
      eventsData["Events Distribution"].series[0].data[3]++;
      break;
    case "Comet":
      eventsData["Events Distribution"].series[0].data[4]++;
      break;
  }
  return eventsData;
};
const eventUrgency = (eventsData, newEvent) => {
  switch (newEvent["Urgency"]) {
    case 1:
      eventsData["Events urgency"].series[0]++;
      break;
    case 2:
      eventsData["Events urgency"].series[1]++;
      break;
    case 3:
      eventsData["Events urgency"].series[2]++;
      break;
    case 4:
      eventsData["Events urgency"].series[3]++;
      break;
    case 5:
      eventsData["Events urgency"].series[4]++;
      break;
  }
  return eventsData;
};

const processNeoData = (data, newNeo) => {
  console.log("newNeo: ", newNeo);
  console.log("data: ", data);
  data = neoCountersAndTable(data, newNeo);
  data = neoCharts(data, newNeo);
  return data;
};

const neoCountersAndTable = (data, newNeo) => {
  data["neoTableObject"].body = newNeo;
  const dailyCount = data["neoTableObject"].body.filter((obj) =>
    filterDate(obj)
  ).length;
  const monthlyCount = data["neoTableObject"].body.length;

  data["Total of close asteroids (monthly)"] = monthlyCount;
  data["Total of close asteroids (daily)"] = dailyCount;
  return data;
};

const filterDate = (obj) => {
  const dateTime = `${obj["Close Approach Date"]}T${obj["Close Approach Time"]}`;
  const objDateTime = new Date(dateTime);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - objDateTime.getTime();
  const hoursDifference = timeDifference / (1000 * 3600);
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  return daysDifference < 1 && hoursDifference < 24;
};
const neoCharts = (data, newNeo) => {
  newNeo.map((neo) => {
    const neoSize = neo["Absolute Magnitude (H)"];
    if (neoSize > 30) data["Asteroids close to Earth (monthly)"].series[4]++;
    else if (neoSize > 25)
      data["Asteroids close to Earth (monthly)"].series[3]++;
    else if (neoSize > 20)
      data["Asteroids close to Earth (monthly)"].series[2]++;
    else if (neoSize > 15)
      data["Asteroids close to Earth (monthly)"].series[1]++;
    else data["Asteroids close to Earth (monthly)"].series[0]++;
  });
  return data;
};
const processSunInfo = (data, newSunInfo) => {
  console.log("newNeo: ", newSunInfo);
  console.log("data: ", data);
  newEventsData = processSunWeather(data, newSunInfo.weatherData);
  newEventsData = processSunActivities(data, newSunInfo.sunXRayActivities);
  newEventsData["Sun Image Links"] = newSunInfo.sunImageLinks;
  return data;
};
const processSunActivities = (data, newSunActivitis) => {
  console.log("newNeo: ", newSunActivitis);
  console.log("data: ", data);
  data["Sun's Activities (X-ray level)"].options.xaxis.categories =
    newSunActivitis.map((obj) => obj.timeTag);
  data["Sun's Activities (X-ray level)"].series[0].data = newSunActivitis.map(
    (obj) => obj.xRayRate
  );
  return data;
};
const processSunWeather = (data, newWeatherData) => {
  console.log("newNeo: ", newWeatherData);
  console.log("data: ", data);
  data["Sun's Weather (Hourly)"].options.xaxis.categories = newWeatherData.map(
    (obj) => obj.time
  );
  data["Sun's Weather (Hourly)"].series[0].data = newWeatherData.map(
    (obj) => obj.temperature
  );
  data["Sun's Weather (Hourly)"].series[1].data = newWeatherData.map(
    (obj) => obj.condition
  );
  data["Sun's Weather (Hourly)"].series[2].data = newWeatherData.map(
    (obj) => obj.precip
  );
  data["Sun's Weather (Hourly)"].series[3].data = newWeatherData.map(
    (obj) => obj.wind
  );
  data["Sun's Weather (Hourly)"].series[4].data = newWeatherData.map(
    (obj) => obj.humidity
  );
  data["Sun's Weather (Hourly)"].series[5].data = newWeatherData.map(
    (obj) => obj.uvLevel
  );
  data["Sun's Weather (Hourly)"].series[6].data = newWeatherData.map(
    (obj) => obj.cloudPercentage
  );
  data["Sun's Weather (Hourly)"].series[7].data = newWeatherData.map(
    (obj) => obj.rainCm
  );
  return data;
};

module.exports = {
  processEventsData,
  processNeoData,
  processSunInfo,
};
