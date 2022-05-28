const express = require("express");
const newsController = require("../controllers/newsController");
const router = express.Router();

var Auth = require('../middleware/auth');
  
router.get('/news', Auth.verifyToken ,function (req, res) {
  newsController.news(req, res);
});

module.exports = router;
