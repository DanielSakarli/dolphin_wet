<template>
	<!-- Criteria Selector -->
	<ion-list>
		<ion-item>
			<ion-select
				:value="criteria"
				:label="firstlabel"
				:placeholder="firstplaceholder"
				okText="OK"
				:cancelText="firstcancelText"
			>
				<ion-select-option value="safe_environment">{{
					$t('safe_environment')
				}}</ion-select-option>
				<ion-select-option value="adequate_spatial_requirements">{{
					$t('adequate_spatial_requirements')
				}}</ion-select-option>
				<ion-select-option value="social_management">{{
					$t('social_management')
				}}</ion-select-option>
				<ion-select-option value="adequate_water_quality">{{
					$t('adequate_water_quality')
				}}</ion-select-option>
				<ion-select-option value="thermal_comfort">{{
					$t('thermal_comfort')
				}}</ion-select-option>
				<ion-select-option value="visual_comfort">{{
					$t('visual_comfort')
				}}</ion-select-option>
				<ion-select-option value="acoustic_comfort">{{
					$t('acoustic_comfort')
				}}</ion-select-option>
				<ion-select-option value="resting_comfort">{{
					$t('resting_comfort')
				}}</ion-select-option>
			</ion-select>
		</ion-item>
		<ion-item>
			<ion-select
				:value="subcriteria"
				:label="secondlabel"
				:placeholder="secondplaceholder"
				okText="OK"
				:cancelText="firstcancelText"
			>
				<ion-select-option value="firstSubcriteriaHousing">{{
					$t('firstSubcriteriaHousing')
				}}</ion-select-option>
				<ion-select-option value="secondSubcriteriaHousing">{{
					$t('secondSubcriteriaHousing')
				}}</ion-select-option>
				<ion-select-option value="thirdSubcriteriaHousing">{{
					$t('thirdSubcriteriaHousing')
				}}</ion-select-option>
				<ion-select-option value="fourthSubcriteriaHousing">{{
					$t('fourthSubcriteriaHousing')
				}}</ion-select-option>
				<ion-select-option value="fifthSubcriteriaHousing">{{
					$t('fifthSubcriteriaHousing')
				}}</ion-select-option>
				<ion-select-option value="sixthSubcriteriaHousing">{{
					$t('sixthSubcriteriaHousing')
				}}</ion-select-option>
			</ion-select>
		</ion-item>
	</ion-list>
	<!-- End of Criteria Selector -->

	<!-- Description of Criteria -->
	<ion-button fill ="outline" @click="setOpen(true)">{{ $t('userManual') }}</ion-button>

    <ion-modal :is-open="isOpen">
    	<ion-header>
			<ion-toolbar>
				<ion-title v-if=" subcriteria === 'firstSubcriteriaHousing'"
					>{{$t('firstSubcriteriaHousing')
				}}</ion-title>
				<ion-title v-else-if=" subcriteria === 'secondSubcriteriaHousing'"
					>{{$t('secondSubcriteriaHousing')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'thirdSubcriteriaHousing'"
					>{{$t('thirdSubcriteriaHousing')}}
				</ion-title>
				<ion-title  v-else-if=" subcriteria === 'fourthSubcriteriaHousing'"
					>{{$t('fourthSubcriteriaHousing')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'fifthSubcriteriaHousing'"
					>{{$t('fifthSubcriteriaHousing')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'sixthSubcriteriaHousing'"
					>{{$t('sixthSubcriteriaHousing')}}
				</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="setOpen(false)">Close</ion-button>
				</ion-buttons>
			</ion-toolbar>
      	</ion-header>
      	<ion-content class="ion-padding">
			<p v-if=" subcriteria === 'firstSubcriteriaHousing'">
				<h1>Enclosures and barriers safety and maintenance according to EAAM S&Gs (see 5.)</h1>
			</p>
			<p v-if=" subcriteria === 'secondSubcriteriaHousing'">
				<h1>Presence or absence in records</h1>
				
			</p>
			<p v-if=" subcriteria === 'thirdSubcriteriaHousing'">
				Pool dimension, pool  design, number of pools, available access to pools & group management accordig to EAAM S&Gs (see 5.)
			</p>
			<p v-if=" subcriteria === 'fourthSubcriteriaHousing'">
				Presence or absence in records/trainers' interviews
			</p>
			<p v-if=" subcriteria === 'fifthSubcriteriaHousing'">
				Water quality parameters accordig to EAAM S&Gs (see 9.)
			</p>
			<p v-if=" subcriteria === 'sixthSubcriteriaHousing'">
				Water temperature levels according to EAAM S&Gs (see 9.)
			</p>
      	</ion-content>
    </ion-modal>
	<!-- End of Description of Criteria -->
	
</template>

<script lang="ts">
import {
	IonItem,
	IonList,
	IonSelect,
	IonSelectOption,
	IonLabel,
	IonModal,
	IonHeader,
	IonToolbar,
	IonContent,
	IonTitle,
	IonButtons,
	IonButton
} from '@ionic/vue';
export default {
	components: {
		IonItem,
		IonList,
		IonSelect,
		IonSelectOption,
		IonLabel,
		IonModal,
		IonHeader,
		IonToolbar,
		IonContent,
		IonTitle,
		IonButtons,
		IonButton
	},
	data() {
		return {
			language: 'en',
			criteria: '',
			subcriteria: '',
			firstlabel: this.$t('criteria'),
			firstplaceholder: this.$t('selectCriteria'),
			firstcancelText: this.$t('cancelChoice'),
			secondlabel: this.$t('test'),
			secondplaceholder: this.$t('selectTest'),
			isOpen: false,
		};
	},
	methods: {
      setOpen(isOpen: boolean) {
        this.isOpen = isOpen;
      },
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
