const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

async function searchDocuments({
  eventType,
  telescope,
  fromDate,
  toDate,
  starSearch,
}) {
  const query = {
    bool: {
      must: [],
    },
  };

  eventType &&
    query.bool.must.push({
      match: {
        "Event Type.keyword": eventType,
      },
    });

  telescope &&
    query.bool.must.push({
      match: {
        "Telescope's Name.keyword": telescope,
      },
    });

  fromDate &&
    query.bool.must.push({
      range: {
        Date: {
          gte: fromDate,
        },
      },
    });

  toDate &&
    query.bool.must.push({
      range: {
        Date: {
          lte: toDate,
        },
      },
    });

  starSearch &&
    query.bool.must.push({
      prefix: {
        "Title HD.keyword": {
          value: starSearch,
          case_insensitive: true,
        },
      },
    });
  try {
    const response = await client.search({
      index: "events",
      size: 1000,
      query: query,
    });
    return response?.hits.hits.map((hit) => hit._source);
  } catch (err) {
    // console.error(err);
    return null;
  }
}

async function indexDocument(document) {
  try {
    const response = await client.index({
      index: "events",
      id: document["Astroid's Id"],
      document: document,
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
