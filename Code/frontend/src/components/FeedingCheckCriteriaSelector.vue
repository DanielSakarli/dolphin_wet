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
	</ion-list>
	<!-- End of Criteria Selector -->

	<!-- Description of Criteria (UserManual) -->
	<ion-button fill ="outline" @click="setOpenManual(true)">{{ $t('userManual') }}</ion-button>

    <ion-modal :is-open="isOpenManual">
    	<ion-header>
			<ion-toolbar>
				<ion-title v-if=" criteria === 'firstCriteriaFeeding'"
					>{{$t('firstCriteriaFeeding')}}
				</ion-title>
				<ion-title v-else-if=" criteria === 'secondCriteriaFeeding'"
					>{{$t('secondCriteriaFeeding')}}
				</ion-title>
				<ion-title v-else-if=" criteria === 'thirdCriteriaFeeding'"
					>{{$t('thirdCriteriaFeeding')}}
				</ion-title>
                <ion-title v-else-if=" criteria === 'fourthCriteriaFeeding'"
					>{{$t('fourthCriteriaFeeding')}}
				</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="setOpenManual(false)">{{ $t('close')}}</ion-button>
				</ion-buttons>
			</ion-toolbar>
      	</ion-header>
      	<ion-content class="ion-padding">
			<p v-if=" criteria === 'firstCriteriaFeeding'">
				{{ $t('userManualHungerThirst') }}
        	</p>
			<p v-if=" criteria === 'secondCriteriaFeeding'">
				{{ $t('userManualAdequateDiet') }}
			</p>
			<p v-if=" criteria === 'thirdCriteriaFeeding'">
				{{ $t('userManualFoodQuality') }}
            </p>
            <p v-if=" criteria === 'fourthCriteriaFeeding'">
				{{ $t('userManualFoodVariety') }}
            </p>
      	</ion-content>
    </ion-modal>
	<!-- End of Description of Criteria (UserManual)-->
	<!--Start of Scoring Description-->
	<ion-button fill ="outline" @click="setOpenScoring(true)">{{ $t('ScoringDescription') }}</ion-button>

    <ion-modal :is-open="isOpenScoring">
    	<ion-header>
			<ion-toolbar>
				<ion-title v-if=" criteria === 'firstCriteriaFeeding'"
					>{{$t('firstCriteriaFeeding')}}
				</ion-title>
				<ion-title v-else-if=" criteria === 'secondCriteriaFeeding'"
					>{{$t('secondCriteriaFeeding')}}
				</ion-title>
				<ion-title v-else-if=" criteria === 'thirdCriteriaFeeding'"
					>{{$t('thirdCriteriaFeeding')}}
				</ion-title>
                <ion-title v-else-if=" criteria === 'fourthCriteriaFeeding'"
					>{{$t('fourthCriteriaFeeding')}}
				</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="setOpenScoring(false)">{{ $t('close')}}</ion-button>
				</ion-buttons>
			</ion-toolbar>
      	</ion-header>
      	<ion-content class="ion-padding">
			<p v-if=" criteria === 'firstCriteriaFeeding'">
				<h1>Body Condition Score:</h1>
				<h3>Score 1</h3>
				BCS of 3 = adequate
				<h3>Score 2</h3>
				BCS of 2 (underweight) or 4(overweight)
				<h3>Score 3</h3>
				BCS of 1 (emaciated) or 5(obese)
				<h1>Weight oscillation during the year:</h1>
				<h3>Score 1</h3>
				Body weight oscillation (BWOS): &le;13% along the year or &le;5% in a 3-month period  
				<h3>Score 3</h3>
				BWOS: &gt;13% along the year or &lt;5% in a 3-month period
			</p>
			<p v-if=" criteria === 'secondCriteriaFeeding'">
				<h1>Kcal calculations</h1>
				<h3>Score 1</h3>
				Diet designed on the basis of EAAM S&G
				<h3>Score 3</h3>
				Diet not designed on the basis of EAAM S&G
				<h1>Blood parameters for adequate hydration:</h1>
				<h3>Score 1</h3>
				Within the range
				<h3>Score 2</h3>
				10% out of range
				<h3>Score 3</h3>
				&gt;10% out of range
            </p>
			<p v-if=" criteria === 'thirdCriteriaFeeding'">
				<h1>Food quality Microbiology, Physico-chemical analysis:</h1>
				<h3>Score 1</h3>
				Fulfilled according to EAAM S&G
				<h3>Score 3</h3>
				Not fulfilled according to EAAM S&G
            </p>
			<p v-if=" criteria === 'fourthCriteriaFeeding'">
				<h1>Food variety along the year:</h1>
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
	<ion-card v-if=" criteria === 'firstCriteriaFeeding'">
		<ion-card-title>{{$t('body_condition_score')}}</ion-card-title>
		<ion-list >
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[0][0]" @click="handleClick(0,0)">Score 1</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[0][1]" @click="handleClick(0,1)">Score 2</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[0][2]" @click="handleClick(0,2)">Score 3</ion-checkbox>
				</ion-item>
				<CheckComments />
		</ion-list>
	</ion-card>
	<ion-card v-if=" criteria === 'firstCriteriaFeeding'">
		<ion-card-title>{{$t('weight_measured')}}</ion-card-title>
		<ion-list >
			<ion-item>
				<ion-input label="Weekly weights:" placeholder="Enter weekly weights"> </ion-input>
			</ion-item>
			<ion-item>
				<ion-input label="Target weight:" placeholder="Enter target weight"> </ion-input>
			</ion-item>
			<ion-item>
				<ion-input value="Score will be calculated automatically" :readonly="true"></ion-input>
			</ion-item>
			<CheckComments />
		</ion-list>
	</ion-card>
	<ion-card v-if=" criteria === 'secondCriteriaFeeding'">
		<ion-card-title>{{$t('kcal_calculations')}}</ion-card-title>
		<ion-list>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[1][0]" @click="handleClick(1,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[1][2]" @click="handleClick(1,1)">Score 3</ion-checkbox>
			</ion-item>
			<CheckComments />
		</ion-list>
	</ion-card>
	<ion-card v-if=" criteria === 'secondCriteriaFeeding'">
		<ion-card-title>{{$t('fourthSubcriteriaFeeding')}}</ion-card-title>		
		<ion-list>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[2][0]" @click="handleClick(2,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[2][1]" @click="handleClick(2,1)">Score 2</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[2][2]" @click="handleClick(2,2)">Score 3</ion-checkbox>
			</ion-item>
			<CheckComments />
		</ion-list>
	</ion-card>
	<ion-card v-if=" criteria === 'thirdCriteriaFeeding'">
		<ion-card-title>{{$t('fifthSubcriteriaFeeding')}}</ion-card-title>		
		<ion-list >
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[3][0]" @click="handleClick(3,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[3][2]" @click="handleClick(3,1)">Score 3</ion-checkbox>
			</ion-item>
			<CheckComments />
		</ion-list>
	</ion-card>
	<ion-card v-if=" criteria === 'fourthCriteriaFeeding'">
		<ion-card-title>{{$t('sixthSubcriteriaFeeding')}}</ion-card-title>	
		<ion-list>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[4][0]" @click="handleClick(4,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[4][1]" @click="handleClick(4,1)">Score 2</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[4][2]" @click="handleClick(4,2)">Score 3</ion-checkbox>
			</ion-item>
			<CheckComments />
		</ion-list>
	</ion-card>
	<!-- End of Checkboxes-->
	<ion-footer>
			<ion-toolbar>
				<ion-button color="light" slot="start" router-link="/folder/Evaluate" @click="storeData">
					Finish
				</ion-button>
				<ion-button color="light" slot="end" @click="confirmRefresh">
					<ion-icon src="/icons/arrow-forward-outline.svg"></ion-icon>
					{{$t('buttonNext')}}
				</ion-button>
			</ion-toolbar>
		</ion-footer>

	<!--<ion-range v-if=" subcriteria === 'fourthSubcriteriaFeeding'" aria-label="Dual Knobs Range" :dual-knobs="true" :value="{ lower: 20, upper: 80 }"></ion-range>-->
</template>

<script lang="ts">
import {IonItem, IonList, IonSelect, IonSelectOption, IonLabel, IonModal,
	IonHeader, IonToolbar, IonContent, IonTitle, IonButtons, IonButton,
	IonText, IonCheckbox, IonInput, IonRange, IonCard, IonCardTitle, IonFooter,
	IonIcon
} from '@ionic/vue';
import axios from 'axios';
import CheckComments from '@/components/CheckComments.vue';


export default {
	components: {
		// needed Vue components:
		IonItem, IonList, IonSelect, IonSelectOption, IonLabel, IonModal, IonHeader,
		IonToolbar, IonContent, IonTitle, IonButtons, IonButton, IonText, IonCheckbox,
		IonInput, IonRange, IonCard, IonCardTitle, CheckComments, IonFooter, IonIcon
	},
	data() {
		return {
			// Variables:
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
			CheckboxArray: Array.from({ length: 5 }, () => Array(3).fill(false)),
			dolphinList: [] as {name: string}[],
			urlDolphins: 'http://88395-17112.pph-server.de/api/dolphins',
			selectedDolphin: '',
			selectedTest: '',
			urlPost: 'http://88395-17112.pph-server.de/api/good_feeding',
			// Body for posting of data
			requestBody: {
				dolphin_name: this.selectedDolphin,
				body_condition_score: null as number | null,
				weight_measured: '',
				kcal_calculations: null as number | null,
				blood_hydration: null as number | null,
				fish_quality: null as number | null,
				fish_variety: null as number | null
				// ... Weitere Eigenschaften basierend auf den Checkboxes
      		},
		};
	},
	methods: {
		async showDolphins() {
			console.log("Someone wants to selct a dolphin")
			await axios.get(this.urlDolphins)
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
		handleClick(row: number, column: number) {
			if (this.CheckboxArray[row][column]){
				this.CheckboxArray[row][column] = false;
			}else{
				this.CheckboxArray[row][column] = true;
			}
			for(let i = 0; i < 3; i++){
				if (i != column){
					this.CheckboxArray[row][i] = false;
				}
			}
    	},
		// Methode zum Sammeln der ausgewählten Checkbox-Werte und Zuweisen der Scores
		storeCheckedValues() {
			for(let i = 0; i < 4; i++){
				for(let j = 0; j < 3; j++){
					if (this.CheckboxArray[i][j] == true && i == 0){
						this.requestBody.body_condition_score = j + 1;
					}else if (this.CheckboxArray[i][j] == true && i == 1){
						this.requestBody.kcal_calculations = j + 1;
					}else if (this.CheckboxArray[i][j] == true && i == 2){
						this.requestBody.blood_hydration = j + 1;
					}else if (this.CheckboxArray[i][j] == true && i == 3){
						this.requestBody.fish_quality = j + 1;
					}else if (this.CheckboxArray[i][j] == true && i == 4){
						this.requestBody.fish_variety = j + 1;
					}
				}
			}
		},

		async storeData() {
			const confirmed = confirm(this.$t('savingDataNext'));
     		if (confirmed) {
				console.log("Data is stored")
				await axios
						.post(this.urlPost, this.requestBody)
						.then((response) => {
							console.log('Response:', response.data);
						})
						.catch((error) => {
							console.error('Error:', error.response.data)
						});
			}
		},
		confirmRefresh() {
				const currentPath = this.$route.path;
        		const targetUrl = `/detailFeeding`;
        		window.location.href = targetUrl;
    	},
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
