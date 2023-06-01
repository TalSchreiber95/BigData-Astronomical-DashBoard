const neoController = require("./neoController");

initializeData = async () => {
  await neoController.fetchFromApi();
  console.log("data initialized successfully! ");
};

module.exports = {
  initializeData,
};
