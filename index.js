// include modules
var express = require('express'),
    app = express(),
    cors = require('cors');

'use strict';
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser')

app.use(cors());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));

// app.use(express.json());

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'sam2k13@gmail.com',
        pass: 'pianoman'
    }
});

app.post('/checkin', function (req, res) {

  let pincOptions = {
      from: '"Fred Foo 👻" <somethind@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.body // plain text body
  };

  let confirmOptions = {
      from: '"Fred Foo 👻" <somethind@gmail.com>', // sender address
      to: req.body.confirmEmail, // list of receivers
      subject: req.body.confirmSubject, // Subject line
      text: req.body.confirmBody // plain text body
  };

  if(req.body.passcode == "hoi145k"){
    // send mail with defined transport object
    transporter.sendMail(pincOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send('Checkin Failed to Submit!')
        }
        if(req.body.sendConfirm){
          transporter.sendMail(confirmOptions, (error, info) => {
              if (error) {
                console.log(error);
                res.status(500).send('Checkin Submitted! Confirmation email failed to send')
              }
              console.log("Checkin Submitted")
              res.send('Checkin Submitted successfully. A confirmation email has been sent to ' + req.body.email)
          });
        }
        else{
          res.send('Checkin Submitted successfully.')
        }


        // res.send('Checkin Submitted successfully. A confirmation email has been sent to ' + req.body.email)
    });
  }
  else{
    res.status(401).send("Invalid Passcode");
  }
});

app.get('/', function (req, res) {
  res.send("Oops! This idea was kind of a dud")
});

// setup server
app.listen(1338);



// setup email data with unicode symbols
