<template>
	<ion-content>
		<div class="container">
			<h2>File Upload</h2>
			<form id="form">
				<div class="input-group">
					<label for="files">Select file(s)</label>
					<input
						id="files"
						name="files"
						type="file"
						multiple
						v-on:change="submitForm"
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
				console.log('submitForm in photoUpload.vue');
				// get the files from the input form
				const filesInput = document.getElementById('files');
				const files = filesInput.files;

				// create a new FormData object, you can learn more here
				// https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
				const formData = new FormData();

				// in case of multiple photos, use a loop here to add all photos.
				// file.file: first file is the html element,
				// second file is the name for that html element
				// The html element is like:
				// <input id="file" name="file" type="file" multiple />
				if (files) {
					console.log('Number of pictures: ' + files.length);

					for (let i = 0; i < files.length; i++) {
						console.log(files[i]);
						formData.append('files', files[i]);
					}
					console.log(...formData);
					/*
					for (let [key, value] of formData.entries()) {
						console.log(key, value);
					}*/
					//console.log('access second picture: ' + formData.get('files', files[1].file));
				}

				/*
				if (files) {
					console.log(
						'Number of pictures: ' + (files as HTMLInputElement).files.length
					);
					formData.append('files', (files as HTMLInputElement).files);
					console.log(formData.get('files'));

					//for (let i = 0; i < (files as HTMLInputElement).files.length; i++) {

					//(files as HTMLInputElement).files[i]);
					//formData.append('files', (files as HTMLInputElement).files[i]);
					//}
				}*/
				//console.log(formData.get('files'));
				//console.log(file);

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
