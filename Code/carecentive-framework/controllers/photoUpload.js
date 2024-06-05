const path = require('path');
//const fs = require('fs');
require('dotenv').config();
const multer = require('multer');
//const { validationResult } = require('express-validator');
//const { isUserAuth } = require('./authSwitch');
let currentIndex = 0;

console.log('Reached photoUpload.js');

// set storage engine
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		  cb(null, './uploads/images/')
	},
	filename: (req, file, cb) => {
    console.log('Request body in photoUpload.js', req.body);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      //req.session.photo_type = req.body.photo_type; // Either 'eye', 'teeth', 'odontogramm', or 'marks'
      console.log('Reached filename in photoUpload.js');
      console.log('request session storage: ', req.session);
      console.log('Photo type in req.session: ', req.session.photo_type);
      req.session.dolphin_name = req.body.dolphin_name; // The name of the dolphin, so picture is later on assignable to a dolphin
      console.log('Dolphin name in req.session: ',req.session.dolphin_name);
      cb(
        null, // currently no error handling
        `${uniqueSuffix}${path.extname(
          file.originalname
        )}`
      );
      
      // Save photo path in session storage for later access in good_health.js to save the photo paths in the database
      const apiUrl = process.env.PHOTO_PATH; //process.env.MYSQL_HOST + ':' + process.env.HTTP_PORT;
      if(req.body.photo_type === 'eye'){
        console.log('I am at eye: ' + req.session.photo_path.eye_photo_path);
        if(req.session.photo_path.eye_photo_path === 'empty'){ //If empty, so session storage has just been initialized
          //First photo in the list
          req.session.photo_path.eye_photo_path = apiUrl + '/api/images/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        } else {
          //Commaseparated list of photo paths if several photos to upload
          req.session.photo_path.eye_photo_path = req.session.photo_path.eye_photo_path + ',' + apiUrl + '/api/images/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        }
        console.log(req.session.photo_path.eye_photo_path);
      }
      if(req.body.photo_type === 'teeth'){
        console.log('I am here');
        if(req.session.photo_path.teeth_photo_path === 'empty'){ //If empty, so session storage has just been initialized
          //First photo in the list
          console.log('I am at teeth');
          req.session.photo_path.teeth_photo_path = apiUrl + '/api/images/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        } else {
          //Commaseparated list of photo paths if several photos to upload
          req.session.photo_path.teeth_photo_path = req.session.photo_path.teeth_photo_path + ',' + apiUrl + '/api/images/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        }
        console.log(req.session.photo_path.teeth_photo_path);
      }
      if(req.body.photo_type === 'odontogramm'){
        console.log('I am here');
        if(req.session.photo_path.odontogramm_photo_path === 'empty'){ //If empty, so session storage has just been initialized
          //First photo in the list
          console.log('I am at odontogramm');
          req.session.photo_path.odontogramm_photo_path = apiUrl + '/api/images/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        } else {
          //Commaseparated list of photo paths if several photos to upload
          req.session.photo_path.odontogramm_photo_path = req.session.photo_path.odontogramm_photo_path + ',' + apiUrl + '/api/images/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        }
        console.log(req.session.photo_path.odontogramm_photo_path);
      }
      if(req.body.photo_type === 'marks'){
        console.log('I am here: ' + req.session.photo_path.marks_photo_path);
        if(req.session.photo_path.marks_photo_path === 'empty'){ //If empty, so session storage has just been initialized
          //First photo in the list
          console.log('I am at marks');
          req.session.photo_path.marks_photo_path = apiUrl + '/api/images/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        } else {
          //Commaseparated list of photo paths if several photos to upload
          req.session.photo_path.marks_photo_path = req.session.photo_path.marks_photo_path + ',' + apiUrl + '/api/images/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        }
        console.log(req.session.photo_path.marks_photo_path);
    }
    if(req.body.photo_type === 'silhouette'){
      console.log('I am at silhouette: ' + req.session.photo_path.silhouette_photo_path);
      if(req.session.photo_path.silhouette_photo_path === 'empty'){ //If empty, session storage has just been initialized
        //First photo in the list
        req.session.photo_path.silhouette_photo_path = apiUrl + '/api/images/' + `${uniqueSuffix}${path.extname(
          file.originalname
        )}`;
      } else {
        //Commaseparated list of photo paths if several photos to upload
        req.session.photo_path.silhouette_photo_path = req.session.photo_path.silhouette_photo_path + ',' + apiUrl + '/api/images/' + `${uniqueSuffix}${path.extname(
          file.originalname
        )}`;
      }
      console.log(req.session.photo_path.silhouette_photo_path);
    }
    currentIndex++; //increment the index to get the next photo filename
	},
});

// init upload
const upload = multer({
	storage: storage,
	// set the size limit of picture
	limits: { fileSize: 10000000 }, // 10MB, but you also need to adjust nginx to allow payload sizes of 10MB
});

const uploadMultiple = upload.array('files');



/**
 * Controller of post request of /api/photo.
 * Uploads the photos.
 * @returns {Object} The inserted test result
 */
async function uploadPhoto(req, res, next) {
    try {    
    console.log('currentIndex: ', currentIndex);
    currentIndex = 0; // Reset the index before each photo upload
    //console.log('Photo path accessed  from session storage: ' + photo_path.eye_photo_path.toString());
    //console.log(photo_type);

    // Wrap uploadMultiple in a new Promise
    await new Promise((resolve, reject) => {
      uploadMultiple(req, res, function (err) {
        console.log('Reached photoUpload.js uploadMultiple');
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.log('Multer error: ', err);
          reject({ status: 400, error: err });
        } else if (err) {
          // An unknown error occurred when uploading.
          console.log('Unknown error: ', err);
          reject({ status: 500, error: err });
        } else {
          // Everything went fine.
          console.log('Photo uploaded successfully');
          resolve({ status: 201 });
        }
      });
    })
    .then(result => {
      res.status(result.status).json();
    })
    .catch(err => {
      res.status(err.status).json();
    });
    } catch (error) {
    console.error(error);
    // An unknown error occurred
    next(error);//res.status(500); //res.sendStatus(500);
    }
}

module.exports = { uploadPhoto };
