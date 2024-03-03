<template>
	<ion-content>
		<div class="container">
			<h1>File Upload</h1>
			<form id="form">
				<div class="input-group">
					<label for="filename">Filename</label>
					<input name="filename" id="filename" placeholder="Enter your name" />
				</div>
				<div class="input-group">
					<label for="file">Select file</label>
					<input
						id="file"
						name="file"
						type="file"
						v-on:change="(e: Event) => submitForm(e as SubmitEvent)"
					/>
				</div>
				<!--<button class="submit-btn" type="submit">Upload</button>-->
			</form>
		</div>
	</ion-content>
</template>

<script lang="ts">
import { IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import { baseUrl } from '@/utils/baseUrl';
import axios from 'axios';

export default defineComponent({
	components: {
		IonContent,
	},
	data() {
		return {
			test_name: '',
			test_date: '',
			//form: null,
		};
	},
	methods: {
		submitForm(e: SubmitEvent) {
			//}, test_date: string, test_name: string) {
			// prevents the default behavior of the browser, which is to perform a full page reload.
			// I have no idea wether you need this in ionic.
			e.preventDefault();

			const form = document.getElementById('form');

			if (form) {
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
					for (let i = 0; i < (file as HTMLInputElement).files.length; i++) {
						formData.append('files', (file as HTMLInputElement).files[i]);
					}
				}
				console.log(formData);
				console.log(file);

				this.$emit('form-submitted', formData);
				/*
				axios
					.post(baseUrl + '/api/photo', formData, {
						headers: {
							// !!! The content-type must be multipart/form-date
							// otherwise errors arise
							'Content-Type': 'multipart/form-data',
						},
					})
					/* Commented out the response: I think the middelware calls next() and doesn´t give a response back
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
					});*/
			}
		},
	},
});
</script>
