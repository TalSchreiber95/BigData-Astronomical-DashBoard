const processEventsData = (eventsData, newEvent) => {
  let newEventsData = eventCounters(eventsData, newEvent);
  newEventsData = eventDistributions(eventsData, newEvent);
  newEventsData = eventUrgency(eventsData, newEvent);
  newEventsData["astroEventTableObject"].body.push(newEvent);
  return newEventsData;
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
  data["neoTableObject"].body.push(newNeo);
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
  const neoSize = newNeo["Absolute Magnitude (H)"];
  if (neoSize > 30) data["Asteroids close to Earth (monthly)"].series[4]++;
  else if (neoSize > 25) data["Asteroids close to Earth (monthly)"].series[3]++;
  else if (neoSize > 20) data["Asteroids close to Earth (monthly)"].series[2]++;
  else if (neoSize > 15) data["Asteroids close to Earth (monthly)"].series[1]++;
  else data["Asteroids close to Earth (monthly)"].series[0]++;
  return data;
};

module.exports = { processEventsData, processNeoData };
