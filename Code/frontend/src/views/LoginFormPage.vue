<template>
	<ion-page>
		<base-layout pageTitle="Login Form">
			<h3
				style="
					position: fixed;
					left: 0;
					top: 100px;
					right: 0;
					margin: 30px;
					color: aliceblue;
				"
			>
				Welcome <br />
				Back
			</h3>
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
				<img :src="logo" alt="Logo" style="max-width: 130vw; opacity: 0.05" />
			</div>
			<div
				class="wrapper"
				style="position: fixed; left: 0; bottom: 100px; right: 0"
			>
				<ion-card>
					<ion-icon name="heart" aria-hidden="true"></ion-icon>
					<ion-card-content>
						<form @submit.prevent="login">
							<ion-input
								ref="input"
								fill="solid"
								label="Username"
								label-placement="floating"
								helper-text="Enter a valid username"
								id="username"
								v-model="username"
							></ion-input>
							<ion-input
								ref="input"
								type="password"
								fill="solid"
								label="Password"
								label-placement="floating"
								helper-text="Enter your password"
								id="password"
								v-model="password"
							></ion-input>
							<br />
							<div style="display: flex; justify-content: space-between">
								<h5
									style="color: #6370ff; margin-bottom: 10px; font-weight: 700"
									@click="changePassword"
								>
									Change Password?
								</h5>
								<h5
									style="color: #6370ff; margin-bottom: 10px; font-weight: 700"
									@click="resetPassword"
								>
									Forget Password?
								</h5>
							</div>
							<ion-button color="primary" expand="block" type="submit"
								>Login</ion-button
							>
							<!-- Error message, displayed in case username or password is wrong -->
							<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
							<p style="text-align: center">
								----------------- or -------------------
							</p>
							<ion-button
								color="light"
								style="
									border: 1px solid gray;
									border-radius: 15px;
									margin-top: 10px;
								"
								expand="block"
								router-link="/signup"
								>Sign up</ion-button
							>
						</form>
					</ion-card-content>
				</ion-card>
			</div>
		</base-layout>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
	IonPage,
	IonInput,
	IonIcon,
	IonButton,
	IonCard,
	IonCardContent,
	loadingController,
} from '@ionic/vue';
import axios from 'axios';
import { AxiosInstance } from 'axios';
import { baseUrl } from '@/utils/baseUrl';
import logo from '@/../../../Logos/logo.png';
import { useDolphinsStore } from '@/store/dolphinsStore';
//import router from '@/router';
//import { link } from 'ionicons/icons';

export default defineComponent({
	components: {
		IonPage,
		IonInput,
		IonIcon,
		IonButton,
		IonCard,
		IonCardContent,
	},
	data() {
		return {
			username: '',
			password: '',
			errorMessage: '',
			logo,
		};
	},
	methods: {
		async login() {
			/*const loading = await loadingController.create({
				message: 'Please wait...',
			});
			await loading.present();*/
			const url = baseUrl + '/api/users/login';
			// Reset the error message at the beginning of each login attempt
			this.errorMessage = '';
			// Initialize necessary localStorage variables
			localStorage.setItem('dataInBody', 'false');
			localStorage.setItem('backButtonClicked', 'false');

			const requestBody = {
				username: this.username,
				password: this.password,
			};
			//console.log(this.username, this.password);
			this.$axios
				.post(url, requestBody, {
					withCredentials: true,
					hideGlobalLoading: true,
				})
				.then((response) => {
					const token = response.data;
					//this.$router.push('/folder/Evaluate'); //Go to Evaluation Page if Login was succesfull
					console.log(
						'Token that I get as a response from the server when I log in: ',
						token
					);
					localStorage.setItem('token', token);
					console.log(
						'Saved in local storage: ',
						localStorage.getItem('token')
					);
					sessionStorage.setItem('user_name', this.username);
					console.log(
						'user_name saved in session storage: ',
						sessionStorage.getItem('user_name')
					);
					this.$router.push('/folder/Evaluate');
					//await loading.dismiss();
				})
				.catch((error) => {
					this.errorMessage = 'Invalid username or password.';
					console.error('Error:', error.response.data);
					//await loading.dismiss();
				});

			// Fill the dolphinsStore with the current dolphinList from /api/dolphins
			// or the default dolphins of the json file
			const dolphinsStore = useDolphinsStore();
			await dolphinsStore.fill();
			//await loading.dismiss();
		},
		changePassword() {
			this.$router.push('changePassword');
		},
		resetPassword() {
			this.$router.push('resetPassword');
		},
	},
});
</script>

<style scoped>
.error {
	color: red;
}
</style>
