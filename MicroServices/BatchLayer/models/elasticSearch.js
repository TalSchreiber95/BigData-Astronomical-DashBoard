const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

async function searchDocuments({ eventType, telescope, fromDate, toDate }) {
  const query = {
    bool: {
      must: [],
    },
  };

  eventType &&
    query.bool.must.push({
      match: {
        "astro.Event Type.keyword": eventType,
      },
    });

  telescope &&
    query.bool.must.push({
      match: {
        "astro.Telescope's Name.keyword": telescope,
      },
    });

  fromDate &&
    query.bool.must.push({
      range: {
        "astro.Date": {
          gte: fromDate,
        },
      },
    });

  toDate &&
    query.bool.must.push({
      range: {
        "astro.Date": {
          lte: toDate,
        },
      },
    });

  try {
    const response = await client.search({
      index: "events",
      size: 1000,
      query: query,
    });
    return response?.hits.hits.map((hit) => hit._source.astro);
  } catch (err) {
    // console.error(err);
    return null;
  }
}

async function indexDocument(order) {
  try {
    const response = await client.index({
      index: "events",
      id: order.order_id,
      document: order,
    });
    if (response.result == "created") {
      // console.log("Document Indexed Successfully");
    } else {
      // console.log("Document Index FAILED");
    }
  } catch (err) {
    // console.error(err);
    return null;
  }
}

module.exports = { indexDocument, searchDocuments };
