const path = require('path');
const multer = require('multer');
let photo_path;
let currentIndex = 0;

// set storage engine
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		  cb(null, './uploads/')
	},
	filename: (req, file, cb) => {
      if(req.session.photo_path.eye_photo_path) {
      photo_path = req.session.photo_path.eye_photo_path[currentIndex];
      console.log(photo_path);
      }
      if(req.session.photo_path.teeth_photo_path) {
      photo_path = req.session.photo_path.teeth_photo_path[currentIndex];
      console.log(photo_path);
      }
      cb(
        null, // currently no error handling
        `${photo_path}${path.extname(
          file.originalname
        )}`
      );
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
      currentIndex = 0; // Reset the index before each photo upload
    // Session storage
    //console.log('Photo path accessed  from session storage: ' + photo_path.eye_photo_path.toString());

    uploadMultiple(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.sendStatus(401); 
      } else if (err) {
        // An unknown error occurred when uploading.
        res.sendStatus(500); 
      } else {
            //console.log(req.file.filename.toString()); 
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
