"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const restService = express();
const { Payload } = require('dialogflow-fulfillment');

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
  let payloadJson = {
    "type": "text",
    "text": "Hello Bot"
  }
  let payload = new Payload("LINE", payloadJson, {sendAsMessage:true});
  return res.json({
    payload: payload,
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
