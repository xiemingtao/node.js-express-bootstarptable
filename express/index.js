var express = require("express");
var app = express();
var bodyParse = require("body-parser");

var router = require('./router/router')

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());


app.use(router)




app.listen("8084", function(err) {
  console.log("http://localhost:8084");
});
