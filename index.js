
'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion, Payload } = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function rehRightsIndex(agent) {
    let height = request.body.queryResult.parameters.height / 100;
    let weight = request.body.queryResult.parameters.weight;
    let bmi = (weight / (height * height)).toFixed(2);

    let payloadJson = {

      "type": "flex",
      "altText": "ผลการลงทะเบียน",
      "contents": {
        "type": "bubble",
        "header": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "ลงทะเบียนเรียบร้อยแล้ว",
              "size": "xs",
              "weight": "bold",
              "color": "#17c950"
            }
          ]
        },
        "body": {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": bmi,
              "align": "center"
            }
          ]
        }
      }
    };
    let payload = new Payload("LINE", payloadJson, { sendAsMessage: true });
    agent.add(payload);
  }
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('REH Rights - custom - yes', rehRightsIndex);
  agent.handleRequest(intentMap);
});
