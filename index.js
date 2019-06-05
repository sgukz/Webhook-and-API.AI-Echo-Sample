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
  let height = req.body.queryResult.parameters.height / 100;
  let weight = req.body.queryResult.parameters.weight;
  let bmi = (weight / (height * height)).toFixed(2);
  let standard = "";
  if(bmi < 18.50){
    standard = "น้ำหนักน้อย / ผอม";
  }else if(bmi >= 18.50 && bmi < 23){
    standard = "ปกติ (สุขภาพดี)";
  }else if(bmi >= 23 && bmi < 25){
    standard = "ท้วม / โรคอ้วนระดับ 1";
  }else if(bmi >= 25 && bmi < 30){
    standard = "อ้วน / โรคอ้วนระดับ 2";
  }else if(bmi >= 30){
    standard = "อ้วนมาก / โรคอ้วนระดับ 3";
  }
  return res.json({
    //fulfillmentText: JSON.stringify(req.body),
    fulfillmentMessages: [{
      "payload": {
        "line": {
          "type": "flex",
          "altText": "ค่าดัชนีมวลกาย (BMI)",
          "contents": {
            "type": "bubble",
            "styles": {
              "header": {
                "backgroundColor": "#1e81e7"
              }
            },
            "header": {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "text",
                  "text": " ค่าดัชนีมวลกาย (BMI)",
                  "weight": "bold",
                  "size": "md",
                  "gravity": "top",
                  "color": "#FFFFFF",
                  "flex": 0
                }
              ]
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": bmi,
                  "weight": "bold",
                  "size": "xl"
                },
                {
                  "type": "text",
                  "text": standard
                }
              ]
            }
          }
        }
      },
      "platform": "LINE"
    }],
    source: "line"
  });
});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
