<!-- eslint-disable vue/no-unused-components -->
<template>
	<!-- Criteria Selector v-on:click="showDolphins" @click="showDolphins"-->
	<ion-content>
		<ion-list>
			<ion-item>
				<ion-select
					:label="firstlabel"
					:placeholder="firstplaceholder"
					okText="OK"
					:cancelText="firstcancelText"		
					v-model="dolphinSelect"
					multiple
					@ionChange="checkAllDolphinsSelected"
					> 
					<ion-select-option value="all">All dolphins</ion-select-option>
					<ion-select-option v-for="dolphin in dolphinsStore.dolphinList" v-bind:key="dolphin.name">
						{{dolphin.name}}
					</ion-select-option>
				</ion-select>
			</ion-item>
			<ion-item>
				<ion-select
					:value="criteria"
					@IonChange="criteria=$event.target.value"
					:label="secondlabel"
					:placeholder="secondplaceholder"
					okText="OK"
					:cancelText="firstcancelText"
				>
					<ion-select-option value="firstCriteriaNutrition">{{
						$t('firstCriteriaNutrition')
					}}</ion-select-option>
					<ion-select-option value="secondCriteriaNutrition">{{
						$t('secondCriteriaNutrition')
					}}</ion-select-option>
					<ion-select-option value="thirdCriteriaNutrition">{{
						$t('thirdCriteriaNutrition')
					}}</ion-select-option>
					<ion-select-option value="fourthCriteriaNutrition">{{
						$t('fourthCriteriaNutrition')
					}}</ion-select-option>
				</ion-select>
			</ion-item>
		</ion-list>
		<!-- End of Criteria Selector -->

		<!-- Description of Criteria (UserManual) -->
		<ion-button v-if="criteria" fill="outline" @click="setOpenManual(true)">{{ $t('userManual') }}</ion-button>

		<ion-modal :is-open="isOpenManual">
			<ion-header>
				<ion-toolbar>
					<ion-title v-if=" criteria === 'firstCriteriaNutrition'"
						>{{$t('firstCriteriaNutrition')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'secondCriteriaNutrition'"
						>{{$t('secondCriteriaNutrition')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'thirdCriteriaNutrition'"
						>{{$t('thirdCriteriaNutrition')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'fourthCriteriaNutrition'"
						>{{$t('fourthCriteriaNutrition')}}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenManual(false)">{{ $t('close')}}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<p v-if=" criteria === 'firstCriteriaNutrition'">
					<h3>{{ $t('firstSubCriteriaNutrition') }}</h3>
						<li>Score 0: {{ $t('score0Nutrition1') }}</li>
						<li>Score 1: {{ $t('score1Nutrition1') }}</li>
						<li>Score 2: {{ $t('score2Nutrition1') }}</li>
					<h3>{{ $t('secondSubCriteriaNutrition') }}</h3>
						<li>Score 0: {{ $t('score0Nutrition2') }}</li>
						<li>Score 2: {{ $t('score2Nutrition2') }}</li>
				</p>
				<p v-if=" criteria === 'secondCriteriaNutrition'">
					<h3>{{ $t('thirdSubCriteriaNutrition') }}</h3>
						<li>Score 0: {{ $t('score0Nutrition3') }}</li>
						<li>Score 2: {{ $t('score2Nutrition3') }}</li>
					<h3>{{ $t('fourthSubCriteriaNutrition') }}</h3>
						<li>Score 0: {{ $t('score0Nutrition4') }}</li>
						<li>Score 1: {{ $t('score1Nutrition4') }}</li>
						<li>Score 2: {{ $t('score2Nutrition4') }}</li>
				</p>
				<p v-if=" criteria === 'thirdCriteriaNutrition'">
					<h3>{{ $t('fifthSubCriteriaNutrition') }}</h3>
						<li>Score 0: {{ $t('score0Nutrition5') }}</li>
						<li>Score 2: {{ $t('score2Nutrition5') }}</li>
				</p>
				<p v-if=" criteria === 'fourthCriteriaNutrition'">
					<h3>{{ $t('sixthSubCriteriaNutrition') }}</h3>
						<li>Score 0: {{ $t('score0Nutrition6') }}</li>
						<li>Score 1: {{ $t('score1Nutrition6') }}</li>
						<li>Score 2: {{ $t('score2Nutrition6') }}</li>
				</p>
			</ion-content>
		</ion-modal>
		<!-- End of Description of Criteria (UserManual)-->
		<!--Start of Scoring Description-->
		<ion-button v-if="criteria" fill="outline" @click="setOpenScoring(true)">{{ $t('ScoringDescription') }}</ion-button>

		<ion-modal :is-open="isOpenScoring">
			<ion-header>
				<ion-toolbar>
					<ion-title v-if=" criteria === 'firstCriteriaNutrition'"
						>{{$t('firstCriteriaNutrition')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'secondCriteriaNutrition'"
						>{{$t('secondCriteriaNutrition')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'thirdCriteriaNutrition'"
						>{{$t('thirdCriteriaNutrition')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'fourthCriteriaNutrition'"
						>{{$t('fourthCriteriaNutrition')}}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenScoring(false)">{{ $t('close')}}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<p v-if=" criteria === 'firstCriteriaNutrition'">
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
				<p v-if=" criteria === 'secondCriteriaNutrition'">
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
				<p v-if=" criteria === 'thirdCriteriaNutrition'">
					<h1>Food quality Microbiology, Physico-chemical analysis:</h1>
					<h3>Score 1</h3>
					Fulfilled according to EAAM S&G
					<h3>Score 3</h3>
					Not fulfilled according to EAAM S&G
				</p>
				<p v-if=" criteria === 'fourthCriteriaNutrition'">
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
		<!--Start of Reference Area-->
		<ion-button v-if="criteria" fill="outline" @click="setOpenReferenceArea(true)">{{ $t('ReferenceArea') }}</ion-button>

		<ion-modal :is-open="isOpenReferenceArea">
			<ion-header>
				<ion-toolbar>
					<ion-title>
						{{$t('ReferenceArea')}}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenReferenceArea(false)">{{ $t('close')}}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>

			<ion-content class="ion-padding">
				<p v-if=" criteria === 'firstCriteriaNutrition'">
					<!--Here are the values of reference area-->
					<h3>Wanted weight area:</h3>
					<div v-if="dolphinSelect">
						<div v-for="selectedDolphin in dolphinSelect" :key="selectedDolphin">
							<h4>{{ selectedDolphin }}</h4>
							<p>
							  Minimum: 
							  {{ 
								(dolphinsStore.dolphinList.find(
								  (dolphin) => dolphin.name === selectedDolphin
								)?.min_weight_measured) ?? null
							  }}
							</p>
							<p>
							  Maximum: 
							  {{ 
								(dolphinsStore.dolphinList.find(
								  (dolphin) => dolphin.name === selectedDolphin
								)?.max_weight_measured) ?? null
							  }}
							</p>
						  </div>
					  </div>
				</p>
				<p v-if=" criteria === 'secondCriteriaNutrition'">
					<!--Here are the values of reference area-->
					<h3>Kcal calculations</h3>
					<div v-if="dolphinSelect">
						<div v-for="selectedDolphin in dolphinSelect" :key="selectedDolphin">
							<h4>{{ selectedDolphin }}</h4>
							<p>
							  Minimum: 
							  {{ 
								(dolphinsStore.dolphinList.find(
								  (dolphin) => dolphin.name === selectedDolphin
								)?.min_kcal_calculations) ?? null
							  }}
							</p>
							<p>
							  Maximum: 
							  {{ 
								(dolphinsStore.dolphinList.find(
								  (dolphin) => dolphin.name === selectedDolphin
								)?.max_kcal_calculations) ?? null
							  }}
							</p>
						</div>
					</div>
				</p>
			</ion-content>
		</ion-modal>
		<!--End of Reference Area-->
		<!-- Start of Checkboxes-->
		<ion-card v-if=" criteria === 'firstCriteriaNutrition'">
			<ion-card-title>{{$t('firstSubCriteriaNutrition')}}</ion-card-title>
			<ion-list >
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[0][0]" @click="handleClick(0,0)">Score 0</ion-checkbox>
					</ion-item>
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[0][1]" @click="handleClick(0,1)">Score 1</ion-checkbox>
					</ion-item>
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[0][2]" @click="handleClick(0,2)">Score 2</ion-checkbox>
					</ion-item>
					<CheckComments @update-comment="updateBodyConditionScoreComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'firstCriteriaNutrition'">
			<ion-card-title>{{$t('secondSubCriteriaNutrition')}}</ion-card-title>
			<ion-list >
				<ion-item>
					<ion-input :label="weightLabel" :placeholder="weightPlaceholder" v-model="weight_measured"> </ion-input>
				</ion-item>
				<ion-item>
					<ion-input value="Score will be calculated automatically" :readonly="true"></ion-input>
				</ion-item>
				<CheckComments @update-comment="updateWeightMeasuredComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'secondCriteriaNutrition'">
			<ion-card-title>{{$t('thirdSubCriteriaNutrition')}}</ion-card-title>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[1][0]" @click="handleClick(1,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[1][2]" @click="handleClick(1,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateKcalCalculationsComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'secondCriteriaNutrition'">
			<ion-card-title>{{$t('fourthSubCriteriaNutrition')}}</ion-card-title>		
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[2][0]" @click="handleClick(2,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[2][1]" @click="handleClick(2,1)">Score 1</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[2][2]" @click="handleClick(2,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateBloodHydrationComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'thirdCriteriaNutrition'">
			<ion-card-title>{{$t('fifthSubCriteriaNutrition')}}</ion-card-title>		
			<ion-list >
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[3][0]" @click="handleClick(3,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[3][2]" @click="handleClick(3,1)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateFishQualityComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'fourthCriteriaNutrition'">
			<ion-card-title>{{$t('sixthSubCriteriaNutrition')}}</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][0]" @click="handleClick(4,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][1]" @click="handleClick(4,1)">Score 1</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][2]" @click="handleClick(4,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateFishVarietyComments" />
			</ion-list>
		</ion-card>
	</ion-content>
	<!-- End of Checkboxes-->
	<ion-footer>
			<ion-toolbar>
				<ion-button color="light" slot="start"  @click="storeData">
					{{$t('buttonFinish')}}
				</ion-button>
				<ion-button color="light" slot="end" @click="confirmRefresh">
					<ion-icon src="/icons/arrow-forward-outline.svg"></ion-icon>
					{{$t('buttonNext')}}
				</ion-button>
			</ion-toolbar>
	</ion-footer>
</template>

<script lang="ts">
import {IonAlert, IonItem, IonList, IonSelect, IonSelectOption, IonLabel, IonModal,
	IonHeader, IonToolbar, IonContent, IonTitle, IonButtons, IonButton,
	IonText, IonCheckbox, IonInput, IonRange, IonCard, IonCardTitle, IonFooter,
	IonIcon, alertController
} from '@ionic/vue';
import axios from 'axios';
import CheckComments from '@/components/CheckComments.vue';
import { useDolphinsStore }from '@/store/dolphinsStore';
import { useEvaluationFeedingStore }from '@/store/evaluationFeedingStore';
import { baseUrl } from '@/utils/baseUrl';
import { chevronCollapseSharp } from 'ionicons/icons';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';




const dolphinsStore = useDolphinsStore();
const evaluationFeedingStore = useEvaluationFeedingStore();
//dolphinsStore.fill();
let dataInBody; //Variable which gets saved in localstorage with either true or false, depending if data is in checkboxes or evaluationFeedingStore
const token = localStorage.getItem('token'); //Get current JWT token of the user
console.log('Token accessed from localStorage: ', token);

//document.cookie = token ?? '';
//console.log('This token is set in a cookie (client-side): ', document.cookie);

// Set up request config
/*const config = {
	headers: {
		Cookie: document.cookie,
	},
};*/



export default {
	components: {
		// needed Vue components:
		IonAlert, IonItem, IonList, IonSelect, IonSelectOption, IonLabel, IonModal, IonHeader,
		IonToolbar, IonContent, IonTitle, IonButtons, IonButton, IonText, IonCheckbox,
		IonInput, IonRange, IonCard, IonCardTitle, CheckComments, IonFooter, IonIcon, 
	},
	async mounted()  {
		// This makes sure that the reference areas are updated while the component is
		// mounted. But only if there is internet connectivity. If not, the displayed
		// reference areas are the ones from the animalList.json
   		await dolphinsStore.fill();
		// Reset here data while page is mounted
		localStorage.setItem('backButtonClicked', 'false');
		localStorage.setItem('dataInBody', 'false');
		localStorage.setItem('created_at', '');

		evaluationFeedingStore.resetBodies();
	},
	/*props: {
		userComment: {
			type: String,
			default: '',
		}
	},*/
	data() {
		return {
			// Variables:
			language: 'en',
			dialog: false,
			//dolphins: [] as {name: string}[],
			//dolphinsStore: useDolphinsStore(),
			dolphinsStore: dolphinsStore,
			dolphinSelect: [] as string[], //null as string | null,
			criteria: null as string | null,
			subcriteria: '',
			firstlabel: this.$t('dolphin'),
			firstplaceholder: this.$t('selectDolphin'),
			firstcancelText: this.$t('cancelChoice'),
			secondlabel: this.$t('criteria'),
			secondplaceholder: this.$t('selectCriteria'),
			isOpenManual: false,
			isOpenScoring: false,
			isOpenReferenceArea: false,
			weightLabel: this.$t('weightLabel'),
			weightPlaceholder: this.$t('weightPlaceholder'),
			//weight: '',
			CheckboxArray: Array.from({ length: 5 }, () => Array(3).fill(false)),
			//originalCheckboxValues: Array.from({length: 5}, () => Array(3).fill(false)),
			//dolphins: EvaluationMenu.dolphinList,
			//dolphinList: [] as {name: string}[],
			urlDolphins: baseUrl + '/api/dolphins', //'http://88395-17112.pph-server.de/api/dolphins', //the api route to get the dolphins
			urlPost: baseUrl + '/api/good_feeding', //'http://88395-17112.pph-server.de/api/good_feeding',
			body_condition_score_comments: '',
			weight_measured_comments: '',
			kcal_calculations_comments: '',
			blood_hydration_comments: '',
			fish_quality_comments: '',
			fish_variety_comments: '',
		};
	},
	methods: {
		//Method to open the manual
        setOpenManual(isOpen: boolean) {
            this.isOpenManual = isOpen;
        },
		//Method to open scoring desciption
		setOpenScoring(isOpen: boolean) {
            this.isOpenScoring = isOpen;
        },
		//Method to open reference area
		setOpenReferenceArea(isOpen: boolean) {
			this.isOpenReferenceArea = isOpen;
		},
		// ion-select method to check if all dolphins are selected
		checkAllDolphinsSelected() {
			if (this.dolphinSelect.includes('all')) {
				this.dolphinSelect = this.dolphinsStore.dolphinList.map(dolphin => dolphin.name);
			}
		},
		//Method uses boolean array. So no multiple checking for one test is possible. --> Every test can have one checked Checkbox
		handleClick(row: number, column: number) {
		console.log(this.CheckboxArray, row, column);
		


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
		dataInBody = true;
		localStorage.setItem('dataInBody', dataInBody.toString());
    	},
		// Method to collect the checked checkboxes and give request Body the scores
		storeCheckedValues() {
			for(let k = 0; k < evaluationFeedingStore.requestBodiesFeeding.length; k++){
				//k stands for the different dolphins. It iterates through the array of dolphins in requestBodiesFeeding.json
				if(this.dolphinSelect.includes(evaluationFeedingStore.requestBodiesFeeding[k]["dolphin_name"])) {
					/*if (this.dolphinSelect!== null){
						evaluationFeedingStore.requestBodiesFeeding[k]["dolphin_name"] = this.dolphinSelect;
					}*/
					evaluationFeedingStore.requestBodiesFeeding[k]["weight_measured"] = parseFloat(this.weight_measured);
					for(let i = 0; i < this.CheckboxArray.length; i++){
						for(let j = 0; j < this.CheckboxArray[i].length; j++){
							if (this.CheckboxArray[i][j] === true && i === 0){
								evaluationFeedingStore.requestBodiesFeeding[k]["body_condition_score"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 1){
								evaluationFeedingStore.requestBodiesFeeding[k]["kcal_calculations"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 2){
								evaluationFeedingStore.requestBodiesFeeding[k]["blood_hydration"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 3){
								evaluationFeedingStore.requestBodiesFeeding[k]["fish_quality"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 4){
								evaluationFeedingStore.requestBodiesFeeding[k]["fish_variety"] = j;
							}
						}
					}
					// Code here the comments into the request body
					evaluationFeedingStore.requestBodiesFeeding[k]["body_condition_score_comments"] = this.body_condition_score_comments;
					evaluationFeedingStore.requestBodiesFeeding[k]["weight_measured_comments"] = this.weight_measured_comments;
					evaluationFeedingStore.requestBodiesFeeding[k]["kcal_calculations_comments"] = this.kcal_calculations_comments;
					evaluationFeedingStore.requestBodiesFeeding[k]["blood_hydration_comments"] = this.blood_hydration_comments;
					evaluationFeedingStore.requestBodiesFeeding[k]["fish_quality_comments"] = this.fish_quality_comments;
					evaluationFeedingStore.requestBodiesFeeding[k]["fish_variety_comments"] = this.fish_variety_comments;

					if(localStorage.getItem('created_at') !== "") {
						evaluationFeedingStore.requestBodiesFeeding[k]["created_at"] = localStorage.getItem('created_at') as string;
					}
				}
			}
			for(let i = 0; i <= 4; i++){
				for(let j = 0; j < 3; j++){
					if (this.CheckboxArray[i][j] === true){
						this.CheckboxArray[i][j] = false;
					}
				}
			}
			dataInBody = true;
			localStorage.setItem('dataInBody', dataInBody.toString());
		},
		
		//Methods to update the comments
		updateBodyConditionScoreComments(comment: string) {
      		this.body_condition_score_comments = comment;
    	},
		updateWeightMeasuredComments(comment: string) {
	  		this.weight_measured_comments = comment;
		},
		updateKcalCalculationsComments(comment: string) {
	  		this.kcal_calculations_comments = comment;
		},
		updateBloodHydrationComments(comment: string) {
	  		this.blood_hydration_comments = comment;
		},
		updateFishQualityComments(comment: string) {
	  		this.fish_quality_comments = comment;
		},
		updateFishVarietyComments(comment: string) {
	  		this.fish_variety_comments = comment;
		},

		async confirmTestDate() {
		return new Promise(async (resolve, reject) => {
			const alert = await alertController.create({
			header: 'Confirmation',
			message: 'Is the data you entered current?',
			buttons: [
				{
				text: 'Yes',
				role: 'cancel',
				cssClass: 'secondary',
				handler: () => {
					console.log('Yes clicked');
					resolve(void 0);
				},
				},
				{
				text: 'No',
				handler: () => {
					(async () => {
						await this.showDateInputAlert();
						resolve(void 0);	
					})();
					
					
				},
				},
			],
			});

			return alert.present();
		});
},

async showDateInputAlert() {
  return new Promise(async (resolve, reject) => {
    const alert = await alertController.create({
      header: 'Enter Date',
      inputs: [
        {
          name: 'date',
          type: 'date',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: '',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel clicked');
            reject();
            this.storeData();
          },
        },
        {
          text: 'Confirm',
          handler: (data) => {
            console.log('Test date changed');
            // Convert the date to dd/mm/yyyy format
            const dateParts = data.date.split('-');
            //const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            // Convert the date to dd/mm/yyyy format
			const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}T00:00:00Z`;
            
			localStorage.setItem('created_at', formattedDate);
            localStorage.setItem('dataInBody', 'false');
            resolve(void 0);
          },
        },
      ],
    });

    return alert.present();
  });
},
		//Method to send the data to database
		async storeData() {
			//console.log('config', config);
			//const confirmed = confirm(this.$t('savingDataNext')); //Where is the variable savingDataNext initialized and what does it do?
     		const confirmed = true;
			if (confirmed) {
				//Check if the date of the test is the current date
				await this.confirmTestDate();

				//Store the checked values in the request body
				this.storeCheckedValues();
				console.log(this.CheckboxArray);
				
				console.log('Reached this');
				for(let i = 0; i < evaluationFeedingStore.requestBodiesFeeding.length; i++){
					/*for(const data in evaluationFeedingStore.requestBodiesFeeding[i]){
						if(evaluationFeedingStore.requestBodiesFeeding[i].content(data)){}
					}*/
					await axios
							.post(this.urlPost, evaluationFeedingStore.requestBodiesFeeding[i], { withCredentials: true })
							.then((response) => {
								console.log('Response:', response.data);
								if (i === evaluationFeedingStore.requestBodiesFeeding.length - 1){
									const targetUrl = '/detailFeeding'; //'/folder/Evaluate';
									toast.success('Data uploaded successfully', {
										autoClose: 1000,
									});
									setTimeout(() => {
										// Set flag to false, so if user wants to go to another route he can
										// without losing data, because data is now successfully uploaded
										dataInBody = false;
										localStorage.setItem('dataInBody', dataInBody.toString());
										this.$router.push(targetUrl);
									}, 2000);
									evaluationFeedingStore.resetBodies();
									this.dolphinSelect = [];
									this.criteria = null;
									localStorage.setItem('created_at', '');
								}
							})
							.catch((error) => {
								console.error('Error:', error.response.data);
								const targetUrl = `/detailFeeding`;
								toast.error('Data upload failed! Check internet connectivity.', {
										autoClose: 2000,
									});
									setTimeout(() => {
										dataInBody = false;
										localStorage.setItem('dataInBody', dataInBody.toString());
										localStorage.setItem('created_at', '');
										this.$router.push(targetUrl);
									}, 3000);
							});
				}
			}
		},
		confirmRefresh() {
			const confirmed = confirm(this.$t('savingDataNext'));
     		if (confirmed) {
				this.storeCheckedValues();
				console.log(evaluationFeedingStore.requestBodiesFeeding)
				this.dolphinSelect = [];
				this.criteria = null;
				//const currentPath = this.$route.path;
				const targetUrl = `/detailFeeding`;
				// No need to check if dataInBody true or false, because /detailFeeding doesn´t
				// need to be protected from losing data
				this.$router.push(targetUrl);
			}	
    	},
		//Method to get the Dolphins
		showDolphins(){
			//this.dolphins = this.dolphinsStore.dolphinList;
			//console.log(this.dolphinsStore.dolphinList);
			//console.log(this.dolphins);
			//console.log(evaluationFeedingStore.requestBodiesFeeding);
		},
		/*async showDolphins() {
			await axios.get(this.urlDolphins)
				.then ((response) => {
        		//console.log('Response:', response.data);
				this.dolphinList = response.data;
    			})
			 	.catch ((e) => {
				console.error(e);
				});
		},*/
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
