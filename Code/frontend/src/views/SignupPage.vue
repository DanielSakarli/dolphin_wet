<template>
	<base-layout pageTitle="Sign up form">
		<h2
			style="
				position: fixed;
				left: 0;
				top: 100px;
				right: 0;
				margin: 30px;
				color: aliceblue;
			"
		>
			Create<br />
			Account
		</h2>
		<div
			class="wrapper"
			style="position: fixed; left: 0; bottom: 100px; right: 0"
		>
			<ion-card>
				<ion-icon name="heart" aria-hidden="true"></ion-icon>
				<ion-card-content>
					<p style="text-align: center">
						---------- {{ $t('yourInformation') }} --------<br />
					</p>
					<ion-input
						v-model="username"
						ref="input"
						type="text"
						fill="solid"
						:label="$t('name')"
						label-placement="floating"
						:helper-text="$t('namePlaceholder')"
					></ion-input>
					<ion-input
						v-model="email"
						ref="input"
						type="email"
						fill="solid"
						:label="$t('emailLabel')"
						label-placement="floating"
						:helper-text="$t('emailHelperText')"
					></ion-input>
					<ion-input
						v-model="password"
						ref="input"
						type="password"
						fill="solid"
						:label="$t('passwordLabel')"
						label-placement="floating"
						:helper-text="$t('passwordHelperText')"
					></ion-input>
					<p style="text-align: center">
						-------------- {{ $t('yourZoo') }} ------------<br />
					</p>
					<p>{{ $t('selectZoo') }}<br /></p>
					<select v-model="selectedZoo">
						<option disabled value="">{{ $t('selectZooHelperText') }}</option>
						<option v-for="zoo in zoos" :key="zoo" :value="zoo">
							{{ zoo }}
						</option>
					</select>

					<ion-input
						v-model="zoo_password"
						ref="input"
						type="password"
						fill="solid"
						:label="$t('adminPassword')"
						label-placement="floating"
						:helper-text="$t('adminPasswordHelperTextAsk')"
					></ion-input>
					<ion-button @click="registerUser" color="primary" expand="block">{{
						$t('signUp')
					}}</ion-button>
					<p style="text-align: center">
						----------------- {{ $t('or') }} -------------------
					</p>
					<router-link to="/login"
						><ion-button
							color="light"
							style="
								border: 1px solid gray;
								border-radius: 15px;
								margin-top: 10px;
							"
							expand="block"
							>{{ $t('login') }}</ion-button
						></router-link
					>
				</ion-card-content>
			</ion-card>
		</div>
	</base-layout>
</template>

<script lang="ts">
//import { defineComponent } from 'vue';
import {
	IonIcon,
	IonInput,
	IonCard,
	IonCardContent,
	IonButton,
} from '@ionic/vue';
//import axios from 'axios';
import { baseUrl } from '@/utils/baseUrl';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const url = baseUrl + '/api/users/register';

export default {
	components: { IonInput, IonIcon, IonCard, IonCardContent, IonButton },
	data() {
		return {
			username: '',
			email: '',
			password: '',
			zoos: [],
			selectedZoo: null,
			zoo_password: '',
		};
	},
	async created() {
		try {
			const response = await this.$axios.get(baseUrl + '/api/users/roles');
			const roles = response.data;
			// Create a new array with only the first parts of the strings, i.e. the zoos without the _admin or _user part
			const zoos = roles.map((role: string) => role.split('_')[0]);

			// Remove duplicates
			this.zoos = zoos.filter(
				(zoo: string, index: number) => zoos.indexOf(zoo) === index
			);
		} catch (error) {
			console.error('Error:', error);
		}
	},
	methods: {
		async registerUser() {
			const requestBody = {
				name: this.username,
				email: this.email,
				password: this.password,
				roleName: this.selectedZoo,
				rolePassword: this.zoo_password,
			};
			this.$axios
				.post(url, requestBody, { withCredentials: true })
				.then((response: any) => {
					console.log('Response:', response.data);
					toast.success('User registered successfully.', {
						autoClose: 1000,
					});
					setTimeout(() => {
						this.$router.push('/login');
					}, 2000);
				})
				.catch((error: any) => {
					if (error.response.data.error === 'USER_ALREADY_EXISTS') {
						toast.error('Username already exists! Choose a different one.', {
							autoClose: 2000,
						});
					}
					if (error.response.data === 'NAME_MUST_BE_PROVIDED.') {
						toast.error('Please enter your name!', {
							autoClose: 2000,
						});
					}
					if (error.response.data === 'EMAIL_MUST_BE_PROVIDED.') {
						toast.error('Please enter your e-mail!', {
							autoClose: 2000,
						});
					}
					if (error.response.data === 'PASSWORD_MUST_BE_PROVIDED.') {
						toast.error('Please enter your password!', {
							autoClose: 2000,
						});
					}
					if (error.response.data === 'ROLE_NAME_MUST_BE_PROVIDED.') {
						toast.error('Please select a zoo!', {
							autoClose: 2000,
						});
					}
					if (error.response.data === 'ROLE_PASSWORD_MUST_BE_PROVIDED.') {
						toast.error('Please enter the zoo´s password!', {
							autoClose: 2000,
						});
					}

					console.error('Error:', error);
				});
		},
	},
};
</script>
