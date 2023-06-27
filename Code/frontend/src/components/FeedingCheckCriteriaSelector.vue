<template>
	<!-- Criteria Selector -->
	<ion-list>
		<ion-item>
			<ion-select
				:label= "firstlabel"
				:placeholder="firstplaceholder"
				okText="OK"
				:cancelText="firstcancelText"
				v-on:click="showDolphins"
				v-model= "selectedDolphin"
				>
				<ion-select-option v-for="dolphin in dolphinList" v-bind:key="dolphin.name">
					{{dolphin.name}}
				</ion-select-option>
			</ion-select>
		</ion-item>
		<ion-item>
			<ion-select
				:value="criteria"
				@IonChange ="criteria=$event.target.value"
				:label="secondlabel"
				:placeholder="secondplaceholder"
				okText="OK"
				:cancelText="firstcancelText"
			>
				<ion-select-option value="firstCriteriaFeeding">{{
					$t('firstCriteriaFeeding')
				}}</ion-select-option>
				<ion-select-option value="secondCriteriaFeeding">{{
					$t('secondCriteriaFeeding')
				}}</ion-select-option>
				<ion-select-option value="thirdCriteriaFeeding">{{
					$t('thirdCriteriaFeeding')
				}}</ion-select-option>
                <ion-select-option value="fourthCriteriaFeeding">{{
					$t('fourthCriteriaFeeding')
				}}</ion-select-option>
			</ion-select>
		</ion-item>
		<ion-item>
			<ion-select
				:value="subcriteria"
				@IonChange ="subcriteria=$event.target.value"
				:label="thirdlabel"
				:placeholder="thirdplaceholder"
				okText="OK"
				:cancelText="firstcancelText"
				v-model="selectedTest"
			>
				<ion-select-option v-if=" criteria === 'firstCriteriaFeeding'" value="firstSubcriteriaFeeding">{{
					$t('firstSubcriteriaFeeding')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'firstCriteriaFeeding'" value="secondSubcriteriaFeeding">{{
					$t('secondSubcriteriaFeeding')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'secondCriteriaFeeding'" value="thirdSubcriteriaFeeding">{{
					$t('thirdSubcriteriaFeeding')
				}}</ion-select-option>
                <ion-select-option v-if=" criteria === 'secondCriteriaFeeding'" value="fourthSubcriteriaFeeding">{{
					$t('fourthSubcriteriaFeeding')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'thirdCriteriaFeeding'" value="fifthSubcriteriaFeeding">{{
					$t('fifthSubcriteriaFeeding')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'fourthCriteriaFeeding'" value="sixthSubcriteriaFeeding">{{
					$t('sixthSubcriteriaFeeding')
				}}</ion-select-option>
			</ion-select>
		</ion-item>
	</ion-list>
	<!-- End of Criteria Selector -->

	<!-- Description of Criteria (UserManual) -->
	<ion-button fill ="outline" @click="setOpenManual(true)">{{ $t('userManual') }}</ion-button>

    <ion-modal :is-open="isOpenManual">
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
				<ion-title v-else-if=" subcriteria === 'fifthSubcriteriaFeeding'"
					>{{$t('fifthSubcriteriaFeeding')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'sixthSubcriteriaFeeding'"
					>{{$t('sixthSubcriteriaFeeding')}}
				</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="setOpenManual(false)">{{ $t('close')}}</ion-button>
				</ion-buttons>
			</ion-toolbar>
      	</ion-header>
      	<ion-content class="ion-padding">
			<p v-if=" subcriteria === 'firstSubcriteriaFeeding'">
				blablabla
        	</p>
			<p v-if=" subcriteria === 'secondSubcriteriaFeeding'">
					</p>
			<p v-if=" subcriteria === 'thirdSubcriteriaFeeding'">
            </p>
            <p v-if=" subcriteria === 'fourthSubcriteriaFeeding'">
            </p>
			<p v-if=" subcriteria === 'fifthSubcriteriaFeeding'">
            </p>
			<p v-if=" subcriteria === 'sixthSubcriteriaFeeding'">
            </p>
      	</ion-content>
    </ion-modal>
	<!-- End of Description of Criteria (UserManual)-->
	<!--Start of Scoring Description-->
	<ion-button fill ="outline" @click="setOpenScoring(true)">{{ $t('ScoringDescription') }}</ion-button>

    <ion-modal :is-open="isOpenScoring">
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
				<ion-title v-else-if=" subcriteria === 'fifthSubcriteriaFeeding'"
					>{{$t('fifthSubcriteriaFeeding')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'sixthSubcriteriaFeeding'"
					>{{$t('sixthSubcriteriaFeeding')}}
				</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="setOpenScoring(false)">{{ $t('close')}}</ion-button>
				</ion-buttons>
			</ion-toolbar>
      	</ion-header>
      	<ion-content class="ion-padding">
			<p v-if=" subcriteria === 'firstSubcriteriaFeeding'">
				<h3>Score 1</h3>
				BCS of 3 = adequate
				<h3>Score 2</h3>
				BCS of 2 (underweight) or 4(overweight)
				<h3>Score 3</h3>
				BCS of 1 (emaciated) or 5(obese)
        	</p>
			<p v-if=" subcriteria === 'secondSubcriteriaFeeding'">
				<h3>Score 1</h3>
				Body weight oscillation (BWOS): &le;13% along the year or &le;5% in a 3-month period  
				<h3>Score 3</h3>
				BWOS: &gt;13% along the year or &lt;5% in a 3-month period
			</p>
			<p v-if=" subcriteria === 'thirdSubcriteriaFeeding'">
				<h3>Score 1</h3>
				Diet designed on the basis of EAAM S&G
				<h3>Score 3</h3>
				Diet not designed on the basis of EAAM S&G
            </p>
            <p v-if=" subcriteria === 'fourthSubcriteriaFeeding'">
				<h3>Score 1</h3>
				Within the range
				<h3>Score 2</h3>
				10% out of range
				<h3>Score 3</h3>
				&gt;10% out of range
            </p>
			<p v-if=" subcriteria === 'fifthSubcriteriaFeeding'">
				<h3>Score 1</h3>
				Fulfilled according to EAAM S&G
				<h3>Score 3</h3>
				Not fulfilled according to EAAM S&G
            </p>
			<p v-if=" subcriteria === 'sixthSubcriteriaFeeding'">
				<h3>Score 1</h3>
				At least 5 species are fed throughout the year, 
				each individual's diet is adapted to its individual nutritional needs and preferences, 
				amount of food fed varies between sessions, 
				part of the diet is given via enrichment
				<h3>Score 2</h3>
				At least 3, but no more than 5 species are fed throughout the year, 
				each individual's diet is adapted to its individual nutritional needs, but the 
				amount of food provided to the dolphins during each session is the same, 
				favorite species/animal preferences are neglected
				<h3>Score 3</h3>
				Only 3 or less species of food are fed throughout the year, no variation along the year, 
				diet is not adapted to individual preferences/specific need
            </p>
      	</ion-content>
    </ion-modal>
	<!--End of Scoring Description-->
	<!-- Start of Checkboxes-->
    <ion-list v-if=" subcriteria === 'firstSubcriteriaFeeding'">
			<ion-item>
				<ion-label>Score 1</ion-label>
				<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-label>Score 2</ion-label>
				<ion-checkbox v-model="isChecked[2]" @click="handleClick(2)"></ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-label>Score 3</ion-label>
				<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
			</ion-item>
    </ion-list>
	<ion-list v-if=" subcriteria === 'secondSubcriteriaFeeding'">
		<ion-item>
			<ion-input label="Weekly weights:" placeholder="Enter weekly weights"> </ion-input>
		</ion-item>
		<ion-item>
			<ion-input label="Target weight:" placeholder="Enter target weight"> </ion-input>
		</ion-item>
		<ion-item>
      		<ion-input value="Score will be calculated automatically" :readonly="true"></ion-input>
    	</ion-item>
		<!--<ion-item>
			<ion-label>Score 1</ion-label>
			<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 3</ion-label>
			<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
		</ion-item>-->
    </ion-list>
	<ion-list v-if=" subcriteria === 'thirdSubcriteriaFeeding'">
		<ion-item>
			<ion-label>Score 1</ion-label>
			<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 3</ion-label>
			<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
		</ion-item>
    </ion-list>
	<ion-list v-if=" subcriteria === 'fourthSubcriteriaFeeding'">
		<ion-item>
			<ion-label>Score 1</ion-label>
			<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 2</ion-label>
			<ion-checkbox v-model="isChecked[2]" @click="handleClick(2)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 3</ion-label>
			<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
		</ion-item>
    </ion-list>
	<ion-list v-if=" subcriteria === 'fifthSubcriteriaFeeding'">
		<ion-item>
			<ion-label>Score 1</ion-label>
			<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 3</ion-label>
			<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
		</ion-item>
    </ion-list>
	<ion-list v-if=" subcriteria === 'sixthSubcriteriaFeeding'">
		<ion-item>
			<ion-label>Score 1</ion-label>
			<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 2</ion-label>
			<ion-checkbox v-model="isChecked[2]" @click="handleClick(2)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 3</ion-label>
			<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
		</ion-item>
    </ion-list>
	<!-- End of Checkboxes-->
	<ion-range v-if=" subcriteria === 'fourthSubcriteriaFeeding'" aria-label="Dual Knobs Range" :dual-knobs="true" :value="{ lower: 20, upper: 80 }"></ion-range>
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
	IonText,
	IonCheckbox,
	IonInput,
	IonRange
} from '@ionic/vue';
import axios from 'axios';

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
		IonText,
		IonCheckbox,
		IonInput,
		IonRange
	},
	data() {
		return {
			language: 'en',
			criteria: '',
			subcriteria: '',
			firstlabel: this.$t('dolphin'),
			firstplaceholder: this.$t('selectDolphin'),
			firstcancelText: this.$t('cancelChoice'),
			secondlabel: this.$t('criteria'),
			secondplaceholder: this.$t('selectCriteria'),
			thirdlabel: this.$t('test'),
			thirdplaceholder: this.$t('selectTest'),
			isOpenManual: false,
			isOpenScoring: false,
			selectedOption: undefined,
			isChecked: {} as Record<number, boolean>,
			Score1: this.$t('fulfilled'),
			noTendency: this.$t('noTendency'),
			notFulfilled: this.$t('notFulfilled'),
			dolphinList: [] as {name: string}[],
			url: 'http://88395-17112.pph-server.de/api/dolphins',
			selectedDolphin: '',
			selectedTest: '',
		};
	},
	methods: {
		async showDolphins() {
			console.log("Someone wants to selct a dolphin")
			await axios.get(this.url)
				.then ((response) => {
        		console.log('Response:', response.data);
				this.dolphinList = response.data;
    			})
			 	.catch ((e) => {
				console.error(e);
				});
		},
        setOpenManual(isOpen: boolean) {
            this.isOpenManual = isOpen;
        },
		setOpenScoring(isOpen: boolean) {
            this.isOpenScoring = isOpen;
        },
		handleClick(option: number) {
      		if (this.isChecked[option]) {
        // Wenn die gleiche Option erneut geklickt wird, wird sie zurückgesetzt
        		this.isChecked = {};
			} else {
				this.isChecked = { [option]: true };
			}
    	},
        /*emitSubcriteriaUpdated() {
            const subcriteria = this.subcriteria;
            
            this.$emit('subcriteria-updated', subcriteria);
        }*/
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
