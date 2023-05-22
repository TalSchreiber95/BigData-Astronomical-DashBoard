const { KafkaConsumer } = require("node-rdkafka");
require("dotenv").config();
const consumer = new KafkaConsumer({
  "group.id": "cloudkarafka",
  "metadata.broker.list": process.env.CLOUDKARAFKA_BROKERS.split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": process.env.CLOUDKARAFKA_USERNAME,
  "sasl.password": process.env.CLOUDKARAFKA_PASSWORD,
  debug: "generic,broker,security",
});

const ordersTopic = process.env.CLOUDKARAFKA_TOPIC_PREFIX + "orders";
const eventsTopic = process.env.CLOUDKARAFKA_TOPIC_PREFIX + "events";

consumer.connect();
consumer
  .on("ready", (arg) => {
    consumer.subscribe([ordersTopic]).consume();
    console.log(`Consumer ${arg.name} ready. topics: ${ordersTopic}`);
  })
  .on("disconnected", (arg) =>
    console.log(`Consumer ${arg.name} disconnected.`)
  )
  .on("event.error", (err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = consumer;
