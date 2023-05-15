<template>
	<!-- Criteria Selector -->
	<ion-list>
		<ion-item>
			<ion-select
				label="Criteria"
				placeholder="Select Criteria"
				okText="Choose Criteria"
				cancelText="Cancel Choice"
			>
				<ion-select-option value="apples">Apples</ion-select-option>
				<ion-select-option value="oranges">Oranges</ion-select-option>
				<ion-select-option value="bananas">Bananas</ion-select-option>
			</ion-select>
		</ion-item>
		<ion-item>
			<ion-select
				label="Sub-Criteria"
				placeholder="Select Sub-Criteria"
				okText="Choose Sub-Criteria"
				cancelText="Cancel Choice"
			>
				<ion-select-option value="apples">Apples</ion-select-option>
				<ion-select-option value="oranges">Oranges</ion-select-option>
				<ion-select-option value="bananas">Bananas</ion-select-option>
			</ion-select>
		</ion-item>
	</ion-list>
	<!-- End of Criteria Selector -->

	<!-- Description of Criteria -->
	<ion-card>
		<ion-card-header>
			<ion-card-title>Card Title</ion-card-title>
			<ion-card-subtitle>Card Subtitle</ion-card-subtitle>
		</ion-card-header>

		<ion-card-content>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nihil
			quisquam minima. Voluptate consequuntur aliquam praesentium fugiat sint
			ipsam voluptatum?
		</ion-card-content>
	</ion-card>
	<!-- End of Description of Criteria -->
</template>

<script lang="ts">
import {
	IonItem,
	IonList,
	IonSelect,
	IonSelectOption,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonCard,
	IonCardContent,
} from '@ionic/vue';
export default {
	components: {
		IonItem,
		IonList,
		IonSelect,
		IonSelectOption,
		IonCard,
		IonCardContent,
		IonCardHeader,
		IonCardTitle,
		IonCardSubtitle,
	},
};
</script>

<style scoped>
ion-item {
	margin: 5px;
}
ion-card {
	margin: 5px 15px;
}
</style>
