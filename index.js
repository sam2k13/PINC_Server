
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
      to: 'info@pincinternational.com', // list of receivers
      subject: 'Weekend Check-In: ' + req.body.name + ' - ' + req.body.destination, // Subject line
      text: 'Personal Info\n' + req.body.name + '\n' + req.body.email + '\n\nDestination Info\nDestiantion: ' + req.body.destination + '\nAccomadation Type: ' + req.body.accomodation_type + '\nAddress: ' + req.body.address +
      '\n\nDeparture\nFlight/Bus/Train #: ' + req.body.departure_number + '\nDeparture Date: ' + req.body.departure_date.split('T')[0] + '\nDeparture Time: ' + req.body.departure_departure_time + '\nArrival Time:' + req.body.departure_arrival_time +
      '\n\nReturn\nFlight/Bus/Train #: ' + req.body.return_number + '\nReturn Date: ' + req.body.return_date.split('T')[0]  + '\nDeparture Time: ' + req.body.return_departure_time + '\nArrival Time: ' + req.body.return_arrival_time// plain text body
  };

  let confirmEmail = {
      from: 'PINC International', // sender address
      to: req.body.email, // list of receivers
      subject: 'Check-In Submitted', // Subject line
      text:  req.body.name + ',\nThank you for letting us know your weekend plans!  Have a great time and stay safe.\n\nLisette\n\nCheck-In Info\nDestiantion: ' + req.body.destination + '\nAccomadation Type: ' + req.body.accomodation_type + '\nAddress: ' + req.body.address +
      '\n\nDeparture\nFlight/Bus/Train #: ' + req.body.departure_number + '\nDeparture Date: ' + req.body.departure_date.split('T')[0] + '\nDeparture Time: ' + req.body.departure_departure_time + '\nArrival Time:' + req.body.departure_arrival_time +
      '\n\nReturn\nFlight/Bus/Train #: ' + req.body.return_number + '\nReturn Date: ' + req.body.return_date.split('T')[0]  + '\nDeparture Time: ' + req.body.return_departure_time + '\nArrival Time: ' + req.body.return_arrival_time// plain text body
  };

  if(req.body.passcode == "hoi145k"){
    // send mail with defined transport object
    transporter.sendMail(pincEmail, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send('Check-In Failed to Submit!')
        }
        transporter.sendMail(confirmEmail, (error2, info2) => {
            if (error2) {
              console.log(error2);
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
  res.send("Yes, I'm Alive and well")
});

// setup server
app.listen(1332);
