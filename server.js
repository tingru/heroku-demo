/*
    server.js

    Main script for our Node.js server.
    This script will create the Express application and add routers for our REST API
*/
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var sendgrid = require('sendgrid’)(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
//create an express application
var app = express();

//use the JSON parser from bodyParser
app.use(bodyParser.json());

//serve static files from the /static sub-directory
app.use(express.static(__dirname + '/static'));

//finally, add an error handler that sends back the error info as JSON
app.use(function(err, req, res, next) {
    if (undefined == err.statusCode || 500 == err.statusCode) {
        console.error(err);
    }

    res.status(err.statusCode || 500).json({message: err.message || err.toString()});
});

app.get('/api/send', function (req, res){
    sendgrid.send({

        to: req.query.to,

        from: 'info343@ischoo.uw.edu',

        subject: 'req.query.subject,
        text: 'req.query.text
    }, function(err, json) {
        if(err) {
            res.status(500).send('internal server error!');
        } else {
            res.status(200).send('everything went okay, email sent');
        }



    });
});

//start the web server
var port = process.env.YOUR_PORT || process.env.PORT || 8080;
var host = process.env.YOUR_HOST || ‘0.0.0.0’;

var server = app.listen(port, host, function() {
    console.log('listening for requests sent to http://localhost:%s', server.address().port);
});

