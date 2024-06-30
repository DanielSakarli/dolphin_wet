<template>
	<ion-page>
		<base-layout :pageTitle="$t('changePasswordTitle')">
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
						<h2>{{ $t('userChangePassword') }}</h2>
						<br />
						<form @submit.prevent="changePassword">
							<ion-input
								ref="input"
								fill="solid"
								:label="$t('userNameLabel')"
								label-placement="floating"
								:helper-text="$t('userNameHelperText')"
								id="userName"
								v-model="userName"
							></ion-input>
							<ion-input
								ref="input"
								fill="solid"
								type="password"
								:label="$t('currentPasswordLabel')"
								label-placement="floating"
								:helper-text="$t('currentPasswordHelperText')"
								id="currentPassword"
								v-model="currentPassword"
							></ion-input>
							<ion-input
								ref="input"
								fill="solid"
								type="password"
								:label="$t('newPasswordLabel')"
								label-placement="floating"
								:helper-text="$t('newPasswordHelperText')"
								id="newPassword"
								v-model="newPassword"
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
								{{ $t('backToLoginPage') }}
							</h5>
							<ion-button color="primary" expand="block" type="submit">{{
								$t('changePasswordTitle')
							}}</ion-button>
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
	IonButton,
	IonCard,
	IonCardContent,
} from '@ionic/vue';
import axios from 'axios';
import { baseUrl } from '@/utils/baseUrl';
import logo from '@/../../../Logos/logo.png';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
//import { mailOutline } from 'ionicons/icons';
const pwChangeUrl = '/api/users/changePassword';

export default defineComponent({
	components: {
		IonPage,
		IonInput,
		IonButton,
		IonCard,
		IonCardContent,
	},
	data() {
		return {
			userName: '',
			currentPassword: '',
			newPassword: '',
			errorMessage: '',
			logo,
		};
	},
	methods: {
		loginPage() {
			this.$router.push('login');
		},
		changePassword() {
			const requestBody = {
				userName: this.userName,
				currentPassword: this.currentPassword,
				newPassword: this.newPassword,
			};
			axios
				.post(baseUrl + pwChangeUrl, requestBody)
				.then(async (response) => {
					console.log(response);
					this.errorMessage = '';
					toast.success(this.$t('passwordChanged'), {
						autoClose: 3000,
					});
				})
				.catch((error) => {
					if (error.response.data === 'USER_NAME_NOT_PROVIDED') {
						this.errorMessage = 'Please provide an user name!';
					}
					if (error.response.data === 'CURRENT_PASSWORD_NOT_PROVIDED') {
						this.errorMessage = 'Please provide a current password!';
					}
					if (error.response.data === 'NEW_PASSWORD_NOT_PROVIDED') {
						this.errorMessage = 'Please provide a new password!';
					}
					if (error.response.data.error === 'INVALID_NAME_OR_PASSWORD') {
						this.errorMessage = 'Invalid user name or current password!';
					}

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
