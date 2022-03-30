// Expressjs package 
const express = require("express");
const app = express();

// Other packages
const hbs = require("hbs");
const path = require("path");
require("dotenv").config();
const flash = require("connect-flash");
const session = require("express-session");

//Middlewares
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.use(express.static("public"));
app.set("view engine", "hbs");
app.set("views", "views");
app.use(flash());

app.use(
  session({
    secret: process.env.SECRET_TOKEN,
    cookie: { maxAge: 60000 },
  })
);

//Routes
var patientRoute = require("./routes/patient");
var doctorRoute = require("./routes/doctor");

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(patientRoute);
app.use(doctorRoute);

//Methods
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/views", "mainpage.html"));
});

app.get("/doctors", function (req, res) {
  res.sendFile(path.join(__dirname, "/views", "doctors.html"));
});
app.get("/patients", function (req, res) {
  res.sendFile(path.join(__dirname, "/views", "patients.html"));
});

// URL port
const port =  8080;

app.listen(port, function () {
  console.log("Web application is running on port: " + port);
});
