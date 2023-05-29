const eventData = require("../models/initial_data");

const processData = (eventsData, newEvent) => {
  let newEventsData = eventCounters(eventsData, newEvent);
  newEventsData = eventDistributions(eventsData, newEvent);
  // newEventsData = top5Toppings(eventsData, newEvent);
  // newEventsData = branchesByHandleTime(eventsData, newEvent);
  // newEventsData = todayOrdersByHours(eventsData, newEvent);
  return newEventsData;
};

const eventCounters = (eventsData, newEvent) => {
  eventsData["Today's Events"]++;
  eventsData["Total of close asteroids (monthly)"]++; // need to inrement by the neo astro api 
  eventsData["Total of close asteroids (daily)"]++; // need to inrement by the neo astro api 
  return eventsData;
};


const eventDistributions = (eventsData, newEvent) => {
  switch(newEvent["Event Type"])
  {
    case "GRB":
      eventsData["Events Distribution"][0]++;
      break;
    case "Rise Brightness Apparent":
      eventsData["Events Distribution"][1]++;
      break;
    case "UV (Rise UV)":
      eventsData["Events Distribution"][2]++;
      break;
    case "Rise Ray-X":
      eventsData["Events Distribution"][3]++;
      break;
    case "Comet":
      eventsData["Events Distribution"][4]++;
      break;
  }
  return eventsData;
};

const top5Toppings = (ordersData, newOrder) => {
  let toppingsConfig = ordersData["Top 5 Pizza Toppings"];
  newOrder.toppings.forEach((topping) => {
    toppingsConfig.toppings[topping]++;
  });
  const Top5 = getTopFive(toppingsConfig.toppings);
  toppingsConfig.options.xaxis.categories = Object.keys(Top5);
  toppingsConfig.series[0].data = Object.values(Top5);
  return ordersData;
};

const ordersByRegion = (ordersData, newOrder) => {
  const index = ordersData["Orders By Region"].options.labels.indexOf(
    newOrder.region
  );
  ordersData["Orders By Region"].series[index]++;
  return ordersData;
};

const branchesByHandleTime = (ordersData, newOrder) => {
  let branchesHandle = ordersData["Top 5 Shortest Handle Time Branches"];
  branchesHandle.branchesHandleTime[newOrder.branch] += newOrder.handle_time;
  const Top5 = getTopFive(branchesHandle.branchesHandleTime);
  branchesHandle.options.xaxis.categories = Object.keys(Top5);
  branchesHandle.series[0].data = Object.values(Top5);
  return ordersData;
};

const getTopFive = (obj) => {
  let entries = Object.entries(obj).filter((e) => e[1] > 0);
  entries.sort((a, b) => a[1] - b[1]);
  return Object.fromEntries(entries.slice(0, 5));
};

const todayOrdersByHours = (ordersData, newOrder) => {
  let todayOrders = ordersData["Orders During Today"];
  if (newOrder.time > "10:00" && newOrder.time < "12:00")
    todayOrders.series[0].data[0] += 1;
  else if (newOrder.time > "12:00" && newOrder.time < "14:00")
    todayOrders.series[0].data[1] += 1;
  else if (newOrder.time > "14:00" && newOrder.time < "16:00")
    todayOrders.series[0].data[2] += 1;
  else if (newOrder.time > "16:00" && newOrder.time < "18:00")
    todayOrders.series[0].data[3] += 1;
  else if (newOrder.time > "18:00" && newOrder.time < "20:00")
    todayOrders.series[0].data[4] += 1;
  else if (newOrder.time > "20:00" && newOrder.time < "22:00")
    todayOrders.series[0].data[5] += 1;
  return ordersData;
};

const processEvents = (ordersData, newEvent) => {
  ordersData["Branches Status"][newEvent.branch] = newEvent.eventType;
  ordersData["Open Branches"] = Object.values(
    ordersData["Branches Status"]
  ).filter((item) => item == "Open").length;
  return ordersData;
};

module.exports = { processData, processEvents };
