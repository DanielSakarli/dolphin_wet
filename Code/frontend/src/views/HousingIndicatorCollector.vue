<template>
	<!--  Each view that is navigated to using the router must include an IonPage component.-->
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title
					>{{ $t('topicHousing') }}</ion-title
				>
				<ion-buttons slot ="start">
                    <ion-back-button defaultHref="/home"></ion-back-button>
                </ion-buttons>
			</ion-toolbar>
		</ion-header>
			<!--<ion-item slot ="end">
					<ion-select @ionChange="changeLanguage($event)" value="en">
						<ion-select-option value="en">English</ion-select-option>
						<ion-select-option value="de">German</ion-select-option>
					</ion-select>
    			</ion-item> -->
			<HousingCheckCriteriaSelector />
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
	IonBackButton
} from '@ionic/vue';
// Import customized components
import HousingCheckCriteriaSelector from '@/components/HousingCheckCriteriaSelector.vue';
import HousingCheckScoreField from '@/components/HousingCheckScoreField.vue';
import CheckComments from '@/components/CheckComments.vue';
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
		HousingCheckCriteriaSelector,
		HousingCheckScoreField,
		CheckComments,
		IonButtons,
		IonBackButton
	},

	methods: {
		changeLanguage($event: any) {
			this.$i18n.locale = $event.detail.value;
		},
		confirmRefresh() {
      		const confirmed = confirm(this.$t('savingDataNext'));
     		if (confirmed) {
				const currentPath = this.$route.path;
        		const targetUrl = '/detailHealth';
        		window.location.href = targetUrl;
      		}
    }
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
