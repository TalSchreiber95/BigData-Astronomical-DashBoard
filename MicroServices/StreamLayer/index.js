require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const cors = require("cors");
const PORT = process.env.PORT || 4001;
const redis = require("./models/Redis.js");
const kafkaConsumer = require("./models/kafkaConsumer.js");
const { processData, processEvents } = require("./models/DataProcessor");
const { log } = require("console");

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, { cors: {} });

io.on("connection", async (socket) => {
  console.log(`User Connected: ${socket.id}`);
  let ordersData = await redis.json.GET("orders_data");
  console.log(ordersData);
  io.emit("orders_data", ordersData);
});

kafkaConsumer.on("data", async (msg) => {
  console.log("asdsadsdsa")
  let ordersData = await redis.json.GET("orders_data");
  try {
    let newOrder = JSON.parse(msg.value);
    console.log(newOrder);
    if (newOrder.topic == "orders") {
      ordersData = processData(ordersData, newOrder);
      await redis.json.SET("orders_data", "$", ordersData);
    } else {
      ordersData = processEvents(ordersData, newOrder);
      await redis.json.SET("orders_data", "$", ordersData);
    }
  } catch (error) {
    console.error(error);
  }

  io.emit("orders_data", ordersData);
});

server.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
