let express = require("express");
let app = express();
let bodyParse = require("body-parser");

let router = require('./router/router')

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());


app.use(router)




app.listen("8084", (err)=> {
  console.log("http://localhost:8084");
});
