<template>
	<!--  Each view that is navigated to using the router must include an IonPage component.-->
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ $t('topicHealth') }}</ion-title>
				<ion-buttons slot="start">
					<!--<ion-back-button defaultHref="/folder/Evaluate"></ion-back-button>-->
					<ion-back-button @click="handleBackButtonClick"></ion-back-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<!--<ion-item slot ="end">
					<ion-select @ionChange="changeLanguage($event)" value="en">
						<ion-select-option value="en">English</ion-select-option>
						<ion-select-option value="de">German</ion-select-option>
					</ion-select>
    			</ion-item> -->
		<HealthCheckCriteriaSelector ref="healthCheckRef" />
	</ion-page>
</template>

<script lang="ts">
import {
	IonHeader,
	IonTitle,
	IonToolbar,
	IonPage,
	IonButtons,
	IonBackButton,
	alertController,
} from '@ionic/vue';
// Import customized components
import HealthCheckCriteriaSelector from '@/components/HealthCheckCriteriaSelector.vue';
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			language: 'de',
		};
	},
	components: {
		IonHeader,
		IonTitle,
		IonToolbar,
		IonPage,
		HealthCheckCriteriaSelector,
		IonButtons,
		IonBackButton,
	},

	methods: {
		async handleBackButtonClick() {
			//Call here the showAlert()
			console.log('Back button clicked');
			localStorage.setItem('backButtonClicked', 'true');
			if (localStorage.getItem('dataInBody') === 'true') {
				this.showAlert().then(() => {
					// Gets executed when user clicks on 'Lose Data'
					// Set it back to false, so the window.alert in index.ts will
					// still correctly work
					console.log('I am here');
					localStorage.setItem('backButtonClicked', 'false');
					console.log(
						'backButtonClicked: ',
						localStorage.getItem('backButtonClicked')
					);
				});
			} else {
				// If no data in body
				localStorage.setItem('backButtonClicked', 'false');
				console.log('Back button clicked without data in body');
				this.$router.push('/folder/Evaluate');
			}
		},
		showAlert() {
			return new Promise((resolve, reject) => {
				alertController
					.create({
						header: 'Confirmation',
						message: 'Are you sure you want to proceed?',
						buttons: [
							{
								text: 'Stay on Page',
								role: 'cancel',
								cssClass: 'secondary',
								handler: () => {
									console.log('Cancel clicked');
									localStorage.setItem('backButtonClicked', 'false');
									localStorage.setItem('dataInBody', 'true');
									console.log(
										'backButtonClicked: ',
										localStorage.getItem('backButtonClicked')
									);
									console.log(
										'dataInBody: ',
										localStorage.getItem('dataInBody')
									);
									reject();
								},
							},
							{
								text: 'Lose Data',
								handler: () => {
									console.log('Confirm Okay');
									//this.$router.back();
									localStorage.setItem('dataInBody', 'false');
									//localStorage.setItem('backButtonClicked', 'false');
									//console.log('backButtonClicked: ', localStorage.getItem('backButtonClicked'));
									this.$router.push('/folder/Evaluate');
									(this.$refs.healthCheckRef as any).resetData();
									resolve(void 0);
								},
							},
						],
					})
					.then((alert) => {
						alert.present();
					});
			});
		},
		changeLanguage($event: any) {
			this.$i18n.locale = $event.detail.value;
		},
		confirmRefresh() {
			const confirmed = confirm(this.$t('savingDataNext'));
			if (confirmed) {
				const targetUrl = `/detailHealth`;
				window.location.href = targetUrl;
			}
		},
	},
});
</script>

<style scoped>
ion-toolbar {
	padding: 0 1rem;
}
ion-button {
	width: 8rem;
}
</style>
