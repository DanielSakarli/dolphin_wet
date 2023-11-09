<template>
	<!--  Each view that is navigated to using the router must include an IonPage component.-->
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ $t('topicFeeding') }} </ion-title>
				<ion-buttons slot="start">
					<ion-back-button defaultHref="/folder/Evaluate"></ion-back-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>

		<!--<ion-item slot ="end">
					<ion-select @ionChange="changeLanguage($event)" value="en">
						<ion-select-option value="en">English</ion-select-option>
						<ion-select-option value="de">German</ion-select-option>
					</ion-select>
    			</ion-item> -->
		<FeedingCheckCriteriaSelector />

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
} from '@ionic/vue';
// Import customized components
import FeedingCheckCriteriaSelector from '@/components/FeedingCheckCriteriaSelector.vue';
import selectedDolphin from '@/components/FeedingCheckCriteriaSelector.vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import { baseUrl } from '@/utils/baseUrl';

const url = baseUrl + '/api/good_feeding';
//const url = 'http://88395-17112.pph-server.de/api/good_feeding';

const requestBody = {
	dolphin_name: selectedDolphin,
	body_condition_score: 3,
	weight: 3,
	weight_measured: 15.5,
	kcal_calculations: 3,
	blood_hydration: 3,
	fish_quality: 3,
	fish_variety: 3,
};

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
		FeedingCheckCriteriaSelector,
		IonButtons,
		IonBackButton,
	},

	methods: {
		async storeData() {
			const confirmed = confirm(this.$t('savingDataNext'));
			if (confirmed) {
				console.log('Data is stored');
				await axios
					.post(url, requestBody)
					.then((response) => {
						console.log('Response:', response.data);
						this.confirmRefresh();
					})
					.catch((error) => {
						console.error('Error:', error.response.data);
					});
			}
		},
		changeLanguage($event: any) {
			this.$i18n.locale = $event.detail.value;
		},
		confirmRefresh() {
			const currentPath = this.$route.path;
			const targetUrl = `/detailFeeding`;
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
