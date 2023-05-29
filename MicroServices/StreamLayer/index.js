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
const { processData, processEvents } = require("./controllers/DataProcessor.js");
const { log } = require("console");

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, { cors: {} });

io.on("connection", async (socket) => {
  console.log(`User Connected: ${socket.id}`);
  let ordersData = await redis.json.GET("events_data");
  console.log(ordersData);
  io.emit("events_data", ordersData);
});

kafkaConsumer.on("data", async (msg) => {
  console.log("data caught")
  let eventsData = await redis.json.GET("events_data");
  try {
    let newEvent = JSON.parse(msg.value);
    console.log(newEvent);
    if (newEvent.topic == "events") {
      eventsData = processData(eventsData, newEvent);
      await redis.json.SET("events_data", "$", eventsData);
    }
    // else {

    //   ordersData = processEvents(ordersData, newOrder);
    //   await redis.json.SET("events_data", "$", ordersData);
    // }
  } catch (error) {
    console.error(error);
  }

  io.emit("events_data", eventsData);
});

server.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
