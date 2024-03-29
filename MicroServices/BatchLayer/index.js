require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/routes.js");
const kafkaConsumer = require("./models/kafkaConsumer");
const PORT = process.env.PORT || 4000;
const { saveSunToDB } = require("./models/mongo.js");
const { saveWeatherToDB } = require("./models/mongo.js");
const { indexDocument } = require("./models/elasticSearch");

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const eventsTopic = process.env.CLOUDKARAFKA_TOPIC_PREFIX + "events";

app.get("/", (req, res) => {
  res.json({ message: "Hello from Batch Layer" });
});

app.use("/api", routes.routes);

kafkaConsumer.on("data", function (msg) {
  let newData = JSON.parse(msg.value);
  console.log(`test newData.Topic = ${newData.Topic}`);
  if (newData !== null) {
    if (msg.topic == eventsTopic) {
      if (newData.Topic === "sunInfoForAnalyze") {
        newData["sunXRayActivities"].forEach((item) => {
          saveSunToDB(item); // for mongoDb
        });
        newData["weatherData"].forEach((item) => {
          saveWeatherToDB(item); // for mongoDb
        });
      }
      if (newData.Topic === "astro") {
        indexDocument(newData.astro);
      }
    }
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
