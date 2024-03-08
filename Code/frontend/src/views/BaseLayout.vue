<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<!--<ion-back-button
						:default-href="pageDefaultBackLink"
					></ion-back-button>-->
					<ion-back-button @click="handleBackButtonClick"></ion-back-button>
				</ion-buttons>
				<ion-title>{{ pageTitle }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="background">
			<slot />
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import {
	IonBackButton,
	IonButton,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButtons,
	alertController,
} from '@ionic/vue';
//import { alertController } from '@ionic/vue';

export default {
	props: ['pageTitle', 'pageDefaultBackLink'],
	components: {
		IonContent,
		IonHeader,
		IonPage,
		IonTitle,
		IonToolbar,
		IonBackButton,
		IonButton,
		IonButtons,
	},
	methods: {
		async handleBackButtonClick() {
			//Call here the showAlert()
			console.log('Back button clicked');
			await this.showAlert();
			this.$router.back();
		},
		async showAlert() {
			const alert = await alertController.create({
				header: 'Confirmation',
				message: 'Are you sure you want to proceed?',
				buttons: [
					{
						text: 'Cancel',
						role: 'cancel',
						cssClass: 'secondary',
						handler: () => {
							//Code here what should happen when 'Cancel' is clicked
							console.log('Cancel clicked');
						},
					},
					{
						text: 'OK',
						handler: () => {
							//Code here what should happen when 'OK' is clicked
							console.log('Confirm Okay');
							// Put your logic here for what should happen when 'OK' is clicked
						},
					},
				],
			});
			/*const alert = await alertController
		.create({
		header: 'Alert',
		subHeader: 'Subtitle',
		message: 'This is an alert message.',
		buttons: ['OK']
		});*/
			return alert.present();
		},
	},
};
</script>
