const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const schemaOptions = {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "last_updated",
  },
  versionKey: false,
};

let tbluserSchema = new Schema(
  {
    username: {
      type: String,
      default: "",
      required: true
    },
    password: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
      required: true
    },
    token: {
      type: String,
      default: ""
    },
  },
  schemaOptions
);

var tbluser = mongoose.model("tbluser", tbluserSchema);
module.exports = tbluser;
