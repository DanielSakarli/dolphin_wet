<template>
	<!--  Each view that is navigated to using the router must include an IonPage component.-->
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Good Health</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content>
			<CheckCriteriaSelector />
			<CheckScoreField />
			<CheckComments />
		</ion-content>

		<ion-footer>
			<ion-toolbar>
				<ion-button color="light" slot="start">
					<ion-icon src="@/../public/icons/arrow-back-outline.svg"> </ion-icon>
					Previous
				</ion-button>
				<ion-button color="light" slot="end">
					<ion-icon
						src="@/../public/icons/arrow-forward-outline.svg"
					></ion-icon>
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
