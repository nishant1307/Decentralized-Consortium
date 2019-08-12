var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var s3Config = require('./config').s3Config
var AWS = require('aws-sdk')
var app = express();
var history = require('connect-history-api-fallback');
var expressStaticGzip = require("express-static-gzip");
const multer = require('multer')
var fs = require("fs");
// const IPFS = require('ipfs-http-client')
// const ipfs = new IPFS({
//   host: 'ipfs.infura.io',
//   port: 5001,
//   protocol: 'https'
// })

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
AWS.config.update(s3Config);
const s3 = new AWS.S3(s3Config);
app.use('/s3', require('react-dropzone-s3-uploader/s3router')({
  bucket: 'iotconekt',                           // required
  // region: 'us-east-1',                            // optional
  // headers: { 'Access-Control-Allow-Origin': '*' },  // optional
  ACL: 'private',                                 // this is the default - set to `public-read` to let anyone view uploads
}));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/Dump')
  },
  filename: function (req, file, cb) {
    console.log("files", file, req.body)
    cb(null, file.originalname)
  }
});

// app.use(multer({
//   storage: storage
// }).any());

app.use(logger('dev'));
app.use(history());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api/users', require('./userOnboarding/routes'));
// app.use('/api/dashboard', require('./userDashboard/routes'));
// app.use('/api/projects', require('./projectHandler/routes'));
// app.use('/api/devices', require('./deviceHandler/routes'));
// app.use('/api/things', require('./thingHandler/routes'));
// app.use('/api/explorer', require('./explorerHandler/routes'));
// app.use('/api/events', require('./iotEventHandler/routes'));

app.use(expressStaticGzip(path.resolve(__dirname, '..','ConsortiumClient/dist'),{
 enableBrotli: true
}));
app.use(express.static(path.resolve(__dirname, '..','ConsortiumClient/src/assets')));
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.resolve(__dirname, '..','ConsortiumClient/dist')});
});

// var db = require('./database/models/index');
// db.sequelize.sync({ force: false}).then(() => {
//   console.log("Sync done");
// });

// require('./websocketApp');

module.exports = app;
