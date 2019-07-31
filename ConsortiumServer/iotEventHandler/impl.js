var mqtt = require('mqtt')
// var client  = mqtt.connect('mqtt://54.86.57.110', {
//   port: 1883
// })
// var CryptoJS = require("crypto-js");
//
// var AESKey = '2B7E151628AED2A6ABF7158809CF4F3C';
//
// client.on('connect', function () {
//   client.subscribe('boo', function (err) {
//     if (!err) {
//       console.log("Subscribed");
//     }
//   })
// })
//
// let eventMessage, decryptedMessage;
var db = require('../database/models/index');
var IotEvent= db.iotEvents;
// client.on('message', function (topic, message) {
//   // console.log("HEre's my topic", topic, message.toString());
//   eventMessage = message.toString().split(';');
//  var esp8266_msg = eventMessage[1];
//  var esp8266_iv = eventMessage[0];
//  var plain_iv =  new Buffer( esp8266_iv , 'base64').toString('hex');
//  var iv = CryptoJS.enc.Hex.parse( plain_iv );
//  var key= CryptoJS.enc.Hex.parse( AESKey );
//  var bytes  = CryptoJS.AES.decrypt( esp8266_msg, key , { iv: iv} );
//  var plaintext = bytes.toString(CryptoJS.enc.Base64);
//  var decoded_b64msg = new Buffer(plaintext , 'base64').toString('ascii');
//  var decoded_msg = new Buffer( decoded_b64msg , 'base64').toString('ascii');
//  console.log("Decryptedage: ", decoded_msg);
//   decryptedMessage = decoded_msg.toString().split(';');
//   let splitMessage=[]
//   for(let i=0; i<decryptedMessage.length; i++){
//     let newMessage = new Object();
//     newMessage.message= decryptedMessage[i].split(':')[1];
//     newMessage.eventType = decryptedMessage[i].split(':')[0];
//     splitMessage.push(newMessage);
//   }
//   console.log(splitMessage);
//   IotEvent.bulkCreate(splitMessage).then(()=> {
//
//   })
//
//
// })

module.exports = {
  getEvents: (req, res) => {
    IotEvent.findAll().then(events => {
      res.send(events);
    })
  },

  getTemperatureEvents: (req, res) => {
    IotEvent.findAll({
      where: {
        eventType: 'temperature'
      }
    }).then(events => {
      res.send(events);
    })
  },

  getLocation: (req, res) => {
    let latitude, longitude;
    IotEvent.findOne({
      where: {
        eventType: 'Latitude'
      }
    }).then(event => {
      latitude= event.message;
      IotEvent.findOne({
        where: {
          eventType: 'Longitude'
        }
      }).then(result => {
        longitude = result.message;
        res.send({latitude: latitude, longitude: longitude});
      })
    })
  }
}
