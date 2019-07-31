var db = require('../database/models/index');
var Client = db.client;
var Project = db.project;
var Device = db.device;
var Thing = db.thing;
var UserCurrencyAddress = db.userCurrencyAddress;
const mailer = require("../mailer/impl");
const userOnboarding = require("../userOnboarding/impl");
const contractHandler = require('../contractHandler/impl');
const web3Handler = require('../web3Handler/ropstenHandler');

module.exports = {
  thingList: (req, res) => {
    try {
      req.client.getOrganization().then(organization => {
        organization.getThings().then(things => {
          res.status(200).send(things);
        });
      });
    } catch (err) {
      // handle the error safely
      console.log(err)
      res.status(402).send({
        message: "error occured! please try again after some time"
      })
    }
  },

  getThingInfo: (req, res) => {
    try {
      Thing.findOne({
        where: {
          uniqueId: req.body.thingID
        }
      }).then(thing => {
        res.status(200).send({
          thing: thing
        });
      })
    } catch (err) {
      // handle the error safely
      console.log(err)
      res.status(402).send({
        message: "error occured! please try again after some time"
      })
    }
  },

  assignDevice: (req, res) => {
    try {
      Thing.findOne({
        where: {
          uniqueId: req.body.thingID
        }
      }).then(thing => {
        Device.findOne({
          where: {
            uniqueId: req.body.deviceID
          }
        }).then(device => {
          Project.findOne({
            where: {
              name: device.project_id
            }
          }).then(project => {
            UserCurrencyAddress.findOne({
              where: {
                client_id: req.client.uniqueId
              }
            }).then(address => {
              let newThing = new Object();
              newThing.name = thing.name;
              newThing.description = thing.description;
              newThing.brand = thing.brand;
              newThing.uri = thing.uri;
              web3Handler.addThing(address.address, address.privateKey, project.tokenContractAddress, JSON.stringify(newThing), device.urn).then(receipt => {
                device.associationStatus = true;
                device.thingURN = newThing;
                thing.associationStatus = true;
                device.save().then(dev => {
                  thing.save().then(thing => {
                    res.status(200).send({
                      receipt: receipt,
                      status: true
                    })
                  })
                })
              });
            })
          })
        })
      })
    } catch (err) {
      // handle the error safely
      console.log(err)
      res.status(402).send({
        message: "error occured! please try again after some time"
      })
    }
  }
}
