<template>
	<ion-item lines="none">
		<ion-checkbox justify="space-between" value="Score1"
			>Score 1 (good)
		</ion-checkbox>
	</ion-item>
	<ion-item lines="none">
		<ion-checkbox justify="space-between" value="Score3"
			>Score 3 (bad)
		</ion-checkbox>
	</ion-item>
	<ion-item>
		<ion-thumbnail slot="start">
			<img src="" />
		</ion-thumbnail>
		<ion-button fill="clear">
			<ion-icon slot="start" :icon="camera"></ion-icon>
			{{ $t('photo') }}
		</ion-button>
	</ion-item>
</template>

<script lang="ts">
import {
	IonCheckbox,
	IonItem,
	IonCard,
	IonThumbnail,
	IonButton,
	IonIcon,
} from '@ionic/vue';
import { camera } from 'ionicons/icons';

export default {
	components: {
		IonCheckbox,
		IonItem,
		IonCard,
		IonThumbnail,
		IonButton,
		IonIcon,
	},
	data() {
		return {
			camera,
		};
	},
};
</script>

<style scoped>
ion-checkbox {
	margin: 0.5rem 2rem;
}
ion-card {
	margin: 5px 15px;
}
</style>
