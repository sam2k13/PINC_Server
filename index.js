
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
        user: 'pincbot@gmail.com',
        pass: 'Pincsummer2018'
    }
});

app.post('/checkin', function (req, res) {

  let pincEmail = {
      from: 'PINC International', // sender address
      to: 'sam2k13@gmail.com', // list of receivers
      subject: 'Weekend Check-In: ' + req.body.name + ' - ' + req.body.destination, // Subject line
      text: 'Personal Info\n' + req.body.name + '\n' + req.body.email + '\n\nDestination Info\nDestiantion: ' + req.body.destination + '\nAccomadation Type: ' + req.body.accomodation_type + '\nAddress: ' + req.body.address + '\n\nDeparture\nDeparture Time: ' + req.body.departure_departure_time +
      '\nArrival Time: ' +  req.body.departure_departure_time + '\n\nReturn\nDeparture Time: ' + req.body.return_departure_time + '\nArrival Time: ' + req.body.return_arrival_time// plain text body
  };

  let confirmEmail = {
      from: '"Fred Foo 👻" <somethind@gmail.com>', // sender address
      to: req.body.confirmEmail, // list of receivers
      subject: 'Check-In Submitted', // Subject line
      text:  req.body.name + ',Thank you for letting us know your weekend plans!  Have a great time and stay safe.\n\nLisette\n\nCheck-In Info\nDestiantion: ' + req.body.destination + '\nAccomadation Type: ' + req.body.accomodation_type + '\nAddress: ' + req.body.address + '\nDeparture\nDeparture Time: ' + req.body.departure_departure_time +
        '\nArrival Time: ' +  req.body.departure_departure_time + '\nReturn\nDeparture Time: ' + req.body.return_departure_time + '\nArrival Time: ' + req.body.return_arrival_time// plain text body
  };

  if(req.body.passcode == "hoi145k"){
    // send mail with defined transport object
    transporter.sendMail(pincOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send('Check-In Failed to Submit!')
        }
        transporter.sendMail(confirmOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.status(500).send('Check-In Submitted, but confirmation email failed to send')
            }
            console.log("Checkin Submitted")
            res.send('Check-In Submitted successfully. A confirmation email has been sent to ' + req.body.email)
        });
    });
  }
  else{
    res.status(401).send();
  }
});

app.get('/', function (req, res) {
  res.send("Oops! This idea was kind of a dud")
});

// setup server
app.listen(1332);


