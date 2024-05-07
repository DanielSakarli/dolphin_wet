<template>
	<ion-content>
		<div class="container">
			<!--<h2>Video Upload</h2>-->
			<form id="videoForm">
				<div class="input-group">
					<label for="files"> </label>
					<input
						id="videoFiles"
						name="files"
						type="file"
						accept="video/*"
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

export default defineComponent({
	props: ['id'],
	components: {
		IonContent,
	},
	methods: {
		submitForm(e: Event) {
			// prevents the default behavior of the browser, which is to perform a full page reload.
			// I have no idea wether you need this in ionic.
			e.preventDefault();

			const form = document.getElementById('videoForm');

			if (form) {
				console.log('submitForm in VideoUpload.vue');
				// get the files from the input form
				const filesInput = document.getElementById(
					'videoFiles'
				) as HTMLInputElement;
				if (filesInput && filesInput.files) {
					const videoFiles = filesInput.files;

					// create a new FormData object, you can learn more here
					// https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
					const formData = new FormData();

					//for (let i = 0; i < filesInput.files.length; i++) {
					//	const file = filesInput.files[i];
					// Do the for loop if we enable multiple video file uploads
					formData.append('files', videoFiles[0]);
					//}

					this.$emit('form-submitted', { id: this.id, files: videoFiles });
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
</style>
```
