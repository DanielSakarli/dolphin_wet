const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const createCsvWriter = require('csv-writer').createObjectCsvWriter; // write data to CSV file
const fs = require('fs');  // handle file operations
const DolphinService = require('../services/DolphinService');
const GoodFeedingService = require('../services/GoodFeedingService');
const GoodHousingService = require('../services/GoodHousingService');
const GoodHealthService = require('../services/GoodHealthService');
const BehaviourService = require('../services/BehaviourService');
const EmotionalStateService = require('../services/EmotionalStateService');
//const { validationResult } = require('express-validator');
const { isUserAuth } = require('./authSwitch');
const User = require('../carecentive/carecentive-core/models/User');
//const { tr } = require('vuetify/locale');

function formatCreatedAt(dateString) {
    const date = new Date(dateString);
    // Convert to ISO string, remove milliseconds, and replace 'Z' with ' UTC'
    return date.toISOString().split('.')[0] + ' UTC';
}

async function csvWriter(req, res, next) {
	try {
		// After gone through the authenticateToken middleware
		// the user data of user is in the req.authData
		if (isUserAuth) {
            //let userID;
			let userName;
			const roleName = req.role;
			let { dolphin_name, numMonths, section } = req.query;
			
			const { user_id, name } = req.authData;
			console.log('authdata: ', req.authData);
			console.log('dolphin name: ', dolphin_name);
			userID = user_id;
			userName = name;
			console.log('user name: ', userName);
		// If dolphin is not existing in database,
		// 400: bad request
		
		if(dolphin_name && dolphin_name != '') {
			// Only check dolphin_name is not empty. If it is empty it means that
			// the user wants the data of all dolphins
		const isDolphinExisted = await DolphinService.isDolphinExisted(
			dolphin_name,
			roleName
		);
		if (!isDolphinExisted) {
			return res.status(400).json({ error: `Dolphin ${dolphin_name} does not exist` });
		}
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
		user: process.env.EMAIL,
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
		savePath = 'csv/Feeding_' + Date.now() + '.csv';
            
            // Write the header note at the beginning of the file
            const headerNote = 'Attention! There might be several data points during the same day. Filter for the days.\n';
            fs.writeFileSync(savePath, headerNote);  // Write the custom header note

            // Manually append the CSV headers after the header note
            const csvHeaders = [
                'Created At',
                'Feeding Record ID',
                'User ID',
                'User Name',
                'Dolphin ID',
                'Dolphin Name',
                'Body Condition Score',
                'Body Condition Score Comments',
                'Weight Measured',
                'Weight Measured Comments',
                'Kcal Calculations',
                'Kcal Calculations Comments',
                'Blood Hydration',
                'Blood Hydration Comments',
                'Fish Quality',
                'Fish Quality Comments',
                'Fish Variety',
                'Fish Variety Comments',
                'Body Weight Oscillation Score',
                'Body Weight Oscillation past 3 months [%]',
                'Body Weight Oscillation past 12 months [%]',
                'File Path',
            ].join(',') + '\n';
            
            fs.appendFileSync(savePath, csvHeaders);

            if (numMonths != '') {
                if (dolphin_name != '') {
                    // Data of a specific dolphin_name and specific numMonths
                    resultFeeding = await GoodFeedingService.getTestResultNMonths(dolphin_name, numMonths, roleName);
                } else {
                    // Data of all dolphins and specific numMonths
                    resultFeeding = await GoodFeedingService.getAllTestResultNMonths(numMonths, roleName);
                }

                for (const month in resultFeeding) {
                    data.push(...resultFeeding[month]);
                }
                resultFeeding = null; //reset feeding results
            } else {
                if (dolphin_name != '') {
                    resultFeeding = await GoodFeedingService.getTestResultByDolphin(dolphin_name, roleName);
                } else {
                    resultFeeding = await GoodFeedingService.getAllTestResults(roleName);
                }
                data = resultFeeding;
                resultFeeding = null; //reset feeding results
            }

            // Now create the CSV writer to append data
            csvWriter = createCsvWriter({
                path: savePath,
                append: true,
                header: [
                    { id: 'created_at', title: 'Created At' },
                    { id: 'feeding_record_id', title: 'Feeding Record ID' },
                    { id: 'user_id', title: 'User ID' },
                    { id: 'user_name', title: 'User Name' },
                    { id: 'dolphin_id', title: 'Dolphin ID' },
                    { id: 'dolphin_name', title: 'Dolphin Name' },
                    { id: 'body_condition_score', title: 'Body Condition Score' },
                    { id: 'body_condition_score_comments', title: 'Body Condition Score Comments' },
                    { id: 'weight_measured', title: 'Weight Measured' },
                    { id: 'weight_measured_comments', title: 'Weight Measured Comments' },
                    { id: 'kcal_calculations', title: 'Kcal Calculations' },
                    { id: 'kcal_calculations_comments', title: 'Kcal Calculations Comments' },
                    { id: 'blood_hydration', title: 'Blood Hydration' },
                    { id: 'blood_hydration_comments', title: 'Blood Hydration Comments' },
                    { id: 'fish_quality', title: 'Fish Quality' },
                    { id: 'fish_quality_comments', title: 'Fish Quality Comments' },
                    { id: 'fish_variety', title: 'Fish Variety' },
                    { id: 'fish_variety_comments', title: 'Fish Variety Comments' },
                    { id: 'bwo_score', title: 'Body Weight Oscillation Score' },
                    { id: 'bwo_3_months', title: 'Body Weight Oscillation past 3 months [%]' },
                    { id: 'bwo_12_months', title: 'Body Weight Oscillation past 12 months [%]' },
                    { id: 'file_path', title: 'File Path' },
                ]
            });
/*
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

	// Write the header note at the beginning of the file
	const headerNote = 'Attention! There might be several data points during the same day. Filter for the days.\n';
	fs.writeFileSync(savePath, headerNote);  // Write the custom header note


	csvWriter = createCsvWriter({
		
		path: savePath,
		append: true,
		header: [
			{id: 'feeding_record_id', title: 'Feeding Record ID'},
			{id: 'user_id', title: 'User ID'},
			{id: 'user_name', title: 'User Name'},
			{id: 'dolphin_id', title: 'Dolphin ID'},
			{id: 'dolphin_name', title: 'Dolphin Name'},
			{id: 'body_condition_score', title: 'Body Condition Score'},
			{id: 'body_condition_score_comments', title: 'Body Condition Score Comments'},
			{id: 'weight_measured', title: 'Weight Measured'},
			{id: 'weight_measured_comments', title: 'Weight Measured Comments'},
			{id: 'kcal_calculations', title: 'Kcal Calculations'},
			{id: 'kcal_calculations_comments', title: 'Kcal Calculations Comments'},
			{id: 'blood_hydration', title: 'Blood Hydration'},
			{id: 'blood_hydration_comments', title: 'Blood Hydration Comments'},
			{id: 'fish_quality', title: 'Fish Quality'},
			{id: 'fish_quality_comments', title: 'Fish Quality Comments'},
			{id: 'fish_variety', title: 'Fish Variety'},
			{id: 'fish_variety_comments', title: 'Fish Variety Comments'},
			{id: 'bwo_score', title: 'Body Weight Oscillation Score'},
			{id: 'bwo_3_months', title: 'Body Weight Oscillation past 3 months [%]'},
			{id: 'bwo_12_months', title: 'Body Weight Oscillation past 12 months [%]'},
			{id: 'file_path', title: 'File Path'},
			{id: 'created_at', title: 'Created At'},
		]
	});*/
	}


	if(section === 'Environment') {

		savePath = 'csv/Housing_' + Date.now() + '.csv';

        // Write the header note at the beginning of the file
        const headerNote = 'Attention! There might be several data points during the same day. Filter for the days.\n';
        fs.writeFileSync(savePath, headerNote);  // Write the custom header note

        // Manually append the CSV headers after the header note
        const csvHeaders = [
            'Created At',
            'Housing Record ID',
            'User ID',
            'User Name',
            'Dolphin ID',
            'Dolphin Name',
            'Enclosure Barrier Safety',
            'Enclosure Barrier Safety Comments',
            'Foreign Body Ingestion',
            'Foreign Body Ingestion Comments',
            'Pool Design',
            'Pool Design Comments',
            'Forced Loneliness',
            'Forced Loneliness Comments',
            'Water Quality',
            'Water Quality Comments',
            'Water Temperature',
            'Water Temperature Comments',
            'Sufficient Shade',
            'Sufficient Shade Comments',
            'Reflecting Colours',
            'Reflecting Colours Comments',
            'Acoustic Comfort',
            'Acoustic Comfort Comments'
        ].join(',') + '\n';
        
        fs.appendFileSync(savePath, csvHeaders);

        // Retrieve the data based on the request parameters
        if (numMonths != '') {
            if (dolphin_name != '') {
                // Data of a specific dolphin_name and specific numMonths
                resultHousing = await GoodHousingService.getTestResultNMonths(dolphin_name, numMonths, roleName);
            } else {
                // Data of all dolphins and specific numMonths
                resultHousing = await GoodHousingService.getAllTestResultNMonths(numMonths, roleName);
            }

            // Save resultHousing in data
            for (const month in resultHousing) {
                data.push(...resultHousing[month]);
            }
            resultHousing = null; //reset housing results
        } else {
            if (dolphin_name != '') {
                resultHousing = await GoodHousingService.getTestResultByDolphin(dolphin_name, roleName);
            } else {
                resultHousing = await GoodHousingService.getAllTestResults(roleName);
            }

            data = resultHousing; //save the results of housing tests in data
            resultHousing = null; //reset housing results
        }

        // Now create the CSV writer to append data
        csvWriter = createCsvWriter({
            path: savePath,
            append: true,
            header: [
                { id: 'created_at', title: 'Created At' },
                { id: 'housing_record_id', title: 'Housing Record ID' },
                { id: 'user_id', title: 'User ID' },
                { id: 'user_name', title: 'User Name' },
                { id: 'dolphin_id', title: 'Dolphin ID' },
                { id: 'dolphin_name', title: 'Dolphin Name' },
                { id: 'enclosure_barrier_safety', title: 'Enclosure Barrier Safety' },
                { id: 'enclosure_barrier_safety_comments', title: 'Enclosure Barrier Safety Comments' },
                { id: 'foreign_body_ingestion', title: 'Foreign Body Ingestion' },
                { id: 'foreign_body_ingestion_comments', title: 'Foreign Body Ingestion Comments' },
                { id: 'pool_design', title: 'Pool Design' },
                { id: 'pool_design_comments', title: 'Pool Design Comments' },
                { id: 'forced_loneliness', title: 'Forced Loneliness' },
                { id: 'forced_loneliness_comments', title: 'Forced Loneliness Comments' },
                { id: 'water_quality', title: 'Water Quality' },
                { id: 'water_quality_comments', title: 'Water Quality Comments' },
                { id: 'water_temperature', title: 'Water Temperature' },
                { id: 'water_temperature_comments', title: 'Water Temperature Comments' },
                { id: 'sufficient_shade', title: 'Sufficient Shade' },
                { id: 'sufficient_shade_comments', title: 'Sufficient Shade Comments' },
                { id: 'reflecting_colours', title: 'Reflecting Colours' },
                { id: 'reflecting_colours_comments', title: 'Reflecting Colours Comments' },
                { id: 'acoustic_comfort', title: 'Acoustic Comfort' },
                { id: 'acoustic_comfort_comments', title: 'Acoustic Comfort Comments' },
            ]
        });
	}


	if(section === 'Health') {
		savePath = 'csv/Health_' + Date.now() + '.csv';

        // Write the header note at the beginning of the file
        const headerNote = 'Attention! There might be several data points during the same day. Filter for the days.\n';
        fs.writeFileSync(savePath, headerNote);  // Write the custom header note

        // Manually append the CSV headers after the header note
        const csvHeaders = [
            'Created At',
            'Health Record ID',
            'User ID',
            'User Name',
            'Dolphin ID',
            'Dolphin Name',
            'Normal Floatability',
            'Normal Floatability Comments',
            'Records Normal Floatability',
            'Records Normal Floatability Comments',
            'Inspection Eye Lesions',
            'Inspection Eye Lesions Comments',
            'Response Visual Cues',
            'Response Visual Cues Comments',
            'Records Eye Lesions',
            'Records Eye Lesions Comments',
            'Mouth Exam',
            'Mouth Exam Comments',
            'Records Oral Lesions',
            'Records Oral Lesions Comments',
            'Records Gastric Abnormality',
            'Records Gastric Abnormality Comments',
            'Inspection Respiratory Disease',
            'Inspection Respiratory Disease Comments',
            'Forced Expiration',
            'Forced Expiration Comments',
            'Records Respiratory Disease',
            'Records Respiratory Disease Comments',
            'Rake Marks',
            'Rake Marks Comments',
            'Records External Disease Signs',
            'Records External Disease Signs Comments',
            'Eye Photo Path',
            'Teeth Photo Path',
            'Odontogramm Photo Path',
            'Marks Photo Path',
            'Silhouette Photo Path',
            'Video Path'
        ].join(',') + '\n';
        
        fs.appendFileSync(savePath, csvHeaders);

        // Retrieve the data based on the request parameters
        if (numMonths != '') {
            if (dolphin_name != '') {
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
            if (dolphin_name != '') {
                resultHealth = await GoodHealthService.getTestResultByDolphin(dolphin_name, roleName);
            } else {
                resultHealth = await GoodHealthService.getAllTestResults(roleName);
            }

            data = resultHealth; //save the results of health tests in data
            resultHealth = null; //reset health results
        }

        // Now create the CSV writer to append data
        csvWriter = createCsvWriter({
            path: savePath,
            append: true,
            header: [
                { id: 'created_at', title: 'Created At' },
                { id: 'health_record_id', title: 'Health Record ID' },
                { id: 'user_id', title: 'User ID' },
                { id: 'user_name', title: 'User Name' },
                { id: 'dolphin_id', title: 'Dolphin ID' },
                { id: 'dolphin_name', title: 'Dolphin Name' },
                { id: 'normal_floatability', title: 'Normal Floatability' },
                { id: 'normal_floatability_comments', title: 'Normal Floatability Comments' },
                { id: 'records_normal_floatability', title: 'Records Normal Floatability' },
                { id: 'records_normal_floatability_comments', title: 'Records Normal Floatability Comments' },
                { id: 'inspection_eye_lesions', title: 'Inspection Eye Lesions' },
                { id: 'inspection_eye_lesions_comments', title: 'Inspection Eye Lesions Comments' },
                { id: 'response_visual_cues', title: 'Response Visual Cues' },
                { id: 'response_visual_cues_comments', title: 'Response Visual Cues Comments' },
                { id: 'records_eye_lesions', title: 'Records Eye Lesions' },
                { id: 'records_eye_lesions_comments', title: 'Records Eye Lesions Comments' },
                { id: 'mouth_exam', title: 'Mouth Exam' },
                { id: 'mouth_exam_comments', title: 'Mouth Exam Comments' },
                { id: 'records_oral_lesions', title: 'Records Oral Lesions' },
                { id: 'records_oral_lesions_comments', title: 'Records Oral Lesions Comments' },
                { id: 'records_gastric_abnormality', title: 'Records Gastric Abnormality' },
                { id: 'records_gastric_abnormality_comments', title: 'Records Gastric Abnormality Comments' },
                { id: 'inspection_respiratory', title: 'Inspection Respiratory Disease' },
                { id: 'inspection_respiratory_comments', title: 'Inspection Respiratory Disease Comments' },
                { id: 'force_expiration', title: 'Forced Expiration' },
                { id: 'force_expiration_comments', title: 'Forced Expiration Comments' },
                { id: 'records_respiratory_disease', title: 'Records Respiratory Disease' },
                { id: 'records_respiratory_disease_comments', title: 'Records Respiratory Disease Comments' },
                { id: 'inspection_marks', title: 'Rake Marks' },
                { id: 'inspection_marks_comments', title: 'Rake Marks Comments' },
                { id: 'records_external_disease', title: 'Records External Disease Signs' },
                { id: 'records_external_disease_comments', title: 'Records External Disease Signs Comments' },
                { id: 'eye_photo_path', title: 'Eye Photo Path' },
                { id: 'teeth_photo_path', title: 'Teeth Photo Path' },
                { id: 'odontogramm_photo_path', title: 'Odontogramm Photo Path' },
                { id: 'marks_photo_path', title: 'Marks Photo Path' },
                { id: 'silhouette_photo_path', title: 'Silhouette Photo Path' },
                { id: 'video_path', title: 'Video Path' },
            ]
        });
		}
	
		if(section === 'Behaviour') {
			savePath = 'csv/Behaviour_' + Date.now() + '.csv';

        // Write the header note at the beginning of the file
        const headerNote = 'Attention! There might be several data points during the same day. Filter for the days.\n';
        fs.writeFileSync(savePath, headerNote);  // Write the custom header note

        // Manually append the CSV headers after the header note
        const csvHeaders = [
            'Created At',
            'Behaviour Record ID',
            'User ID',
            'User Name',
            'Dolphin ID',
            'Dolphin Name',
            'Environmental Enrichment',
            'Environmental Enrichment Comments',
            'Affiliative Behaviour',
            'Affiliative Behaviour Comments',
            'Play Behaviour',
            'Play Behaviour Comments',
            'Socio Sexual Behaviour',
            'Socio Sexual Behaviour Comments',
            'Maternal Behaviour',
            'Maternal Behaviour Comments',
            'Displacement Behaviour',
            'Displacement Behaviour Comments',
            'Oral Stereotypic Behaviour',
            'Oral Stereotypic Behaviour Comments',
            'Repetitive Body Movement',
            'Repetitive Body Movement Comments',
            'Self Grooming Behaviour',
            'Self Grooming Behaviour Comments',
            'Regurgitation Reingestion',
            'Regurgitation Reingestion Comments',
            'Rake Marks',
            'Rake Marks Comments',
            'Displaying Aggressive Behaviour',
            'Displaying Aggressive Behaviour Comments',
            'Receiving Aggressive Behaviour',
            'Receiving Aggressive Behaviour Comments',
            'Social Isolation',
            'Social Isolation Comments',
            'Avoidance Pool Areas',
            'Avoidance Pool Areas Comments'
        ].join(',') + '\n';
        
        fs.appendFileSync(savePath, csvHeaders);

        // Retrieve the data based on the request parameters
        if (numMonths != '') {
            if (dolphin_name != '') {
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
            if (dolphin_name != '') {
                resultBehaviour = await BehaviourService.getTestResultByDolphin(dolphin_name, roleName);
            } else {
                resultBehaviour = await BehaviourService.getAllTestResults(roleName);
            }

            data = resultBehaviour; //save the results of Behaviour tests in data
            resultBehaviour = null; //reset Behaviour results
        }

        // Now create the CSV writer to append data
        csvWriter = createCsvWriter({
            path: savePath,
            append: true,
            header: [
                { id: 'created_at', title: 'Created At' },
                { id: 'behaviour_record_id', title: 'Behaviour Record ID' },
                { id: 'user_id', title: 'User ID' },
                { id: 'user_name', title: 'User Name' },
                { id: 'dolphin_id', title: 'Dolphin ID' },
                { id: 'dolphin_name', title: 'Dolphin Name' },
                { id: 'environmental_enrichment', title: 'Environmental Enrichment' },
                { id: 'environmental_enrichment_comments', title: 'Environmental Enrichment Comments' },
                { id: 'affiliative_behaviour', title: 'Affiliative Behaviour' },
                { id: 'affiliative_behaviour_comments', title: 'Affiliative Behaviour Comments' },
                { id: 'play_behaviour', title: 'Play Behaviour' },
                { id: 'play_behaviour_comments', title: 'Play Behaviour Comments' },
                { id: 'socio_sexual_behaviour', title: 'Socio Sexual Behaviour' },
                { id: 'socio_sexual_behaviour_comments', title: 'Socio Sexual Behaviour Comments' },
                { id: 'maternal_behaviour', title: 'Maternal Behaviour' },
                { id: 'maternal_behaviour_comments', title: 'Maternal Behaviour Comments' },
                { id: 'displacement_behaviour', title: 'Displacement Behaviour' },
                { id: 'displacement_behaviour_comments', title: 'Displacement Behaviour Comments' },
                { id: 'oral_stereotypic_behaviour', title: 'Oral Stereotypic Behaviour' },
                { id: 'oral_stereotypic_behaviour_comments', title: 'Oral Stereotypic Behaviour Comments' },
                { id: 'repetitive_body_movement', title: 'Repetitive Body Movement' },
                { id: 'repetitive_body_movement_comments', title: 'Repetitive Body Movement Comments' },
                { id: 'self_grooming_behaviour', title: 'Self Grooming Behaviour' },
                { id: 'self_grooming_behaviour_comments', title: 'Self Grooming Behaviour Comments' },
                { id: 'regurgitation_reingestion', title: 'Regurgitation Reingestion' },
                { id: 'regurgitation_reingestion_comments', title: 'Regurgitation Reingestion Comments' },
                { id: 'rake_marks', title: 'Rake Marks' },
                { id: 'rake_marks_comments', title: 'Rake Marks Comments' },
                { id: 'displaying_aggressive_behaviour', title: 'Displaying Aggressive Behaviour' },
                { id: 'displaying_aggressive_behaviour_comments', title: 'Displaying Aggressive Behaviour Comments' },
                { id: 'receiving_aggressive_behaviour', title: 'Receiving Aggressive Behaviour' },
                { id: 'receiving_aggressive_behaviour_comments', title: 'Receiving Aggressive Behaviour Comments' },
                { id: 'social_isolation', title: 'Social Isolation' },
                { id: 'social_isolation_comments', title: 'Social Isolation Comments' },
                { id: 'avoidance_pool_areas', title: 'Avoidance Pool Areas' },
                { id: 'avoidance_pool_areas_comments', title: 'Avoidance Pool Areas Comments' },
            ]
        });
			}

			if(section === 'Mental State') {
				savePath = 'csv/Mental_State_' + Date.now() + '.csv';

			// Write the header note at the beginning of the file
			const headerNote = 'Attention! There might be several data points during the same day. Filter for the days.\n';
			fs.writeFileSync(savePath, headerNote);  // Write the custom header note

			// Manually append the CSV headers after the header note
			const csvHeaders = [
				'Created At',
				'Mental State Record ID',
				'User ID',
				'User Name',
				'Dolphin ID',
				'Dolphin Name',
				'Willingness to Participate',
				'Willingness to Participate Comments',
				'Synchronous Swimming',
				'Synchronous Swimming Comments',
				'Rubbing Behaviour',
				'Rubbing Behaviour Comments',
				'Anticipatory Behaviour',
				'Anticipatory Behaviour Comments',
				'Fast Swimming',
				'Fast Swimming Comments',
				'Tail Slapping',
				'Tail Slapping Comments',
				'Choice and Control',
				'Choice and Control Comments',
			].join(',') + '\n';
			
			fs.appendFileSync(savePath, csvHeaders);

			// Retrieve the data based on the request parameters
			if (numMonths != '') {
				if (dolphin_name != '') {
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
				if (dolphin_name != '') {
					resultEmotions = await EmotionalStateService.getTestResultByDolphin(dolphin_name, roleName);
				} else {
					resultEmotions = await EmotionalStateService.getAllTestResults(roleName);
				}

				data = resultEmotions; //save the results of Mental State tests in data
				resultEmotions = null; //reset emotions results
			}

			// Now create the CSV writer to append data
			csvWriter = createCsvWriter({
				path: savePath,
				append: true,
				header: [
                    { id: 'created_at', title: 'Created At' },
					{ id: 'emotional_state_record_id', title: 'Mental State Record ID' },
					{ id: 'user_id', title: 'User ID' },
					{ id: 'user_name', title: 'User Name' },
					{ id: 'dolphin_id', title: 'Dolphin ID' },
					{ id: 'dolphin_name', title: 'Dolphin Name' },
					{ id: 'willingness_to_participate', title: 'Willingness to Participate' },
					{ id: 'willingness_to_participate_comments', title: 'Willingness to Participate Comments' },
					{ id: 'synchronous_swimming', title: 'Synchronous Swimming' },
					{ id: 'synchronous_swimming_comments', title: 'Synchronous Swimming Comments' },
					{ id: 'rubbing_behaviour', title: 'Rubbing Behaviour' },
					{ id: 'rubbing_behaviour_comments', title: 'Rubbing Behaviour Comments' },
					{ id: 'anticipatory_behaviour', title: 'Anticipatory Behaviour' },
					{ id: 'anticipatory_behaviour_comments', title: 'Anticipatory Behaviour Comments' },
					{ id: 'fast_swimming', title: 'Fast Swimming' },
					{ id: 'fast_swimming_comments', title: 'Fast Swimming Comments' },
					{ id: 'tail_slapping', title: 'Tail Slapping' },
					{ id: 'tail_slapping_comments', title: 'Tail Slapping Comments' },
					{ id: 'choice_and_control', title: 'Choice and Control' },
					{ id: 'choice_and_control_comments', title: 'Choice and Control Comments' },
				]
				});
			}

	data.sort((a, b) => a.created_at - b.created_at);
	console.log('data: ', ...data);
    
    // Format the created_at field for each record
    data = data.map(record => {
        record.created_at = formatCreatedAt(record.created_at);
        return record;
    });
    
	csvWriter
		.writeRecords(data)
		.then(async () => {
			console.log('...Done');
			//res.download(savePath);

			 // Send email with CSV file as attachment
			 let mailOptions = {
				from: `"Dolphin WET App" <${process.env.EMAIL}>`, // sender address
				to: userEmail.email, // list of receivers
				subject: 'Dolphin WET App: CSV file with your data', // Subject line
				text: `Dear ${userName},\n\nHere is the CSV file you requested.\n\nPlease be aware that there might be several data entries for the same dolphin and the same date.\nTherefore, filter for the dates when analyzing your data. This happens because every time a user clicks on "Finish Principle", the data is sent for this dolphin and time to the server to be saved.\n\nKind regards,\nYour Dolphin-WET app\n\n\nIf you did not request this file, please update your password immediately!\nIf you have no affiliation with the Dolphin Welfare Evaluation Tool, please contact us by replying to this mail and afterward deleting it along with every content you might have received!`,
				attachments: [
				  {
					filename: path.basename(savePath),
					path: savePath, // stream this file
				  },
				],
			  };
			  
			  // Sends the mail
			  await new Promise((resolve, reject) => {
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
					  console.error(error);
					  reject(error); 
					  return res.sendStatus(500);
					} else {
					  console.log('Email sent: ' + info.response);
					  resolve(info);
					  return res.sendStatus(200);
					}
				  });
			  });
			 


		})
		.catch(error => {
			console.log(error);
			return res.sendStatus(500);
		});
		} else {
			throw new Error('USER_IS_NOT_AUTHENTICATED');
		}

		} catch (error) {
			console.error(error);
			return res.sendStatus(500);
		}
	}

	module.exports = csvWriter;
