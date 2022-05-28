"use strict";

/**
 * Configuration file where you can store codes for responses
 *
 * It's just a storage where you can define your custom API errors and their description.
 */


module.exports = {
  message: {
    BAD_REQUEST: {
      code: "E_BAD_REQUEST",
      message: "The request cannot be fulfilled due to bad syntax",
      status: 400,
    },
    EMAIL_REQUIRED: {
      message: "Email Id is required.",
      code: "UNPROCESSABLE_ENTITY",
      status: 422,
    },
    EMAIL_INVALID: {
      message: "Email Id is invalid.",
      code: "UNPROCESSABLE_ENTITY",
      status: 422,
    },
    PASSWORD_INVALID: {
      message: "Password is invalid.",
      code: "UNPROCESSABLE_ENTITY",
      status: 422,
    },
    EMAIL_PASSWORD_REQUIRED: {
      message: "Email Id and password is required.",
      code: "UNPROCESSABLE_ENTITY",
      status: 422,
    },
    EMAIL_DUPLICATE: {
      message: "Email Id already exists.",
      code: "UNPROCESSABLE_ENTITY",
      status: 422,
    },
    OK: {
      code: "OK",
      message: "Operation is successfully executed",
      status: 200,
    },
    LOGOUT: {
      code: "OK",
      message: "Successfully logout.",
      status: 200,
    },
    
    SERVER_ERROR: {
      code: "E_INTERNAL_SERVER_ERROR",
      message: "Something bad happened on the server",
      status: 500,
    },
    UNAUTHORIZED: {
      code: "E_UNAUTHORIZED",
      message: "Missing or invalid authentication token",
      status: 401,
    },
    USER_REGISTERED: {
      code: "OK",
      message: "You have registered successfully.",
      status: 200,
    },
    LOGIN: {
      code: "OK",
      message: "Successfully login.",
      status: 200
    } 
  },
};
