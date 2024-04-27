<template>
	<ion-page>
		<base-layout pageTitle="Reset Password">
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
						<h2>For which user should the password be resetted?</h2>
						<br />
						<form @submit.prevent="resetPassword">
							<ion-input
								ref="input"
								fill="solid"
								label="User email"
								label-placement="floating"
								helper-text="Enter a valid user email"
								id="email"
								v-model="email"
							></ion-input>
							<h5
								style="
									text-align: right;
									color: #6370ff;
									margin-bottom: 10px;
									font-weight: 700;
								"
								@click="loginPage"
							>
								Back to Login
							</h5>
							<ion-button color="primary" expand="block" type="submit"
								><ion-icon slot="start" :icon="mailOutline"></ion-icon>Send New
								Password</ion-button
							>
							<!-- Error message, displayed in case username or password is wrong -->
							<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
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
} from '@ionic/vue';
import axios from 'axios';
import { baseUrl } from '@/utils/baseUrl';
import logo from '@/../../../Logos/logo.png';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { mailOutline } from 'ionicons/icons';
const pwResetUrl = '/api/users/resetPassword';

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
			email: '',
			errorMessage: '',
			logo,
			mailOutline,
		};
	},
	methods: {
		loginPage() {
			this.$router.push('login');
		},
		resetPassword() {
			const requestBody = {
				email: this.email,
			};
			axios
				.post(baseUrl + pwResetUrl, requestBody)
				.then(async (response) => {
					console.log(response);
					toast.success('Check your email inbox for the new password!', {
						autoClose: 3000,
					});
				})
				.catch((error) => {
					this.errorMessage = 'Invalid user email.';
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
