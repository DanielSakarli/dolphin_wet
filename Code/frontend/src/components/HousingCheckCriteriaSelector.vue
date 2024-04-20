<template>
	<ion-content>
		<!-- Criteria Selector -->
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
					:label="secondlabel"
					:placeholder="secondplaceholder"
					okText="OK"
					@IonChange="criteria=$event.target.value"
					:cancelText="firstcancelText"
				>
					<ion-select-option value="firstCriteriaEnvironment">{{
						$t('firstCriteriaEnvironment')
					}}</ion-select-option>
					<ion-select-option value="secondCriteriaEnvironment">{{
						$t('secondCriteriaEnvironment')
					}}</ion-select-option>
					<ion-select-option value="thirdCriteriaEnvironment">{{
						$t('thirdCriteriaEnvironment')
					}}</ion-select-option>
					<ion-select-option value="fourthCriteriaEnvironment">{{
						$t('fourthCriteriaEnvironment')
					}}</ion-select-option>
					<ion-select-option value="fifthCriteriaEnvironment">{{
						$t('fifthCriteriaEnvironment')
					}}</ion-select-option>
					<ion-select-option value="sixthCriteriaEnvironment">{{
						$t('sixthCriteriaEnvironment')
					}}</ion-select-option>
					<ion-select-option value="seventhCriteriaEnvironment">{{
						$t('seventhCriteriaEnvironment')
					}}</ion-select-option>
				</ion-select>
			</ion-item>
		</ion-list>
		<!-- End of Criteria Selector -->

		<!-- Description of Criteria -->
		<ion-button v-if="criteria" fill="outline" @click="setOpenManual(true)">{{ $t('userManual') }}</ion-button>

		<ion-modal :is-open="isOpenManual">
			<ion-header>
				<ion-toolbar>
					<ion-title v-if=" criteria === 'firstCriteriaEnvironment'"
						>{{$t('firstCriteriaEnvironment')
					}}</ion-title>
					<ion-title v-else-if=" criteria === 'secondCriteriaEnvironment'"
						>{{$t('secondCriteriaEnvironment')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'thirdCriteriaEnvironment'"
						>{{$t('thirdCriteriaEnvironment')}}
					</ion-title>
					<ion-title  v-else-if=" criteria === 'fourthCriteriaEnvironment'"
						>{{$t('fourthCriteriaEnvironment')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'fifthCriteriaEnvironment'"
						>{{$t('fifthCriteriaEnvironment')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'sixthCriteriaEnvironment'"
						>{{$t('sixthCriteriaEnvironment')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'seventhCriteriaEnvironment'"
						>{{$t('seventhCriteriaEnvironment')}}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenManual(false)">Close</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<p v-if=" criteria === 'firstCriteriaEnvironment'">
					<h3>{{ $t('firstSubCriteriaEnvironment') }}</h3>
						<li>Score 0: {{ $t('score0Environment1') }}</li>
						<li>Score 2: {{ $t('score2Environment1') }}</li>
					<h3>{{ $t('secondSubCriteriaEnvironment') }}</h3>
						<li>Score 0: {{ $t('score0Environment2') }}</li>
						<li>Score 2: {{ $t('score2Environment2') }}</li>
				</p>
				<p v-if=" criteria === 'secondCriteriaEnvironment'">
					<h3>{{ $t('thirdSubCriteriaEnvironment') }}</h3>
						<li>Score 0: {{ $t('score0Environment3') }}</li>
						<li>Score 2: {{ $t('score2Environment3') }}</li>
				</p>
				<p v-if=" criteria === 'thirdCriteriaEnvironment'">
					<h3>{{ $t('fourthSubCriteriaEnvironment') }}</h3>
						<li>Score 0: {{ $t('score0Environment4') }}</li>
						<li>Score 2: {{ $t('score2Environment4') }}</li>
				</p>
				<p v-if=" criteria === 'fourthCriteriaEnvironment'">
					<h3>{{ $t('fifthSubCriteriaEnvironment') }}</h3>
						<li>Score 0: {{ $t('score0Environment5') }}</li>
						<li>Score 2: {{ $t('score2Environment5') }}</li>
				</p>
				<p v-if=" criteria === 'fifthCriteriaEnvironment'">
					<h3>{{ $t('sixthSubCriteriaEnvironment') }}</h3>
						<li>Score 0: {{ $t('score0Environment6') }}</li>
						<li>Score 2: {{ $t('score2Environment6') }}</li>
				</p>
				<p v-if=" criteria === 'sixthCriteriaEnvironment'">
					<h3>{{ $t('seventhSubCriteriaEnvironment') }}</h3>
						<li>Score 0: {{ $t('score0Environment7') }}</li>
						<li>Score 2: {{ $t('score2Environment7') }}</li>
				</p>
				<p v-if=" criteria === 'sixthCriteriaEnvironment'">
					<h3>{{ $t('eigthSubCriteriaEnvironment') }}</h3>
						<li>Score 0: {{ $t('score0Environment8') }}</li>
						<li>Score 2: {{ $t('score2Environment8') }}</li>
				</p>
				<p v-if=" criteria === 'seventhCriteriaEnvironment'">
					<h3>{{ $t('ninthSubCriteriaEnvironment') }}</h3>
						<li>Score 0: {{ $t('score0Environment9') }}</li>
						<li>Score 2: {{ $t('score2Environment9') }}</li>
				</p>
			</ion-content>
		</ion-modal>

		<!-- End of Description of Criteria -->
		<!--Start of Scoring Description-->
		<ion-button v-if="criteria" fill="outline" @click="setOpenScoring(true)">{{ $t('ScoringDescription') }}</ion-button>

		<ion-modal :is-open="isOpenScoring">
			<ion-header>
				<ion-toolbar>
					<ion-title v-if=" criteria === 'firstCriteriaEnvironment'"
						>{{$t('firstCriteriaEnvironment')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'secondCriteriaEnvironment'"
						>{{$t('secondCriteriaEnvironment')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'thirdCriteriaEnvironment'"
						>{{$t('thirdCriteriaEnvironment')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'fourthCriteriaEnvironment'"
						>{{$t('fourthCriteriaEnvironment')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'fifthCriteriaEnvironment'"
						>{{$t('fifthCriteriaEnvironment')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'sixthCriteriaEnvironment'"
						>{{$t('sixthCriteriaEnvironment')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'seventhCriteriaEnvironment'"
						>{{$t('seventhCriteriaEnvironment')}}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenScoring(false)">{{ $t('close')}}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<p v-if=" criteria === 'firstCriteriaEnvironment'">
					<h1>Enclosures and barriers safety and maintenance:</h1>
					<h3>Score 1</h3>
					All criteria are met according to EAAM S&Gs (see 5.)
					<h3>Score 3</h3>
					At least one criterion is not  met according to EAAM S&Gs (see 5.)
					<h1>No foreign body ingestion:</h1>
					<h3>Score 1</h3>
					Absence on records
					<h3>Score 3</h3>
					Presence on records (last three months)
				</p>
				<p v-if=" criteria === 'secondCriteriaEnvironment'">
					<h1>Pool dimension, pool design, number of pools, available access to pools & group management:</h1>
					<h3>Score 1</h3>
					All criteria are met according to EAAM S&Gs (see 5.)
					<h3>Score 3</h3>
					At least one criteria is not  met according to EAAM S&Gs (see 5.)
				</p>
				<p v-if=" criteria === 'thirdCriteriaEnvironment'">
					<h1>Presence or absence based on records/ trainer interviews:</h1>
					<h3>Score 1</h3>
					Dolphin was not separated or only separated during medical emergencies or research purposes for short periods of time (less than 1 h/day) during last three months
					<h3>Score 3</h3>
					Dolphin was separated for longer periods of time (more than 1 h/day) during last three months
				</p>
				<p v-if=" criteria === 'fourthCriteriaEnvironment'">
					<h1>Water quality parameters:</h1>
					<h3>Score 1</h3>
					All criteria are met according to EAAM S&Gs (see 9.)
					<h3>Score 3</h3>
					At least one criterion is not met according to EAAM S&Gs (see 9.)
				</p>
				<p v-if=" criteria === 'fifthCriteriaEnvironment'">
					<h1>Water temperature levels:</h1>
					<h3>Score 1</h3>
					All criteria are met according to EAAM S&Gs (see 9.)
					<h3>Score 3</h3>
					At least one criteria is not met according to EAAM S&Gs (see 9.)
				</p>
				<p v-if=" criteria === 'sixthCriteriaEnvironment'">
					<h1>Sufficient shade provided and accessible in case needed:</h1>
					<h3>Score 1</h3>
					All criteria are met according to EAAM S&Gs (see 9.)
					<h3>Score 3</h3>
					At least one criteria is not met according to EAAM S&Gs (see 9.)
				</p>
				<p v-if=" criteria === 'seventhCriteriaEnvironment'">
					<h1>40dB above hearing threshold (based on German "Gutachten über die Mindesanforderungen an die Haltung von Säugetieren, BMEL 2014")</h1>
					<h3>Score 1</h3>
					no noise above 40 dB above the hearing threshold for more than 1 minute/day
					<h3>Score 3</h3>
					noise above 40 dB level above the hearing threshold for more than 1 minute/day
				</p>
			</ion-content>
		</ion-modal>
		<!--End of Scoring Description-->
		<!-- Start of Checkboxes-->
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'firstCriteriaEnvironment'">
			<ion-card-title>{{$t('firstSubCriteriaEnvironment')}}</ion-card-title>
			<ion-list >
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[0][0]" @click="handleClick(0,0)">Score 0</ion-checkbox>
					</ion-item>
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[0][2]" @click="handleClick(0,2)">Score 2</ion-checkbox>
					</ion-item>					
					<CheckComments @update-comment="updateEnclosureSafetyComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'firstCriteriaEnvironment'">
			<ion-card-title>{{$t('secondSubCriteriaEnvironment')}}</ion-card-title>
			<ion-list >
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[1][0]" @click="handleClick(1,0)">Score 0</ion-checkbox>
					</ion-item>
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[1][2]" @click="handleClick(1,2)">Score 2</ion-checkbox>
					</ion-item>
					<CheckComments @update-comment="updateForeignBodyComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'secondCriteriaEnvironment'">
			<ion-card-title>{{$t('thirdSubCriteriaEnvironment')}}</ion-card-title>
			<ion-list >
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[2][0]" @click="handleClick(2,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[2][2]" @click="handleClick(2,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updatePoolDesignComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'thirdCriteriaEnvironment'">
			<ion-card-title>{{$t('fourthSubCriteriaEnvironment')}}</ion-card-title>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[3][0]" @click="handleClick(3,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[3][2]" @click="handleClick(3,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateForcedLonelinessComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'fourthCriteriaEnvironment'">
			<ion-card-title>{{$t('fifthSubCriteriaEnvironment')}}</ion-card-title>		
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][0]" @click="handleClick(4,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][2]" @click="handleClick(4,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateWaterQualityComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'fifthCriteriaEnvironment'">
			<ion-card-title>{{$t('sixthSubCriteriaEnvironment')}}</ion-card-title>		
			<ion-list >
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[5][0]" @click="handleClick(5,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[5][2]" @click="handleClick(5,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateWaterTemperatureComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'sixthCriteriaEnvironment'">
			<ion-card-title>{{$t('seventhSubCriteriaEnvironment')}}</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[6][0]" @click="handleClick(6,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[6][2]" @click="handleClick(6,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateSufficientShadeComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'sixthCriteriaEnvironment'">
			<ion-card-title>{{$t('eighthSubCriteriaEnvironment')}}</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[7][0]" @click="handleClick(7,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[7][2]" @click="handleClick(7,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateReflectingColoursComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'seventhCriteriaEnvironment'">
			<ion-card-title>{{$t('ninthSubCriteriaEnvironment')}}</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[8][0]" @click="handleClick(8,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[8][2]" @click="handleClick(8,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateAcousticComfortComments"/>
			</ion-list>
		</ion-card>
	<!-- End of Checkboxes-->
	</ion-content>
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
import {
	IonItem, IonList, IonSelect, IonSelectOption,
	IonLabel, IonModal, IonHeader, IonFooter,
	IonToolbar, IonContent, IonTitle, IonCardTitle,
	IonButtons, IonButton, IonCheckbox, IonCard, IonIcon, alertController
} from '@ionic/vue';
import axios from 'axios';
import CheckComments from '@/components/CheckComments.vue';
import { useDolphinsStore }from '@/store/dolphinsStore';
import { useEvaluationHousingStore }from '@/store/evaluationHousingStore';
import { baseUrl } from '@/utils/baseUrl';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { journal } from 'ionicons/icons';

const dolphinsStore = useDolphinsStore();
const evaluationHousingStore = useEvaluationHousingStore();
let dataInBody; //Variable which gets saved in localstorage with either true or false, depending if data is in checkboxes or evaluationHousingStore

export default {
	components: {
		IonItem, IonList, IonSelect, IonSelectOption,
		IonLabel, IonModal, IonHeader, IonToolbar, IonIcon,
		IonContent, IonTitle, CheckComments, IonFooter,
		IonButtons, IonButton, IonCheckbox, IonCard, IonCardTitle
	},
	async mounted()  {
		// This makes sure that the reference areas are updated while the component is
		// mounted. But only if there is internet connectivity. If not, the displayed
		// reference areas are the ones from the animalList.json
   		await dolphinsStore.fill();
		evaluationHousingStore.fill(dolphinsStore.dolphinList);
		// Reset here data while page is mounted
		localStorage.setItem('dataInBody', 'false');
		localStorage.setItem('created_at', '');
		evaluationHousingStore.resetBodies();
	},
	data() {
		return {
			language: 'en',
			dolphinsStore: dolphinsStore,
			dolphinSelect: [] as string[], //null as string | null,
			criteria: null as string | null,
			firstlabel: this.$t('dolphin'),
			firstplaceholder: this.$t('selectDolphin'),
			firstcancelText: this.$t('cancelChoice'),
			secondlabel: this.$t('criteria'),
			secondplaceholder: this.$t('selectCriteria'),
			isOpenManual: false,
			isOpenScoring: false,
			CheckboxArray: Array.from({ length: 9 }, () => Array(3).fill(false)),
			urlPost: baseUrl + '/api/good_housing',
			enclosure_barrier_safety_comments: '',
			foreign_body_ingestion_comments: '',
			pool_design_comments: '',
			forced_loneliness_comments: '',
			water_quality_comments: '',
			water_temperature_comments: '',
			sufficient_shade_comments: '',
			reflecting_colours_comments: '',
			acoustic_comfort_comments: '',
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
		//Method uses boolean array. So no multiple checking for one test is possible. --> Every test can have one checked Checkbox
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
			dataInBody = true;
			localStorage.setItem('dataInBody', dataInBody.toString());
    	},
		// ion-select method to check if all dolphins are selected
		checkAllDolphinsSelected() {
			if (this.dolphinSelect.includes('all')) {
				this.dolphinSelect = this.dolphinsStore.dolphinList.map(dolphin => dolphin.name);
			}
		},
		// Method to collect the checked checkboxes and give request Body the scores
		storeCheckedValues() {
			for(let k = 0; k < evaluationHousingStore.requestBodiesHousing.length; k++){
				if(this.dolphinSelect.includes(evaluationHousingStore.requestBodiesHousing[k]["dolphin_name"])) {
					/*if (this.dolphinSelect!== null){
						evaluationHousingStore.requestBodiesHousing[k]["dolphin_name"] = this.dolphinSelect;
					}*/
					for(let i = 0; i < this.CheckboxArray.length; i++){
						for(let j = 0; j < this.CheckboxArray[i].length; j++){
							if (this.CheckboxArray[i][j] === true && i === 0){
								evaluationHousingStore.requestBodiesHousing[k]["enclosure_barrier_safety"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 1){
								evaluationHousingStore.requestBodiesHousing[k]["foreign_body_ingestion"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 2){
								evaluationHousingStore.requestBodiesHousing[k]["pool_design"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 3){
								evaluationHousingStore.requestBodiesHousing[k]["forced_loneliness"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 4){
								evaluationHousingStore.requestBodiesHousing[k]["water_quality"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 5){
								evaluationHousingStore.requestBodiesHousing[k]["water_temperature"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 6){
								evaluationHousingStore.requestBodiesHousing[k]["sufficient_shade"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 7){
								evaluationHousingStore.requestBodiesHousing[k]["reflecting_colours"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 8){
								evaluationHousingStore.requestBodiesHousing[k]["acoustic_comfort"] = j;
							}
						}
					}
					evaluationHousingStore.requestBodiesHousing[k]["enclosure_barrier_safety_comments"] = this.enclosure_barrier_safety_comments;
					evaluationHousingStore.requestBodiesHousing[k]["foreign_body_ingestion_comments"] = this.foreign_body_ingestion_comments;
					evaluationHousingStore.requestBodiesHousing[k]["pool_design_comments"] = this.pool_design_comments;
					evaluationHousingStore.requestBodiesHousing[k]["forced_loneliness_comments"] = this.forced_loneliness_comments;
					evaluationHousingStore.requestBodiesHousing[k]["water_quality_comments"] = this.water_quality_comments;
					evaluationHousingStore.requestBodiesHousing[k]["water_temperature_comments"] = this.water_temperature_comments;
					evaluationHousingStore.requestBodiesHousing[k]["sufficient_shade_comments"] = this.sufficient_shade_comments;
					evaluationHousingStore.requestBodiesHousing[k]["reflecting_colours_comments"] = this.reflecting_colours_comments;
					evaluationHousingStore.requestBodiesHousing[k]["acoustic_comfort_comments"] = this.acoustic_comfort_comments;
					
					if(localStorage.getItem('created_at') !== "") {
						evaluationHousingStore.requestBodiesHousing[k]["created_at"] = localStorage.getItem('created_at') as string;
					}
				}
			}
			
			this.resetData();
			dataInBody = true;
			localStorage.setItem('dataInBody', dataInBody.toString());
		},
		async resetData() {
			// Reset checkboxes
			for(let i = 0; i <= 8; i++){
				for(let j = 0; j < 3; j++){
					if (this.CheckboxArray[i][j] === true){
						this.CheckboxArray[i][j] = false;
					}
				}
			}
			// Reset comments
			this.enclosure_barrier_safety_comments = '';
			this.foreign_body_ingestion_comments = '';
			this.pool_design_comments = '';
			this.forced_loneliness_comments = '';
			this.water_quality_comments = '';
			this.water_temperature_comments = '';
			this.sufficient_shade_comments = '';
			this.reflecting_colours_comments = '';
			this.acoustic_comfort_comments = '';
		},
		//Methods to update the comments
		updateEnclosureSafetyComments(comment: string) {
			this.enclosure_barrier_safety_comments = comment;
		},
		updateForeignBodyComments(comment: string) {
			this.foreign_body_ingestion_comments = comment;
		},
		updatePoolDesignComments(comment: string) {
			this.pool_design_comments = comment;
		},
		updateForcedLonelinessComments(comment: string) {
			this.forced_loneliness_comments = comment;
		},
		updateWaterQualityComments(comment: string) {
			this.water_quality_comments = comment;
		},
		updateWaterTemperatureComments(comment: string) {
			this.water_temperature_comments = comment;
		},
		updateSufficientShadeComments(comment: string) {
			this.sufficient_shade_comments = comment;
		},
		updateReflectingColoursComments(comment: string) {
			this.reflecting_colours_comments = comment;
		},
		updateAcousticComfortComments(comment: string) {
			this.acoustic_comfort_comments = comment;
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
			const confirmed = true; //confirm(this.$t('savingDataNext'));
     		if (confirmed) {
				this.storeCheckedValues();
				// Flag to only show network error alert once instead of several times after another
				let alertShown = false;
				console.log(this.CheckboxArray);
				for(let i = 0; i < evaluationHousingStore.requestBodiesHousing.length; i++){
					await axios
							.post(this.urlPost, evaluationHousingStore.requestBodiesHousing[i], { withCredentials: true })
							.then((response) => {
								console.log('Response:', response.data);
								if (i === evaluationHousingStore.requestBodiesHousing.length - 1){
									const targetUrl = '/detailHousing'; //'/folder/Evaluate';
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
									evaluationHousingStore.resetBodies();
									localStorage.setItem('created_at', '');
									this.dolphinSelect = [];
									this.criteria = null;
								}
							})
							.catch((error) => {
								console.error('Error:', error.response.data);
								const targetUrl = `/detailHousing`;
								if(error.message === 'Network Error' && !alertShown) {
									//console.log('Inside error catch block');
									alertShown = true;
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
		confirmRefresh() {
			const confirmed = true; //confirm(this.$t('savingDataNext'));
     		if (confirmed) {
				this.storeCheckedValues();
				console.log(evaluationHousingStore.requestBodiesHousing)
				
				toast.success('Saved temporarily. Click \'Finish Tests\' in the end!', {
					autoClose: 1000,
				});
				
				// Doing the same dolphinSelect with the next criteria in the list:
				switch (this.criteria) {
					case 'firstCriteriaEnvironment':
						this.criteria = 'secondCriteriaEnvironment';
						break;
					case 'secondCriteriaEnvironment':
						this.criteria = 'thirdCriteriaEnvironment';
						break;
					case 'thirdCriteriaEnvironment':
						this.criteria = 'fourthCriteriaEnvironment';
						break;
					case 'fourthCriteriaEnvironment':
						this.criteria = 'firstCriteriaEnvironment';
						break;
					default:
						this.criteria = 'firstCriteriaEnvironment';
				}
				
				//this.dolphinSelect = null;
				//this.criteria = null;
				const currentPath = this.$route.path;
				const targetUrl = `/detailHousing`;
				this.$router.push(targetUrl);
			}	
    	},
		//Method to get the Dolphins
		showDolphins(){
			//this.dolphins = this.dolphinsStore.dolphinList;
			//console.log(this.dolphinsStore.dolphinList);
			//console.log(this.dolphins);
			//console.log(evaluationHousingStore.requestBodiesHousing);
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
