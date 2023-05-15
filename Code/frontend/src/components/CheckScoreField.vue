<template>
	<ion-card>
		<ion-item lines="none">
			<ion-checkbox justify="space-between" :value="fulfilled"
				>{{ $t('fulfilled') }}
			</ion-checkbox>
		</ion-item>
		<ion-item lines="none">
			<ion-checkbox justify="space-between" :value="noTendency"
				>{{ $t('noTendency') }}
			</ion-checkbox>
		</ion-item>
		<ion-item lines="none">
			<ion-checkbox justify="space-between" :value="notFulfilled"
				>{{ $t('notFulfilled') }}
			</ion-checkbox>
		</ion-item>
	</ion-card>
</template>

<script lang="ts">
import { IonCheckbox, IonItem, IonCard } from '@ionic/vue';

export default {
	components: {
		IonCheckbox,
		IonItem,
		IonCard,
	},
	data() {
		return {
			fulfilled: this.$t('fulfilled'),
			noTendency: this.$t('noTendency'),
			notFulfilled: this.$t('notFulfilled'),
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
