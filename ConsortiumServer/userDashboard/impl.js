var db = require("../database/models/index");
var Client = db.client;
var Organization = db.organization;
var Project = db.project;
var Device = db.device;
var Thing = db.thing;
var Ticket = db.ticket;
var SubscriberPlan = db.subscriberPlan;
const Sequelize = require("sequelize");
var ProjectOrganization = db.ProjectOrganizations;
var userCurrencyAddress = db.userCurrencyAddress;
var Notifications = db.notification;
var s3Config = require(".././config").s3Config;
const mailer = require("../mailer/impl");
const userOnboarding = require("../userOnboarding/impl");
const contractHandler = require("../contractHandler/impl");
const web3Handler = require("../web3Handler/ropstenHandler");
var AWS = require("aws-sdk");
AWS.config.update(s3Config);
var s3 = new AWS.S3();
const IPFS = require("ipfs-http-client");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});
var fs = require("fs");

module.exports = {
  checkBalance: (req, res) => {
    web3Handler.checkTokenBalance(req.body.address, req.body.tokenAddress).then(
      balance => res.status(200).send(balance)
    );
  },
  getAllTickets: (req, res) => {
    Ticket.findAll().then(tickets => {
      var filtered = tickets.filter(function(x) {
        return x.client_id === req.client.uniqueId;
      });
      res.status(200).send(filtered);
    });
  },
  createTicket: (req, res) => {
    const subject = req.body.subject;
    const images = req.body.images;
    const message = req.body.message;

    if (!subject) {
      return res.status(422).send({error: "You must enter a subject!"});
    }

    if (!message) {
      return res.status(422).send({
        error: "You must enter a detailed description of what you need!"
      });
    }

    let ticket = new Ticket({
      subject: subject,
      images: images.toString(),
      status: "Open",
      message: message
    });
    ticket.save().then(newTicket => {
      req.client.addTicket(newTicket);
      res
        .status(201)
        .json({message: "Thanks! Your request was submitted successfuly!"});
    });
  },
  // open wallet apis
  getAllProject: (req, res) => {
    try {
      Project.findAll({
        attributes: ["name", "tokenContractAddress"]
      }).then(values => {
        res.status(200).send(values);
      });
    } catch (error) {
      res.status(402).send("error occured! please try again later");
    }
  },

  updateConsortiumProjectInfo: (req, res) => {
    try {
      console.log(req.body);
      req.client.getOrganization().then(organization => {
        ProjectOrganization.findOne({
          where: {
            projectName: req.body.projectName,
            organizationUniqueId: organization.uniqueId
          }
        }).then(project => {
          if (req.body.status) {
            project.update({
              status: true
            });
            res.status(200).send({
              status: true,
              message: "Consortium Accepted"
            });
          } else {
            project.destroy().then(u => {
              if (u && u.deletedAt) {
                res.status(200).send({
                  status: true,
                  message: "Consortium Rejected"
                });
              }
            });
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
  invitedConsortiumProjectInfo: (req, res) => {
    try {
      req.client.getOrganization().then(organization => {
        organization.getProjects().then(projects => {
          let projectList = projects.filter(function(item) {
            return !item.ProjectOrganizations.status;
          });
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
      Client.findOne({
        where: {
          email: req.body.inviteEmail
        }
      }).then(invitedUser => {
        if (invitedUser) {
          Project.findOne({
            where: {
              name: req.body.projectName
            }
          }).then(invitedProject => {
            invitedUser.getOrganization().then(invitedOrg => {
              invitedOrg.addProject(invitedProject).then(() => {
                console.log(req.body.projectName, invitedOrg.uniqueId);
                ProjectOrganization.findOne({
                  where: {
                    projectName: req.body.projectName,
                    organizationUniqueId: invitedOrg.uniqueId
                  }
                })
                  .then(projectOrg => {
                    console.log(projectOrg);
                    projectOrg.role = req.body.role;
                    projectOrg.save().then(result => {
                      res.status(200).send({
                        status: "Invitation sent successsfully"
                      });
                    });
                  })
                  .catch(err => {
                    res.status(400).send({
                      err: err
                    });
                  });
              });

              // mailer.consortiumInvitation(req, user.email, user.organization_id, organization.uniqueId, req.body.projectName);
            });
          });
        } else {
          res.status(400).send({
            message: "No User Found"
          });
        }
      });
    } catch (err) {
      // handle the error safely
      console.log(err);
      res.status(402).send({
        message: "error occured! please try again after some time"
      });
    }
  },

  uploadToIPFS: (req, res) => {
    let urls = [];
    let count = 0;
    req.files.map(item => {
      ipfs.addFromFs(item.path, (err, ipfsHash) => {
        urls.push(ipfsHash);
        if (count === req.files.length - 1) {
          return res.status(200).send(urls);
        } else {
          count++;
        }
      });
    });
  },

  uploadToS3: (req, res) => {
    let urls = [];
    let count = 0;
    req.files.map(item => {
      const params = {
        Bucket: "iotconekt", // pass your bucket name
        Key: req.body.path + "/" + item.originalname, // file will be saved as testBucket/contacts.csv
        Body: fs.createReadStream(item.path)
      };
      s3.upload(params, function(s3Err, data) {
        if (s3Err) throw s3Err;
        urls.push(data.Location);
        if (count === req.files.length - 1) {
          return res.status(200).send(urls);
        } else {
          count++;
        }
      });
    });
  },

  addClaim: (req, res) => {
    try {
      req.client.getOrganization().then(organization => {
        organization.claims = req.body.claims;
        organization
          .save()
          .then((err, result) => {
            res.status(200).send({
              message: "Claims updated successfully"
            });
          })
          .catch(err => {
            res.status(400).send({
              message: err
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

  addCertification: (req, res) => {
    try {
      req.client.getOrganization().then(organization => {
        organization.certificationLinks = req.body.urls;
        organization.save().then((err, result) => {
          res.status(200).send({
            message: "Certificate added successfully"
          });
        });
        // console.log(temp);
      });
    } catch (err) {
      // handle the error safely
      console.log(err);
      res.status(402).send({
        message: "error occured! please try again after some time"
      });
    }
  },

  getCertification: (req, res) => {
    try {
      req.client.getOrganization().then(organization => {
        let certificationLinks, claims;
        certificationLinks =
          organization.certificationLinks === null
            ? []
            : organization.certificationLinks;
        claims = organization.claims === null ? [] : organization.claims;
        res.status(200).send({
          certificationLinks: certificationLinks,
          claims: claims
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

  checkRegistration: (req, res) => {
    try {
      web3Handler.checkRegistration(req.client.uniqueId).then(result => {
        if (result.status)
          if (result.admin) res.status(200).send(true);
          else {
            res.status(200).send(false);
          }
        else res.status(200).send(false);
      });
    } catch (err) {
      // handle the error safely
      console.log(err);
      res.status(402).send({
        message: "error occured! please try again after some time"
      });
    }
  },

  //   getSignedURL: (req,res)=>{
  //         const params = {
  //        Bucket:'iotconekt',
  //       Key: req.body.fileName,
  //       Body: 'name1'
  //      };
  //
  //      s3.getSignedUrl('putObject', params, function(err, signedUrl) {
  //        if (err) {
  //          res.status(500).send('Did not receive signed url')
  //       } else {
  //         res.status(200).send(signedUrl)
  //       }
  //     })
  // },
  getUserInfo: (req, res) => {
    try {
      res.status(200).send({
        user: req.client
      });
    } catch (err) {
      // handle the error safely
      console.log(err);
      res.status(402).send({
        message: "error occured! please try again after some time"
      });
    }
  },

  getUserFromID: (req, res) => {
    Client.findOne({
      where: {
        uniqueId: req.body.userID
      },
      attributes: [
        "firstName",
        "lastName",
        "uniqueId",
        "email",
        "phoneNumber",
        "role"
      ]
    })
      .then(user => {
        res.status(200).send({
          userInfo: user
        });
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  getSubscriptionInfo: (req, res) => {
    req.client.getOrganization().then(organization => {
      SubscriberPlan.findOne({
        where: {
          organization_id: organization.uniqueId
        },
        attributes: ["startDate", "endDate", "credits", "dataUsage", "type"]
      })
        .then(subscribedPlan => {
          res.status(200).send({
            plan: subscribedPlan
          });
        })
        .catch(err => {
          res.status(400).send(err);
        });
    });
  },

  getOrganizationInfo: (req, res) => {
    try {
      req.client.getOrganization().then(organization => {
        Client.findOne({
          where: {
            organization_id: organization.uniqueId,
            role: "admin"
          },
          attributes: ["firstName", "lastName", "email"]
        }).then(admin => {
          res.status(200).send({
            organization: organization,
            admin: admin
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

  userList: (req, res) => {
    try {
      req.client.getOrganization().then(organization => {
        organization.getClients().then(users => {
          res.status(200).send(users);
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

  organizationList: (req, res) => {
    try {
      Organization.findAll({
        where: {}
      }).then(organizations => {
        res.status(200).send(organizations);
      });
    } catch (err) {
      // handle the error safely
      console.log(err);
      res.status(402).send({
        message: "error occured! please try again after some time"
      });
    }
  },

  projectList: (req, res) => {
    try {
      req.client.getOrganization().then(organization => {
        organization.getProjects().then(projects => {
          allowedProjects = projects.filter(function(item) {
            return item.ProjectOrganizations.status;
          });
          res.status(200).send(allowedProjects);
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

  createProject: (req, res) => {
    try {
      Project.findOne({
        where: {
          name: req.body.tokenName
        }
      }).then(existingProjects => {
        if (!existingProjects) {
          console.log("Creating Project");
          req.client.getOrganization().then(organization => {
            Client.findOne({
              where: {
                organization_id: organization.uniqueId,
                role: "0"
              }
            }).then(admin => {
              admin.getUserCurrencyAddress().then(userCurrencyAddress => {
                contractHandler
                  .createERC721Contract(
                    req.body.tokenName,
                    req.body.tokenSymbol
                  )
                  .then(contractCode => {
                    contractHandler
                      .compileContract(contractCode)
                      .then(compiledContract => {
                        web3Handler
                          .deployContract(
                            compiledContract.abi,
                            compiledContract.byteCode,
                            userCurrencyAddress.privateKey
                          )
                          .then(deploymentInformation => {
                            console.log(
                              "Deployment info is ",
                              deploymentInformation
                            );
                            let newProject = new Object();
                            newProject.name = req.body.name;
                            newProject.industry = req.body.industry;
                            newProject.subIndustry = req.body.subIndustry;
                            newProject.tokenName = req.body.tokenName;
                            newProject.tokenSymbol = req.body.tokenSymbol;
                            newProject.tokenContractCode = contractCode;
                            newProject.tokenContractABI = compiledContract.abi;
                            newProject.tokenContractBytecode =
                              compiledContract.byteCode;
                            newProject.tokenContractAddress =
                              deploymentInformation.contractAddress;
                            newProject.tokenContractTxHash =
                              deploymentInformation.transactionHash;
                            Project.create(newProject).then(project => {
                              organization
                                .addProject(project)
                                .then(newValue => {
                                  ProjectOrganization.findOne({
                                    where: {
                                      projectName: req.body.name
                                    }
                                  }).then(newProject => {
                                    return newProject.update({
                                      status: true
                                    });
                                  });
                                });
                              web3Handler.addNewProject(
                                project.uniqueId,
                                deploymentInformation.contractAddress,
                                req.body.name,
                                req.body.description,
                                organization.uniqueId,
                                req.client.uniqueId,
                                userCurrencyAddress.address,
                                userCurrencyAddress.privateKey
                              );
                              res.status(200).send({
                                success: true,
                                project: project
                              });
                            });
                          });
                      });
                  });
              });
            });
          });
        } else {
          res.status(402).send({
            message: "Error occured! Project name already exists"
          });
        }
      });
    } catch (err) {
      // handle the error safely
      console.log(err);
      res.status(402).send({
        message: "error occured! please try again after some time"
      });
    }
  },

  deleteCertification: (req, res) => {
    try {
      let objects = [];
      req.client.getOrganization().then(organization => {
        req.body.urls.forEach(url => {
          objects.push({
            Key: url.url.replace("https://s3.amazonaws.com/iotconekt/", "")
          });
          console.log(
            url.url.replace("https://s3.amazonaws.com/iotconekt/", "")
          );
        });
        var options = {
          Bucket: "iotconekt",
          Delete: {
            Objects: objects,
            Quiet: false
          }
        };
        // })
        s3.deleteObjects(options, function(err, data) {
          if (err)
            res.status(200).send({
              err: err.stack
            });
          else {
            req.body.urls.forEach(object => {
              organization.certificationLinks = organization.certificationLinks.filter(
                item => item.url !== object.url
              );
              organization.save().then((err, result) => {
                res.status(200).send({
                  message: "Certificate deleted successfully"
                });
              });
            });
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

  createThing: (req, res) => {
    try {
      req.client.getOrganization().then(organization => {
        let newThings = [];
        for (let i = 0; i < req.body.quantity; i++) {
          newThings.push({
            name: req.body.thingName + "-" + (i + 1),
            description: req.body.thingDescription,
            brand: req.body.thingBrand,
            uri: req.body.ipfsHash,
            claims: req.body.claims,
            certificationLinks: req.body.certificateURLs,
            thingStory: req.body.thingStory,
            thingValue: req.body.thingValue
          });
        }
        Thing.bulkCreate(newThings).then(thing => {
          organization.addThing(thing);
          res.status(200).send({
            message: "Thing created successsfully"
          });
        });
      });
    } catch (err) {
      // handle the error safely
      console.log(err);
      res.status(402).send({
        message: "Error occured! Please try again after some time"
      });
    }
  },

  inviteColleague: (req, res) => {
    try {
      Client.findOne({
        where: {
          email: req.body.inviteEmail
        }
      }).then(user => {
        if (!user) {
          req.client.getOrganization().then(createdOrganization => {
            Client.create({
              email: req.body.inviteEmail,
              role: 2
            }).then(client => {
              createdOrganization.addClient(client);
              mailer.invitationMailer(req, req.body.inviteEmail);
              res.status(200).send({
                status: "Invitation sent successsfully"
              });
            });
          });
        } else {
          res.status(400).send({
            message: "User already registered to the platform"
          });
        }
      });
    } catch (err) {
      // handle the error safely
      console.log(err);
      res.status(402).send({
        message: "error occured! please try again after some time"
      });
    }
  },

  getCounts: (req, res) => {
    try {
      req.client.getUserCurrencyAddress().then(currencyAddress => {
        req.client
          .getOrganization()
          .then(organization => {
            organization
              .getProjects({
                attributes: [],
                include: [
                  {
                    model: Device,
                    attributes: ["urn"]
                  }
                ]
              })
              .then(projects => {
                let deviceList = [];
                let acceptedProjects = projects.filter(item => {
                  return item.ProjectOrganizations.status;
                });
                acceptedProjects.forEach(project => {
                  project.dataValues.devices.forEach(device => {
                    deviceList.push(device.dataValues);
                  });
                });
                organization
                  .getThings()
                  .then(things => {
                    res.status(200).send({
                      organization: organization,
                      client: req.client,
                      etherAddress: currencyAddress.address,
                      projectCount: acceptedProjects.length,
                      deviceCount: deviceList.length,
                      thingCount: things.length
                    });
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(400).json({
                      message: err
                    });
                  });
              })
              .catch(err => {
                console.log(err);
                res.status(400).json({
                  message: err
                });
              });
          })
          .catch(err => {
            console.log(err);
            res.status(400).json({
              message: err
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

  fetchNotifications: (req, res) => {
    try {
      Notifications.findAll({
        where: {
          client_id: req.client.uniqueId
        }
      }).then(notifications => {
        res.status(200).send({
          notificationList: notifications
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

  getEther: (req, res) => {
    try {
      web3Handler.checkBalance(req.body.address).then(result => {
        if (result === "100000000000000000") {
          res.status(203).send("user is greedy!");
        }
        var txhash = web3Handler.etherFaucet(req.body.address, req.body.amount);
        res.status(200).send("Ether transfer in process");
      });
    } catch (err) {
      // handle the error safely
      console.log(err);
      res.status(402).send({
        message: "error occured! please try again after some time"
      });
    }
  },

  changeEmail: (req, res) => {
    try {
      if (req.body.otp == "") {
        let email = req.client.email;
        Client.findOne({
          where: {
            email: email
          }
        }).then(client => {
          if (client) {
            client.verificationOTP = Math.floor(Math.random() * 9999);
            client.save().then(client => {
              console.log(client.verificationOTP);
              mailer.sendConfirmationOTP(
                req.body.email,
                client.verificationOTP
              );
              res.status(200).send({
                status: true,
                message: "A verification link has been sent to your email id."
              });
            });
          } else {
            res.status(200).send({
              status: false,
              message: "User does not exist on the system"
            });
          }
        });
      } else {
        Client.findOne({
          where: {
            email: req.client.email
          }
        }).then(client => {
          if (client.verificationOTP == req.body.otp) {
            client.verificationOTP = null;
            client.email = req.body.newEmail;
            client.save().then((err, result) => {
              res.status(200).send({
                status: true
              });
            });
          } else {
            res.status(200).send({
              status: false
            });
          }
        });
      }
    } catch (err) {
      // handle the error safely
      console.log(err);
      res.status(402).send({
        message: "error occured! please try again after some time"
      });
    }
  }
};
