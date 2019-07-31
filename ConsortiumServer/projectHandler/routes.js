const express = require('express');
const router = express.Router();
var impl = require('./impl');
var db = require('../database/models/index');
var Client = db.client;
const jwt = require('jsonwebtoken');
var configAuth = require('../config');
var SubscriberPlan = db.subscriberPlan;
router.post('/projectNameList', isLoggedIn, impl.getProjectNameList);
router.post('/getProjectInfo', isLoggedIn, impl.getProjectInfo);
router.post('/getConsortiumData', isLoggedIn, impl.getConsortiumData);
router.post('/inviteConsortium', isLoggedIn, impl.inviteConsortium);
router.post('/mintNewToken', isLoggedIn,plancheck, impl.mintNewToken);
router.post('/getTokenSupply', impl.getTokenSupply);

module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  var token = req.headers.authorization;
  // JWT enabled login strategy for end user
  jwt.verify(token, configAuth.jwtAuthKey.secret, function (err, decoded) {
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

function plancheck(req, res, next) {
  req.client.getOrganization().then(organization => {
    SubscriberPlan.findOne({
      where: {
        organization_id: organization.uniqueId
      }
    }).then(plan => {
      var ToDate = new Date();
      if (
        ToDate.getTime() <= new Date(plan.endDate).getTime() &&
        plan.credits !== 0
      ) {
          next();
      } else {
        return res.send({status: false, message: "plan expired!"});
      }
    });
  });
}
