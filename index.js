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
  var speech =
    req.body.queryResult &&
      req.body.queryResult.parameters &&
      req.body.queryResult.parameters.height &&
      req.body.queryResult.parameters.weight
      ? JSON.stringify(req.body)
      : "try again.";
  return res.json({
    fulfillmentMessages: [{ 
      "quickReplies": { 
        "title": "รอสักครู่นะค่ะ ส่วนสูง 168 น้ำหนัก 60 จะอ้วนหรือผอมดีนะ?", 
        "quickReplies": ["อ้วน", "หุ่นดี"] 
      }, 
      "platform": "LINE" 
    }, 
    { "text": { "text": ["5555555"] } }],
    source: "webhook-echo-sample"
  });
});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
