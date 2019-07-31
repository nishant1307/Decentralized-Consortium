const nodemailerAuth = require("./config").nodemailerAuth;
var nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');
var ejs = require("ejs");
var fs = require('fs');
const mailgunOptions = {
  auth: {
    api_key: '4b5b7bef870b576731e74ba3be83c8fd-e51d0a44-9e066254',
    domain: 'demo.iotconekt.com'
  }
}
const transport = mailgunTransport(mailgunOptions)
let transporter= nodemailer.createTransport(transport);

module.exports = {
  //OTP
  sendConfirmationOTP: function (recipientmail, otp) {
    ejs.renderFile(__dirname + '/emailerTemplates/emailVerificationOTP.ejs', {
      otp: otp
    }, (err, data) => {
      console.log(err);
      var mailOptions = {
        from: "verification@demo.iotconekt.com",
        to: recipientmail,
        subject: "Email Verification OTP",
        html: data
      };
      triggerEmail(mailOptions);
    });
  },
  //forgot password mailer
  forgotPasswordMailer: function (req, recipientmail, userhash) {
    var link = "https://www.iotconekt.com" + "/resetPassword?resetId=" + userhash.toString();
    ejs.renderFile(__dirname + '/emailerTemplates/forgotPassword.ejs', {
      link: link
    }, (err, data) => {
      console.log(err);
      var mailOptions = {
        from: "forgotPassword@demo.iotconekt.com",
        to: recipientmail,
        subject: "Reset Password link",
        html: data
      };
      triggerEmail(mailOptions);
    });
  },

  invitationMailer: function(req, recipientmail) {
    var link = "https://www.iotconekt.com" + "/invitation?inviteEmail="+recipientmail;
    var mailOptions = {
      from: "invite@demo.iotconekt.com",
      to: recipientmail,
      subject: "IotConekt Invitation",
      text: link
    };
    triggerEmail(mailOptions);
  },

  consortiumInvitation: function(req,inviteEmail,inviteId,organizationId,projectName) {
    var link = "https://www.iotconekt.com" + "/consortiumInvitation?v1="+inviteId+"&v2="+organizationId+"&v3="+projectName;
    var mailOptions = {
      from: "invite@demo.iotconekt.com",
      to: inviteEmail,
      subject: "IotConekt Consortium Invitation",
      text: link
    };
    triggerEmail(mailOptions);
  },

  sendSMS: (recipientmail, otp) => {
    const accountSid = 'ACf1e409b4623722ee346e95087bf48750';
    const authToken = '083ca9f70257fde8ab44f9f6e6d90860';
    const client = require('twilio')(accountSid, authToken);

    client.messages
    .create({
       body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
       from: '+13342039087',
       to: '+918178976697'
     })
    .then(message => console.log(message.sid))
    .catch(err => console.log(err));
  }

}

function triggerEmail(mailOptions) {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      return;
    }
  });
}
