require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var ApiPort = process.env.apiport;
var mongouri = process.env.mongouri;
var mongoose = require("mongoose");

// mongoose.set('debug', true);
app.use(
    bodyParser.json({
        limit: "100mb",
    })
);
app.use(
    bodyParser.urlencoded({
        extended: false,
        limit: "100mb",
    })
);

app.use(function (req, res, next) {
    var oneof = false;
    if (req.headers.origin) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        oneof = true;
    }
    if (req.headers["access-control-request-method"]) {
        res.header(
            "Access-Control-Allow-Methods",
            req.headers["access-control-request-method"]
        );
        oneof = true;
    }
    if (req.headers["access-control-request-headers"]) {
        res.header(
            "Access-Control-Allow-Headers",
            req.headers["access-control-request-headers"]
        );
        oneof = true;
    }
    if (oneof && req.method == "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});

mongoose.connection.on("error", function (err) {
    console.log("database connection error");
    console.log(err);
    console.error(err, "mongoose connection on error handler", 10);
});

mongoose.connection.on("open", function (err) {
    if (err) {
        console.log("database error");
        console.log(err);
        console.error(err, "mongoose connection open handler", 10);
    } else {
        console.log("database connection open success");
    }
});

var http = require("http").Server(app);

app.use("/user", require("./controllers/user"));
app.use("/news", require("./controllers/news"));
app.use("/weather", require("./controllers/weather"));

mongoose.connect(mongouri, {
    useNewUrlParser: true, 
    useCreateIndex: true 
})

http.listen(ApiPort, function () {
    console.log("listening on *:" + ApiPort);
});
module.exports = app