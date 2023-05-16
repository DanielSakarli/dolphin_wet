<template>
	<!--  Each view that is navigated to using the router must include an IonPage component.-->
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title
					>{{ $t('topic') }}</ion-title
				>
			</ion-toolbar>
		</ion-header>

		<ion-content>
			<!--<ion-item>
      			<ion-select @ionChange="changeLanguage($event)" value="en">
        			<ion-select-option value="en">English</ion-select-option>
        			<ion-select-option value="de">German</ion-select-option>
      			</ion-select>
    		</ion-item> -->
			<CheckCriteriaSelector />
			<CheckScoreField />
			<CheckComments />
		</ion-content>

		<ion-footer>
			<ion-toolbar>
				<ion-button color="light" slot="start">
					<ion-icon src="/icons/arrow-back-outline.svg"> </ion-icon>
					Previous
				</ion-button>
				<ion-button color="light" slot="end">
					<ion-icon src="/icons/arrow-forward-outline.svg"></ion-icon>
					Next
				</ion-button>
			</ion-toolbar>
		</ion-footer>
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
} from '@ionic/vue';
// Import customized components
import CheckCriteriaSelector from '@/components/CheckCriteriaSelector.vue';
import CheckScoreField from '@/components/CheckScoreField.vue';
import CheckComments from '@/components/CheckComments.vue';
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			language: 'en',
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
		CheckCriteriaSelector,
		CheckScoreField,
		CheckComments,
	},
	methods: {
		changeLanguage($event: any) {
			this.$i18n.locale = $event.detail.value;
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
