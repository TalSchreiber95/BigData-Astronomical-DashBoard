require("dotenv").config();
const uuid = require("uuid");
const Kafka = require("node-rdkafka");

const kafkaConfig = {
  "group.id": "cloudkarafka",
  "metadata.broker.list": process.env.CLOUDKARAFKA_BROKERS.split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": process.env.CLOUDKARAFKA_USERNAME,
  "sasl.password": process.env.CLOUDKARAFKA_PASSWORD,
  debug: "generic,broker,security",
};

const ordersTopic = process.env.CLOUDKARAFKA_TOPIC_PREFIX + "orders";
const eventsTopic = process.env.CLOUDKARAFKA_TOPIC_PREFIX + "events";
const sunActivitiesTopic = process.env.CLOUDKARAFKA_TOPIC_PREFIX + "sunActivities";
const neoTopic = process.env.CLOUDKARAFKA_TOPIC_PREFIX + "neo";

const producer = new Kafka.Producer(kafkaConfig);

producer.connect();
producer.on("ready", (arg) =>
console.log(
  `producer ${arg.name} ready. topic: ${ordersTopic}, ${eventsTopic}, ${neoTopic}, ${sunActivitiesTopic}`
  )
);

producer.on("event.error", (err) => console.log(err));

const publish = (data, topic) => {
  let msg = new Buffer.from(JSON.stringify(data));
  topic = process.env.CLOUDKARAFKA_TOPIC_PREFIX + topic;
  // console.log("topic from server: ",topic)
  // console.log("msg data: ",data)
  try {
    producer.produce(topic, -1, msg, uuid.v4());
    producer.flush(1000);
    // console.log("published:", data);
  } catch (error) {
    console.error("A problem occurred when sending our message");
    console.error(error);
  }
};

module.exports = { publish };
