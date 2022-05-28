"use strict";
var jwt = require('jsonwebtoken');
var ObjectId = require("mongodb").ObjectID;

const User = require("../models/tbluser");

const message = require("../config/message");
var verifyToken = function (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
            if (err) {
                res.status(401).json(message.message.UNAUTHORIZED);
            } else {
                User.findOne({ _id: ObjectId(authData._id) }).then(function (userData) {
                    if (userData.token == bearerHeader) {
                        req.userData = authData;
                        next();
                    } else {

                        res.status(401).json(message.message.UNAUTHORIZED);
                    }
                }).catch(function () {
                    res.status(500).json(message.message.SERVER_ERROR);
                });
            }
        });
    } else {
        res.status(401).json(message.message.UNAUTHORIZED);
    }
};
module.exports = {
    verifyToken: verifyToken
}