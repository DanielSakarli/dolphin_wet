<template>
	<!--  Each view that is navigated to using the router must include an IonPage component.-->
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title
					>{{ $t('topicBehaviour') }}</ion-title
				>
				<ion-buttons slot ="start">
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
	</ion-page>
</template>

<script lang="ts">
import {
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
import FeedingCheckCriteriaSelector from '@/components/BehaviourCheckCriteriaSelector.vue';
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
		IonHeader,
		IonTitle,
		IonToolbar,
		IonContent,
		IonPage,
		IonButton,
		FeedingCheckCriteriaSelector,
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
        		const targetUrl = `/detailBehaviour`;
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
