const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

async function searchDocuments({
  selectedEventTypes,
  selectedTelescopes,
  selectedStars,
  fromDate,
  toDate,
}) {
  const query = {
    bool: {
      must: [],
    },
  };

  const shouldEventTypes = [];
  const shouldTelescopes = [];
  const shouldStars = [];

  if (Array.isArray(selectedEventTypes) && selectedEventTypes.length > 0) {
    selectedEventTypes.forEach((eventType) => {
      shouldEventTypes.push({
        match: {
          "Event Type.keyword": eventType,
        },
      });
    });
  }

  if (Array.isArray(selectedTelescopes) && selectedTelescopes.length > 0) {
    selectedTelescopes.forEach((telescope) => {
      shouldTelescopes.push({
        match: {
          "Telescope's Name.keyword": telescope,
        },
      });
    });
  }

  if (Array.isArray(selectedStars) && selectedStars.length > 0) {
    selectedStars.forEach((star) => {
      shouldStars.push({
        match: {
          "Title HD.keyword": star,
        },
      });
    });
  }

  if (shouldEventTypes.length > 0) {
    query.bool.must.push({
      bool: {
        should: shouldEventTypes,
      },
    });
  }

  if (shouldTelescopes.length > 0) {
    query.bool.must.push({
      bool: {
        should: shouldTelescopes,
      },
    });
  }

  if (shouldStars.length > 0) {
    query.bool.must.push({
      bool: {
        should: shouldStars,
      },
    });
  }

  if (fromDate) {
    query.bool.must.push({
      range: {
        Date: {
          gte: fromDate,
        },
      },
    });
  }

  if (toDate) {
    query.bool.must.push({
      range: {
        Date: {
          lte: toDate,
        },
      },
    });
  }
  try {
    const response = await client.search({
      index: "events",
      size: 1000,
      query: query,
    });
    return response?.hits.hits.map((hit) => hit._source);
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function indexDocument(document) {
  try {
    const response = await client.index({
      index: "events",
      id: document["Event's Id"],
      document: document,
    });
    if (response.result == "created") {
      // console.log("Document Indexed Successfully");
    } else {
      // console.log("Document Index FAILED");
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = { indexDocument, searchDocuments };
