<template>
	<ion-content>
		<div class="container">
			<!--<h2>File Upload</h2>-->
			<form id="form">
				<div class="input-group">
					<label for="files"> </label>
					<input
						id="files"
						name="files"
						type="file"
						multiple
						accept=".pdf,.txt,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
//import { baseUrl } from '@/utils/baseUrl';
//import axios from 'axios';

export default defineComponent({
	components: {
		IonContent,
	},
	/*data() {
		return {
			//test_name: '',
			//test_date: '',
			//form: null,
		};
	},*/
	methods: {
		submitForm(e: Event) {
			// prevents the default behavior of the browser, which is to perform a full page reload.
			e.preventDefault();

			const form = document.getElementById('form');

			if (form) {
				console.log('submitForm in photoUpload.vue');
				// get the files from the input form
				const filesInput = document.getElementById('files') as HTMLInputElement;
				if (filesInput) {
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
						//console.log(...formData);
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

					this.$emit('form-submitted', files);
				}
			}
		},
	},
});
</script>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh; /* Adjust as needed */
	overflow: visible;
}

.container {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: auto;
	overflow: visible;
}
/*
ion-content {
	height: 100px;
}*/
</style>
```
