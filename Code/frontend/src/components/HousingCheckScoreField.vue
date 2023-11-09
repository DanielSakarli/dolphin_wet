<template>
	<ion-item lines="none">
		<ion-checkbox justify="space-between" :value="fulfilled"
			>{{ $t('fulfilled') }}
		</ion-checkbox>
	</ion-item>
	<ion-item lines="none">
		<ion-checkbox justify="space-between" :value="noTendency"
			>{{ $t('notFulfilled') }}
		</ion-checkbox>
	</ion-item>
	<ion-item lines="none">
		<ion-checkbox justify="space-between" :value="notFulfilled"
			>{{ $t('noStatement') }}
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
			fulfilled: this.$t('fulfilled'),
			noTendency: this.$t('noTendency'),
			notFulfilled: this.$t('notFulfilled'),
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
