<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Add Dolphin</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="closeAddModal">Close</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<form @submit.prevent="addDolphin">
				<ion-list>
					<ion-item>
						<ion-label position="stacked">Dolphin name*</ion-label>
						<ion-input
							v-model="dolphin.name"
							type="text"
							placeholder="Dolphin name"
						/>
					</ion-item>
					<ion-item>
						<ion-label position="stacked">Dolphin sex*</ion-label>
						<ion-input
							v-model="dolphin.sex"
							type="number"
							placeholder="Dolphin sex? 0: male, 1: female."
						/>
					</ion-item>
					<ion-item>
						<ion-label position="stacked">On site*</ion-label>
						<ion-input
							v-model="dolphin.on_site"
							type="number"
							placeholder="On site? 0: no, 1: yes."
						/>
					</ion-item>
					<ion-item>
						<ion-label position="stacked">Year of birth*</ion-label>
						<ion-input
							v-model="dolphin.year_of_birth"
							type="number"
							placeholder="Year of birth"
						/>
					</ion-item>
					<ion-item>
						<ion-label position="stacked">Place of birth*</ion-label>
						<ion-input
							v-model="dolphin.place_of_birth"
							type="text"
							placeholder="Place of birth"
						/>
					</ion-item>
				</ion-list>
				<ion-button expand="full" type="submit">Add Dolphin</ion-button>
			</form>

			<!--<p v-if="errorMessage">{{ errorMessage }}</p>
		<p v-else-if="isLoading">Loading...</p>-->
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import {
	IonPage,
	IonButton,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
} from '@ionic/vue';
import axios from 'axios';
//import apiClient from '@/utils/apiClient.js';
import { baseUrl } from '@/utils/baseUrl';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { add } from 'ionicons/icons';

export default {
	components: {
		IonPage,
		IonButton,
		IonInput,
		IonItem,
		IonLabel,
		IonList,
	},
	data() {
		return {
			dolphin: {
				name: '',
				sex: undefined,
				on_site: undefined,
				year_of_birth: undefined,
				place_of_birth: '',
			},
			addModalOpen: false,
		};
	},
	methods: {
		async addDolphin() {
			//isLoading.value = true;
			//errorMessage.value = '';
			try {
				console.log('This is sent to backend: ', this.dolphin);
				await axios
					.post(
						baseUrl + '/api/dolphins', // http://88395-17112.pph-server.de/api/dolphins',
						this.dolphin,
						{ withCredentials: true }
					)
					.then((response) => {
						this.closeAddModal(); //goes back to the dolphin page
						toast.success('Dolphin successfully added.', {
							autoClose: 1500,
						});
						console.log('Response:', response.data);
					})
					.catch((error) => {
						if (error.message === 'Network Error') {
							toast.error('Check your internet connectivity!', {
								autoClose: 1500,
							});
						}
						if (error.message != 'Network Error') {
							toast.error('Error adding dolphin.', {
								autoClose: 1500,
							});
						}
						console.log('Error:', error);
					});
			} catch (error) {
				if (axios.isAxiosError(error)) {
					//errorMessage.value =
					//	error.response?.data.error || 'Unknown error occurred.';
				}
			}
		},
		//Model and form for adding a dolphin
		closeAddModal() {
			this.$emit('close-modal');
		},
	},
};
</script>

<style scoped>
.error {
	color: red;
	font-weight: bold;
	border: 1px solid red;
	padding: 10px;
	margin-top: 10px;
	border-radius: 5px;
	background-color: #ffe6e6;
}
</style>
