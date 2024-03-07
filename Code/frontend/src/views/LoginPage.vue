<template>
	<div
		class="wrapper"
		style="
			position: fixed;
			left: 0;
			bottom: 100px;
			right: 0;
			padding: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100vh;
		"
	>
		<img :src="logo" alt="Logo" style="max-width: 130vw" />
	</div>
	<div
		class="wrapper"
		style="position: fixed; left: 0; bottom: 100px; right: 0; padding: 20px"
	>
		<h3 style="color: white">Dolphin WET</h3>
		<h6 style="color: white">Dolphin Welfare Evaluation Tool</h6>
		<ion-button
			@click="loginUser"
			color="light"
			expand="block"
			router-link="/login"
			>Login</ion-button
		>
		<ion-button
			color="tertiary"
			style="border: 2px solid white; border-radius: 15px; margin-top: 10px"
			expand="block"
			router-link="/signup"
			>Sign Up</ion-button
		>
	</div>
</template>

<script lang="ts">
import { IonButton } from '@ionic/vue';
import axios from 'axios';
import { baseUrl } from '@/utils/baseUrl';
import logo from '@/../../../Logos/logo.png';
const url = baseUrl + '/api/users/login'; //'http://88395-17112.pph-server.de/api/users/login';

export default {
	components: {
		IonButton,
	},
	data() {
		return {
			username: '',
			password: '',
			logo,
		};
	},
	mounted() {
		// When user loads the page /home the token is removed from the local storage
		// So user has to log in again, otherwise he can´t navigate between the routes
		// Route protection coded in index.ts. The localStorage setter is coded in LoginFormPage.vue
		if (localStorage.getItem('token')) {
			localStorage.removeItem('token');
		}
	},
	methods: {
		async loginUser() {
			const requestBody = {
				username: this.username,
				password: this.password,
			};
			axios
				.post(url, requestBody, { withCredentials: true })
				.then((response) => {
					console.log('Response:', response.data);
				})
				.catch((error) => {
					console.error('Error:', error.response.data);
				});
		},
	},
};
</script>
