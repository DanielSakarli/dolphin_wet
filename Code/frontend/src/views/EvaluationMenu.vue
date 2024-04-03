<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button></ion-menu-button>
				</ion-buttons>
				<ion-title>Dolphin WET</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ion-button expand="block" size="large" router-link="/detailFeeding">{{
				$t('principleNutrition')
			}}</ion-button>
			<ion-button expand="block" size="large" router-link="/detailHousing">{{
				$t('principleEnvironment')
			}}</ion-button>
			<ion-button expand="block" size="large" router-link="/detailHealth">{{
				$t('principleHealth')
			}}</ion-button>
			<ion-button expand="block" size="large" router-link="/detailBehaviour">{{
				$t('principleBehaviour')
			}}</ion-button>
			<ion-button
				expand="block"
				size="large"
				router-link="/detailEmotionalState"
				>{{ $t('principleEmotionalState') }}</ion-button
			>
		</ion-content>
		<ion-button fill="clear" size="large" @click="getDolphinWETMatrix">
			Download Dolphin WET Matrix
			<ion-icon slot="start" :icon="download"></ion-icon>
		</ion-button>
		<ion-button fill="clear" size="large" @click="showDolphins">
			Download List of Dolphins
			<ion-icon slot="start" :icon="download"></ion-icon>
		</ion-button>
	</ion-page>
</template>

<script lang="ts">
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonList,
	IonButton,
	IonButtons,
	IonMenu,
	IonMenuButton,
	IonIcon,
} from '@ionic/vue';
import { download } from 'ionicons/icons';
import axios from 'axios';
import { baseUrl } from '@/utils/baseUrl';
//try to import the animalList
//import { useDolphinsStore } from '@/store/dolphinsStore';

export default {
	data() {
		return {
			download,
			dolphinList: [] as { name: string }[],
			urlDolphins: baseUrl + '/api/dolphins', //'http://88395-17112.pph-server.de/api/dolphins',
		};
	},
	components: {
		IonPage,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonList,
		IonButton,
		IonButtons,
		IonMenu,
		IonMenuButton,
		IonIcon,
	},
	methods: {
		async showDolphins() {
			await axios
				.get(this.urlDolphins, { withCredentials: true })
				.then((response) => {
					this.dolphinList = response.data;
					console.log('Response:', this.dolphinList);
				})
				.catch((e) => {
					console.error(e);
				});
		},
		async getDolphinWETMatrix() {
			// Create a link
			const link = document.createElement('a');

			// Set the href to the path of the PDF file
			link.href = '../../public/Dolphin_WET_Matrix.pdf';
			// Set the download attribute to the name you want the downloaded file to have
			link.download = 'Dolphin_WET_Matrix.pdf';

			// Append the link to the body
			document.body.appendChild(link);

			// Programmatically click the link to start the download
			link.click();

			// Remove the link from the body
			if (document.body.contains(link)) {
				// If it is, remove the link from the body
				document.body.removeChild(link);
			}
		},
		isLoggedIn() {
			if (sessionStorage.getItem('token')) {
				return true;
			}
			return false;
		},
		changeLanguage($event: any) {
			this.$i18n.locale = $event.detail.value;
		},
	},
};
</script>
