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
        "Asteroids < 10 metters",
        "Asteroids between 10 to 20",
        "Asteroids between 20 to 30",
        "Asteroids between 30 to 40",
        "Asteroids > 50 meters",
      ],
    },
    series: [5, 2, 3, 2, 1], /// 0 TO ALL IN THE INIT
  }, //our data,
  "Sun activities (X-ray level)": {
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
  "Events urgency": {
    options: {
      labels: ["urgency 1", "urgency 2", "urgency 3", "urgency 4", "urgency 5"],
    },
    series: [6, 4, 3, 2, 1], /// 0 TO ALL IN THE INIT
  }, //our data
  "Events Distribution": {
    options: {
      xaxis: {
        categories:  [
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
  "neoTableObject": {
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
      "Orbiting Body"
    ],
    body: [
      {
        "Neo ID": "2465633",
        "Asteroid's Name": "465633 (2009 JR5)",
        "Absolute Magnitude (H)": "20.48",
        "Min Estimated Diameter (meters)": "213",
        "Max Estimated Diameter (meters)": "476",
        "Potentially Hazardous": "Yes",
        "Close Approach Date": "September 8, 2015",
        "Close Approach Time": "20:28 UTC",
        "Miss Distance": "45,290,302.848 kilometers (28,142,089.224 miles)",
        "Orbiting Body": "Earth"
      },
      {
        "Neo ID": "3426410",
        "Asteroid's Name": "(2008 QV11)",
        "Absolute Magnitude (H)": "21.34",
        "Min Estimated Diameter (meters)": "143",
        "Max Estimated Diameter (meters)": "321",
        "Potentially Hazardous": "No",
        "Close Approach Date": "September 8, 2015",
        "Close Approach Time": "14:31 UTC",
        "Miss Distance": "38,764,558.551 kilometers (24,087,179.746 miles)",
        "Orbiting Body": "Earth"
      },
      {
        "Neo ID": "3553060",
        "Asteroid's Name": "(2010 XT10)",
        "Absolute Magnitude (H)": "26.5",
        "Min Estimated Diameter (meters)": "13",
        "Max Estimated Diameter (meters)": "30",
        "Potentially Hazardous": "No",
        "Close Approach Date": "September 8, 2015",
        "Close Approach Time": "12:07 UTC",
        "Miss Distance": "73,563,782.385 kilometers (45,710,414.754 miles)",
        "Orbiting Body": "Earth"
      },
      {
        "Neo ID": "3726710",
        "Asteroid's Name": "(2015 RC)",
        "Absolute Magnitude (H)": "24.3",
        "Min Estimated Diameter (meters)": "37",
        "Max Estimated Diameter (meters)": "82",
        "Potentially Hazardous": "No",
        "Close Approach Date": "September 8, 2015",
        "Close Approach Time": "09:45 UTC",
        "Miss Distance": "4,027,962.697 kilometers (2,502,859.961 miles)",
        "Orbiting Body": "Earth"
      },
      {
        "Neo ID": "3727181",
        "Asteroid's Name": "(2015 RO36)",
        "Absolute Magnitude (H)": "22.9",
        "Min Estimated Diameter (meters)": "70",
        "Max Estimated Diameter (meters)": "156",
        "Potentially Hazardous": "No",
        "Close Approach Date": "September 8, 2015",
        "Close Approach Time": "14:36 UTC",
        "Miss Distance": "8,084,157.220 kilometers (5,023,262.365 miles)",
        "Orbiting Body": "Earth"
      }
    ]
  },
  "astroEventTableObject": {
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
        "Date": "20.48",
        "Time": "213",
        "Ra": "476",
        "Dec": "123",
        "Event Type": "Yes",
        "Urgency": "1",
      },
      {
        "Astroid's": "345677",
        "Telescope's Name": "465633 (2009 JR5)",
        "Date": "20.48",
        "Time": "213",
        "Ra": "476",
        "Dec": "123",
        "Event Type": "Yes",
        "Urgency": "1",
      },
      {
        "Astroid's": "657564567",
        "Telescope's Name": "465633 (2009 JR5)",
        "Date": "20.48",
        "Time": "213",
        "Ra": "476",
        "Dec": "123",
        "Event Type": "Yes",
        "Urgency": "3",
      },
      {
        "Astroid's": "2342355",
        "Telescope's Name": "465633 (2009 JR5)",
        "Date": "20.48",
        "Time": "213",
        "Ra": "476",
        "Dec": "123",
        "Event Type": "Yes",
        "Urgency": "5",
      }
    ]
  }
};
