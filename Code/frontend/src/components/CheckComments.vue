<template>
	<ion-item lines="none">
		<ion-textarea
			label="Comments"
			placeholder="Type something here"
			label-placement="floating"
			helper-text="Enter comments of test"
			:auto-grow="true"
		></ion-textarea>
	</ion-item>
</template>

<script lang="ts">
import { IonItem, IonTextarea } from '@ionic/vue';
export default {
	components: {
		IonItem,
		IonTextarea,
	},
};
</script>

<style scoped>
ion-item {
	margin: 0.5rem 2rem;
}
</style>
