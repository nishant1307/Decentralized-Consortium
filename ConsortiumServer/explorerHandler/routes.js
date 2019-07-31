const express = require('express');
const router = express.Router();
var impl = require('./impl');
var db = require('../database/models/index');
var Client = db.client;
const jwt = require('jsonwebtoken');
var configAuth = require('../config');

router.post('/getProjectsFromOrganizationName', impl.getProjectsFromOrganizationName);
router.post('/getAllProjects', impl.getAllProjects);
router.post('/getDeviceInfo', impl.getDeviceInfo);
router.post('/getEventsFromContractAddress', impl.getEventsFromContractAddress);
router.post('/getEventsFromURN' ,impl.getEventsFromURN);
module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  var token = req.body.clientToken;
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
