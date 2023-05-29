require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Order model
const Order = mongoose.model(
  "Order",
  Schema({
    order_id: String,
    branch_id: String,
    branch: String,
    region: String,
    date: String,
    time: String,
    toppings: [String],
    completed: Boolean,
    handle_time: Number,
    topic: String,
  })
);

// AstroEvent model
const AstroEvent = mongoose.model(
  "AstroEvent",
  Schema({
    "Astroid's Id": Number,
    "Telescope's Name": String,
    "Date": Date,
    "Time": String,
    "Ra": Number, // 0-24 hours might be better as string 6.75 = 6h 45m
    "Dec": Number, // degrees such as -16.7167 = -16° 43
    "Event Type": String, // can have multiple consequences
    "Urgency": Number, // between 1-5
  })
);

// Connection
const url = process.env.MONGO_URL;
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB Connected succesfully!");
});

const saveToDB = async (order) => {
  try {
    const newOrder = Order(order);
    newOrder.save(function (err, doc) {
      if (err) return console.error(err);
      console.log("Document inserted succussfully to MongoDB!");
    });
  } catch (err) {
    console.error(err);
  }
};

const getOrders = async (query = {}) => {
  try {
    const orders = await Order.find(query);
    // console.log("orders: ", orders);
    return orders;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { saveToDB, getOrders };
