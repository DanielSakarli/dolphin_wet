<template>
	<ion-content>
		<!-- Criteria Selector -->
		<ion-list>
			<ion-item>
					<ion-select
						:label= "firstlabel"
						:placeholder="firstplaceholder"
						okText="OK"
						:cancelText="firstcancelText"		
						v-model= "dolphinSelect"
						>
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
					@IonChange ="criteria=$event.target.value"
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
				</ion-select>
			</ion-item>
		</ion-list>
		<!-- End of Criteria Selector -->

		<!-- Description of Criteria -->
		<ion-button fill ="outline" @click="setOpenManual(true)">{{ $t('userManual') }}</ion-button>

		<ion-modal :is-open="isOpenManual">
			<ion-header>
				<ion-toolbar>
					<ion-title v-if=" criteria === 'safe_environment'"
						>{{$t('safe_environment')
					}}</ion-title>
					<ion-title v-else-if=" criteria === 'adequate_spatial_requirements'"
						>{{$t('adequate_spatial_requirements')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'social_management'"
						>{{$t('social_management')}}
					</ion-title>
					<ion-title  v-else-if=" criteria === 'adequate_water_quality'"
						>{{$t('adequate_water_quality')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'thermal_comfort'"
						>{{$t('thermal_comfort')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'visual_comfort'"
						>{{$t('visual_comfort')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'acoustic_comfort'"
						>{{$t('acoustic_comfort')}}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenManual(false)">Close</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<p v-if=" criteria === 'safe_environment'">
					<h3>{{ $t('firstSubcriteriaHousing') }}</h3>
					Enclosures and barriers safety and maintenance according to EAAM S&Gs (see 5.)
				</p>
				<p v-if=" criteria === 'adequate_spatial_requirements'">
					<h3>{{ $t('secondSubcriteriaHousing') }}</h3>
					Presence or absence in records
				</p>
				<p v-if=" criteria === 'social_management'">
					<h3>{{ $t('thirdSubcriteriaHousing') }}</h3>
					Pool dimension, pool  design, number of pools, available access to pools & group management accordig to EAAM S&Gs (see 5.)
				</p>
				<p v-if=" criteria === 'adequate_water_quality'">
					<h3>{{ $t('fourthSubcriteriaHousing') }}</h3>
					Presence or absence in records/trainers' interviews
				</p>
				<p v-if=" criteria === 'thermal_comfort'">
					<h3>{{ $t('fiifthSubcriteriaHousing') }}</h3>
					Water quality parameters accordig to EAAM S&Gs (see 9.)
				</p>
				<p v-if=" criteria === 'visual_comfort'">
					<h3>{{ $t('sixthSubcriteriaHousing') }}</h3>
					Water temperature levels according to EAAM S&Gs (see 9.)
				</p>
				<p v-if=" criteria === 'acoustic_comfort'">
					<h3>{{ $t('seventhSubcriteriaHousing') }}</h3>
					Water temperature levels according to EAAM S&Gs (see 9.)
				</p>
			</ion-content>
		</ion-modal>

		<!-- End of Description of Criteria -->
		<!--Start of Scoring Description-->
		<ion-button fill ="outline" @click="setOpenScoring(true)">{{ $t('ScoringDescription') }}</ion-button>

		<ion-modal :is-open="isOpenScoring">
			<ion-header>
				<ion-toolbar>
					<ion-title v-if=" criteria === 'safe_environment'"
						>{{$t('safe_environment')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'adequate_spatial_requirements'"
						>{{$t('adequate_spatial_requirements')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'social_management'"
						>{{$t('social_management')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'adequate_water_quality'"
						>{{$t('adequate_water_quality')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'thermal_comfort'"
						>{{$t('thermal_comfort')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'visual_comfort'"
						>{{$t('visual_comfort')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'acoustic_comfort'"
						>{{$t('acoustic_comfort')}}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenScoring(false)">{{ $t('close')}}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<p v-if=" criteria === 'safe_environment'">
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
				<p v-if=" criteria === 'adequate_spatial_requirements'">
					<h1>Pool dimension, pool design, number of pools, available access to pools & group management:</h1>
					<h3>Score 1</h3>
					All criteria are met according to EAAM S&Gs (see 5.)
					<h3>Score 3</h3>
					At least one criteria is not  met according to EAAM S&Gs (see 5.)
				</p>
				<p v-if=" criteria === 'social_management'">
					<h1>Presence or absence based on records/ trainer interviews:</h1>
					<h3>Score 1</h3>
					Dolphin was not separated or only separated during medical emergencies or research purposes for short periods of time (less than 1 h/day) during last three months
					<h3>Score 3</h3>
					Dolphin was separated for longer periods of time (more than 1 h/day) during last three months
				</p>
				<p v-if=" criteria === 'adequate_water_quality'">
					<h1>Water quality parameters:</h1>
					<h3>Score 1</h3>
					All criteria are met according to EAAM S&Gs (see 9.)
					<h3>Score 3</h3>
					At least one criterion is not met according to EAAM S&Gs (see 9.)
				</p>
				<p v-if=" criteria === 'thermal_comfort'">
					<h1>Water temperature levels:</h1>
					<h3>Score 1</h3>
					All criteria are met according to EAAM S&Gs (see 9.)
					<h3>Score 3</h3>
					At least one criteria is not met according to EAAM S&Gs (see 9.)
				</p>
				<p v-if=" criteria === 'visual_comfort'">
					<h1>Sufficient shade provided and accessible in case needed:</h1>
					<h3>Score 1</h3>
					All criteria are met according to EAAM S&Gs (see 9.)
					<h3>Score 3</h3>
					At least one criteria is not met according to EAAM S&Gs (see 9.)
				</p>
				<p v-if=" criteria === 'acoustic_comfort'">
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
		<ion-card v-if=" criteria === 'safe_environment'">
			<ion-card-title>Enclosures and barriers safety and maintenance</ion-card-title>
			<ion-list >
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[0][0]" @click="handleClick(0,0)">Score 1</ion-checkbox>
					</ion-item>
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[0][2]" @click="handleClick(0,2)">Score 3</ion-checkbox>
					</ion-item>
					<CheckComments />
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'safe_environment'">
			<ion-card-title>No foreign body ingestion</ion-card-title>
			<ion-list >
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[1][0]" @click="handleClick(1,0)">Score 1</ion-checkbox>
					</ion-item>
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[1][2]" @click="handleClick(1,2)">Score 3</ion-checkbox>
					</ion-item>
					<CheckComments />
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'adequate_spatial_requirements'">
			<ion-card-title>Pool dimension, pool design, number of pools, available access to pools & group management</ion-card-title>
			<ion-list >
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[2][0]" @click="handleClick(2,0)">Score 1</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[2][2]" @click="handleClick(2,2)">Score 3</ion-checkbox>
				</ion-item>
				<CheckComments />
				<CheckComments />
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'social_management'">
			<ion-card-title>Presence or absence based on records/ trainer interviews</ion-card-title>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[3][0]" @click="handleClick(3,0)">Score 1</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[3][2]" @click="handleClick(3,1)">Score 3</ion-checkbox>
				</ion-item>
				<CheckComments />
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'adequate_water_quality'">
			<ion-card-title>Water quality parameters</ion-card-title>		
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][0]" @click="handleClick(4,0)">Score 1</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][2]" @click="handleClick(4,2)">Score 3</ion-checkbox>
				</ion-item>
				<CheckComments />
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'thermal_comfort'">
			<ion-card-title>Water temperature levels</ion-card-title>		
			<ion-list >
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[5][0]" @click="handleClick(5,0)">Score 1</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[5][2]" @click="handleClick(5,1)">Score 3</ion-checkbox>
				</ion-item>
				<CheckComments />
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'visual_comfort'">
			<ion-card-title>Sufficient shade provided and accessible in case needed</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[6][0]" @click="handleClick(6,0)">Score 1</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[6][2]" @click="handleClick(6,2)">Score 3</ion-checkbox>
				</ion-item>
				<CheckComments />
			</ion-list>
		</ion-card>
		<ion-card v-if=" criteria === 'acoustic_comfort'">
			<ion-card-title>40dB above hearing threshold (based on German "Gutachten über die Mindesanforderungen an die Haltung von Säugetieren, BMEL 2014")</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[7][0]" @click="handleClick(7,0)">Score 1</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[7][2]" @click="handleClick(7,2)">Score 3</ion-checkbox>
				</ion-item>
				<CheckComments />
			</ion-list>
		</ion-card>
	<!-- End of Checkboxes-->
	</ion-content>
	<ion-footer>
			<ion-toolbar>
				<ion-button color="light" slot="start"  @click="storeData">
					Finish
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

const dolphinsStore = useDolphinsStore();
const evaluationHousingStore = useEvaluationHousingStore();

export default {
	components: {
		IonItem, IonList, IonSelect, IonSelectOption,
		IonLabel, IonModal, IonHeader, IonToolbar, IonIcon,
		IonContent, IonTitle, CheckComments, IonFooter,
		IonButtons, IonButton, IonCheckbox, IonCard, IonCardTitle
	},
	data() {
		return {
			language: 'en',
			dolphinsStore: dolphinsStore,
			dolphinSelect: null as string | null,
			criteria: null as string | null,
			firstlabel: this.$t('dolphin'),
			firstplaceholder: this.$t('selectDolphin'),
			firstcancelText: this.$t('cancelChoice'),
			secondlabel: this.$t('criteria'),
			secondplaceholder: this.$t('selectCriteria'),
			isOpenManual: false,
			isOpenScoring: false,
			CheckboxArray: Array.from({ length: 7 }, () => Array(3).fill(false)),
			urlPost: 'http://88395-17112.pph-server.de/api/good_housing',
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
    	},
		// Method to collect the checked checkboxes and give request Body the scores
		storeCheckedValues() {
			for(let k = 0; k < evaluationHousingStore.requestBodiesHousing.length; k++){
				if(this.dolphinSelect === evaluationHousingStore.requestBodiesHousing[k]["dolphin_name"]) {
					if (this.dolphinSelect!== null){
						evaluationHousingStore.requestBodiesHousing[k]["dolphin_name"] = this.dolphinSelect;
					}
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
							}else if (this.CheckboxArray[i][j] === true && i === 4){
								evaluationHousingStore.requestBodiesHousing[k]["sufficient_shade"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 4){
								evaluationHousingStore.requestBodiesHousing[k]["acoustic_comfort"] = j + 1;
							}
						}
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
		},
		//Method to send the data to database
		async storeData() {
			const confirmed = confirm(this.$t('savingDataNext'));
     		if (confirmed) {
				this.storeCheckedValues();
				console.log(this.CheckboxArray);
				for(let i = 0; i < evaluationHousingStore.requestBodiesHousing.length; i++){
					await axios
							.post(this.urlPost, evaluationHousingStore.requestBodiesHousing[i])
							.then((response) => {
								console.log('Response:', response.data);
								if (i === evaluationHousingStore.requestBodiesHousing.length - 1){
									const targetUrl = '/folder/Evaluate';
									this.$router.push(targetUrl);
									evaluationHousingStore.resetBodies();
									this.dolphinSelect = null;
									this.criteria = null;
								}
							})
							.catch((error) => {
								console.error('Error:', error.response.data);
								const targetUrl = `/detailFeeding`;
								this.$router.push(targetUrl);
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
				const targetUrl = `/detailFeeding`;
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
