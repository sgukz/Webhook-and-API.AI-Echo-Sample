"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/webhook", function (req, res) {
  let height = req.body.queryResult.parameters.height/100;
  let weight = req.body.queryResult.parameters.weight;
  let bmi = (weight/ (height * height)).toFixed(2);

  return res.json({
    fulfillmentText: JSON.stringify(req.body),
    source: "line"
  });
});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
