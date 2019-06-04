"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion, Payload } = require('dialogflow-fulfillment');
const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/webhook", function (req, res) {
  const agent = new WebhookClient({ req, res });
  var speech =
    req.body.queryResult &&
      req.body.queryResult.parameters &&
      req.body.queryResult.parameters.height &&
      req.body.queryResult.parameters.weight
      ? JSON.stringify(req.body)
      : "try again.";
  return res.json({
    payload: speech,
    source: "webhook-echo-sample"
  });
});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
