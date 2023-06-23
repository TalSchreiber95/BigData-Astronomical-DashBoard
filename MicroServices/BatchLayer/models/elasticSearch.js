const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

async function searchDocuments(query = { match_all: {} }) {
  if (query.eventType && query.eventType !== "") {
    query = {
      bool: {
        must: [
          {
            match: {
              Topic: "astro",
            },
          },
          {
            match: {
              "astro.Event Type.keyword": query.eventType,
            },
          },
          {
            range: {
              "astro.Date": {
                gte: query.fromDate,
                lte: query.toDate,
              },
            },
          },
        ],
      },
    };
  } else {
    query = {
      bool: {
        must: [
          {
            match: {
              Topic: "astro",
            },
          },
        ],
      },
    };
  }
  try {
    const response = await client.search({
      index: "events",
      size: 1000,
      query: query,
    });
    console.log("333", JSON.stringify(query));
    return response?.hits.hits.map((hit) => hit._source);
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
