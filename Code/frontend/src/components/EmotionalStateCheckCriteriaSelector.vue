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
						>
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
					<ion-select-option value="firstCriteriaEmotionalState">{{
						$t('firstCriteriaEmotionalState')
					}}</ion-select-option>
					<ion-select-option value="secondCriteriaEmotionalState">{{
						$t('secondCriteriaEmotionalState')
					}}</ion-select-option>
					<ion-select-option value="thirdCriteriaEmotionalState">{{
						$t('thirdCriteriaEmotionalState')
					}}</ion-select-option>
					<ion-select-option value="fourthCriteriaEmotionalState">{{
						$t('fourthCriteriaEmotionalState')
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
					<ion-title v-if=" criteria === 'firstCriteriaEmotionalState'"
						>{{$t('firstCriteriaEmotionalState')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'secondCriteriaEmotionalState'"
						>{{$t('secondCriteriaEmotionalState')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'thirdCriteriaEmotionalState'"
						>{{$t('thirdCriteriaEmotionalState')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'fourthCriteriaEmotionalState'"
						>{{$t('fourthCriteriaEmotionalState')}}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenManual(false)">{{ $t('close')}}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<p v-if=" criteria === 'firstCriteriaEmotionalState'">
					<h1>{{ $t('firstSubCriteriaEmotionalState') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0EmotionalState1') }}
					<h3>Score 2</h3>
					{{  $t('score2EmotionalState1') }}
				</p>
				<p v-if=" criteria === 'secondCriteriaEmotionalState'">
					<h1>{{ $t('secondSubCriteriaEmotionalState') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0EmotionalState2') }}
					<h3>Score 2</h3>
					{{  $t('score2EmotionalState2') }}
                    <h1>{{ $t('thirdSubCriteriaEmotionalState') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0EmotionalState3') }}
					<h3>Score 2</h3>
					{{  $t('score2EmotionalState3') }}
                    <h1>{{ $t('fourthSubCriteriaEmotionalState') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0EmotionalState4') }}
					<h3>Score 2</h3>
					{{  $t('score2EmotionalState4') }}
				</p>
				<p v-if=" criteria === 'thirdCriteriaEmotionalState'">
					<h1>{{ $t('fifthSubCriteriaEmotionalState') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0EmotionalState5') }}
					<h3>Score 2</h3>
					{{  $t('score2EmotionalState5') }}
					<h1>{{ $t('sixthSubCriteriaEmotionalState') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0EmotionalState6') }}
					<h3>Score 2</h3>
					{{  $t('score2EmotionalState6') }}
				</p>
				<p v-if=" criteria === 'fourthCriteriaEmotionalState'">
                    <h1>{{ $t('seventhSubCriteriaEmotionalState') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0EmotionalState7') }}
					<h3>Score 2</h3>
					{{  $t('score2EmotionalState7') }}
                </p>
			</ion-content>
		</ion-modal>
		<!-- End of Description of Criteria (UserManual)-->
		<!--Start of Scoring Description-->
		<ion-button v-if="criteria" fill="outline" @click="setOpenScoring(true)">{{ $t('ScoringDescription') }}</ion-button>

		<ion-modal :is-open="isOpenScoring">
			<ion-header>
				<ion-toolbar>
					<ion-title v-if=" criteria === 'firstCriteriaEmotionalState'"
						>{{$t('firstCriteriaEmotionalState')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'secondCriteriaEmotionalState'"
						>{{$t('secondCriteriaEmotionalState')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'thirdCriteriaEmotionalState'"
						>{{$t('thirdCriteriaEmotionalState')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'fourthCriteriaEmotionalState'"
						>{{$t('fourthCriteriaEmotionalState')}}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenScoring(false)">{{ $t('close')}}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<!--<p v-if=" criteria === 'firstCriteriaEmotionalState'">
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
				<p v-if=" criteria === 'secondCriteriaEmotionalState'">
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
				<p v-if=" criteria === 'thirdCriteriaEmotionalState'">
					<h1>Food quality Microbiology, Physico-chemical analysis:</h1>
					<h3>Score 1</h3>
					Fulfilled according to EAAM S&G
					<h3>Score 3</h3>
					Not fulfilled according to EAAM S&G
				</p>
				<p v-if=" criteria === 'fourthCriteriaEmotionalState'">
					<h1>Food variety along the year:</h1>
					<h3>Score 1</h3>
					At least 5 species are fed throughout the year, 
					each individual's diet is adapted to its individual EmotionalStateal needs and preferences, 
					amount of food fed varies between sessions, 
					part of the diet is given via enrichment
					<h3>Score 2</h3>
					At least 3, but no more than 5 species are fed throughout the year, 
					each individual's diet is adapted to its individual EmotionalStateal needs, but the 
					amount of food provided to the dolphins during each session is the same, 
					favorite species/animal preferences are neglected
					<h3>Score 3</h3>
					Only 3 or less species of food are fed throughout the year, no variation along the year, 
					diet is not adapted to individual preferences/specific need
				</p>-->
			</ion-content>
		</ion-modal>
		<!--End of Scoring Description-->
		<!--Start of Reference Area-->
		<!--<ion-button v-if="criteria" fill="outline" @click="setOpenReferenceArea(true)">{{ $t('ReferenceArea') }}</ion-button>

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
				<p v-if=" criteria === 'firstCriteriaEmotionalState'">-->
					<!--Here are the values of reference area-->
					<!--<h3>Wanted weight area:</h3>
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
				<p v-if=" criteria === 'secondCriteriaEmotionalState'">-->
					<!--Here are the values of reference area-->
					<!--<h3>Kcal calculations</h3>
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
		</ion-modal>-->
		<!--End of Reference Area-->
		<!-- Start of Checkboxes-->
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'firstCriteriaEmotionalState'">
			<ion-card-title>{{$t('firstSubCriteriaEmotionalState')}}</ion-card-title>
			<ion-list >
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[0][0]" @click="handleClick(0,0)">Score 0</ion-checkbox>
					</ion-item>
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[0][2]" @click="handleClick(0,2)">Score 2</ion-checkbox>
					</ion-item>
					<CheckComments @update-comment="updateWillingnessParticipateComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'secondCriteriaEmotionalState'">
			<ion-card-title>{{$t('secondSubCriteriaEmotionalState')}}</ion-card-title>
			<ion-list >
				<ion-item>
                    <ion-checkbox v-model="CheckboxArray[1][0]" @click="handleClick(1,0)">Score 0</ion-checkbox>
                </ion-item>
                <ion-item>
                    <ion-checkbox v-model="CheckboxArray[1][2]" @click="handleClick(1,2)">Score 2</ion-checkbox>
                </ion-item>
                <CheckComments @update-comment="updateSynchronousSwimmingComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'secondCriteriaEmotionalState'">
            <ion-card-title>{{$t('thirdSubCriteriaEmotionalState')}}</ion-card-title>
			<ion-list >
				<ion-item>
                    <ion-checkbox v-model="CheckboxArray[2][0]" @click="handleClick(2,0)">Score 0</ion-checkbox>
                </ion-item>
                <ion-item>
                    <ion-checkbox v-model="CheckboxArray[2][2]" @click="handleClick(2,2)">Score 2</ion-checkbox>
                </ion-item>
                <CheckComments @update-comment="updateGentleRubbingComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'secondCriteriaEmotionalState'">
            <ion-card-title>{{$t('fourthSubCriteriaEmotionalState')}}</ion-card-title>
			<ion-list >
				<ion-item>
                    <ion-checkbox v-model="CheckboxArray[3][0]" @click="handleClick(3,0)">Score 0</ion-checkbox>
                </ion-item>
                <ion-item>
                    <ion-checkbox v-model="CheckboxArray[3][2]" @click="handleClick(3,2)">Score 2</ion-checkbox>
                </ion-item>
                <CheckComments @update-comment="updateAnticipatoryBehaviourComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'thirdCriteriaEmotionalState'">
			<ion-card-title>{{$t('fifthSubCriteriaEmotionalState')}}</ion-card-title>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][0]" @click="handleClick(4,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][2]" @click="handleClick(4,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateFastSwimmingComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'thirdCriteriaEmotionalState'">
			<ion-card-title>{{$t('sixthSubCriteriaEmotionalState')}}</ion-card-title>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[5][0]" @click="handleClick(5,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[5][2]" @click="handleClick(5,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateTailSlappingComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'fourthCriteriaEmotionalState'">
			<ion-card-title>{{$t('seventhSubCriteriaEmotionalState')}}</ion-card-title>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[6][0]" @click="handleClick(6,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[6][2]" @click="handleClick(6,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateChoiceControlComments" />
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
import {IonItem, IonList, IonSelect, IonSelectOption, IonModal,
	IonHeader, IonToolbar, IonContent, IonTitle, IonButtons, IonButton,
	IonCheckbox, IonCard, IonCardTitle, IonFooter,
	IonIcon, alertController
} from '@ionic/vue';
import axios from 'axios';
import CheckComments from '@/components/CheckComments.vue';
import { useDolphinsStore }from '@/store/dolphinsStore';
import { useEvaluationEmotionalStateStore } from '@/store/evaluationEmotionalStateStore';
import { baseUrl } from '@/utils/baseUrl';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';




const dolphinsStore = useDolphinsStore();
const evaluationEmotionalStateStore = useEvaluationEmotionalStateStore();
let dataInBody; //Variable which gets saved in localstorage with either true or false, depending if data is in checkboxes or evaluationEmotionalStateStore
const token = localStorage.getItem('token'); //Get current JWT token of the user
console.log('Token accessed from localStorage: ', token);

export default {
	components: {
		// needed Vue components:
		IonItem, IonList, IonSelect, IonSelectOption, IonModal, IonHeader,
		IonToolbar, IonContent, IonTitle, IonButtons, IonButton, IonCheckbox,
		IonCard, IonCardTitle, CheckComments, IonFooter, IonIcon,
	},
	async mounted()  {
		// This makes sure that the reference areas are updated while the component is
		// mounted. But only if there is internet connectivity. If not, the displayed
		// reference areas are the ones from the animalList.json
   		// await dolphinsStore.fill();
		const dolphinsStore = useDolphinsStore();
		// evaluationEmotionalStateStore.resetBodies();
		// The fill method now resets the data in evaluationEmotionalStateStore
		evaluationEmotionalStateStore.fill(dolphinsStore.dolphinList);
		// Reset here data while page is mounted
		localStorage.setItem('backButtonClicked', 'false');
		localStorage.setItem('dataInBody', 'false'); //No unsaved data present while page is mounted
		localStorage.setItem('created_at', ''); //Used so that user can choose the date of the test himself
	},
	data() {
		return {
			// Variables:
			language: 'en',
			dialog: false,
			dolphinsStore: dolphinsStore,
			dolphinSelect: null as string | null,
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
			CheckboxArray: Array.from({ length: 7 }, () => Array(3).fill(false)), //For 7 subcriterias of EmotionalState principle
			urlDolphins: baseUrl + '/api/dolphins', // get the dolphins
			urlPost: baseUrl + '/api/emotional_state', //'https://88395-17112.pph-server.de/api/emotional_state',
			//Comments initialized as empty strings, so that they can be filled with the comments of the user input:
			willingnessParticipateComments: '',
			synchronousSwimmingComments: '',
			gentleRubbingComments: '',
			anticipatoryBehaviourComments: '',
			fastSwimmingComments: '',
			tailSlappingComments: '',
			choiceControlComments: '',
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
			if(isOpen) {
				// Update the data of the dolphins when the reference area is opened
				this.dolphinsStore.fill();
			}
			this.isOpenReferenceArea = isOpen;
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
		// Method to collect the checked checkboxes and give request body the scores
		storeCheckedValues() {
			for(let k = 0; k < evaluationEmotionalStateStore.requestBodiesEmotionalState.length; k++){
				//k stands for the different dolphins. It iterates through the array of dolphins in requestBodiesEmotionalState.json
				if(this.dolphinSelect.includes(evaluationEmotionalStateStore.requestBodiesEmotionalState[k]["dolphin_name"])) {
					for(let i = 0; i < this.CheckboxArray.length; i++){
						for(let j = 0; j < this.CheckboxArray[i].length; j++){
							if (this.CheckboxArray[i][j] === true && i === 0){
								evaluationEmotionalStateStore.requestBodiesEmotionalState[k]["willingness_to_participate"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 1){
								evaluationEmotionalStateStore.requestBodiesEmotionalState[k]["synchronous_swimming"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 2){
								evaluationEmotionalStateStore.requestBodiesEmotionalState[k]["rubbing_behaviour"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 3){
								evaluationEmotionalStateStore.requestBodiesEmotionalState[k]["anticipatory_behaviour"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 4){
								evaluationEmotionalStateStore.requestBodiesEmotionalState[k]["fast_swimming"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 5){
								evaluationEmotionalStateStore.requestBodiesEmotionalState[k]["tail_slapping"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 6){
								evaluationEmotionalStateStore.requestBodiesEmotionalState[k]["choice_and_control"] = j;
							}
						}
					}
					// Code here the comments into the request body
					// First check with if statement if comments had been updated or not. If we don´t do that we override the comments with
					// an empty string if we click on 'Next Test'
					if(this.willingnessParticipateComments != '') {
						evaluationEmotionalStateStore.requestBodiesEmotionalState[k]["willingness_to_participate_comments"] = this.willingnessParticipateComments;
					}
					if(this.synchronousSwimmingComments != '') {
						evaluationEmotionalStateStore.requestBodiesEmotionalState[k]["synchronous_swimming_comments"] = this.synchronousSwimmingComments;
					}
					if(this.gentleRubbingComments != '') {
						evaluationEmotionalStateStore.requestBodiesEmotionalState[k]["rubbing_behaviour_comments"] = this.gentleRubbingComments;
					}
					if(this.anticipatoryBehaviourComments != '') {
						evaluationEmotionalStateStore.requestBodiesEmotionalState[k]["anticipatory_behaviour_comments"] = this.anticipatoryBehaviourComments;
					}
					if(this.fastSwimmingComments != '') {
						evaluationEmotionalStateStore.requestBodiesEmotionalState[k]["fast_swimming_comments"] = this.fastSwimmingComments;
					}
					if(this.tailSlappingComments != '') {
						evaluationEmotionalStateStore.requestBodiesEmotionalState[k]["tail_slapping_comments"] = this.tailSlappingComments;
					}
					if(this.choiceControlComments != '') {
						evaluationEmotionalStateStore.requestBodiesEmotionalState[k]["choice_and_control_comments"] = this.choiceControlComments;
					}

					if(localStorage.getItem('created_at') !== "") {
						evaluationEmotionalStateStore.requestBodiesEmotionalState[k]["created_at"] = localStorage.getItem('created_at') as string;
					}
				}
			}
			this.resetData();
			dataInBody = true;
			localStorage.setItem('dataInBody', dataInBody.toString());
		},
		async resetData() {
			// Reset checkboxes
			for(let i = 0; i <= 6; i++){
				for(let j = 0; j < 3; j++){
					if (this.CheckboxArray[i][j] === true){
						this.CheckboxArray[i][j] = false;
					}
				}
			}
			// Reset comments
			this.willingnessParticipateComments = '';
			this.synchronousSwimmingComments = '';
			this.gentleRubbingComments = '';
			this.anticipatoryBehaviourComments = '';
			this.fastSwimmingComments = '';
			this.tailSlappingComments = '';
			this.choiceControlComments = '';
		},
		//Methods to update the comments
		updateWillingnessParticipateComments(comment: string) {
			this.willingnessParticipateComments = comment;
		},
		updateSynchronousSwimmingComments(comment: string) {
			this.synchronousSwimmingComments = comment;
		},
		updateGentleRubbingComments(comment: string) {
			this.gentleRubbingComments = comment;
		},
		updateAnticipatoryBehaviourComments(comment: string) {
			this.anticipatoryBehaviourComments = comment;
		},
		updateFastSwimmingComments(comment: string) {
			this.fastSwimmingComments = comment;
		},
		updateTailSlappingComments(comment: string) {
			this.tailSlappingComments = comment;
		},
		updateChoiceControlComments(comment: string) {
			this.choiceControlComments = comment;
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
			//const confirmed = confirm(this.$t('savingDataNext')); //Where is the variable savingDataNext initialized and what does it do?
     		const confirmed = true;
			if (confirmed) {
				//Check if the date of the test is the current date
				await this.confirmTestDate();
				//Store the checked values in the request body
				this.storeCheckedValues();
				console.log(this.CheckboxArray);
				// Flag to only show network error alert once instead of several times after another
				let alertShown = false;
				console.log('Reached this');
				for(let i = 0; i < evaluationEmotionalStateStore.requestBodiesEmotionalState.length; i++){
					await axios
							.post(this.urlPost, evaluationEmotionalStateStore.requestBodiesEmotionalState[i], { withCredentials: true })
							.then((response) => {
								console.log('Response:', response.data);
								if (i === evaluationEmotionalStateStore.requestBodiesEmotionalState.length - 1){
									const targetUrl = '/detailEmotionalState';
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
									// evaluationEmotionalStateStore.resetBodies();
									// The fill method now resets the data in evaluationEmotionalStateStore
									evaluationEmotionalStateStore.fill(dolphinsStore.dolphinList);
									this.dolphinSelect = null;
									this.criteria = null;
									localStorage.setItem('created_at', '');
									
								}
							})
							.catch((error) => {					
								const targetUrl = `/detailEmotionalState`;
								if(error.message === 'Network Error' && !alertShown) {
									alertShown = true;	
									//console.log('Inside error catch block');
									toast.error('Data upload failed! Check internet connectivity.', {
										autoClose: 2000,
									});
									setTimeout(() => {
										dataInBody = false;
										localStorage.setItem('dataInBody', dataInBody.toString());
										localStorage.setItem('created_at', '');
										this.$router.push(targetUrl);
									}, 3000);
								}
							});
				}
			}
		},
		async confirmRefresh() {
			const confirmed = true; //confirm(this.$t('savingDataNext'));
     		if (confirmed) {
				this.storeCheckedValues();
				console.log(evaluationEmotionalStateStore.requestBodiesEmotionalState)
				
				toast.success('Saved temporarily. Click \'Finish Tests\' in the end!', {
					autoClose: 1000,
				});
				
				// Doing the same dolphinSelect with the next criteria in the list:
				switch (this.criteria) {
					case 'firstCriteriaEmotionalState':
						this.criteria = 'secondCriteriaEmotionalState';
						break;
					case 'secondCriteriaEmotionalState':
						this.criteria = 'thirdCriteriaEmotionalState';
						break;
					case 'thirdCriteriaEmotionalState':
						this.criteria = 'fourthCriteriaEmotionalState';
						break;
					case 'fourthCriteriaEmotionalState':
						this.criteria = 'fifthCriteriaEmotionalState';
						break;
					case 'fifthCriteriaEmotionalState':
						this.criteria = 'sixthCriteriaEmotionalState';
						break;
					case 'sixthCriteriaEmotionalState':
						this.criteria = 'seventhCriteriaEmotionalState';
						break;
					case 'seventhCriteriaEmotionalState':
						this.criteria = 'eighthCriteriaEmotionalState';
						break;
					case 'eighthCriteriaEmotionalState':
						this.criteria = 'firstCriteriaEmotionalState';
						break;			
					default:
						this.criteria = 'firstCriteriaEmotionalState';
				}
				const targetUrl = `/detailEmotionalState`;
				// No need to check if dataInBody true or false, because /detailEmotionalState doesn´t
				// need to be protected from losing data
				this.$router.push(targetUrl);
			}	
    	},
		//Method to get the Dolphins
		showDolphins(){
			//this.dolphins = this.dolphinsStore.dolphinList;
			//console.log(this.dolphinsStore.dolphinList);
			//console.log(this.dolphins);
			//console.log(evaluationEmotionalStateStore.requestBodiesEmotionalState);
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
