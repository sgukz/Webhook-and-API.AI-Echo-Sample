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
      //? "ส่วนสูง : "+req.body.queryResult.parameters.height +"\nน้ำหนัก: "+req.body.queryResult.parameters.weight
      ? JSON.stringify(req.body)
      : "try again.";

  return res.json({
    fulfillmentText: speech,
    source: "line"
  });
  // return res.json({
  //   fulfillmentMessages: [{ 
  //     "type": "text",
  //     "text": speech, 
  //     "platform": "LINE" 
  //   }],
  //   source: "line"
  // });
});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
