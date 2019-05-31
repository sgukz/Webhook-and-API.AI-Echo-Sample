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

restService.post("/webhook", function(req, res) {
  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.hn
      ? req.body.queryResult
      : "try again";
  
  return res.json({
    fulfillmentText: speech,
    /*fulfillmentMessages: [
      "line" {
        {
          "type": "text",
          "text": "Hello Bot"
        }
      }
    ],*/
    source: "webhook-echo-sample"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
