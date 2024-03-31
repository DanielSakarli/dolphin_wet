const { validationResult } = require('express-validator');
const { isUserAuth } = require('./authSwitch');
const GoodHealthService = require('../services/GoodHealthService');
const path = require('path');


/**
 * Controller of get request of /api/images:id.
 * Gets the test result in the database.
 * By default it returns the test results of last three months of the given dolphin.
 */
async function getImages(req, res, next) {
	try {
		const health_record_id = req.query.id;
        const filename = req.query.filename;
        let filenames;
        let index;

        console.log('Health record id: ' + health_record_id);
        
        // Retrieve the image data from the database
        const record = await GoodHealthService.getImages(health_record_id);

        // Split the filenames and images
        if(record.eye_photo_path!= null){
            filenames = record.eye_photo_path.split(',');
            // Find the index of the given filename
            index = filenames.indexOf(filename);
            console.log('Index of the image: ', index);
        }
        if(record.teeth_photo_path!= null){
            filenames = record.teeth_photo_path.split(',');
            // Find the index of the given filename
            index = filenames.indexOf(filename);
            console.log('Index of the image: ', index);
        }
        console.log('Filenames: ', filenames);
        const images = record.image; // Assuming images are stored as an array of Buffers
        console.log('Image array: ', images);

        
        if (index === -1) {
            // The filename was not found
            res.status(404).send('Image not found');
            return;
        }

        // Get the corresponding image
        const imageData = images[index];

        // Set the correct content type
        res.setHeader('Content-Type', 'image/png');

        // Send the image data as a response
        //next(); //Go to next middelware (if there is any)
        console.log('This is the image data in the controller: ', imageData);
        res.send(imageData.image);

	} catch (error) {
		next(error);
	}
}

module.exports = { getImages };
