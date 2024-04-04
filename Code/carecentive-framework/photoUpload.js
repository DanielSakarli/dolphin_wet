const path = require('path');
require('dotenv').config();
const multer = require('multer');

// Two indexes which go through the two-dimensional array of dolphin_names and photo_paths
let fileIndex = 0;


// set storage engine
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		  cb(null, './uploads/images/')
	},
	filename: (req, file, cb) => {
    // Get index of the session storage
    const dolphinIndex = req.session.dolphinIndex;
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      console.log('Photo type: ' + req.session.photo_type);
      req.session.photo_type[dolphinIndex] = req.body.photo_type; // Either 'eye', 'teeth' or 'marks'
      console.log(req.session.photo_type[dolphinIndex]);
      req.session.dolphin_name[dolphinIndex] = req.body.dolphin_name; // The name of the dolphin, so picture is later on assignable to a dolphin
      console.log(req.session.dolphin_name[dolphinIndex]);
      cb(
        null, // currently no error handling
        `${uniqueSuffix}${path.extname(
          file.originalname
        )}`
      );
      
      // Save photo path in session storage for later access in good_health.js to save the photo paths in the database
      const apiUrl = process.env.MYSQL_HOST + ':' + process.env.HTTP_PORT;
      if(req.session.photo_type[dolphinIndex] === 'eye'){
        console.log('I am here: ' + req.session.photo_path.eye_photo_path[dolphinIndex]);
        if(!req.session.photo_path.eye_photo_path[dolphinIndex]){//req.session.photo_path.eye_photo_path[dolphinIndex] === ''){ //If empty, so session storage has just been initialized
          //First photo in the list
          req.session.photo_path.eye_photo_path[dolphinIndex] = apiUrl + '/images/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        } else {
          //Commaseparated list of photo paths if several photos to upload
          req.session.photo_path.eye_photo_path[dolphinIndex] = req.session.photo_path.eye_photo_path[dolphinIndex] + ',' + apiUrl + '/images/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        }
        console.log(req.session.photo_path.eye_photo_path[dolphinIndex]);
      }
      if(req.session.photo_type[dolphinIndex] === 'teeth'){
        console.log('I am here: photo_path: ' + req.session.photo_path.teeth_photo_path[dolphinIndex]);
        if(!req.session.photo_path.teeth_photo_path[dolphinIndex]){//req.session.photo_path.teeth_photo_path[dolphinIndex] === ''){ //If empty, so session storage has just been initialized
          //First photo in the list
          console.log('I am here now');
          req.session.photo_path.teeth_photo_path[dolphinIndex] = apiUrl + '/images/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        } else {
          //Commaseparated list of photo paths if several photos to upload
          req.session.photo_path.teeth_photo_path[dolphinIndex] = req.session.photo_path.teeth_photo_path[dolphinIndex] + ',' + apiUrl + '/images/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        }
        console.log(req.session.photo_path.teeth_photo_path[dolphinIndex]);
      }
      if(req.session.photo_type[dolphinIndex] === 'marks'){
        console.log('I am here: ' + req.session.photo_path.marks_photo_path[dolphinIndex]);
        if(!req.session.photo_path.marks_photo_path[dolphinIndex]){//req.session.photo_path.marks_photo_path[dolphinIndex] === ''){ //If empty, so session storage has just been initialized
          //First photo in the list
          req.session.photo_path.marks_photo_path[dolphinIndex] = apiUrl + '/images/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        } else {
          //Commaseparated list of photo paths if several photos to upload
          req.session.photo_path.marks_photo_path[dolphinIndex] = req.session.photo_path.marks_photo_path[dolphinIndex] + ',' + apiUrl + '/images/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        }
        console.log(req.session.photo_path.marks_photo_path[dolphinIndex]);
    }
    fileIndex++; //increment the index to get the next photo filename
	},
});

// init upload
const upload = multer({
	storage: storage
	// set the size limit of picture
	// limits: { fileSize: 10000000 },
});

const uploadMultiple = upload.array('files');

async function uploadPhoto(req, res, next) {
    
  /*req.session.photo_type = []; // Reset the photo_path in session storage, so no duplicate photo paths
  req.session.dolphin_name = [];
  req.session.photo_path = {
    eye_photo_path: [],
    teeth_photo_path: [],
    marks_photo_path: []
  };*/
  fileIndex = 0; // Reset the index before each photo upload

    //console.log('Dolphin name: ' + req.body);
    



      try {
        //console.log(req.body);
        //console.log('Photo path accessed  from session storage: ' + photo_path.eye_photo_path.toString());
    
        //console.log(photo_type); // Either 'eye' or 'teeth'

      uploadMultiple(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          res.sendStatus(401); 
        } else if (err) {
          // An unknown error occurred when uploading.
          res.sendStatus(500); 
        } else {
          // Everything went fine.
          console.log('File uploaded successfully');
          for (let i = 0; i <= req.session.dolphinIndex; i++) {
            console.log('Session storage: dolphinIndex = ', i);
            console.log('Session storage: photo_type = ', req.session.photo_type[i]);
            console.log('Session storage: dolphin_name = ', req.session.dolphin_name[i]);
            console.log('Session storage: eye_photo_path = ', req.session.photo_path.eye_photo_path[i]);
            console.log('Session storage: teeth_photo_path = ', req.session.photo_path.teeth_photo_path[i]);
            console.log('Session storage: marks_photo_path = ', req.session.photo_path.marks_photo_path[i]);
          }
          req.session.dolphinIndex++; //increment the index to go to next photo upload for different dolphin
          res.sendStatus(201); //picture uploaded successfully
          }
          })
      } catch (error) {
      console.error(error);
      // An unknown error occurred
      res.sendStatus(500);
      }
    
    //res.sendStatus(201); //picture(s) uploaded successfully
    
}

module.exports = uploadPhoto;
