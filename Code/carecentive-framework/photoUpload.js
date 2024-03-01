// Test Photo Upload
const path = require('path');
const multer = require('multer');
// set storage engine
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/')
	},
	filename: (req, file, cb) => {
		console.log(file.originalname);
		const { test_date, test_name } = req.body;
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		console.log(req.body.test_date);
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

function uploadPhoto(req, res) {
    uploadSingle(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(400).json({ error: 'Multer error occurred.', message: err.message });
      } else if (err) {
        // An unknown error occurred when uploading.
        res.status(500).json({ error: 'An error occurred.', message: err.message });
      } else {
        // Everything went fine, file uploaded successfully.
        res.status(200).json({ message: 'File uploaded successfully.', filename: req.file.filename });
      }
    });
  }
  
  module.exports = uploadPhoto;