const path = require('path');
const nodemailer = require('nodemailer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const DolphinService = require('../services/DolphinService');
const GoodFeedingService = require('../services/GoodFeedingService');
const GoodHousingService = require('../services/GoodHousingService');
const GoodHealthService = require('../services/GoodHealthService');
const BehaviourService = require('../services/BehaviourService');
const EmotionalStateService = require('../services/EmotionalStateService');
//const { validationResult } = require('express-validator');
const { isUserAuth } = require('./authSwitch');
const User = require('../carecentive/carecentive-core/models/User');


async function csvWriter(req, res, next) {
	/*const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// Handle validation errors
		return res.status(400).json({ errors: errors.array() });
	}*/
	try {
		// After gone through the authenticateToken middleware
		// the user data of user is in the req.authData
		if (isUserAuth) {
            let userID;
			let userName;
			const roleName = req.role;
			let { dolphin_name, numMonths, section } = req.query;
			const { user_id, name } = req.authData;
			console.log('authdata: ', req.authData);
			userID = user_id;
			userName = name;
		// If dolphin is not existing in database,
		// 400: bad request
		const isDolphinExisted = await DolphinService.isDolphinExisted(
			dolphin_name
		);
		if (!isDolphinExisted) {
			res.status(400).json({ error: `Dolphin ${dolphin_name} does not exist` });
		}

	console.log('req params: ', dolphin_name, numMonths, section);
	const userEmail = await User.query().where('name', userName).select('email').first();
	//console.log('user email: ', userEmail);

	// Email configuration
	const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'dolphin.wet.app@gmail.com',
		pass: process.env.EMAIL_PASSWORD
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
	
	
	if(section === 'Nutrition') {
	if (numMonths != '') {
		if(dolphin_name != ''){
			// Data of a specific dolphin_name and specific numMonths
			resultFeeding = await GoodFeedingService.getTestResultNMonths(dolphin_name, numMonths, roleName);
		} else {
			// Data of all dolphins and specific numMonths
			resultFeeding = await GoodFeedingService.getAllTestResultNMonths(numMonths, roleName);
		}

		// Save resultFeeding in data
		for (const month in resultFeeding) {
			data.push(...resultFeeding[month]);
		}
		resultFeeding = null; //reset feeding results
	} else {
		if(dolphin_name != '')
		{
			resultFeeding = await GoodFeedingService.getTestResultByDolphin(dolphin_name, roleName);
		} else {
			resultFeeding = await GoodFeedingService.getAllTestResults(roleName);
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
			{id: 'file_path', title: 'File Path'},
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


	if(section === 'Environment') {
		if (numMonths != '') {
			if(dolphin_name != ''){
				// Data of a specific dolphin_name and specific numMonths
				resultHousing = await GoodHousingService.getTestResultNMonths(dolphin_name, numMonths, roleName);
			} else {
				// Data of all dolphins and specific numMonths
				resultHousing = await GoodHousingService.getAllTestResultNMonths(numMonths, roleName);
			}
	
			// Save resultFeeding in data
			for (const month in resultHousing) {
				data.push(...resultHousing[month]);
			}
			resultHousing = null; //reset feeding results
		} else {
			if(dolphin_name != '')
			{
				resultHousing = await GoodHousingService.getTestResultByDolphin(dolphin_name, roleName);
			} else {
				resultHousing = await GoodHousingService.getAllTestResults(roleName);
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


	if(section === 'Health') {
			if (numMonths != '') {
				if(dolphin_name != ''){
					// Data of a specific dolphin_name and specific numMonths
					resultHealth = await GoodHealthService.getTestResultNMonths(dolphin_name, numMonths, roleName);
				} else {
					// Data of all dolphins and specific numMonths
					resultHealth = await GoodHealthService.getAllTestResultNMonths(numMonths, roleName);
				}
		
				// Save resultHealth in data
				for (const month in resultHealth) {
					data.push(...resultHealth[month]);
				}
				resultHealth = null; //reset health results
			} else {
				if(dolphin_name != '')
				{
					resultHealth = await GoodHealthService.getTestResultByDolphin(dolphin_name, roleName);
				} else {
					resultHealth = await GoodHealthService.getAllTestResults(roleName);
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
					{id: 'records_normal_floatability', title: 'Records Normal Floatability'},
					{id: 'inspection_eye_lesions', title: 'Inspection Eye Lesions'},
					{id: 'response_visual_cues', title: 'Response Visual Cues'},
					{id: 'records_eye_lesions', title: 'Records Eye Lesions'},
					{id: 'mouth_exam', title: 'Mouth Exam'},
					{id: 'records_oral_lesions', title: 'Records Oral Lesions'},
					{id: 'records_gastric_abnormality', title: 'Records Gastric Abnormality'},
					{id: 'inspection_respiratory', title: 'Inspection Respiratory Disease'},
					{id: 'force_expiration', title: 'Forced Expiration'},
					{id: 'records_respiratory_disease', title: 'Records Respiratory Disease'},
					{id: 'inspection_marks', title: 'Rake marks'},
					{id: 'records_external_disease', title: 'Records External Disease Signs'},

					//Comments
					{id: 'normal_floatability_comments', title: 'Normal Floatability Comments'},
					{id: 'records_normal_floatability_comments', title: 'Records Normal Floatability Comments'},
					{id: 'inspection_eye_lesions_comments', title: 'Inspection Eye Lesions Comments'},
					{id: 'response_visual_cues_comments', title: 'Response Visual Cues Comments'},
					{id: 'records_eye_lesions_comments', title: 'Records Eye Lesions Comments'},
					{id: 'mouth_exam_comments', title: 'Mouth Exam Comments'},
					{id: 'records_oral_lesions_comments', title: 'Records Oral Lesions Comments'},
					{id: 'records_gastric_abnormality_comments', title: 'Records Gastric Abnormality Comments'},
					{id: 'inspection_respiratory_comments', title: 'Inspection Respiratory Disease Comments'},
					{id: 'force_expiration_comments', title: 'Forced Expiration Comments'},
					{id: 'records_respiratory_disease_comments', title: 'Records Respiratory Disease Comments'},
					{id: 'inspection_marks_comments', title: 'Rake marks Comments'},
					{id: 'records_external_disease_comments', title: 'Records External Disease Signs Comments'},
					
					//Photo paths
					{id: 'eye_photo_path', title: 'Eye Photo Path'},
					{id: 'teeth_photo_path', title: 'Teeth Photo Path'},
					{id: 'marks_photo_path', title: 'Marks Photo Path'},
					{id: 'created_at', title: 'Created At'}
				]
			});
		}
	
		if(section === 'Behaviour') {
			if (numMonths != '') {
				if(dolphin_name != ''){
					// Data of a specific dolphin_name and specific numMonths
					resultBehaviour = await BehaviourService.getTestResultNMonths(dolphin_name, numMonths, roleName);
				} else {
					// Data of all dolphins and specific numMonths
					resultBehaviour = await BehaviourService.getAllTestResultNMonths(numMonths, roleName);
				}
		
				// Save resultBehaviour in data
				for (const month in resultBehaviour) {
					data.push(...resultBehaviour[month]);
				}
				resultBehaviour = null; //reset Behaviour results
			} else {
				if(dolphin_name != '')
				{
					resultBehaviour = await BehaviourService.getTestResultByDolphin(dolphin_name, roleName);
				} else {
					resultBehaviour = await BehaviourService.getAllTestResults(roleName);
				}
		
				//console.log('result Behaviour: ', resultBehaviour);
				data = resultBehaviour; //save the results of Behaviour tests in data
				resultBehaviour = null; //reset Behaviour results
			}
			savePath = 'csv/Behaviour_' + Date.now() + '.csv';
			csvWriter = createCsvWriter({
				
				path: savePath,
				header: [
					{id: 'behaviour_record_id', title: 'Behaviour Record ID'},
					{id: 'user_id', title: 'User ID'},
					{id: 'user_name', title: 'User Name'},
					{id: 'dolphin_id', title: 'Dolphin ID'},
					{id: 'dolphin_name', title: 'Dolphin Name'},
					// Data
					{id: 'environmental_enrichment', title: 'Environmental Enrichment'},
					{id: 'affiliative_behaviour', title: 'Affiliative Behaviour'},
					{id: 'play_behaviour', title: 'Play Behaviour'},
					{id: 'socio_sexual_behaviour', title: 'Socio Sexual Behaviour'},
					{id: 'maternal_behaviour', title: 'Maternal Behaviour'},
					{id: 'displacement_behaviour', title: 'Displacement Behaviour'},
					{id: 'oral_stereotypic_behaviour', title: 'Oral Stereotypic Behaviour'},
					{id: 'repetitive_body_movement', title: 'Repetitive Body Movement'},
					{id: 'self_grooming_behaviour', title: 'Self Grooming Behaviour'},
					{id: 'regurgitation_reingestion', title: 'Regurgitation Reingestion'},
					{id: 'rake_marks', title: 'Rake Marks'},
					{id: 'displaying_aggressive_behaviour', title: 'Displaying Aggressive Behaviour'},
					{id: 'receiving_aggressive_behaviour', title: 'Receiving Aggressive Behaviour'},
					{id: 'social_isolation', title: 'Social Isolation'},
					{id: 'avoidance_pool_areas', title: 'Avoidance Pool Areas'},
					// Comments
					{id: 'environmental_enrichment_comments', title: 'Environmental Enrichment Comments'},
					{id: 'affiliative_behaviour_comments', title: 'Affiliative Behaviour Comments'},
					{id: 'play_behaviour_comments', title: 'Play Behaviour Comments'},
					{id: 'socio_sexual_behaviour_comments', title: 'Socio Sexual Behaviour Comments'},
					{id: 'maternal_behaviour_comments', title: 'Maternal Behaviour Comments'},
					{id: 'displacement_behaviour_comments', title: 'Displacement Behaviour Comments'},
					{id: 'oral_stereotypic_behaviour_comments', title: 'Oral Stereotypic Behaviour Comments'},
					{id: 'repetitive_body_movement_comments', title: 'Repetitive Body Movement Comments'},
					{id: 'self_grooming_behaviour_comments', title: 'Self Grooming Behaviour Comments'},
					{id: 'regurgitation_reingestion_comments', title: 'Regurgitation Reingestion Comments'},
					{id: 'rake_marks_comments', title: 'Rake Marks Comments'},
					{id: 'displaying_aggressive_behaviour_comments', title: 'Displaying Aggressive Behaviour Comments'},
					{id: 'receiving_aggressive_behaviour_comments', title: 'Receiving Aggressive Behaviour Comments'},
					{id: 'social_isolation_comments', title: 'Social Isolation Comments'},
					{id: 'avoidance_pool_areas_comments', title: 'Avoidance Pool Areas Comments'},
					// Timestamps
					{id: 'created_at', title: 'Created At'},
					{id: 'updated_at', title: 'Updated At'}
				]
			});
			}

			if(section === 'Emotional State') {
				if (numMonths != '') {
					if(dolphin_name != ''){
						// Data of a specific dolphin_name and specific numMonths
						resultEmotions = await EmotionalStateService.getTestResultNMonths(dolphin_name, numMonths, roleName);
					} else {
						// Data of all dolphins and specific numMonths
						resultEmotions = await EmotionalStateService.getAllTestResultNMonths(numMonths, roleName);
					}
			
					// Save resultEmotions in data
					for (const month in resultEmotions) {
						data.push(...resultEmotions[month]);
					}
					resultEmotions = null; //reset EmotionalState results
				} else {
					if(dolphin_name != '')
					{
						resultEmotions = await EmotionalStateService.getTestResultByDolphin(dolphin_name, roleName);
					} else {
						resultEmotions = await EmotionalStateService.getAllTestResults(roleName);
					}
			
					//console.log('result Emotions: ', resultEmotions);
					data = resultEmotions; //save the results of Behaviour tests in data
					resultEmotions = null; //reset emotions results
				}
				savePath = 'csv/Mental_State_' + Date.now() + '.csv';
				csvWriter = createCsvWriter({
					
					path: savePath,
					header: [
						{id: 'emotional_state_record_id', title: 'Mental State Record ID'},
						{id: 'user_id', title: 'User ID'},
						{id: 'user_name', title: 'User Name'},
						{id: 'dolphin_id', title: 'Dolphin ID'},
						{id: 'dolphin_name', title: 'Dolphin Name'},
						// Data
						{id: 'willingness_to_participate', title: 'Willingness to Participate'},
						{id: 'synchronous_swimming', title: 'Synchronous Swimming'},
						{id: 'rubbing_behaviour', title: 'Rubbing Behaviour'},
						{id: 'anticipatory_behaviour', title: 'Anticipatory Behaviour'},
						{id: 'fast_swimming', title: 'Fast Swimming'},
						{id: 'tail_slapping', title: 'Tail Slapping'},
						{id: 'choice_and_control', title: 'Choice and Control'},
						
						// Comments
						{id: 'willingness_to_participate_comments', title: 'Willingness to Participate Comments'},
						{id: 'synchronous_swimming_comments', title: 'Synchronous Swimming Comments'},
						{id: 'rubbing_behaviour_comments', title: 'Rubbing Behaviour Comments'},
						{id: 'anticipatory_behaviour_comments', title: 'Anticipatory Behaviour Comments'},
						{id: 'fast_swimming_comments', title: 'Fast Swimming Comments'},
						{id: 'tail_slapping_comments', title: 'Tail Slapping Comments'},
						{id: 'choice_and_control_comments', title: 'Choice and Control Comments'},
						
						// Timestamps
						{id: 'created_at', title: 'Created At'},
						{id: 'updated_at', title: 'Updated At'}
					]
				});
				}

	data.sort((a, b) => a.created_at - b.created_at);
	console.log('data: ', ...data);
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
		} else {
			throw new Error('USER_IS_NOT_AUTHENTICATED');
		}

		} catch (error) {
			console.error(error);
			res.sendStatus(500);
		}
	}

	module.exports = csvWriter;
