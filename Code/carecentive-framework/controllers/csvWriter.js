const path = require('path');
const nodemailer = require('nodemailer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const DolphinService = require('../services/DolphinService');
const GoodFeedingService = require('../services/GoodFeedingService');
const GoodHousingService = require('../services/GoodHousingService');
const GoodHealthService = require('../services/GoodHealthService');
const BehaviourService = require('../services/BehaviourService');
const { validationResult } = require('express-validator');
const { isUserAuth } = require('./authSwitch');
const User = require('../node_modules/@carecentive/carecentive-core/models/User');


async function csvWriter(req, res, next) {
	/*const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// Handle validation errors
		return res.status(400).json({ errors: errors.array() });
	}*/

	let userID;
	let userName;
	let userEmail;
	userName = req.body.user_name;
	userEmail = await User.query().where('name', userName).select('email').first();
	console.log('user email: ', userEmail);
	/*if (isUserAuth) {
		console.log('authdata: ', req.authData);
		const { user_id, name } = req.authData;
		
		userID = user_id;
		userName = name;
		// Get user email
		userEmail = await User.query().where('name', userName).select('email').first();
		
		console.log('user name: ', userName);
	} else {
		userID = 1;
	}*/

	// Email configuration
	const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'dolphin.wet.app@gmail.com',
		pass: 'jtmz ywlc wwyn qtuc'
	}
	});

	
	let data = [];
	let savePath;
	let resultFeeding;
	let resultHousing;
	let resultHealth;
	let resultBehaviour;
	let resultEmotions;
	let csvWriter;
	let { dolphin_name, numMonths, section } = req.body;
	
	if(section === 'feeding') {
	if (numMonths != '') {
		if(dolphin_name != ''){
			// Data of a specific dolphin_name and specific numMonths
			resultFeeding = await GoodFeedingService.getTestResultNMonths(dolphin_name, numMonths);
		} else {
			// Data of all dolphins and specific numMonths
			resultFeeding = await GoodFeedingService.getAllTestResultNMonths(numMonths);
		}

		// Save resultFeeding in data
		for (const month in resultFeeding) {
			data.push(...resultFeeding[month]);
		}
		resultFeeding = null; //reset feeding results
	} else {
		if(dolphin_name != '')
		{
			resultFeeding = await GoodFeedingService.getTestResultByDolphin(dolphin_name);
		} else {
			resultFeeding = await GoodFeedingService.getAllTestResults();
		}

		//console.log('result feeding: ', resultFeeding);
		data = resultFeeding; //save the results of feeding tests in data
		resultFeeding = null; //reset feedig results
	}
	savePath = 'csv/Feeding_' + Date.now() + '.csv';
	csvWriter = createCsvWriter({
		
		path: savePath,
		header: [
			{id: 'feeding_record_id', title: 'Feeding Record ID'},
			{id: 'user_id', title: 'User ID'},
			{id: 'user_name', title: 'User Name'},
			{id: 'dolphin_id', title: 'Dolphin ID'},
			{id: 'dolphin_name', title: 'Dolphin Name'},
			{id: 'body_condition_score', title: 'Body Condition Score'},
			{id: 'weight_measured', title: 'Weight Measured'},
			{id: 'kcal_calculations', title: 'Kcal Calculations'},
			{id: 'blood_hydration', title: 'Blood Hydration'},
			{id: 'fish_quality', title: 'Fish Quality'},
			{id: 'fish_variety', title: 'Fish Variety'},
			{id: 'body_condition_score_comments', title: 'Body Condition Score Comments'},
			{id: 'weight_measured_comments', title: 'Weight Measured Comments'},
			{id: 'kcal_calculations_comments', title: 'Kcal Calculations Comments'},
			{id: 'blood_hydration_comments', title: 'Blood Hydration Comments'},
			{id: 'fish_quality_comments', title: 'Fish Quality Comments'},
			{id: 'fish_variety_comments', title: 'Fish Variety Comments'},
			{id: 'created_at', title: 'Created At'},
			{id: 'updated_at', title: 'Updated At'}
		]
	});
	}


	if(section === 'housing') {
		if (numMonths != '') {
			if(dolphin_name != ''){
				// Data of a specific dolphin_name and specific numMonths
				resultHousing = await GoodHousingService.getTestResultNMonths(dolphin_name, numMonths);
			} else {
				// Data of all dolphins and specific numMonths
				resultHousing = await GoodHousingService.getAllTestResultNMonths(numMonths);
			}
	
			// Save resultFeeding in data
			for (const month in resultHousing) {
				data.push(...resultHousing[month]);
			}
			resultHousing = null; //reset feeding results
		} else {
			if(dolphin_name != '')
			{
				resultHousing = await GoodHousingService.getTestResultByDolphin(dolphin_name);
			} else {
				resultHousing = await GoodHousingService.getAllTestResults();
			}
	
			//console.log('result feeding: ', resultFeeding);
			data = resultHousing; //save the results of feeding tests in data
			resultHousing = null; //reset feedig results
		}
	savePath = 'csv/Housing_' + Date.now() + '.csv'
		csvWriter = createCsvWriter({
			path: savePath,
			header: [
				{id: 'housing_record_id', title: 'Housing Record ID'},
				{id: 'user_id', title: 'User ID'},
				{id: 'user_name', title: 'User Name'},
				{id: 'dolphin_id', title: 'Dolphin ID'},
				{id: 'dolphin_name', title: 'Dolphin Name'},
				{id: 'enclosure_barrier_safety', title: 'Enclosure Barrier Safety'},
				{id: 'foreign_body_ingestion', title: 'Foreign Body Ingestion'},
				{id: 'pool_design', title: 'Pool Design'},
				{id: 'forced_loneliness', title: 'Forced Loneliness'},
				{id: 'water_quality', title: 'Water Quality'},
				{id: 'water_temperature', title: 'Water Temperature'},
				{id: 'sufficient_shade', title: 'Sufficient Shade'},
				{id: 'acoustic_comfort', title: 'Acoustic Comfort'},
				//Comments
				{id: 'enclosure_barrier_safety_comments', title: 'Enclosure Barrier Safety Comments'},
				{id: 'foreign_body_ingestion_comments', title: 'Foreign Body Ingestion Comments'},
				{id: 'pool_design_comments', title: 'Pool Design Comments'},
				{id: 'forced_loneliness_comments', title: 'Forced Loneliness Comments'},
				{id: 'water_quality_comments', title: 'Water Quality Comments'},
				{id: 'water_temperature_comments', title: 'Water Temperature Comments'},
				{id: 'sufficient_shade_comments', title: 'Sufficient Shade Comments'},
				{id: 'acoustic_comfort_comments', title: 'Acoustic Comfort Comments'},
				{id: 'created_at', title: 'Created At'},
				{id: 'updated_at', title: 'Updated At'}
			]
		});
	}


	if(section === 'health') {
			if (numMonths != '') {
				if(dolphin_name != ''){
					// Data of a specific dolphin_name and specific numMonths
					resultHealth = await GoodHealthService.getTestResultNMonths(dolphin_name, numMonths);
				} else {
					// Data of all dolphins and specific numMonths
					resultHealth = await GoodHealthService.getAllTestResultNMonths(numMonths);
				}
		
				// Save resultHealth in data
				for (const month in resultHealth) {
					data.push(...resultHealth[month]);
				}
				resultHealth = null; //reset health results
			} else {
				if(dolphin_name != '')
				{
					resultHealth = await GoodHealthService.getTestResultByDolphin(dolphin_name);
				} else {
					resultHealth = await GoodHealthService.getAllTestResults();
				}
		
				//console.log('result feeding: ', resultFeeding);
				data = resultHealth; //save the results of feeding tests in data
				resultHealth = null; //reset feedig results
			}
			savePath = 'csv/Health_' + Date.now() + '.csv';
			csvWriter = createCsvWriter({
				path: savePath,
				header: [
					{id: 'health_record_id', title: 'Health Record ID'},
					{id: 'user_id', title: 'User ID'},
					{id: 'user_name', title: 'User Name'},
					{id: 'dolphin_id', title: 'Dolphin ID'},
					{id: 'dolphin_name', title: 'Dolphin Name'},
					{id: 'normal_floatability', title: 'Normal Floatability'},
					{id: 'eye_lesions', title: 'Eye Lesions'},
					{id: 'visual_cues', title: 'Visual Cues'},
					{id: 'mouth_exam', title: 'Mouth Exam'},
					{id: 'gastric_abnormality', title: 'Gastric Abnormality'},
					{id: 'respiratory_disease', title: 'Respiratory Disease'},
					{id: 'force_expiration', title: 'Force Expiration'},
					{id: 'external_disease_signs', title: 'External Disease Signs'},
					//Comments
					{id: 'normal_floatability_comments', title: 'Normal Floatability Comments'},
					{id: 'eye_lesions_comments', title: 'Eye Lesions Comments'},
					{id: 'visual_cues_comments', title: 'Visual Cues Comments'},
					{id: 'mouth_exam_comments', title: 'Mouth Exam Comments'},
					{id: 'gastric_abnormality_comments', title: 'Gastric Abnormality Comments'},
					{id: 'respiratory_disease_comments', title: 'Respiratory Disease Comments'},
					{id: 'force_expiration_comments', title: 'Force Expiration Comments'},
					{id: 'external_disease_signs_comments', title: 'External Disease Signs Comments'},
					//Photo paths
					{id: 'eye_photo_path', title: 'Eye Photo Path'},
					{id: 'teeth_photo_path', title: 'Teeth Photo Path'},
					{id: 'created_at', title: 'Created At'},
					{id: 'updated_at', title: 'Updated At'}
				]
			});
		}
		


	csvWriter
		.writeRecords(data)
		.then(() => {
			console.log('...Done');
			res.download(savePath);

			 // Send email with CSV file as attachment
			 let mailOptions = {
				from: '"Dolphin WET App" <dolphin.wet.app@gmail.com>', // sender address
				to: userEmail.email, // list of receivers
				subject: 'Dolphin WET App: CSV file with your data', // Subject line
				text: 'Here is the CSV file you requested.', // plain text body
				attachments: [
				  {
					filename: path.basename(savePath),
					path: savePath, // stream this file
				  },
				],
			  };
			  
			  // Sends the mail
			  transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
				  console.log(error);
				  res.sendStatus(500);
				} else {
				  console.log('Email sent: ' + info.response);
				  res.sendStatus(200);
				}
			  });


		})
		.catch(error => {
			console.log(error);
			res.sendStatus(500);
		});
}

module.exports = csvWriter;
