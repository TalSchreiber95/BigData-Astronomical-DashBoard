const Toppings = ["onion", "olives", "tomato", "corn", "mushrooms"];

const Branches = [
  "Haifa",
  "Karmiel",
  "Tel Aviv",
  "Beer Sheva",
  "Ramat Gan",
  "Yoqneam",
  "Petah Tikva",
  "Jerusalem",
  "Rishon Letzion",
  "Givatayim",
  "Nahariya",
  "Acre",
  "Rehovot",
  "Ariel",
  "Gedera",
  "Sderot",
  "Ashkelon",
  "Ashdod",
  "Afula",
  "Hadera",
  "Netanya",
  "Zichron",
  "Beit Shemesh",
  "Herzliya",
  "Raanana",
];

const toppings = {};
const branchesHandleTime = {};
const branchesStatus = {};

Branches.forEach((branch) => {
  branchesHandleTime[branch] = 0;
});
Branches.forEach((branch) => {
  branchesStatus[branch] = null;
});
Toppings.forEach((topping) => {
  toppings[topping] = 0;
});

let data= {
  "Today's Orders": 0,
  "Total Open Orders": 0,
  "Average Handle Time": 0,
  "Open Branches": 0,
  "Branches Status": branchesStatus,
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
    branchesHandleTime: branchesHandleTime,
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
    toppings: toppings,
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

let eventData = {
  "Today's Orders": 0,
  "Total Open Orders": 0,
  "Average Handle Time": 0,
  "Open Branches": 1,
  "Branches Status": branchesStatus,
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
    branchesHandleTime: branchesHandleTime,
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
    toppings: toppings,
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

module.exports = eventData