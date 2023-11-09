<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button
						:default-href="pageDefaultBackLink"
					></ion-back-button>
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
} from '@ionic/vue';
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
};
</script>
