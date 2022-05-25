
var express = require('express');
var jwt = require("jsonwebtoken");
var router = express.Router();
var user = require('../common/user');
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;
var jsonParser = bodyParser.json();
const User = require('../models/tbluser');
var bcrypt = require("bcrypt");
var common = require("../common/common");
const message = require("../config/message");
var TokenKey = process.env.tokenkey;

router.post("/signup", jsonParser, async function (req, res) {
    var objUser = req.body;
    if (objUser.email == null || objUser.email == undefined || objUser.email == "" ||
        objUser.password == null || objUser.password == "" || objUser.password == undefined ||
        objUser.name == null || objUser.name == "" || objUser.name == undefined) {
        res.status(422).json({
            msg: "Email, name and password can't be null",
        });
    } else {
        User.aggregate([{
            $match: {
                email: objUser.email.trim()
            }
        }]).then(function (response) {
            if (response != null && response.length > 0) {
                res.status(422).json({ msg: "Email Id already exists !!", });
            } else {
                if (objUser.password != null && objUser.password != undefined && objUser.password != "") {
                    objUser.password = objUser.password.trim();
                }
                if (objUser.email != null && objUser.email != undefined && objUser.email != "") {
                    objUser.email = objUser.email.trim();
                }
                
                objUser.encryptPassword = bcrypt.hashSync(objUser.password, 5);
                objUser.password = objUser.encryptPassword;
            
                common.GenerateUserId(function (resusername) {
                    objUser.username = resusername;
                    User.create(objUser).then(async function (resCreate) {
                        if (resCreate != null) {
                            let Token;
                            jwt.sign({ _id: resCreate._id, username: resCreate.username, phone: resCreate.phone }, TokenKey, { expiresIn: 86400 * 365 * 5 }, (err, token) => {
                                Token = "bearer " + token;
                                if (Token) {
                                    User.findOneAndUpdate({ _id: ObjectId(resCreate._id) }, { $set: { token: Token } }, { new: true }).then(function (updatedUserData) {
                                        let newUserObject = updatedUserData.toObject();
                                        delete newUserObject.password;
                                        delete newUserObject._id;
                                        let resp = message.message.OK;
                                        resp.data = newUserObject;
                                        res.status(200).json(resp);
                                    }).catch(function () {
                                        res.status(500).json(message.message.SERVER_ERROR);
                                    });
                                }
                            });
                        }
                        else {
                            res.status(500).json(message.message.SERVER_ERROR);
                        }
                    }).catch(function () {
                        res.status(500).json(message.message.SERVER_ERROR);
                    });
                });
            }
        })
    }
});

router.post("/login", jsonParser, function (req, res) {
    var objParam = req.body;
    if (objParam.email == null || objParam.email == undefined || objParam.email == "" ||
        objParam.password == null || objParam.password == "" || objParam.password == undefined) {
        res.status(422).json(message.message.EMAIL_PASSWORD_REQUIRED);
    }
    else {
        user.loginUser(objParam, function (response, code) {
            let resp = message.message.LOGIN;
            resp.data = response;
            res.status(code).json(resp);
        });
    }
});

router.post("/logout", jsonParser, function (req, res) {
    var objParam = req.body;
    if (objParam.email == null || objParam.email == undefined || objParam.email == "") {
        res.status(422).json(message.message.EMAIL_REQUIRED);
    }
    else {
        User.findOneAndUpdate({ email: objParam.email }, { $set: { token: null } }, { new: true }).then(function () {
            res.status(200).json(message.message.LOGOUT);
        }).catch(function () {
            res.status(500).json(message.message.SERVER_ERROR);
        });
    }
});

module.exports = router;