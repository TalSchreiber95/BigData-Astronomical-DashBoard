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

export const DefaultDataConfig = {
  "Today's Orders": 0,
  "Total Open Orders": 1,
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
