const express = require("express");
const app = express();

app.use(express.json());

//Route
const user = require("./routes/user");
const news = require("./routes/news");
const weather = require("./routes/weather");
app.use("/device/v1/user", user);
app.use("/device/v1/news", news);
app.use("/device/v1/weather", weather);

module.exports = app;