"use strict";
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var ObjectId = require('mongodb').ObjectID;
const message = require("../config/message");

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
                jwt.sign({ _id: response[0]._id, username: response[0].username, phone: response[0].phone }, process.env.SECRET_KEY, { expiresIn:process.env.JWT_EXPIRE}, (err, token) => {
                    Token = "bearer " + token;
                    if (Token == null || Token == '' || Token == undefined) {

                        return callback(message.message.SERVER_ERROR,500);
                    } else {
                        User.findOneAndUpdate({ _id: ObjectId(response[0]._id) }, { $set: { token: Token } }, { returnOriginal:false }).then(function (updatedUserData) {
                            let newUserObject = updatedUserData.toObject();
                            delete newUserObject.password;
                            delete newUserObject._id;
                            let resp = message.message.LOGIN;
                            resp.data = newUserObject;
                            return callback(resp,200);
                        }).catch(function () {
                        return callback(message.message.SERVER_ERROR,500);
                        });
                    }
                });
            } else {
                return callback(message.message.PASSWORD_INVALID,422);
            }
        } else {
            return callback(message.message.EMAIL_INVALID,422);
        }
    }).catch(function () {
        
        return callback(message.message.SERVER_ERROR,500);
    });
}


module.exports = {
    loginUser: loginUser
}