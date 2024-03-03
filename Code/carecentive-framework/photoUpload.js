const path = require('path');
const multer = require('multer');
let photo_path;
let photo_type;
let currentIndex = 0;

// set storage engine
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		  cb(null, './uploads/')
	},
	filename: (req, file, cb) => {
      /*if(req.session.photo_path.eye_photo_path) {
      photo_path = req.session.photo_path.eye_photo_path[currentIndex];
      console.log(photo_path);
      }
      if(req.session.photo_path.teeth_photo_path) {
      photo_path = req.session.photo_path.teeth_photo_path[currentIndex];
      console.log(photo_path);
      }*/
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      req.session.photo_type = req.body.photo_type; // Either 'eye' or 'teeth'
      console.log(req.session.photo_type);
      req.session.dolphin_name = req.body.dolphin_name; // The name of the dolphin, so picture is later on assignable to a dolphin
      console.log(req.session.dolphin_name);
      cb(
        null, // currently no error handling
        `${uniqueSuffix}${path.extname(
          file.originalname
        )}`
      );
      
      // Save photo path in session storage for later access in good_health.js to save the photo paths in the database
      if(req.session.photo_type === 'eye'){
        console.log('I am here: ' + req.session.photo_path.eye_photo_path);
        if(req.session.photo_path.eye_photo_path === ''){ //If empty, so session storage has just been initialized
          //First photo in the list
          req.session.photo_path.eye_photo_path = 'uploads/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        } else {
          //Commaseparated list of photo paths if several photos to upload
          req.session.photo_path.eye_photo_path = req.session.photo_path.eye_photo_path + ',' + 'uploads/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        }
        console.log(req.session.photo_path.eye_photo_path);
      }
      if(req.session.photo_type === 'teeth'){
        console.log('I am here');
        if(req.session.photo_path.teeth_photo_path === ''){ //If empty, so session storage has just been initialized
          //First photo in the list
          console.log('I am here');
          req.session.photo_path.teeth_photo_path = 'uploads/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        } else {
          //Commaseparated list of photo paths if several photos to upload
          req.session.photo_path.teeth_photo_path = req.session.photo_path.teeth_photo_path + ',' + 'uploads/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        }
        console.log(req.session.photo_path.teeth_photo_path);
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

async function uploadPhoto(req, res, next) {
    try {
    //console.log(req.body);
    
    req.session.photo_type = ''; // Reset the photo_path in session storage, so no duplicate photo paths
    req.session.dolphin_name = '';
    req.session.photo_path = {
      eye_photo_path: '',
      teeth_photo_path: ''
    };
    currentIndex = 0; // Reset the index before each photo upload
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
        res.sendStatus(201); //picture uploaded successfully
        }
    })
    } catch (error) {
    console.error(error);
    // An unknown error occurred
    res.sendStatus(500);
    }
}

module.exports = uploadPhoto;
