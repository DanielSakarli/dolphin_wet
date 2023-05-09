<template>
	<ion-card>
		<ion-item lines="none">
			<ion-checkbox justify="space-between" value="fulfilled"
				>Fulfilled
			</ion-checkbox>
		</ion-item>
		<ion-item lines="none">
			<ion-checkbox justify="space-between" value="no-tendency"
				>No Tendency
			</ion-checkbox>
		</ion-item>
		<ion-item lines="none">
			<ion-checkbox justify="space-between" value="not-fulfilled"
				>Not Fulfilled
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
