require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes.js");
const PORT = process.env.PORT || 4002;

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: " hello from Orders Simulator" });
});

app.use("/api", routes.routes);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
