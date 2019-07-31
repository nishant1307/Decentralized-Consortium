const express = require("express");
const router = express.Router();
var impl = require("./impl");
var db = require("../database/models/index");
var Client = db.client;
const jwt = require("jsonwebtoken");
var configAuth = require("../config");

router.post("/getUserInfo", isLoggedIn, impl.getUserInfo);
router.post("/getUserFromID", isLoggedIn, impl.getUserFromID);
router.post("/getOrganizationInfo",isLoggedIn,impl.getOrganizationInfo);
router.post("/getSubscriptionInfo",isLoggedIn,impl.getSubscriptionInfo);
router.post("/projectList", isLoggedIn, impl.projectList);
router.post("/userList", isLoggedIn, impl.userList);
router.post("/organizationList", isLoggedIn, impl.organizationList);
router.post("/getCounts", isLoggedIn, impl.getCounts);
router.post("/createProject", isLoggedIn, impl.createProject);
router.post("/createThing", isLoggedIn,impl.createThing);
router.post("/inviteColleague", isLoggedIn, impl.inviteColleague);
router.post("/fetchNotifications", isLoggedIn, impl.fetchNotifications);
router.post("/getEther", impl.getEther);
router.post("/changeEmail", isLoggedIn, impl.changeEmail);
router.post("/addCertification", isLoggedIn, impl.addCertification);
router.post("/getCertification", isLoggedIn, impl.getCertification);
router.post("/deleteCertification", isLoggedIn, impl.deleteCertification);
router.post("/checkRegistration", isLoggedIn, impl.checkRegistration);
router.post("/addClaim", isLoggedIn, impl.addClaim);
router.post("/uploadToIPFS", impl.uploadToIPFS);
router.post('/uploadToS3', impl.uploadToS3);
router.post("/inviteConsortium", isLoggedIn, impl.inviteConsortium);
router.post(
  "/invitedConsortiumProjectInfo",
  isLoggedIn,
  impl.invitedConsortiumProjectInfo
);
router.post(
  "/updateConsortiumProjectInfo",
  isLoggedIn,
  impl.updateConsortiumProjectInfo
);
// open wallet apis
router.post("/getAllProject", impl.getAllProject);
router.post("/createTicket",isLoggedIn, impl.createTicket);
router.post("/getAllTickets",isLoggedIn, impl.getAllTickets);
router.post("/checkBalance",isLoggedIn, impl.checkBalance);
module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  var token = req.headers.authorization;
  // JWT enabled login strategy for end user
  jwt.verify(token, configAuth.jwtAuthKey.secret, function(err, decoded) {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "Logged out" })
    } else {
      Client.findOne({
        where: {
          uniqueId: decoded.clientId
        }
      }).then(client => {
        req.client = client;
        next();
      });
    }
  });
}
