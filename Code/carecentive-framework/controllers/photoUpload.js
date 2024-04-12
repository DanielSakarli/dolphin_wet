const path = require('path');
//const fs = require('fs');
require('dotenv').config();
const multer = require('multer');
const { validationResult } = require('express-validator');
const { isUserAuth } = require('./authSwitch');
let currentIndex = 0;

// set storage engine
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		  cb(null, './uploads/images/')
	},
	filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      //req.session.photo_type = req.body.photo_type; // Either 'eye', 'teeth', 'odontogramm', or 'marks'
      
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
      const apiUrl = process.env.MYSQL_HOST + ':' + process.env.HTTP_PORT;
      if(req.body.photo_type === 'eye'){
        console.log('I am here: ' + req.session.photo_path.eye_photo_path);
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
          console.log('I am here');
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
          console.log('I am here');
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
    currentIndex++; //increment the index to get the next photo filename
	},
});

// init upload
const upload = multer({
	storage: storage
	// set the size limit of picture
	// limits: { fileSize: 10000000 },
});

const uploadMultiple = upload.array('files');



/**
 * Controller of post request of /api/photo.
 * Uploads the photos.
 * @returns {Object} The inserted test result
 */
async function uploadPhoto(req, res, next) {
    try {
    //console.log(req.body);
    const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Handle validation errors
			return res.status(400).json({ error: errors.array() });
		}

		// After gone through the authenticateToken middleware
		// the data of user is in the req.authData
		let userID;
		let userName;
		if (isUserAuth) {
			//const { user_id, name } = req.authData;
			//console.log('authdata: ', req.authData);
			//userID = user_id;
			//userName = name;
		} else {
			//userID = 1;
		}
    
    console.log('currentIndex: ',currentIndex);
    //console.log('marks photo path in photoUpload.js: ',req.session.photo_path.marks_photo_path);
    /*req.session.photo_type = ''; // Reset the photo_path in session storage, so no duplicate photo paths
    req.session.dolphin_name = '';
    req.session.photo_path = {
      eye_photo_path: '',
      teeth_photo_path: '',
      odontogramm_photo_path: '',
      //marks_photo_path: ''
    };*/
    currentIndex = 0; // Reset the index before each photo upload
    //console.log('Photo path accessed  from session storage: ' + photo_path.eye_photo_path.toString());

    //console.log(photo_type); // Either 'eye' or 'teeth'

    

    uploadMultiple(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(401).json(); //res.sendStatus(401); 
      } else if (err) {
        // An unknown error occurred when uploading.
        res.status(500).json(); //res.sendStatus(500); 
      } else {
        // Everything went fine.

        res.status(201).json(); //res.sendStatus(201); //picture uploaded successfully
        }
    })
    } catch (error) {
    console.error(error);
    // An unknown error occurred
    next(error);//res.status(500); //res.sendStatus(500);
    }
}

module.exports = { uploadPhoto };
