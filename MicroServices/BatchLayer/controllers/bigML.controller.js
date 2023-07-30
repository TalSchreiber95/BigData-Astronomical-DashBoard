require("dotenv").config();
const { getWeatherDB } = require("../models/mongo");
const { getSunDB } = require("../models/mongo");
const bigml = require("bigml");
const { writeFileSync } = require("fs");

const connection = new bigml.BigML(
  process.env.BIGML_USERNAME,
  process.env.BIGML_API_KEY
);
const DATASET_PATH = "./sunDataset.csv";

const buildModel = async (req, res) => {
  /* Prepare the Dataset */
  console.log(`Start get db from mongo`);

  const sunDB = await getSunDB(); // Get all Sun DB from MongoDB
  const weatherDB = await getWeatherDB(); // Get all Sun DB from MongoDB
  console.log(`Done get db from mongo`);

  writeMatchingDataToCSV(weatherDB, sunDB);

  /* Create the model */
  const source = new bigml.Source(connection);
  source.create(DATASET_PATH, function (error, sourceInfo) {
    if (error) {
      res.status(500).send({ message: `Error creating data source` });
      return;
    }

    /* Source created successfully */
    console.log(`Source created: ${sourceInfo.resource}`);
    const excludeFields = ['time', 'date'];

    const dataset = new bigml.Dataset(connection);
    dataset.create(sourceInfo, function (error, datasetInfo) {
      if (error) {
        res.status(500).send({ message: `Error creating data source` });
        return;
      }

      /* Dataset created successfully */
      console.log(`Dataset created: ${datasetInfo.resource}`);

      const association = new bigml.Association(connection);

      association.create(
        datasetInfo.resource,
        {
          "max_k": 100,
          "max_lhs": 4,
          "search_strategy": "support",
          "min_support": 0,
          "min_confidence": 0,
          "min_leverage": 0,
          "min_lift": 1,
          "significance_level": 0.05,
          "name": "bigml_64879b6979c6024ede57bbe1",
          "discretization": {
              "pretty": true,
              "trim": 0,
              "size": 5,
              "type": "population"
          }
      },
        function (error, associationInfo) {
          if (error) {
            console.log("Error creating association");
            res.status(500).send({ message: `Error creating association rules` });
            return;
          }

          /* Association created successfully */
          console.log(`Association created: ${associationInfo.resource}`);
          getAssociationRules(associationInfo.resource, res);
        }
      );

    });
  });
};

const getAssociationRules = (associationId, res) => {
  const model = new bigml.Model(connection);
  model.get(associationId, true, (err, modelInfo) => {
    if (err) {
      console.log("Error getting model");
      res?.status(500)?.send({ message: `Error getting model (${associationId})` });
      return;
    }
    console.log(modelInfo);
    const rules = modelInfo.object.associations.rules;
    console.log("RULES: ", rules);
    if (!rules) {
      console.error(`No associations found (${associationId})`);
      res?.status(500)?.send({ message: `No association rules were found (${associationId})` });
      return;
    }
    const items = modelInfo.object.associations.items;
    console.log("ITEMS: ", items);
    if (!items) {
      console.error(`No items found (${associationId})`);
      res?.status(500)?.send({ message: `No items were found (${associationId})` });
      return;
    }
    const fields = modelInfo.object.associations.fields;
    console.log("fields: ", fields);
    if (!fields) {
      console.error(`No fields found (${associationId})`);
      res?.status(500)?.send({ message: `No fields were found (${associationId})` });
      return;
    }

    const sets = extractRules(rules, items, fields);
    sets?.length && console.log(`Found ${sets.length} association rules`);
    res?.status(200)?.send(sets);

    return sets;
  });
};

/**
 * @param rules - Rules object from BigML modelInfo object
 * @param items - Item set from BigML modelInfo object
 * @param fields - A dictionary with an entry per field in the dataset
 * @returns - An array containing association rules determined in the dataset by the model.
 */
const extractRules = (rules, items, fields) => {
  const sets = [];
  for (let i = 0; i < rules.length; ++i) {
    const antecedent = rules[i].lhs;
    const consequent = rules[i].rhs;
    let antecedents = "";
    let consequents = "";

    for (let i = 0; i < antecedent.length; ++i) {
      if (fields[items[antecedent[i]].field_id].optype == "categorical"){
          antecedents += convertName(fields[items[antecedent[i]].field_id].name);
          antecedents +=  " = " + items[antecedent[i]].name;
      }
      else{
          if (items[antecedent[i]].bin_start != null) antecedents += items[antecedent[i]].bin_start + " < ";
          antecedents += convertName(fields[items[antecedent[i]].field_id].name);
          if (items[antecedent[i]].bin_end != null) antecedents +=  " <= " + items[antecedent[i]].bin_end;
     }

      if (i < antecedent.length - 1) antecedents += ", ";
    }
    for (let i = 0; i < consequent.length; ++i) {
      if (fields[items[consequent[i]].field_id].optype == "categorical"){
          consequents += convertName(fields[items[consequent[i]].field_id].name);
          consequents +=  " = " + items[consequent[i]].name;
      }
      else{
          if (items[consequent[i]].bin_start != null) consequents += items[consequent[i]].bin_start + " < ";
          consequents += convertName(fields[items[consequent[i]].field_id].name);
          if (items[consequent[i]].bin_end != null) consequents +=  " <= " + items[consequent[i]].bin_end;

          if (i < consequent.length - 1) consequents += ", ";
        }
    }
    const support = (rules[i].support[0] * 100).toFixed(2) + "%";
    const confidence = (rules[i].confidence * 100).toFixed(2) + "%";
    const count = rules[i].support[1];
    sets.push({
      antecedent: antecedents,
      consequent: consequents,
      support: support,
      confidence: confidence,
      count: count,
    });
  }
  return sets;
};

const nameDictionary = {
  "precip": "Precip",
  "condition": "Condition",
  "cloudPercentage": "Cloud Percentage",
  "uvLevel" : "UV Level",
  "temperature" : "Temperature",
  "humidity" : "Humidity",
  "wind" : "Wind",
  "rainCm" : "CM of Rain",
  "xRayRate" : "X-Ray Rate",
  "xRayEnergy" : "X-Ray Energy",
  "electron_correction" : "Electron Correction",
};

function convertName(name) {
  const convertedName = nameDictionary[name];
  return convertedName ? convertedName : name;
}

const writeMatchingDataToCSV = (weatherData, sunXRayActivities) => {
  console.log("Writing matching data to CSV");
  let dataset = "temperature,condition,precip,wind,humidity,uvLevel,cloudPercentage,rainCm,xRayRate,xRayEnergy,electron_correction\n";

  weatherData.forEach((weatherItem) => {
    const { dateWeather, time } = weatherItem;

    sunXRayActivities.forEach((sunItem) => {
      const { timeTag, date, xRayRate, xRayEnergy, electron_correction } = sunItem;

      if (timeTag === time && date == dateWeather) {
        const row = `${weatherItem.temperature},${weatherItem.condition},${weatherItem.precip},${weatherItem.wind},${weatherItem.humidity},${weatherItem.uvLevel},${weatherItem.cloudPercentage},${weatherItem.rainCm},${xRayRate},${xRayEnergy},${electron_correction}\n`;
        dataset += row;
      }
    });
  });

  try {
    writeFileSync(DATASET_PATH, dataset);
    console.log("Matching data written to csv");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { buildModel, getAssociationRules };
