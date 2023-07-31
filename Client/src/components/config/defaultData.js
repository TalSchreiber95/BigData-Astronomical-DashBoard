const createTimeList = () => {
  var currentTime = new Date();
  var timeList = [];
  currentTime.setMinutes(Math.round(currentTime.getMinutes() / 20) * 20);
  var startTime = new Date(currentTime.getTime() - 2 * 60 * 60 * 1000);
  while (startTime <= currentTime) {
    var hours = startTime.getHours().toString().padStart(2, "0");
    var minutes = startTime.getMinutes().toString().padStart(2, "0");
    var time = hours + ":" + minutes;
    timeList.push(time);
    startTime.setTime(startTime.getTime() + 20 * 60 * 1000);
  }
  return timeList;
};
export const DefaultDataConfig = {
  "Today's Events": 0,
  "Total of close asteroids (monthly)": 0,
  "Total of close asteroids (daily)": 0,
  "Sun Image Links": [],
  "Last Event": {
    title: "",
    img: "",
    text: "",
  },
  "Asteroids close to Earth (monthly)": {
    options: {
      labels: [
        "Asteroids < 15 meters",
        "Asteroids between 15 to 20",
        "Asteroids between 20 to 25",
        "Asteroids between 25 to 30",
        "Asteroids > 30 meters",
      ],
    },
    series: [0, 0, 0, 0, 0], /// 0 TO ALL IN THE INIT
  }, //our data,
  "Sun's Activities (X-ray level)": {
    options: {
      xaxis: {
        categories: createTimeList(), //will be displayed on the x-asis
      },
    },
    series: [
      {
        name: "X-ray level", //will be displayed on the y-axis
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  },
  "Sun's Weather (Hourly)": {
    options: {
      xaxis: {
        categories: createTimeList(), //will be displayed on the x-asis
      },
    },
    series: [
      {
        name: "Temperature", //will be displayed on the y-axis
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Condition(1 to 5)", //will be displayed on the y-axis
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Precip(%)", //will be displayed on the y-axis
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Wind(KM/H)", //will be displayed on the y-axis
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Humidity(%)", //will be displayed on the y-axis
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "UV Level(0-10)", //will be displayed on the y-axis
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Cloude(%)", //will be displayed on the y-axis
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Rain(cm)", //will be displayed on the y-axis
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  },
  "Events urgency": {
    options: {
      labels: ["urgency 1", "urgency 2", "urgency 3", "urgency 4", "urgency 5"],
    },
    series: [0, 0, 0, 0, 0], /// 0 TO ALL IN THE INIT
  }, //our data
  "Events Distribution": {
    options: {
      xaxis: {
        categories: [
          "GRB",
          "Rise Brightness Apparent",
          "UV (Rise UV)",
          "Rise Ray-X",
          "Comet",
        ], //will be displayed on the x-asis
      },
    },
    series: [
      {
        name: "Amount", //will be displayed on the y-axis
        data: [0, 0, 0, 0, 0],
      },
    ],
  },
  neoTableObject: {
    header: [
      "Neo ID",
      "Asteroid's Name",
      "Absolute Magnitude (H)",
      "Min Estimated Diameter (meters)",
      "Max Estimated Diameter (meters)",
      "Potentially Hazardous",
      "Close Approach Date",
      "Close Approach Time",
      "Miss Distance",
      "Orbiting Body",
    ],
    body: [],
  },
  astroEventTableObject: {
    header: [
      "Event's Id",
      "Telescope's Name",
      "Date",
      "Time",
      "Ra",
      "Dec",
      "Event Type",
      "Urgency",
      "Title HD",
    ],
    body: [],
  },
  brightStars: {
    header: [
      "Harvard Reference Number",
      "RA",
      "DEC",
      "Epoch",
      "RA Proper Motion",
      "DEC Proper Motion",
      "Magnitude",
      "Title HD",
    ],
    body: [],
  },
};
