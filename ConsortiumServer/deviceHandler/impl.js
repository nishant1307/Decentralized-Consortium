var db = require('../database/models/index');
const web3Handler = require('../web3Handler/ropstenHandler');
var Device = db.device;
let Project = db.project;
module.exports = {
  addNewDevice: (deviceURN, transactionHash) => {
    Device.create({
      urn: deviceURN,
      transactionHash: transactionHash
    })
  },

  deviceList: (req, res) => {
    try {
      req.client.getOrganization().then(organization => {
        organization.getProjects({
          attributes: [],
          include: [{
            model: Device,
            attributes: ['uniqueId', 'project_id', 'urn', 'tokenId', 'associationStatus', 'transactionHash']
          }]
        }).then(projects => {
          let deviceList = [];
          projects.forEach(project => {
            project.dataValues.devices.forEach(device => {
              deviceList.push(device.dataValues)
            })
          })
          res.status(200).send(deviceList)
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

  unassignedDeviceList: (req, res) => {
    try {
      req.client.getOrganization().then(organization => {
        organization.getProjects({
          attributes: [],
          include: [{
            model: Device,
            attributes: ['uniqueId', 'urn', 'associationStatus'],
            where: {
              associationStatus: false
            }
          }]
        }).then(projects => {
          let deviceList = [];
          projects.forEach(project => {
            project.dataValues.devices.forEach(device => {
              deviceList.push(device.dataValues)
            })
          })
          res.status(200).send({
            deviceList: deviceList
          })
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

  getDeviceInfo: (req, res) => {
    try {
      Device.findOne({
        where: {
          uniqueId: req.body.deviceID
        }
      }).then(device => {
        res.status(200).send({
          device: device
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

  getDeviceOwner: (req, res) => {
    try {
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
          web3Handler.getDeviceOwner(project.tokenContractAddress, device.urn)
            .then(owner => {
              res.status(200).send({
                owner: owner
              })
            })
            .catch(err => {
              res.status(400).send(err)
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
  },

  transferOwnership: (req, res) => {
    try {
      Device.findOne({
        where: {
          uniqueId: req.body.deviceID
        }
      }).then(device => {
        Project.findOne({
          where: {
            name: device.project_id
          },
          attributes: ['tokenContractAddress']
        }).then(project => {
          req.client.getUserCurrencyAddress({
            attributes: ['address', 'privateKey']
          }).then(address => {
            web3Handler.transferOwnership(address.privateKey, project.tokenContractAddress, device.urn, address.address, req.body.transferAddress)
              .then(receipt => {
                res.status(200).send({
                  receipt: receipt
                })
              })
              .catch((error) => {
                res.status(402).send({
                  error: error
                })
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
  },

  scanDeviceInfo: (req, res) => {
    try {
      Device.findOne({
        where: {
          urn: req.body.deviceURN
        }
      }).then(device => {
        Project.findOne({
          where: {
            name: device.project_id
          }
        }).then(project => {
          web3Handler.getDeviceInfoFromDeviceURN(project.tokenContractAddress, req.body.deviceURN).then(info => {
            res.status(200).send(info)
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
