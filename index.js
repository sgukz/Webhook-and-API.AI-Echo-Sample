"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
//const request = require("request");

const restService = express("");

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/webhook", function (req, res) {
  const toTwoDigits = num => (num < 10 ? "0" + num : num);
  let today = new Date();
  let year = today.getFullYear();
  let year_TH = parseInt(today.getFullYear()) + 543;
  let month = toTwoDigits(today.getMonth() + 1);
  let day = toTwoDigits(today.getDate());
  let ToDay = today.getDate();
  let date_now = `${year}-${month}-${day}`;
  
  if (req.body.queryResult.parameters.height && req.body.queryResult.parameters.weight) {
    let height = req.body.queryResult.parameters.height / 100;
    let height1 = req.body.queryResult.parameters.height;
    let weight = req.body.queryResult.parameters.weight;
    let bmi = (weight / (height * height)).toFixed(2);
    let standard = "";
    let color = "";
    if (bmi < 18.50) {
      standard = "น้ำหนักน้อย / ผอม";
      color = "#f8c471";
    } else if (bmi >= 18.50 && bmi < 23) {
      standard = "ปกติ (สุขภาพดี)";
      color = "#2ecc71";
    } else if (bmi >= 23 && bmi < 25) {
      standard = "ท้วม / โรคอ้วนระดับ 1";
      color = "#ec7063";
    } else if (bmi >= 25 && bmi < 30) {
      standard = "อ้วน / โรคอ้วนระดับ 2";
      color = "#e74c3c";
    } else if (bmi >= 30) {
      standard = "อ้วนมาก / โรคอ้วนระดับ 3";
      color = "#cb4335";
    } else if (bmi == 0.00) {
      standard = "ระบุข้อมูลไม่สมบูรณ์";
      color = "#cb4335";
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
                    "text": "ส่วนสูง " + height1 + " น้ำหนัก " + weight,
                    "weight": "bold",
                    "size": "xs"
                  },
                  {
                    "type": "text",
                    "text": bmi,
                    "weight": "bold",
                    "size": "xl"
                  },
                  {
                    "type": "text",
                    "text": standard,
                    "color": color
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
  } else {

    axios
    .post("http://192.168.99.181:9000/comcenter/getDuty", {
      dateStart: date_now
    })
    .then(res => {
      let result = ""
      let data = res.data;
      result = data[0].name;
      return res.json({
        fulfillmentText: result,
        //fulfillmentText: JSON.stringify(req.body),
        //fulfillmentText: JSON.stringify(req.body),
        source: "line"
      });
    })
    .catch(error => console.log("Error :", error));
  }
});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
