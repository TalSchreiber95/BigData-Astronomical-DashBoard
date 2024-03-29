require("dotenv").config();
const initialData = require("./initial_data");
const { createClient } = require("redis");
const redis = createClient();

// Cloud Redis:
//   host: process.env.REDIS_CLOUD_HOST,
//   port: 18003,
//   password: process.env.REDIS_CLOUD_PASSWORD,

// Docker Image Redis:
//   port: 6379, // Redis port
//   host: "127.0.0.1", // Redis host

redis
  .on("connect", function () {
    console.log("Reciever connected to Redis in port: 6379");
  })
  .on("error", function (err) {
    console.log("Error " + err);
  });

(async () => {
  await redis.connect();
  if (await redis.exists("events_data")) {
    const data = await redis.json.GET("events_data");
    console.log("new data: ", data);
  } else {
    const initialDataAwait =await initialData()
    redis.json.SET("events_data", "$", initialDataAwait);
    const expireToday = parseInt(new Date().setHours(23, 59, 59, 999) / 1000);
    redis.EXPIREAT("events_data", expireToday);
    console.log("Data Initialized");
  }
})();

module.exports = redis;
