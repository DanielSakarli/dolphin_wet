// Test Photo Upload
const path = require('path');
const multer = require('multer');
const axios = require('axios');
//const e = require('express');

// Global variables
let name;
let eye_photo_path;
let result;

// set storage engine
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/')
	},
	filename: (req, file, cb) => {
		//console.log(file.originalname);
		const { test_date, test_name } = req.body;
        //console.log('current date: ' +Date.now());
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		//console.log(req.body.test_date);
		cb(
			null, // currently no error handling
			`${test_date}%${test_name}%${uniqueSuffix}${path.extname(
				file.originalname
			)}`
		);
	},
});

// init upload
const upload = multer({
	storage: storage
	// set the size limit of picture
	// limits: { fileSize: 10000000 },
});

const uploadSingle = upload.single('file');

async function uploadPhoto(req, res) {
    try {
    name = req.query.name;
    console.log('dolphin_name: ' + name);
    console.log('filename: ' + req.file.filename.toString());
    eye_photo_path = req.file.filename.toString();
    result = {
        dolphin_name: name,
        eye_photo_path: eye_photo_path,
    }
    await axios.post('/api/good_health', result, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

    uploadSingle(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        //res.status(400).json({ error: 'Multer error occurred.', message: err.message });
      } else if (err) {
        // An unknown error occurred when uploading.
        //res.status(500).json({ error: 'An error occurred.', message: err.message });
      } else {
            console.log('Response:', response.data);
            res.status(200).json({ message: 'File uploaded successfully.', filename: req.file.filename });
            console.log(req.body);    
        }
    })
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.', message: error.message });
    }


        res.status(200).json({ message: 'File uploaded successfully.', filename: req.file.filename });
        console.log(req.body);
}


async function uploadPhotoPath(req, res) {
    res.status(200).json({ message: 'I got here' });
   /* try {
    // Here I reset the req.body so it doesn´t throw an error
    // while going to the good health controller to insert the
    // photo path in the good_health table of the db
    const name = req.query;
    const eye_photo_path = req.file.filename.toString();
    req.body = null;
    req.body = {
        dolphin_name: name,
        eye_photo_path: eye_photo_path,
    }
    

    const response = await axios.post('/api/good_health', req.body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('Response:', response.data);

    res.status(200).json({ message: 'File uploaded successfully.', filename: req.file.filename });
    console.log(req.body);
    
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.', message: error.message });
    }*/
}

  

module.exports = uploadPhoto;//, uploadPhotoPath };