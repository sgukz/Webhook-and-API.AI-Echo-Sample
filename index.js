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
  var temp = {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: "this is a simple response"
            }
          }
        ]
      }
    }
  };
  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.hn
      ? req.body.queryResult.parameters.hn
      : "try again";
  
  return res.json({
    payload: temp,
    data: temp,
    fulfillmentText: speech,
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
