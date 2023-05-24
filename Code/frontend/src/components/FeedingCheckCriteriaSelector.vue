<template>
	<!-- Criteria Selector -->
	<ion-list>
		<ion-item>
			<ion-select
				:label= "firstlabel"
				:placeholder="firstplaceholder"
				okText="OK"
				:cancelText="firstcancelText"
			>
				<ion-select-option value="dolphin1">{{
					$t('dolphin1')
				}}</ion-select-option>
				<ion-select-option value="dolphin2">{{
					$t('dolphin2')
				}}</ion-select-option>
						<ion-select-option value="dolphin3">{{
					$t('dolphin3')
				}}</ion-select-option>
				<ion-select-option value="dolphin4">{{
					$t('dolphin4')
				}}</ion-select-option>
			</ion-select>
		</ion-item>
		<ion-item>
			<ion-select
				:value="subcriteria"
				@IonChange ="subcriteria=$event.target.value"
				:label="secondlabel"
				:placeholder="secondplaceholder"
				okText="OK"
				:cancelText="firstcancelText"
			>
				<ion-select-option value="firstSubcriteriaFeeding">{{
					$t('firstSubcriteriaFeeding')
				}}</ion-select-option>
				<ion-select-option value="secondSubcriteriaFeeding">{{
					$t('secondSubcriteriaFeeding')
				}}</ion-select-option>
				<ion-select-option value="thirdSubcriteriaFeeding">{{
					$t('thirdSubcriteriaFeeding')
				}}</ion-select-option>
                <ion-select-option value="fourthSubcriteriaFeeding">{{
					$t('fourthSubcriteriaFeeding')
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
				<ion-title v-if=" subcriteria === 'firstSubcriteriaFeeding'"
					>{{$t('firstSubcriteriaFeeding')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'secondSubcriteriaFeeding'"
					>{{$t('secondSubcriteriaFeeding')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'thirdSubcriteriaFeeding'"
					>{{$t('thirdSubcriteriaFeeding')}}
				</ion-title>
                <ion-title v-else-if=" subcriteria === 'fourthSubcriteriaFeeding'"
					>{{$t('fourthSubcriteriaFeeding')}}
				</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="setOpen(false)">{{ $t('close')}}</ion-button>
				</ion-buttons>
			</ion-toolbar>
      	</ion-header>
      	<ion-content class="ion-padding">
			<p v-if=" subcriteria === 'firstSubcriteriaFeeding'">
        	</p>
			<p v-if=" subcriteria === 'secondSubcriteriaFeeding'">
					</p>
			<p v-if=" subcriteria === 'thirdSubcriteriaFeeding'">
            </p>
            <p v-if=" subcriteria === 'fourthSubcriteriaFeeding'">
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
	IonButton,
	IonText
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
		IonButton,
		IonText
	},
	data() {
		return {
			language: 'en',
			subcriteria: '',
			firstlabel: this.$t('dolphin'),
			firstplaceholder: this.$t('selectDolphin'),
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
        emitSubcriteriaUpdated() {
            const subcriteria = this.subcriteria;
            
            this.$emit('subcriteria-updated', subcriteria);
        }
    }
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
