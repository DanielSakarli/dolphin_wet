<template>
	<!-- Criteria Selector -->
	<ion-list>
		<ion-item>
			<ion-select
				:label="firstlabel"
				:placeholder="firstplaceholder"
				:okText="firstokText"
				:cancelText="firstcancelText"
			>
				<ion-select-option :value="firstCriteria">{{
					$t('firstCriteria')
				}}</ion-select-option>
				<ion-select-option :value="secondCriteria">{{
					$t('secondCriteria')
				}}</ion-select-option>
				<ion-select-option :value="thirdCriteria">{{
					$t('thirdCriteria')
				}}</ion-select-option>
			</ion-select>
		</ion-item>
		<ion-item>
			<ion-select

				:label="secondlabel"
				:placeholder="secondplaceholder"
				:okText="secondokText"
				:cancelText="firstcancelText"
			>
				<ion-select-option :value="firstCriteria">{{
					$t('firstCriteria')
				}}</ion-select-option>
				<ion-select-option :value="secondCriteria">{{
					$t('secondCriteria')
				}}</ion-select-option>
				<ion-select-option :value="thirdCriteria">{{
					$t('thirdCriteria')
				}}</ion-select-option>
			</ion-select>
		</ion-item>
	</ion-list>
	<!-- End of Criteria Selector -->

	<!-- Description of Criteria -->
	<ion-card>
		<ion-card-header>
			<ion-card-title
				><p>{{ $t('cardTitle') }}</p></ion-card-title
			>
			<ion-card-subtitle
				><p>{{ $t('subcardTitle') }}</p></ion-card-subtitle
			>
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
	data() {
		return {
			firstlabel: this.$t('criteria'),
			firstplaceholder: this.$t('selectCriteria'),
			firstokText: this.$t('chooseCriteria'),
			firstcancelText: this.$t('cancelChoice'),
			secondlabel: this.$t('subcriteria'),
			secondplaceholder: this.$t('selectSubcriteria'),
			secondokText: this.$t('chooseSubcriteria'),
			firstCriteria: this.$t('firstCriteria'),
			secondCriteria: this.$t('secondCriteria'),
			thirdCriteria: this.$t('thirdCriteria'),
		};
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
