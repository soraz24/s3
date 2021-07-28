// Load the AWS SDK for Node.js

var AWS = require('aws-sdk');

var fs = require('fs');

const testFolder = './tests/';

const bucketName = 'node-sdk-sample-db265c61-a053-4c43-a7db-8f62d267f75b';

// Set the region 

AWS.config.update({region: 'eu-west-3'});

 

// Create S3 service object

s3 = new AWS.S3({apiVersion: '2006-03-01'});

 

// call S3 to retrieve upload file to specified bucket

const uploadFile = (fileName) => {

    // Configure the file stream and obtain the upload parameters

    var fileStream = fs.createReadStream(fileName);

    fileStream.on('error', function(err) {

    console.log('File Error', err);

    });

    var body = fileStream;

    var path = require('path');

    var key = path.basename(fileName);

 

    var uploadParams = {Bucket: bucketName, Key: key, Body: body};

 

    // call S3 to retrieve upload file to specified bucket

    s3.upload (uploadParams, function (err, data) {

        if (err) {

          console.log("Error", err);

        } if (data) {

          console.log("File uploaded successfully", data.Location);

        }

      });

}

 

fs.readdirSync(testFolder).forEach(file => {

    uploadFile(testFolder + file);

});
