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
			Create <br />
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
						---------- Your information --------<br />
					</p>
					<ion-input
						v-model="username"
						ref="input"
						type="text"
						fill="solid"
						label="Name"
						label-placement="floating"
						helper-text="Enter your name"
					></ion-input>
					<ion-input
						v-model="email"
						ref="input"
						type="email"
						fill="solid"
						label="E-mail"
						label-placement="floating"
						helper-text="Enter a valid e-mail"
					></ion-input>
					<ion-input
						v-model="password"
						ref="input"
						type="password"
						fill="solid"
						label="Your password"
						label-placement="floating"
						helper-text="Enter your password"
					></ion-input>
					<p style="text-align: center">
						-------------- Your zoo ------------<br />
					</p>
					<p>Select your zoo:<br /></p>
					<select v-model="selectedZoo">
						<option disabled value="">Please select a zoo</option>
						<option v-for="zoo in zoos" :key="zoo" :value="zoo">
							{{ zoo }}
						</option>
					</select>

					<ion-input
						v-model="zoo_password"
						ref="input"
						type="password"
						fill="solid"
						label="Zoo password"
						label-placement="floating"
						helper-text="Ask your administrator for the zoo´s password"
					></ion-input>
					<ion-button @click="registerUser" color="primary" expand="block"
						>Sign up</ion-button
					>
					<p style="text-align: center">
						----------------- or -------------------
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
							>Log in</ion-button
						></router-link
					>
				</ion-card-content>
			</ion-card>
		</div>
	</base-layout>
</template>

<script lang="ts">
import { IonInput } from '@ionic/vue';
//import { defineComponent } from 'vue';
import { IonIcon } from '@ionic/vue';
import axios from 'axios';
import { baseUrl } from '@/utils/baseUrl';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const url = baseUrl + '/api/users/register';

export default {
	components: { IonInput, IonIcon },
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
			const response = await axios.get(baseUrl + '/api/users/roles');
			const roles = response.data;
			// Create a new array with only the first parts of the strings, i.e. the zoos without the _admin or _user part
			const zoos = roles.map((role) => role.split('_')[0]);

			// Remove duplicates
			this.zoos = zoos.filter((zoo, index) => zoos.indexOf(zoo) === index);
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
			axios
				.post(url, requestBody, { withCredentials: true })
				.then((response) => {
					console.log('Response:', response.data);
					toast.success('User registered successfully.', {
						autoClose: 1000,
					});
					setTimeout(() => {
						this.$router.push('/login');
					}, 2000);
				})
				.catch((error) => {
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
