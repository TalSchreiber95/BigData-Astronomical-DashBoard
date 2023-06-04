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

export const DefaultDataConfig = {
  "Today's Events": 0,
  "Total of close asteroids (monthly)": 0,
  "Total of close asteroids (daily)": 0,
  // "Open Branches": 0,
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
    series: [1, 1, 1, 1, 1], /// 0 TO ALL IN THE INIT
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
        data: [2, 5, 1, 3, 0, 2, 10],
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
        data: [2, 5, 1, 3, 0, 2, 10],
      },
    ],
  },
  "Events urgency": {
    options: {
      labels: ["urgency 1", "urgency 2", "urgency 3", "urgency 4", "urgency 5"],
    },
    series: [1, 1, 1, 1, 1], /// 0 TO ALL IN THE INIT
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
    body: [
      {
        "Astroid's": "2465633",
        "Telescope's Name": "465633 (2009 JR5)",
        Date: "20.48",
        Time: "213",
        Ra: "476",
        Dec: "123",
        "Event Type": "Yes",
        Urgency: "1",
      },
      {
        "Astroid's": "345677",
        "Telescope's Name": "465633 (2009 JR5)",
        Date: "20.48",
        Time: "213",
        Ra: "476",
        Dec: "123",
        "Event Type": "Yes",
        Urgency: "1",
      },
      {
        "Astroid's": "657564567",
        "Telescope's Name": "465633 (2009 JR5)",
        Date: "20.48",
        Time: "213",
        Ra: "476",
        Dec: "123",
        "Event Type": "Yes",
        Urgency: "3",
      },
      {
        "Astroid's": "2342355",
        "Telescope's Name": "465633 (2009 JR5)",
        Date: "20.48",
        Time: "213",
        Ra: "476",
        Dec: "123",
        "Event Type": "Yes",
        Urgency: "5",
      },
    ],
  },
};
