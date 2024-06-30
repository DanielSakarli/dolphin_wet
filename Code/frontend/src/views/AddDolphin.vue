<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ $t('addDolphin') }}</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="closeAddModal">{{ $t('close') }}</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<form @submit.prevent="addDolphin">
				<ion-list>
					<ion-item>
						<ion-input
							v-model="dolphin.name"
							type="text"
							:label="$t('dolphinNameLabel')"
							label-placement="stacked"
							:placeholder="$t('dolphinNamePlaceholder')"
						/>
					</ion-item>
					<ion-item>
						<ion-input
							v-model="dolphin.sex"
							type="number"
							:label="$t('dolphinSexLabel')"
							label-placement="stacked"
							:placeholder="$t('dolphinSexPlaceholder')"
						/>
					</ion-item>
					<ion-item>
						<ion-input
							v-model="dolphin.on_site"
							type="number"
							:label="$t('onSiteLabel')"
							label-placement="stacked"
							:placeholder="$t('onSitePlaceholder')"
						/>
					</ion-item>
					<ion-item>
						<ion-input
							v-model="dolphin.year_of_birth"
							type="number"
							:label="$t('birthYearLabel')"
							label-placement="stacked"
							:placeholder="$t('birthYearPlaceholder')"
						/>
					</ion-item>
					<ion-item>
						<ion-input
							v-model="dolphin.place_of_birth"
							type="text"
							:label="$t('birthPlaceLabel')"
							label-placement="stacked"
							:placeholder="$t('birthPlacePlaceholder')"
						/>
					</ion-item>
				</ion-list>
				<ion-text style="margin: 15px; font-size: 0.9em">{{
					$t('necessaryFields')
				}}</ion-text>
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
	IonList,
	IonHeader,
	IonContent,
	IonToolbar,
	IonButtons,
	IonTitle,
	IonText,
} from '@ionic/vue';
import axios from 'axios';
//import apiClient from '@/utils/apiClient.js';
import { baseUrl } from '@/utils/baseUrl';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
//import { add } from 'ionicons/icons';

export default {
	components: {
		IonPage,
		IonButton,
		IonInput,
		IonItem,
		IonList,
		IonHeader,
		IonContent,
		IonToolbar,
		IonButtons,
		IonTitle,
		IonText,
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
						toast.success(this.$t('dolphinAdded'), {
							autoClose: 1500,
						});
						console.log('Response:', response.data);
					})
					.catch((error) => {
						if (error.message === 'Network Error') {
							toast.error(this.$t('dataUploadFailed'), {
								autoClose: 1500,
							});
						}
						if (error.message != 'Network Error') {
							toast.error(this.$t('dolphinAddError'), {
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
