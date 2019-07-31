var db = require("../database/models/index");
var SubscriberPlan = db.subscriberPlan;
const web3Handler = require("../web3Handler/ropstenHandler");
var Project = db.project;
var Client = db.client;
var Organization = db.organization;
var ProjectOrganization = db.ProjectOrganization;
module.exports = {
  getProjectInfo: (req, res) => {
    try {
      Project.findOne({
        where: {
          uniqueId: req.body.projectID
        }
      }).then(project => {
        web3Handler
          .checkTotalTokenSupply(project.tokenContractAddress)
          .then(totalSupply => {
            res.status(200).send({
              project: project,
              totalSupply: totalSupply
            });
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

  getConsortiumData: (req, res) => {
    try {
      Project.findOne({
        where: {
          name: req.body.projectName
        },
        attributes: [],
        include: [
          {
          model: Organization
          }
        ]
      }).then(project => {
        res.status(200).send({
          info: project
        })
      });
    } catch (err) {
      // handle the error safely
      console.log(err);
      res.status(402).send({
        message: "error occured! please try again after some time"
      });
    }
  },

  mintNewToken: (req, res) => {
    try {
      req.client.getOrganization().then(organization => {
        SubscriberPlan.findOne({
          where: {
            organization_id: organization.uniqueId
          }
        }).then(plan => {
          let deviceURNArray =  Array.isArray(req.body.deviceURN)? req.body.deviceURN : [req.body.deviceURN]
          if( plan.credits >= deviceURNArray.length){
          req.client.getUserCurrencyAddress().then(userCurrencyAddress => {
            Project.findOne({
              where: {
                name: req.body.selectedProject
              }
            }).then(project => {
              web3Handler.mintNewToken(
                userCurrencyAddress.address,
                userCurrencyAddress.privateKey,
                req.body.number,
                JSON.stringify(req.body.tokenURI),
                deviceURNArray,
                project.tokenContractAddress,
                req.body.selectedProject
              );
              plan.credits = plan.credits - deviceURNArray.length;
              plan.save();
              res.status(200).send({status:true,count:deviceURNArray.length});
            });
          });
        }else {
          console.log("not enough credits");
          res.status(200).send({status:false,message:'not enough credits'});
        }
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

  getTokenSupply: (req, res) => {
    try {
      Project.findOne({
        where: {
          name: req.body.projectName
        }
      }).then(project => {
        web3Handler
          .checkTotalTokenSupply(project.tokenContractAddress)
          .then(totalSupply => {
            res.status(200).send({
              totalSupply: totalSupply
            });
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

  getProjectNameList: (req, res) => {
    try {
      req.client.getOrganization().then(organization => {
        organization
          .getProjects({
            attributes: ["name"]
          })
          .then(projectList => {
            res.status(200).send({
              projectList: projectList
            });
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

  inviteConsortium: (req, res) => {
    try {
      Client.findOrCreate({
        email: req.body.inviteEmail
      }).then(client => {
        console.log(client);
      });
    } catch (err) {
      // handle the error safely
      console.log(err);
      res.status(402).send({
        message: "error occured! please try again after some time"
      });
    }
  }
};
