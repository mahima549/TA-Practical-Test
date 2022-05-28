const express = require("express");
const weatherController = require("../controllers/weatherController");
const router = express.Router();

router.get('/weather', function (req, res) {
  weatherController.weather(req, res)
});

module.exports = router;
