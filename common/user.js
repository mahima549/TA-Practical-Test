"use strict";
var jwt = require("jsonwebtoken");
var TokenKey = process.env.tokenkey;
var bcrypt = require("bcrypt");
var ObjectId = require('mongodb').ObjectID;

const User = require("../models/tbluser");

function loginUser(objUser, callback) {
    objUser.password = objUser.password.trim();
    User.aggregate([{
        $match: {
            email: objUser.email.trim()
        }
    }]).then(function (response) {
        if (response != null && response.length > 0) {
            let Token;
            var passwordIsValid = bcrypt.compareSync(objUser.password, response[0].password);
            if (passwordIsValid == true) {
                jwt.sign({ _id: response[0]._id, username: response[0].username, roleid: response[0].roleid, phone: response[0].phone }, TokenKey, { expiresIn: 86400 * 365 * 5 }, (err, token) => {
                    Token = "bearer " + token;
                    if (Token == null || Token == '' || Token == undefined) {
                        return callback({
                            msg: "Something went wrong please try again later."
                        }, 500);
                    } else {
                        User.findOneAndUpdate({ _id: ObjectId(response[0]._id) }, { $set: { token: Token } }, { new: true }).then(function (updatedUserData) {
                            let newUserObject = updatedUserData.toObject();
                            delete newUserObject.password;
                            delete newUserObject._id;
                            return callback({
                                data: newUserObject
                            }, 200);
                        }).catch(function (err) {
                            return callback({
                                msg: err.message
                            }, 500);
                        });
                    }
                });
            } else {
                return callback({
                    msg: "Invalid Password!!",
                }, 422);
            }
        } else {
            return callback({
                msg: "Invalid Username!!",
            }, 422);
        }
    }).catch(function (err) {
        return callback({
            msg: err.message,
        }, 500);
    });
}


module.exports = {
    loginUser: loginUser
}