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
		<ion-button fill="clear" size="large" @click="getUserManual">
			User Manual
			<ion-icon slot="start" :icon="download"></ion-icon>
		</ion-button>
		<ion-button fill="clear" size="large" @click="getStandardsAndGuidelines">
			Standards & Guidelines
			<ion-icon slot="start" :icon="download"></ion-icon>
		</ion-button>
		<ion-button fill="clear" size="large" @click="getDolphinWETMatrix">
			Dolphin WET Matrix
			<ion-icon slot="start" :icon="download"></ion-icon>
		</ion-button>
		<!--<ion-button fill="clear" size="large" @click="showDolphins">
			List of Dolphins
			<ion-icon slot="start" :icon="download"></ion-icon>
		</ion-button>-->
	</ion-page>
</template>

<script lang="ts">
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonButton,
	IonButtons,
	IonMenuButton,
	IonIcon,
} from '@ionic/vue';
import { download } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';
//import { FileOpener } from '@capawesome-team/capacitor-file-opener';
//import axios from 'axios';
import { baseUrl } from '@/utils/baseUrl';
//import { Device } from '@capacitor/device';
//import { Capacitor } from '@capacitor/core';
//import { Filesystem, Directory } from '@capacitor/filesystem';
//import { Share } from '@capacitor/share';
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
		IonButton,
		IonButtons,
		IonMenuButton,
		IonIcon,
	},
	methods: {
		/*async showDolphins() {
			await axios
				.get(this.urlDolphins, { withCredentials: true })
				.then((response) => {
					this.dolphinList = response.data;
					console.log('Response:', this.dolphinList);
				})
				.catch((e) => {
					console.error(e);
				});
		},*/
		async getUserManual() {
			// Get the platform of the device (iOS or Android)
			//const platform = (await Device.getInfo()).platform;
			try {
				const fileName = '2024-05-27_Dolphin_WET_Handbook.pdf'; // file name of the file saved on the server
				const fileUrl = baseUrl + '/api/files/' + fileName;
				await Browser.open({ url: fileUrl });
			} catch (error) {
				console.error('Error: ', error);
			}
		},
		async getStandardsAndGuidelines() {
			// Get the platform of the device (iOS or Android)
			//const platform = (await Device.getInfo()).platform;
			try {
				const fileName = 'EAAM-Standards-and-guidelines-2019.pdf'; // file name of the file saved on the server
				const fileUrl = baseUrl + '/api/files/' + fileName;
				await Browser.open({ url: fileUrl });
			} catch (error) {
				console.error('Error: ', error);
			}
			// Construct the URL based on the platform
			/*let fileUrl = '';
				if (platform === 'ios') {
					fileUrl = `assets/public/${fileName}`;
				} else if (platform === 'android') {
					// For Android, we need to use 'file://' protocol to access assets
					fileUrl = `file:///android_asset/public/${fileName}`;
					/*const assetFile = await fetch(
						`file:///android_asset/public/${fileName}`
					);
					const cacheDir = await Filesystem.getUri({
						directory: Directory.Cache,
						path: '',
					});
					const cacheFile = `${cacheDir.uri}/${fileName}`;

					await Filesystem.writeFile({
						path: cacheFile,
						data: await assetFile.blob(),
						directory: Directory.Cache,
					});

					fileUrl = cacheFile;*/
			/*} else {
					console.error('Platform not supported');
					return;
				}

				await FileOpener.openFile({
					path: fileUrl,
				});*/
			// Convert the file URL for the WebView
			//fileUrl = Capacitor.convertFileSrc(fileUrl);

			// Create an anchor element to trigger the download
			//const anchor = document.createElement('a');
			//anchor.href = fileUrl;
			//anchor.target = '_blank'; // Open the file in a new tab/window

			// Trigger the download
			//anchor.click();

			// Clean up: Revoke the temporary URL
			//URL.revokeObjectURL(fileUrl);

			/*// Create a link
			const link = document.createElement('a');

			// Set the href to the path of the PDF file
			link.href =
				'../../public/EAAM-Standards-and-guidelines-2019-gecomprimeerd.pdf';
			// Set the download attribute to the name you want the downloaded file to have
			link.download = 'EAAM_Standards_and_guidelines_2019.pdf';

			// Append the link to the body
			document.body.appendChild(link);

			// Programmatically click the link to start the download
			link.click();

			// Remove the link from the body
			if (document.body.contains(link)) {
				// If it is, remove the link from the body
				document.body.removeChild(link);
			}*/
		},
		async getDolphinWETMatrix() {
			try {
				const fileName = 'Dolphin_WET_Matrix.pdf'; // file name of the file saved on the server
				const fileUrl = baseUrl + '/api/files/' + fileName;
				await Browser.open({ url: fileUrl });
			} catch (error) {
				console.error('Error: ', error);
			}
			// Create a link
			/*const link = document.createElement('a');

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
			}*/
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
