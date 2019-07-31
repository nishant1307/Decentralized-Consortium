const web3Handler = require("../web3Handler/ropstenHandler");
var db = require("../database/models/index");
var Project = db.project;
var Device = db.device;

module.exports = {
  getProjectsFromOrganizationName: (req, res) => {
    try {
      web3Handler
        .getProjectsFromOrganizationName(req.body.organizationName)
        .then(projects => {
          let projectList = [];
          for (let i = 0; i < projects.length; i++) {
            let projectJson = new Object();
            projectJson.contractAddress = projects[i][0];
            projectJson.name = projects[i][1];
            projectJson.description = projects[i][2];
            projectJson.organizationName = projects[i][3];
            projectList.push(projectJson);
          }
          res.status(200).send({
            projectList: projectList
          });
        });
    } catch (err) {
      // handle the error safely
      console.log(err);
      res.status(400).send({
        message: "error occured! please try again after some time"
      });
    }
  },

  getAllProjects: (req, res) => {
    try {
      web3Handler.getAllProjects().then(projects => {
        let projectList = [];
        for (let i = 0; i < projects.length; i++) {
          let projectJson = new Object();
          projectJson.contractAddress = projects[i][1];
          projectJson.name = projects[i][2];
          projectJson.description = projects[i][3];
          projectJson.organizationName = projects[i][5];
          projectJson.registrantId = projects[i][6];
          projectList.push(projectJson);
        }
        res.status(200).send(projectList);
      });
    } catch (err) {
      // handle the error safely
      console.log(err);
      res.status(402).send({
        message: "error occured! please try again after some time"
      });
    }
  },

  getDeviceInfo: (req, res) => {
    try {
      web3Handler
        .getDeviceInfo(req.body.contractAddress, req.body.tokenId)
        .then(deviceInfo => {
          res.status(200).send({
            deviceInfo: deviceInfo.tokenURI,
            owner: deviceInfo.owner
          });
        });
    } catch (err) {
      // handle the error safely
      console.log(err);
      res.status(402).send({
        message: "error occured! please try again after some time"
      });
    }
  },

  getEventsFromContractAddress: (req, res) => {
    try {
      web3Handler
        .getEventsFromContractAddress(req.body.contractAddress)
        .then(events => {
          console.log(events);
          res.status(200).send(events);
        });
    } catch (err) {
      // handle the error safely
      console.log(err);
      res.status(402).send({
        message: "error occured! please try again after some time"
      });
    }
  },
  getEventsFromURN: (req, res) => {
    try {
      Device.findOne({
        where: {
          urn: req.body.urn
        }
      })
        .then(deviceDetails => {
          Project.findOne({
            where: {
              name: deviceDetails.project_id
            },
            attributes: ["tokenContractAddress"]
          })
            .then(projectDetails => {
              web3Handler
                .getEventsFromContractAddress(
                  projectDetails.tokenContractAddress
                )
                .then(events => {
                  let filteredEvent = [];
                  events.map((e, i) => {
                    if (
                      e.returnValues["2"] === deviceDetails.tokenId &&
                      e.event === "Transfer"
                    )
                      filteredEvent = [...filteredEvent, e];
                  });
                  res.status(200).send(filteredEvent);
                })
                .catch(err => {
                  res.status(400).send("Error!");
                });
            })
            .catch(err => {
              res.status(400).send("Error!");
            });
        })
        .catch(err => {
          res.status(400).send("Error!");
        });
    } catch (err) {
      console.log(err);
      res.status(400).send("Error!");
    }
  }
};
