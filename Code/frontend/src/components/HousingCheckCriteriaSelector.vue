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
					<ion-select-option value="firstCriteriaHousing">{{
						$t('firstCriteriaHousing')
					}}</ion-select-option>
					<ion-select-option value="secondCriteriaHousing">{{
						$t('secondCriteriaHousing')
					}}</ion-select-option>
					<ion-select-option value="thirdCriteriaHousing">{{
						$t('thirdCriteriaHousing')
					}}</ion-select-option>
					<ion-select-option value="fourthCriteriaHousing">{{
						$t('fourthCriteriaHousing')
					}}</ion-select-option>
					<ion-select-option value="fifthCriteriaHousing">{{
						$t('fifthCriteriaHousing')
					}}</ion-select-option>
					<ion-select-option value="sixthCriteriaHousing">{{
						$t('sixthCriteriaHousing')
					}}</ion-select-option>
					<ion-select-option value="seventhCriteriaHousing">{{
						$t('seventhCriteriaHousing')
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
					<ion-title v-if=" criteria === 'firstCriteriaHousing'"
						>{{$t('firstCriteriaHousing')
					}}</ion-title>
					<ion-title v-else-if=" criteria === 'secondCriteriaHousing'"
						>{{$t('secondCriteriaHousing')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'thirdCriteriaHousing'"
						>{{$t('thirdCriteriaHousing')}}
					</ion-title>
					<ion-title  v-else-if=" criteria === 'fourthCriteriaHousing'"
						>{{$t('fourthCriteriaHousing')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'fifthCriteriaHousing'"
						>{{$t('fifthCriteriaHousing')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'sixthCriteriaHousing'"
						>{{$t('sixthCriteriaHousing')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'seventhCriteriaHousing'"
						>{{$t('seventhCriteriaHousing')}}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenManual(false)">Close</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<p v-if=" criteria === 'firstCriteriaHousing'">
					<h3>{{ $t('firstSubCriteriaHousing') }}</h3>
					Enclosures and barriers safety and maintenance according to EAAM S&Gs (see 5.)
				</p>
				<p v-if=" criteria === 'firstCriteriaHousing'">
					<h3>{{ $t('secondSubCriteriaHousing') }}</h3>
					Presence or absence in records
				</p>
				<p v-if=" criteria === 'secondCriteriaHousing'">
					<h3>{{ $t('thirdSubCriteriaHousing') }}</h3>
					Pool dimension, pool design, number of pools, available access to pools & group management according to EAAM S&Gs (see 5.)
				</p>
				<p v-if=" criteria === 'thirdCriteriaHousing'">
					<h3>{{ $t('fourthSubCriteriaHousing') }}</h3>
					Presence or absence of forced loneliness based on records/ trainer interviews
				</p>
				<p v-if=" criteria === 'fourthCriteriaHousing'">
					<h3>{{ $t('fifthSubCriteriaHousing') }}</h3>
					Water quality parameters accordig to EAAM S&Gs (see 9.)
				</p>
				<p v-if=" criteria === 'fifthCriteriaHousing'">
					<h3>{{ $t('sixthSubCriteriaHousing') }}</h3>
					Water temperature levels according to EAAM S&Gs (see 9.)
				</p>
				<p v-if=" criteria === 'sixthCriteriaHousing'">
					<h3>{{ $t('seventhSubCriteriaHousing') }}</h3>
					Presence of/Access to shaded areas
				</p>
				<p v-if=" criteria === 'seventhCriteriaHousing'">
					<h3>{{ $t('eighthSubCriteriaHousing') }}</h3>
					Adequate degree of  underwater noise (40dB above hearing threshold)
				</p>
			</ion-content>
		</ion-modal>

		<!-- End of Description of Criteria -->
		<!--Start of Scoring Description-->
		<ion-button v-if="criteria" fill="outline" @click="setOpenScoring(true)">{{ $t('ScoringDescription') }}</ion-button>

		<ion-modal :is-open="isOpenScoring">
			<ion-header>
				<ion-toolbar>
					<ion-title v-if=" criteria === 'firstCriteriaHousing'"
						>{{$t('firstCriteriaHousing')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'secondCriteriaHousing'"
						>{{$t('secondCriteriaHousing')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'thirdCriteriaHousing'"
						>{{$t('thirdCriteriaHousing')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'fourthCriteriaHousing'"
						>{{$t('fourthCriteriaHousing')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'fifthCriteriaHousing'"
						>{{$t('fifthCriteriaHousing')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'sixthCriteriaHousing'"
						>{{$t('sixthCriteriaHousing')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'seventhCriteriaHousing'"
						>{{$t('seventhCriteriaHousing')}}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenScoring(false)">{{ $t('close')}}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<p v-if=" criteria === 'firstCriteriaHousing'">
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
				<p v-if=" criteria === 'secondCriteriaHousing'">
					<h1>Pool dimension, pool design, number of pools, available access to pools & group management:</h1>
					<h3>Score 1</h3>
					All criteria are met according to EAAM S&Gs (see 5.)
					<h3>Score 3</h3>
					At least one criteria is not  met according to EAAM S&Gs (see 5.)
				</p>
				<p v-if=" criteria === 'thirdCriteriaHousing'">
					<h1>Presence or absence based on records/ trainer interviews:</h1>
					<h3>Score 1</h3>
					Dolphin was not separated or only separated during medical emergencies or research purposes for short periods of time (less than 1 h/day) during last three months
					<h3>Score 3</h3>
					Dolphin was separated for longer periods of time (more than 1 h/day) during last three months
				</p>
				<p v-if=" criteria === 'fourthCriteriaHousing'">
					<h1>Water quality parameters:</h1>
					<h3>Score 1</h3>
					All criteria are met according to EAAM S&Gs (see 9.)
					<h3>Score 3</h3>
					At least one criterion is not met according to EAAM S&Gs (see 9.)
				</p>
				<p v-if=" criteria === 'fifthCriteriaHousing'">
					<h1>Water temperature levels:</h1>
					<h3>Score 1</h3>
					All criteria are met according to EAAM S&Gs (see 9.)
					<h3>Score 3</h3>
					At least one criteria is not met according to EAAM S&Gs (see 9.)
				</p>
				<p v-if=" criteria === 'sixthCriteriaHousing'">
					<h1>Sufficient shade provided and accessible in case needed:</h1>
					<h3>Score 1</h3>
					All criteria are met according to EAAM S&Gs (see 9.)
					<h3>Score 3</h3>
					At least one criteria is not met according to EAAM S&Gs (see 9.)
				</p>
				<p v-if=" criteria === 'seventhCriteriaHousing'">
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
		<ion-card v-if=" criteria === 'firstCriteriaHousing'">
			<ion-card-title>{{$t('firstSubCriteriaHousing')}}</ion-card-title>
			<ion-list >
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[0][0]" @click="handleClick(0,0)">Score 1</ion-checkbox>
					</ion-item>
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[0][2]" @click="handleClick(0,2)">Score 3</ion-checkbox>
					</ion-item>					
					<CheckComments @update-comment="updateEnclosureSafetyComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'firstCriteriaHousing'">
			<ion-card-title>{{$t('secondSubCriteriaHousing')}}</ion-card-title>
			<ion-list >
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[1][0]" @click="handleClick(1,0)">Score 1</ion-checkbox>
					</ion-item>
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[1][2]" @click="handleClick(1,2)">Score 3</ion-checkbox>
					</ion-item>
					<CheckComments @update-comment="updateForeignBodyComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'secondCriteriaHousing'">
			<ion-card-title>{{$t('thirdSubCriteriaHousing')}}</ion-card-title>
			<ion-list >
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[2][0]" @click="handleClick(2,0)">Score 1</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[2][2]" @click="handleClick(2,2)">Score 3</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updatePoolDesignComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'thirdCriteriaHousing'">
			<ion-card-title>{{$t('fourthSubCriteriaHousing')}}</ion-card-title>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[3][0]" @click="handleClick(3,0)">Score 1</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[3][2]" @click="handleClick(3,1)">Score 3</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateForcedLonelinessComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'fourthCriteriaHousing'">
			<ion-card-title>{{$t('fifthSubCriteriaHousing')}}</ion-card-title>		
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][0]" @click="handleClick(4,0)">Score 1</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][2]" @click="handleClick(4,2)">Score 3</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateWaterQualityComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'fifthCriteriaHousing'">
			<ion-card-title>{{$t('sixthSubCriteriaHousing')}}</ion-card-title>		
			<ion-list >
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[5][0]" @click="handleClick(5,0)">Score 1</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[5][2]" @click="handleClick(5,1)">Score 3</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateWaterTemperatureComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'sixthCriteriaHousing'">
			<ion-card-title>{{$t('seventhSubCriteriaHousing')}}</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[6][0]" @click="handleClick(6,0)">Score 1</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[6][2]" @click="handleClick(6,2)">Score 3</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateSufficientShadeComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'seventhCriteriaHousing'">
			<ion-card-title>{{$t('eighthSubCriteriaHousing')}}</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[7][0]" @click="handleClick(7,0)">Score 1</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[7][2]" @click="handleClick(7,2)">Score 3</ion-checkbox>
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
	IonButtons, IonButton, IonCheckbox, IonCard, IonIcon
} from '@ionic/vue';
import axios from 'axios';
import CheckComments from '@/components/CheckComments.vue';
import { useDolphinsStore }from '@/store/dolphinsStore';
import { useEvaluationHousingStore }from '@/store/evaluationHousingStore';
import { baseUrl } from '@/utils/baseUrl';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

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

		// Reset here data while page is mounted
		localStorage.setItem('dataInBody', 'false');
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
			CheckboxArray: Array.from({ length: 8 }, () => Array(3).fill(false)),
			urlPost: baseUrl + '/api/good_housing',
			enclosure_barrier_safety_comments: '',
			foreign_body_ingestion_comments: '',
			pool_design_comments: '',
			forced_loneliness_comments: '',
			water_quality_comments: '',
			water_temperature_comments: '',
			sufficient_shade_comments: '',
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
								evaluationHousingStore.requestBodiesHousing[k]["enclosure_barrier_safety"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 1){
								evaluationHousingStore.requestBodiesHousing[k]["foreign_body_ingestion"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 2){
								evaluationHousingStore.requestBodiesHousing[k]["pool_design"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 3){
								evaluationHousingStore.requestBodiesHousing[k]["forced_loneliness"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 4){
								evaluationHousingStore.requestBodiesHousing[k]["water_quality"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 5){
								evaluationHousingStore.requestBodiesHousing[k]["water_temperature"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 6){
								evaluationHousingStore.requestBodiesHousing[k]["sufficient_shade"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 7){
								evaluationHousingStore.requestBodiesHousing[k]["acoustic_comfort"] = j + 1;
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
					evaluationHousingStore.requestBodiesHousing[k]["acoustic_comfort_comments"] = this.acoustic_comfort_comments;
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
		updateAcousticComfortComments(comment: string) {
			this.acoustic_comfort_comments = comment;
		},
		//Method to send the data to database
		async storeData() {
			const confirmed = confirm(this.$t('savingDataNext'));
     		if (confirmed) {
				this.storeCheckedValues();
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
									this.dolphinSelect = [];
									this.criteria = null;
								}
							})
							.catch((error) => {
								console.error('Error:', error.response.data);
								const targetUrl = `/detailHousing`;
								toast.error('Data upload failed! Check internet connectivity.', {
										autoClose: 2000,
									});
									setTimeout(() => {
										dataInBody = false;
										localStorage.setItem('dataInBody', dataInBody.toString());
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
				console.log(evaluationHousingStore.requestBodiesHousing)
				this.dolphinSelect = null;
				this.criteria = null;
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
