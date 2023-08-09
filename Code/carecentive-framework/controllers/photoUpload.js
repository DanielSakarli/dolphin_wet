const { isUserAuth } = require('./authSwitch');
const multer = require('multer');
const path = require('path');

// set storage engine
const storage = multer.diskStorage({
	destination: './uploads/',
	filename: function (req, file, cb) {
		const { test_date, test_name } = req.body;
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(
			null,
			`${test_date}%${test_name}%${uniqueSuffix}${path.extname(
				file.originalname
			)}`
		);
	},
});

// init upload
const upload = multer({
	storage: storage,
	// set the size limit of picture
	// limits: { fileSize: 10000000 },
}).array('files');

/**
 * Validates whether a input date conforms the format of yyyy-mm-dd.
 * @param {String} dateString
 * @returns True if the input conforms the format, otherwise return false
 */
function postPhotoValidateRequestBodyDate(dateString) {
	// Regular expression pattern to match the format yyyy-mm-dd
	const pattern = /^\d{4}-\d{2}-\d{2}$/;

	// Check if the dateString matches the pattern
	return pattern.test(dateString);
}

/**
 * Validates the input test name.
 * @param {String} testNameString
 * @returns
 */
function postPhotoValidateRequestBodyTestName(testNameString) {
	// TODO: talk with frontend, complete the validation logic.
	return true;
}

/**
 * Controller of post request of /api/photo.
 */
function setPhoto(req, res, next) {
	try {
		// After gone through the authenticateToken middleware
		// the data of user is in the req.authData
		let user_id;
		if (isUserAuth) {
			user_id = req.authData.user_id;
		} else {
			user_id = 1;
		}

		upload(req, res, (err) => {
			if (err) {
				res.status(400).json({ error: err.message });
			} else {
				const { test_date, test_name } = req.body;

				if (!postPhotoValidateRequestBodyDate(test_date)) {
					res.status(400).json({ error: 'Invalid test date' });
				}
				if (!postPhotoValidateRequestBodyTestName(test_name)) {
					res.status(400).json({ error: 'Invalid test name' });
				}

				res.status(201).json({ success: 'Photo uploaded successfully' });
			}
		});
	} catch (error) {
		next(error);
	}
}

module.exports = { setPhoto, storage, upload };
