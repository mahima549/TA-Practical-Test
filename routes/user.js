const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post('/signup', function (req, res) {
  userController.signup(req, res)
});
router.post('/login', function (req, res) {
  userController.login(req, res)
});
router.post('/logout', function (req, res) {
  userController.logout(req, res)
});

module.exports = router;
