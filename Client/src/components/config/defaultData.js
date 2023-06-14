export const DefaultDataConfig1 = {
  "Today's Orders": 0,
  "Total Open Orders": 0,
  "Average Handle Time": 0,
  "Open Branches": 0,
  "Orders By Region": {
    options: {
      labels: ["North", "Center", "South", "Haifa", "Dan"],
    },
    series: [0, 0, 0, 0, 0],
  }, //our data,
  "Orders During Today": {
    options: {
      xaxis: {
        categories: [
          "10:00",
          "12:00",
          "14:00",
          "16:00",
          "18:00",
          "20:00",
          "22:00",
        ], //will be displayed on the x-asis
      },
    },
    series: [
      {
        name: "Orders Amount", //will be displayed on the y-axis
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  },

  "Top 5 Shortest Handle Time Branches": {
    options: {
      xaxis: {
        categories: ["Eilat", "Haifa", "Tel Aviv", "Rishon", "Karmiel"], //will be displayed on the x-asis
      },
    },
    series: [
      {
        name: "Duration (Minutes)", //will be displayed on the y-axis
        data: [0, 0, 0, 0, 0],
      },
    ],
  },
  "Top 5 Pizza Toppings": {
    options: {
      xaxis: {
        categories: ["Corn", "Mushrooms", "Onion", "Olives", "Tomato"], //will be displayed on the x-asis
      },
    },

    series: [
      {
        name: "Amount", //will be displayed on the y-axis
        data: [0, 0, 0, 0, 0],
      },
    ],
  },
};
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
const makeText = (event) => {
  let txt = "Astroid's Id: " + event["Astroid's Id"] + "\n";
  txt += "Telescope's Name: " + event["Telescope's Name"] + "\n";
  txt += "Date: " + event["Date"] + event["Time"] + "\n";
  txt += "Dec: " + event["Dec"] + " Ra: " + event["Ra"] + "\n";
  txt += "Urgency: " + event["Urgency"] + "\n";
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

export const DefaultDataConfig = {
  "Today's Events": 0,
  "Total of close asteroids (monthly)": 0,
  "Total of close asteroids (daily)": 0,
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
      "Astroid's Id",
      "Telescope's Name",
      "Date",
      "Time",
      "Ra",
      "Dec",
      "Event Type",
      "Urgency",
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
