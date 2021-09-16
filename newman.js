

'use strict';

// module.exports.run = async (event) => {

    const newman = require('newman'); // require newman in your project
    const nodemailer = require('nodemailer')

    newman
    .run({
      collection: require('./testcollection.postman_collection.json'),
      reporters: ["htmlextra"],
      iterationCount: 1,
      reporter: {
        htmlextra: {
          export:
            "./report.html"
        }
      }
    })
    .on("start", function(err, args) {
      // on start of run, log to console
      console.log("running a collection...");
    })
    .on("done", function(err, summary) {
        if (err || summary.error) {
          console.error("collection run encountered an error.");
        } else {
          console.log("collection run completed.");
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'admin@skilltransfers.com',
                pass: 'Welkom01!!!'
            }
        });

        var fs = require('fs'),
          path = require('path'),    
          filePath = path.join(__dirname, 'report.html');

        fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
          if (!err) {
            let mailOptions = {
              from: 'admin@skilltransfers.com',
              to: 'nuri.bayram@me.com',
              subject: 'Newman Report Created',
              text: 'Here is the report....',
              html: `${data}`
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                  console.log(error)
              } else {
                  console.log('Email sent: ' + info.response)
              }
            });
          } else {
            console.log(err);
          }
        });

        }
      });
// };
