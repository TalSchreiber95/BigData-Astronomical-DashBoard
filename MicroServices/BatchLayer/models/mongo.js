require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;


const SunSchema = new mongoose.Schema({
  date: String,
  timeTag: String,
  xRayRate: Number,
  xRayEnergy: Number,
  electron_correction: Number
});

SunSchema.index({ timeTag: 1, date: 1, xRayRate: 1, xRayEnergy: 1, electron_correction: 1 }, { unique: true });

// Sun model
const Sun = mongoose.model(
  "Sun",
  SunSchema
);


const WeatherSchema = new mongoose.Schema({
  dateWeather: String,
  time: String,
  temperature: String,
  condition: String,
  precip: String,
  wind: Number,
  humidity: Number,
  uvLevel: Number,
  cloudPercentage: Number,
  rainCm: Number,
});

WeatherSchema.index({ dateWeather: 1, time: 1, temperature: 1, condition: 1, precip: 1, wind:1, humidity: 1, uvLevel: 1, cloudPercentage: 1, rainCm: 1 }, { unique: true });

// Weather model
const Weather = mongoose.model(
  "Weather",
  WeatherSchema
);


// AstroEvent model
const AstroEvent = mongoose.model(
  "AstroEvent",
  Schema({
    "Astroid's Id": Number,
    "Telescope's Name": String,
    "Date": Date,
    "Time": String,
    "Ra": Number, // 0-24 hours might be better as string 6.75 = 6h 45m
    "Dec": Number, // degrees such as -16.7167 = -16° 43
    "Event Type": String, // can have multiple consequences
    "Urgency": Number, // between 1-5
  })
);

// Connection
const url = process.env.MONGO_URL;
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB Connected succesfully!");
});


const saveSunToDB = async (sunData) => {
    const newSun = Sun(sunData);
    newSun.save( (err, doc) => {
        if (err && err.code === 11000) {
          // Duplicate key error, sun data already exists
          console.log('Sun data already exists.');
        } else if (err) {
          // Other error occurred
          console.error('Error saving Sun:', err);
        } else {
          // Sun saved successfully
          console.log(`Document Sun inserted succussfully to MongoDB!`);
        }
      });
    };

const getSunDB = async (query = {}) => {
  try {
    const sunDB = await Sun.find(query);
    console.log("sunDB from MongoDB: ", sunDB);
    return sunDB;
  } catch (err) {
    console.error(err);
  }
};

const saveWeatherToDB = async (weatherData) => {
    const newWeather = Weather(weatherData);
    newWeather.save(function (err, doc) {
      if (err && err.code === 11000) {
        // Duplicate key error, Weather data already exists
        console.log('Weather data already exists.');
      } else if (err) {
        // Other error occurred
        console.error('Error saving Weather:', err);
      } else {
      console.log("Document Weather inserted succussfully to MongoDB!");
    }
  });
};

const getWeatherDB = async (query = {}) => {
  try {
    const weatherDB = await Weather.find(query);
    console.log("weatherDB from MongoDB: ", weatherDB);
    return weatherDB;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { saveSunToDB, getSunDB, saveWeatherToDB, getWeatherDB };
