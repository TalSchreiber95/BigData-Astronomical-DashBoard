const processEventsData = (eventsData, newEvent) => {
  let newEventsData = eventCounters(eventsData, newEvent);
  newEventsData = eventDistributions(eventsData, newEvent);
  // newEventsData = top5Toppings(eventsData, newEvent);
  // newEventsData = branchesByHandleTime(eventsData, newEvent);
  // newEventsData = todayOrdersByHours(eventsData, newEvent);
  return newEventsData;
};

const eventCounters = (eventsData, newEvent) => {
  eventsData["Today's Events"]++
  eventsData["Total of close asteroids (monthly)"]++ // need to inrement by the neo astro api 
  eventsData["Total of close asteroids (daily)"]++ // need to inrement by the neo astro api 
  return eventsData;
};


const eventDistributions = (eventsData, newEvent) => {
  console.log("eventsData: ",eventsData)
  console.log("newEvent: ",newEvent)
  switch(newEvent["Event Type"])
  {
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


const processNeoData = (data, newNeo) => {
  console.log("newNeo: ",newNeo)
  console.log("data: ",data)
  return data
};

module.exports = { processEventsData, processNeoData };
