"use strict";

const User = require("../models/tbluser");


var GenerateUserId = function (callback) {
    var username = Math.floor(10000000 + Math.random() * 90000000).toString();
    User.findOne({
        username: username,
    }).then(function (objUserExist) {
        if (objUserExist != null) {
            return GenerateUserId(function () { });
        } else {
            return callback(username);
        }
    });
};

module.exports = {
    GenerateUserId: GenerateUserId
}