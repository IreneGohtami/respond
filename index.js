'use strict';

require('dotenv').config();

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json());

const { handleMessage } = require('./message');
const { findDuplicateTransaction } = require('./duplicate_transaction');

// Sets server port and logs message on success
app.listen(process.env.PORT || 3000, () => console.log('App started'));

// Webhook verification endpoint
app.get('/webhook', (req, res) => {
  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
      
      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});

// Process message endpoint
app.post('/webhook', (req, res) => {
  // Parse the request body from the POST
  const body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(async function(entry) {
      const event = entry.messaging[0];
      console.log(event);
      
      // Get the sender PSID
      let senderPsid = event.sender.id;
      
      if (event.message) {
        await handleMessage(senderPsid, event.message);
      }
      else if (event.postback) {
        handlePostback(senderPsid, event.postback);
      }      
    });

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

// Find duplicate transaction
app.post('/duplicate-transaction', (req, res) => {
  const transactions = req.body;
  const result = findDuplicateTransaction(transactions);

  res.status(200).send(result);
});