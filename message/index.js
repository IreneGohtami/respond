'use strict';

const axios = require('axios');
const fs = require('fs');
const JSONStream = require('JSONStream');
const sgMail = require('@sendgrid/mail');

const { customerGreetings, systemGreetings, queryKeywords } = require('./template');

const FB_API_URL = 'https://graph.facebook.com/v2.6/me/messages';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Process incoming message
async function handleMessage(senderPsid, receivedMessage) {
  let response = { text: '' };

  // Checks if the message contains text
  if (receivedMessage.text) {
    const text = receivedMessage.text.toLowerCase().trim();

    if (customerGreetings.includes(text)) {
      // Reply with custom greeting
      response.text = systemGreetings[Math.floor(Math.random()*systemGreetings.length)];
      await replyMessage(senderPsid, response);

    } else {
      const query = text.split(' ');
      if (query.length >= 2) {
        const keyword = query[0];
        const sku = query[1];

        if (queryKeywords.includes(keyword)) {
          const readStream = fs.createReadStream('data/products.json', { encoding: 'utf8' });
          const parseStream = JSONStream.parse('*');
          
          parseStream.on('data', async function(product) {
            if (product.sku == sku) {
              switch(keyword) {
                case '/desc':
                  response.text = product.description;
                  break;
                case '/price':
                  response.text = product.price;
                  break;
                case '/shipping':
                  response.text = product.shipping;
                  break;
                case '/buy':
                  response.text = `We got your request! Hang tight while we process your order for: "${product.name}"`;
                  await sendEmail(product);
                  break;
                default:
                  response.text = 'Unkown query';
                  break;
              }
              // End parsing file & send the response message
              parseStream.end();
              await replyMessage(senderPsid, response);
            }
          })
          .on('end', function () {
            console.log('All the data in the file has been read');
          })
          .on('close', function () {
            console.log('Stream has been destroyed and file has been closed');
          });

          readStream.pipe(parseStream);
        }
      }
    }
  }
}

async function replyMessage(senderPsid, response) {
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

  // Construct the message body
  const requestBody = {
    recipient: {
      id: senderPsid
    },
    message: response
  };

  // Send the HTTP request to the messenger platform
  try {
    await axios.post(`${FB_API_URL}?access_token=${PAGE_ACCESS_TOKEN}`, requestBody);
    console.log('Message sent!');
  } catch (error) {
    console.log('Unable to send message: ' + JSON.stringify(error));
  }
}

async function sendEmail(product) {
  const msg = {
    to: process.env.SENDGRID_EMAIL_TO,
    from: 'irene@xendit.co',
    templateId: 'd-64bb7caf4d17473998c1331d5b80e379',
    dynamicTemplateData: product
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent!');
  } catch (error) {
    console.log('Unable to send email: ' + JSON.stringify(error));
  }
}

module.exports = {
  handleMessage
};