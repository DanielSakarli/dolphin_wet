<template>
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
						<h5
							style="
								text-align: right;
								color: #6370ff;
								margin-bottom: 10px;
								font-weight: 700;
							"
						>
							Forget Password?
						</h5>
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
</template>

<script lang="ts">
import { IonInput } from '@ionic/vue';
import { defineComponent } from 'vue';
import { IonIcon, IonButton, IonCard, IonCardContent } from '@ionic/vue';
import axios from 'axios';
import { baseUrl } from '@/utils/baseUrl';
// import router from '@/router';
//import { link } from 'ionicons/icons';

export default defineComponent({
	components: { IonInput, IonIcon, IonButton, IonCard, IonCardContent },
	data() {
		return {
			username: '',
			password: '',
			errorMessage: '',
		};
	},
	methods: {
		login() {
			const url = baseUrl + '/api/users/login';
			// Reset the error message at the beginning of each login attempt
			this.errorMessage = '';
			const requestBody = {
				username: this.username,
				password: this.password,
			};
			//console.log(this.username, this.password);
			axios
				.post(url, requestBody, { withCredentials: true })
				.then((response) => {
					this.$router.push('/folder/Evaluate'); //Go to Evaluation Page if Login was succesfull
					const token = response.data;
					console.log(
						'Token that I get as a response from the server when I log in: ',
						token
					);
					localStorage.setItem('token', token);
					console.log(
						'Saved in local storage: ',
						localStorage.getItem('token')
					);
				})
				.catch((error) => {
					this.errorMessage = 'Invalid username or password.';
					console.error('Error:', error.response.data);
				});
		},
	},
});
</script>

<style scoped>
.error {
	color: red;
}
</style>
