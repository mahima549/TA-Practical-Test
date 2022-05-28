

var jwt = require("jsonwebtoken");
var user = require('../common/user');
var ObjectId = require('mongodb').ObjectID;
const User = require('../models/tbluser');
var common = require("../common/common");
const message = require("../config/message");

exports.signup = async function (req, res) {
    var objUser = req.body;
    if (objUser.email == null || objUser.email == undefined || objUser.email == "" ||
        objUser.password == null || objUser.password == "" || objUser.password == undefined ||
        objUser.name == null || objUser.name == "" || objUser.name == undefined) {
        res.status(422).json(message.message.EMAIL_PASSWORD_REQUIRED);
    } else {
        User.aggregate([{
            $match: {
                email: objUser.email.trim()
            }
        }]).then(function (response) {
            if (response != null && response.length > 0) {
                res.status(422).json(message.message.EMAIL_DUPLICATE);
            } else {
                if (objUser.password != null && objUser.password != undefined && objUser.password != "") {
                    objUser.password = objUser.password.trim();
                }
                if (objUser.email != null && objUser.email != undefined && objUser.email != "") {
                    objUser.email = objUser.email.trim();
                }
                
            
                common.GenerateUserId(function (resusername) {
                    objUser.username = resusername;
                    User.create(objUser).then(async function (resCreate) {
                        if (resCreate != null) {
                            let Token;
                            jwt.sign({ _id: resCreate._id, username: resCreate.username, phone: resCreate.phone }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE }, (err, token) => {
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
};

exports.login = function (req, res) {
    var objParam = req.body;
    if (objParam.email == null || objParam.email == undefined || objParam.email == "" ||
        objParam.password == null || objParam.password == "" || objParam.password == undefined) {
        res.status(422).json(message.message.EMAIL_PASSWORD_REQUIRED);
    }
    else {
        user.loginUser(objParam, function (response, code) {
            res.status(code).json(response);
        });
    }
};

exports.logout = async function (req, res) {
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
};