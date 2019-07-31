var db = require('../database/models/index');
var Client = db.client;
var Organization = db.organization;
let SubscriberPlan = db.subscriberPlan;
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var configAuth = require('../config');
var web3Handler = require('../web3Handler/ropstenHandler');
const mailer = require("../mailer/impl");
let Promise = require('bluebird');
var moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
module.exports = {
  userOnboarding: (req, res) => {
    var email = req.body.email;
    console.log(email);
    try {
      Client.findOne({
        where: {
          email: req.body.email
        }
      }).then(client => {
        if (client && client.emailVerified) {
          res.status(200).send({
            "status": "User already exists"
          });
        } else if (client && !client.emailVerified) {
          module.exports.resendOTPNewClient(email)
            .then(createdClient => {
              mailer.sendConfirmationOTP(createdClient.email, createdClient.verificationOTP);
              res.status(200).send({
                "status": "Onboarded User",
                "otp": "true"
              });
            });
        } else {
          module.exports.onboardNewClient(email)
            .then(createdClient => {
              mailer.sendConfirmationOTP(createdClient.email, createdClient.verificationOTP);
              res.status(200).send({
                "status": "Onboarded User",
                "otp": "true"
              });
            });
        }
      });
    } catch (error) {
      // handle the error safely
      console.log(error)
      res.status(402).send({
        message: "error occured! please try again after some time"
      })
    }
  },

  verifyOTP: (req, res) => {
    try {
      Client.findOne({
        where: {
          email: req.body.email
        }
      }).then(client => {
        if (client.verificationOTP == req.body.otp) {
          res.status(200).send({
            "status": "true"
          });
          client.verificationOTP = null;
          client.save().then((err, res) => {
            // console.log(err, res);
          })
        } else {
          res.status(200).send({
            "status": "false"
          });
        }
      });
    } catch (err) {
      // handle the error safely
      console.log(err)
      res.status(402).send({
        message: "error occured! please try again after some time"
      })
    }
  },

  userRegistration: (req, res) => {
    try {
      Client.findOne({
          [Op.or]: [{  email: req.body.email}, {  phoneNumber:req.body.phoneNumber}]
      }).then(client => {
        if (client && client.emailVerified ) {
          if (client.phoneNumber === req.body.phoneNumber) {
            res.status(402).send({
              "message": "Phone number already exists."
            });
          }else {
            res.status(402).send({
              "message": "User already exists."
            });
          }
        } else {

          Promise.all([module.exports.createNewOrganization(req), module.exports.createNewClient(req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.phoneNumber), web3Handler.generateEthAddress(), web3Handler.generateEthAddress()])
            .then(([createdOrganization, createdClient, createdUserEthAddress, createdOrgEthAddress]) => {
              createdOrganization.addClient(createdClient);
              createdOrganization.setUserCurrencyAddress(createdOrgEthAddress);
              createdClient.setUserCurrencyAddress(createdUserEthAddress);
              res.status(200).send({
                "message": "New User"
              });
              web3Handler.etherFaucet(createdUserEthAddress.address, 500000000000000000).then((receipt) => {
                web3Handler.addNewOrganization(createdOrganization.uniqueId, createdOrgEthAddress.address, createdOrganization, createdClient.uniqueId, createdUserEthAddress.address, {
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  email: req.body.email
                }).then((receipt) => {
                  web3Handler.etherFaucet(createdOrgEthAddress.address, 500000000000000000).then((receipt) => {})
                })
              })
            }).catch((err)=>{
              console.log(err.errors[0].message);
              res.status(402).send({message: "Compnay name already exists."})
            });
        }
      });
    } catch (err) {
      // handle the error safely
      console.log(err)
      res.status(402).send({
        message: "error occured! please try again after some time"
      })
    }
  },

  invitedUserInfo: (req, res) => {
    try {
      Client.findOne({
        where: {
          email: req.body.email
        }
      }).then(client => {
        client.getOrganization().then(organization => {
          res.status(200).send({
            organization: organization
          });
        })
      });
    } catch (err) {
      // handle the error safely
      console.log(err)
      res.status(402).send({
        message: "error occured! please try again after some time"
      })
    }
  },

  inviteUserRegistration: (req, res) => {
    try {
      Client.findOne({
        where: {
          email: req.body.email
        }
      }).then(client => {
        if (client) {
          client.getOrganization().then(organization => {
            Client.findOne({
              where: {
                organization_id: organization.uniqueId,
                role: "0"
              }
            }).then(admin => {
              admin.getUserCurrencyAddress().then(adminAddress => {
                client.password = generateHash(req.body.password);
                client.firstName = req.body.firstName;
                client.lastName = req.body.lastName;
                client.save().then(async client => {
                  let createdEthAddress = await web3Handler.generateEthAddress();
                  client.setUserCurrencyAddress(createdEthAddress);
                  organization.addClient(client);
                  web3Handler.etherFaucet(createdEthAddress.address, 500000000000000000).then((receipt) => {
                    web3Handler.addNewRegistrant(client.uniqueId, organization.uniqueId, {
                      firstName: req.body.firstName,
                      lastName: req.body.lastName,
                      email: req.body.email
                    }, client.role, createdEthAddress.address, adminAddress.address, adminAddress.privateKey)
                  })
                    res.status(200).send({
                    "status": "User registered"
                  });
                })
              })
            })
          })
        } else {
            res.status(200).send({
            "status": "Uninvited User"
          })
        }
      })
    } catch (err) {
      // handle the error safely
      console.log(err)
      res.status(402).send({
        message: "error occured! please try again after some time"
      })
    }
  },

  userLogin: (req, res) => {
    try {
      Client.findOne({
        where: {
          email: req.body.email
        }
      }).then(client => {
        if (!client) {
          res.status(400).json({
            "message": "No such user"
          });
        } else if (!bcrypt.compareSync(req.body.password, client.password)) {
          res.status(400).json({
            "message": "Wrong password"
          });
        } else {
          const token = jwt.sign({
            clientId: client.uniqueId,
          }, configAuth.jwtAuthKey.secret, {
            expiresIn: configAuth.jwtAuthKey.tokenLife
          });

            res.status(200).send({
            success: true,
            clientToken: token
          })

        }
      })
    } catch (err) {
      // handle the error safely
      console.log(err)
      res.status(402).send({
        message: "error occured! please try again after some time"
      })
    }
  },

  onboardNewClient: (email) => {
    return new Promise(async function(resolve, reject) {
      var newClient = new Object();
      // set the user's local credentials
      newClient.email = email;
      newClient.verificationOTP = Math.floor(Math.random() * 9999);
      newClient.role = '0'
      Client.create(newClient).then(client => {
        resolve(client);
      }).catch((err)=>{
      reject(err)
      });;
    });
  },

  resendOTPNewClient: (email) => {
    return new Promise(async function(resolve, reject) {
      Client.findOne({
        where: {
          email: email
        }
      }).then(client => {
        client.verificationOTP = Math.floor(1000 + Math.random() * 9000);
        client.save().then(client => {
          resolve(client);
        })
      })
    });
  },

  createNewClient: (firstName, lastName, email, password, phoneNumber) => {
    return new Promise(async function(resolve, reject) {
      Client.findOne({
        where: {
          email: email
        }
      }).then(client => {
        // set the user's local credentials
        client.firstName = firstName;
        client.lastName = lastName;
        client.phoneNumber = phoneNumber;
        client.emailVerified = true;
        client.password = generateHash(password);
        client.save().then(client => {
          resolve(client);
        }).catch((err)=>{
        reject(err)
        });;
      });
    });
  },

  createNewOrganization: (req) => {
    return new Promise(async function(resolve, reject) {
      let newOrganization = new Object();
      newOrganization.organizationName = req.body.organizationName;
      newOrganization.addressLine1 = req.body.addressLine1;
      newOrganization.addressLine2 = req.body.addressLine2;
      newOrganization.country = req.body.country;
      newOrganization.zipcode = req.body.zipcode;
      Organization.create(newOrganization).then(createdOrganization => {
        SubscriberPlan.create({
          endDate: moment().add(14, 'days'),
          type: 'Trial',
          credits: 5
        }).then(plan => {
          plan.setOrganization(createdOrganization).then(() => {
            resolve(createdOrganization);
          })
        })
      }).catch((err)=>{
      reject(err)
      });
    });
  },

  isLoggedIn: (req, res) => {
    var token = req.body.clientToken;
    // JWT enabled login strategy for end user
    jwt.verify(token, configAuth.jwtAuthKey.secret, function(err, decoded) {
      if (err) {
        console.log(err);
        return res.send({
          status: false,
          message: "please login again"
        })
      } else {
        Client.findOne({
          where: {
            uniqueId: decoded.clientId
          }
        }).then(client => {
          res.send({
            status: true
          })
        });
      }
    });
  },

  forgotPassword: (req, res) => {
    let email = req.body.email;
    Client.findOne({
      where: {
        email: email
      }
    }).then(client => {
      if (client) {
        mailer.forgotPasswordMailer(req, email, client.uniqueId);
        res.send({
          status: true,
          message: "A reset password link has been sent to your email id."
        });
      } else {
        res.send({
          status: false,
          message: "User does not exist on the system"
        })
      }

    });
  },

  resetPassword: (req, res) => {
    Client.findOne({
      where: {
        uniqueId: req.body.resetId
      }
    }).then(client => {
      client.password = generateHash(req.body.password);
      client.save().then(client => {
        res.send({
          status: true
        })
      })
    })
  }

}
