<template>
	<!--  Each view that is navigated to using the router must include an IonPage component.-->
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ $t('topicEmotionalState') }} </ion-title>
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
		<EmotionalStateCheckCriteriaSelector ref="EmotionalStateCheckRef" />

		<!--<ion-footer>
			<ion-toolbar>
				<ion-button color="light" slot="start">
					<ion-icon src="/icons/arrow-back-outline.svg"> </ion-icon>
					{{$t('buttonPrevious')}}
				</ion-button>
				<ion-button color="light" slot="end" @click="storeData" >
					<ion-icon src="/icons/arrow-forward-outline.svg"></ion-icon>
					{{$t('buttonNext')}}
				</ion-button>
			</ion-toolbar>
		</ion-footer>-->
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
import EmotionalStateCheckCriteriaSelector from '@/components/EmotionalStateCheckCriteriaSelector.vue';
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

// document.cookie = token;
// console.log('This token is set in cookie (client-side): ', document.cookie);

// Set up request config
/*const config = {
	headers: {
		Cookie: document.cookie,
	},
};*/

export default defineComponent({
	data() {
		return {
			language: 'de',
			userComment: '',
		};
	},
	components: {
		IonHeader,
		IonTitle,
		IonToolbar,
		IonPage,
		EmotionalStateCheckCriteriaSelector,
		IonButtons,
		IonBackButton,
	},

	methods: {
		...mapActions(['updateUserComment']),
		updateUserComment(event: any) {
			this.userComment = event.target.value;
			this.updateUserComment(this.userComment);
			console.log('userComment: ', this.userComment);
		},
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
						header: this.$t('confirmationHeader'),
						message: this.$t('confirmationMessage'),
						buttons: [
							{
								text: this.$t('stayOnPage'),
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
								text: this.$t('loseData'),
								handler: () => {
									console.log('Confirm Okay');
									//this.$router.back();
									localStorage.setItem('dataInBody', 'false');
									//localStorage.setItem('backButtonClicked', 'false');
									//console.log('backButtonClicked: ', localStorage.getItem('backButtonClicked'));
									this.$router.push('/folder/Evaluate');
									(this.$refs.EmotionalStateCheckRef as any).resetData();
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
		/*
		async storeData() {
			const confirmed = true; //confirm(this.$t('savingDataNext'));
			// Check in console if token is correct
			console.log('this is the token that is sent to backend: ', token);

			if (confirmed) {
				console.log('Data is stored');
				await axios
					.post(url, requestBody, { withCredentials: true })
					.then((response) => {
						console.log('Response:', response.data);
						this.confirmRefresh();
					})
					.catch((error) => {
						console.error('Error:', error.response.data);
					});
			}
		},*/
		changeLanguage($event: any) {
			this.$i18n.locale = $event.detail.value;
		},
		confirmRefresh() {
			const targetUrl = `/detailEmotionalState`;
			window.location.href = targetUrl;
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
