require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/routes.js");
const kafkaConsumer = require("./models/kafkaConsumer");
const PORT = process.env.PORT || 4000;
const { saveToDB } = require("./models/mongo.js");
const { indexDocument } = require("./models/elasticSearch");

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello from Batch Layer" });
});

app.use("/api", routes.routes);

kafkaConsumer.on("data", function (msg) {
  console.log(msg.value.toString());
  let newData = JSON.parse(msg.value);
  if (newData !== null) {
    if (msg.topic == eventsTopic) {
      if (newData.Topic === "astro") {
        // do whatever you need with newData.astro
      }
      if (newData.Topic === "sunInfo") {
        // should change to sunInfo
        // do whatever you need with newData
      }
      if (newData.Topic === "neo") {
        // should change to neoTopic
        // do whatever you need with newData.neo
      }
    }
  }
  // Note: you should save the necessary object in each used as described above
  saveToDB(newData); // for mongoDb 
  indexDocument(newData); // for elasticSearch
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
