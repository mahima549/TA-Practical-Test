const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
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
tbluserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 5);
});

var tbluser = mongoose.model("tbluser", tbluserSchema);
module.exports = tbluser;
