const { searchDocuments } = require("../models/elasticSearch");

const getEventsByDate = async (req, res) => {
  let events = await searchDocuments(req.query);

  events?.length
    ? res.status(200).send(events)
    : res.status(200).send({ message: "No Events Found" });
};

module.exports = { getEventsByDate };
