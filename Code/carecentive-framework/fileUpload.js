const path = require('path');
require('dotenv').config();
const multer = require('multer');
const StorageService = require('./services/StorageService');

let currentIndex = 0;

// set storage engine
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		  cb(null, './uploads/files/')
	},
	filename: async (req, file, cb) => {
    const user_id = req.authData.user_id;
    let storageData = await StorageService.getStorage(user_id);
    console.log('StorageData 1: ', storageData);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      //storageData.dolphin_name = req.body.dolphin_name; // The name of the dolphin, so picture is later on assignable to a dolphin
      if (req.body.dolphin_name.includes(',')) {
        storageData.dolphin_name = req.body.dolphin_name.split(',');
      } else {
        storageData.dolphin_name = req.body.dolphin_name;
      }
      console.log(storageData.dolphin_name);
      cb(
        null, // currently no error handling
        `${uniqueSuffix}${path.extname(
          file.originalname
        )}`
      );
      
      // Save path in session storage for later access in good_feeding.js to save the paths in the database
      const apiUrl = process.env.PHOTO_PATH; //process.env.MYSQL_HOST + ':' + process.env.HTTP_PORT;
      
        console.log('I am here: ' + storageData.file_path);
        if(
            !storageData ||
            !storageData.file_path
          ) {
            //If null, the storage is still empty
            //First file in the list
            storageData.file_path = apiUrl + '/api/files/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        } else {
          //Commaseparated list of paths if several files to upload
          storageData.file_path = storageData.file_path + ',' + apiUrl + '/api/files/' + `${uniqueSuffix}${path.extname(
            file.originalname
          )}`;
        }
        console.log('Setter in fileUpload.js: ', storageData);
        await StorageService.setStorage(user_id, storageData);
        console.log('Saved storageData: ', await StorageService.getStorage(user_id));
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

async function uploadFile(req, res, next) {
    try {
    console.log('Arrived in fileUpload.js');
    
    //req.session.file_path = ''; // Reset the path in session storage, so no duplicate paths
    //req.session.dolphin_name = '';
    currentIndex = 0; // Reset the index before each file upload
    
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
  .then(async result => {
    
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

module.exports = uploadFile;
