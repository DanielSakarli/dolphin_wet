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
	IonFooter,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonContent,
	IonPage,
	IonIcon,
	IonButton,
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
		IonIcon,
		IonFooter,
		IonHeader,
		IonTitle,
		IonToolbar,
		IonContent,
		IonPage,
		IonButton,
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
				await this.showAlert();
			}
			if (localStorage.getItem('dataInBody') === 'false') {
				//this.$router.back();
				this.$router.push('/folder/Evaluate');
			}
		},
		async showAlert() {
			return new Promise(async (resolve, reject) => {
				const alert = await alertController.create({
					header: 'Confirmation',
					message: 'Are you sure you want to proceed?',
					buttons: [
						{
							text: 'Stay on Page',
							role: 'cancel',
							cssClass: 'secondary',
							handler: () => {
								console.log('Cancel clicked');
								reject();
							},
						},
						{
							text: 'Lose Data',
							handler: () => {
								console.log('Confirm Okay');
								this.$router.push('/folder/Evaluate');
								localStorage.setItem('dataInBody', 'false');
								(this.$refs.healthCheckRef as any).resetData();
								resolve(void 0);
							},
						},
					],
				});

				return alert.present();
			});
		},
		changeLanguage($event: any) {
			this.$i18n.locale = $event.detail.value;
		},
		confirmRefresh() {
			const confirmed = confirm(this.$t('savingDataNext'));
			if (confirmed) {
				const currentPath = this.$route.path;
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
