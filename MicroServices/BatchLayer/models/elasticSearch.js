const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

async function searchDocuments(query = { match_all: {} }) {
  if (query.hasOwnProperty("branch") && query.branch !== "") {
    query = {
      bool: {
        must: Object.entries(query).map(([field, value]) => ({
          match: { [field]: value },
        })),
      },
    };
  }
  try {
    const response = await client.search({
      index: "orders",
      size: 1000,
      query: query,
    });
    return response?.hits.hits.map((hit) => hit._source);
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function indexDocument(order) {
  try {
    const response = await client.index({
      index: "orders",
      id: order.order_id,
      document: order,
    });
    if (response.result == "created") {
      console.log("Document Indexed Successfully");
    } else {
      console.log("Document Index FAILED");
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}
async function deleteAllDocuments() {
  try {
    const response = await client.deleteByQuery({
      index: "orders",
      body: {
        query: {
          match_all: {},
        },
      },
    });
    return response.body;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// (async () => {
//   deleteAllDocuments();
//   const document = await searchDocuments();
//   console.log(document);
// })();

module.exports = { indexDocument, searchDocuments };
