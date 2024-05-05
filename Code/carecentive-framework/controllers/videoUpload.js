const path = require('path');
require('dotenv').config();
const multer = require('multer');
let currentIndex = 0;

// set storage engine
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		  cb(null, './uploads/videos/')
	},
	filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      req.session.dolphin_name = req.body.dolphin_name; // The name of the dolphin, so picture is later on assignable to a dolphin
      if (req.body.dolphin_name.includes(',')) {
        req.session.dolphin_name = req.body.dolphin_name.split(',');
      } else {
        req.session.dolphin_name = req.body.dolphin_name;
      }
      console.log(req.session.dolphin_name);
      cb(
        null, // currently no error handling
        `${uniqueSuffix}${path.extname(
          file.originalname
        )}`
      );
      
      // Save path in session storage for later access in good_feeding.js to save the paths in the database
      const apiUrl = process.env.PHOTO_PATH; //process.env.MYSQL_HOST + ':' + process.env.HTTP_PORT;
      
        console.log('I am here: ' + req.session.video_path);
        if(req.session.video_path === ''){ //If empty, so session storage has just been initialized
          //First path in the list
          req.session.video_path = apiUrl + '/api/videos/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        } else {
          //Commaseparated list of paths if several video files to upload
          req.session.video_path = req.session.video_path + ',' + apiUrl + '/api/videos/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        }
        console.log(req.session.video_path);
    currentIndex++; //increment the index to get the next filename
	},
});

// init upload
const upload = multer({
	storage: storage,
	// set the size limit of picture
	limits: { fileSize: 10000000 },
});

const uploadMultiple = upload.array('files');

async function uploadVideo(req, res, next) {
    try {
    //console.log(req.body);
    
    req.session.video_path = ''; // Reset the path in session storage, so no duplicate paths
    req.session.dolphin_name = '';
    currentIndex = 0; // Reset the index before each file upload
    

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

module.exports = { uploadVideo };
