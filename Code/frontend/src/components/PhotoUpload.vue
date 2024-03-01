<template>
	<ion-content>
		<div class="container">
			<h1>File Upload</h1>
			<form
				id="form"
				method="POST"
				action="http://localhost:3309/api/photo"
				enctype="multipart/form-data"
			>
				<div class="input-group">
					<label for="name">Your name</label>
					<input name="name" id="name" placeholder="Enter your name" />
				</div>
				<div class="input-group">
					<label for="file">Select file</label>
					<input id="file" name="file" type="file" />
				</div>
				<button class="submit-btn" type="submit">Upload</button>
			</form>
		</div>
	</ion-content>
</template>

<script lang="ts">
import { baseUrl } from '@/utils/baseUrl';
import axios from 'axios';

const form = document.getElementById('form');
let test_name = '';
let test_date = '';

if (form) {
	form.addEventListener('submit', (e: SubmitEvent) =>
		submitForm(e, test_date, test_name)
	);
}
/**
 * Submit the format with given data attached photo to server.
 * @param {String} date - The test date in the format of yyyy-mm-dd. This is very important!
 * @param {String} test_name - The test name, based on the detailed checkbox document,
 *                                                 it is either 'eye_lesions', 'mouth_condition',
 */
function submitForm(e: SubmitEvent, test_date: string, test_name: string) {
	// prevents the default behavior of the browser, which is to perform a full page reload.
	// I have no idea wether you need this in ionic.
	e.preventDefault();

	// gets the form input html element.
	const file = document.getElementById('file');

	// !!! The code above is needed for plain HTML and JS,
	// Maybe in Ionic you can also do it but I'm not sure...
	// Please use corresponding methods in Ionic.

	// create a new FormData object, you can learn more here
	// https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
	const formData = new FormData();

	// in case of multiple photos, use a loop here to add all photos.
	// file.file: first file is the html element,
	// second file is the name for that html element
	// The html element is like:
	// <input id="file" name="file" type="file" multiple />
	if (file) {
		for (let i = 0; i < (file as HTMLInputElement).file.length; i++) {
			formData.append('file', (file as HTMLInputElement).file[i]);
		}
	}
	// Give test_date and test_name for this picture!
	formData.append('test_date', test_date);
	formData.append('test_name', test_name);
	console.log(formData);
	axios
		.post(baseUrl + '/api/photo', formData, {
			headers: {
				// !!! The content-type must be multipart/form-date
				// otherwise errors arise
				'Content-Type': 'multipart/form-data',
			},
		})
		.then((response) => {
			console.log(response);
			if (response.status === 201) {
				// do something after uploading successfully
				console.log('success!');
			}
		})
		.catch((error) => {
			// error handling here
			console.log(error);
		});
}
</script>
