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
					multiple
					:modelValue="dolphinSelect"
					@update:modelValue="switchDolphin"
				>
					<ion-select-option value="all">{{
						$t('allDolphins')
					}}</ion-select-option>
					<ion-select-option
						v-for="dolphin in dolphinList"
						v-bind:key="dolphin.name"
					>
						{{ (dolphin as Dolphin).name }}
					</ion-select-option>
				</ion-select>
			</ion-item>
			<ion-item>
				<ion-select
					:value="criteria"
					:label="secondlabel"
					:placeholder="secondplaceholder"
					okText="OK"
					@IonChange="handleCriteriaChange"
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
		<!--<ion-button v-if="criteria" fill="outline" @click="setOpenManual()">{{
			$t('userManual')
		}}</ion-button>-->

		<ion-modal :is-open="isOpenManual">
			<ion-header>
				<ion-toolbar>
					<ion-title v-if="criteria === 'firstCriteriaEnvironment'">{{
						$t('firstCriteriaEnvironment')
					}}</ion-title>
					<ion-title v-else-if="criteria === 'secondCriteriaEnvironment'"
						>{{ $t('secondCriteriaEnvironment') }}
					</ion-title>
					<ion-title v-else-if="criteria === 'thirdCriteriaEnvironment'"
						>{{ $t('thirdCriteriaEnvironment') }}
					</ion-title>
					<ion-title v-else-if="criteria === 'fourthCriteriaEnvironment'"
						>{{ $t('fourthCriteriaEnvironment') }}
					</ion-title>
					<ion-title v-else-if="criteria === 'fifthCriteriaEnvironment'"
						>{{ $t('fifthCriteriaEnvironment') }}
					</ion-title>
					<ion-title v-else-if="criteria === 'sixthCriteriaEnvironment'"
						>{{ $t('sixthCriteriaEnvironment') }}
					</ion-title>
					<ion-title v-else-if="criteria === 'seventhCriteriaEnvironment'"
						>{{ $t('seventhCriteriaEnvironment') }}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenManual('')">{{
							$t('close')
						}}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<div v-if="subcriteria === 'firstSubCriteriaEnvironment'">
					<h1>{{ $t('firstSubCriteriaEnvironment') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Environment1') }}
					<h3>Score 2</h3>
					{{ $t('score2Environment1') }}
				</div>
				<div v-if="subcriteria === 'secondSubCriteriaEnvironment'">
					<h1>{{ $t('secondSubCriteriaEnvironment') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Environment2') }}
					<h3>Score 2</h3>
					{{ $t('score2Environment2') }}
				</div>
				<div v-if="subcriteria === 'thirdSubCriteriaEnvironment'">
					<h1>{{ $t('thirdSubCriteriaEnvironment') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Environment3') }}
					<h3>Score 2</h3>
					{{ $t('score2Environment3') }}
				</div>
				<div v-if="subcriteria === 'fourthSubCriteriaEnvironment'">
					<h1>{{ $t('fourthSubCriteriaEnvironment') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Environment4') }}
					<h3>Score 2</h3>
					{{ $t('score2Environment4') }}
				</div>
				<div v-if="subcriteria === 'fifthSubCriteriaEnvironment'">
					<h1>{{ $t('fifthSubCriteriaEnvironment') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Environment5') }}
					<h3>Score 2</h3>
					{{ $t('score2Environment5') }}
				</div>
				<div v-if="subcriteria === 'sixthSubCriteriaEnvironment'">
					<h1>{{ $t('sixthSubCriteriaEnvironment') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Environment6') }}
					<h3>Score 2</h3>
					{{ $t('score2Environment6') }}
				</div>
				<div v-if="subcriteria === 'seventhSubCriteriaEnvironment'">
					<h1>{{ $t('seventhSubCriteriaEnvironment') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Environment7') }}
					<h3>Score 2</h3>
					{{ $t('score2Environment7') }}
				</div>
				<div v-if="subcriteria === 'eigthSubCriteriaEnvironment'">
					<h1>{{ $t('eigthSubCriteriaEnvironment') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Environment8') }}
					<h3>Score 2</h3>
					{{ $t('score2Environment8') }}
				</div>
				<div v-if="subcriteria === 'ninthSubCriteriaEnvironment'">
					<h1>{{ $t('ninthSubCriteriaEnvironment') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Environment9') }}
					<h3>Score 2</h3>
					{{ $t('score2Environment9') }}
				</div>
			</ion-content>
		</ion-modal>

		<!-- End of Description of Criteria -->
		<!-- Start of Checkboxes-->
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'firstCriteriaEnvironment'
			"
		>
			<ion-card-title>{{ $t('firstSubCriteriaEnvironment') }}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('firstSubCriteriaEnvironment')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[0][0]" @click="handleClick(0, 0)"
						>Score 0</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[0][2]" @click="handleClick(0, 2)"
						>Score 2</ion-checkbox
					>
				</ion-item>
				<CheckComments
					:update-comment="enclosure_barrier_safety_comments"
					@update-comment="updateEnclosureSafetyComments"
				/>
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'firstCriteriaEnvironment'
			"
		>
			<ion-card-title>{{ $t('secondSubCriteriaEnvironment') }}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('secondSubCriteriaEnvironment')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[1][0]" @click="handleClick(1, 0)"
						>Score 0</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[1][2]" @click="handleClick(1, 2)"
						>Score 2</ion-checkbox
					>
				</ion-item>
				<CheckComments
					:update-comment="foreign_body_ingestion_comments"
					@update-comment="updateForeignBodyComments"
				/>
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'secondCriteriaEnvironment'
			"
		>
			<ion-card-title>{{ $t('thirdSubCriteriaEnvironment') }}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('thirdSubCriteriaEnvironment')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[2][0]" @click="handleClick(2, 0)"
						>Score 0</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[2][2]" @click="handleClick(2, 2)"
						>Score 2</ion-checkbox
					>
				</ion-item>
				<CheckComments
					:update-comment="pool_design_comments"
					@update-comment="updatePoolDesignComments"
				/>
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'thirdCriteriaEnvironment'
			"
		>
			<ion-card-title>{{ $t('fourthSubCriteriaEnvironment') }}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('fourthSubCriteriaEnvironment')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[3][0]" @click="handleClick(3, 0)"
						>Score 0</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[3][2]" @click="handleClick(3, 2)"
						>Score 2</ion-checkbox
					>
				</ion-item>
				<CheckComments
					:update-comment="forced_loneliness_comments"
					@update-comment="updateForcedLonelinessComments"
				/>
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'fourthCriteriaEnvironment'
			"
		>
			<ion-card-title>{{ $t('fifthSubCriteriaEnvironment') }}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('fifthSubCriteriaEnvironment')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][0]" @click="handleClick(4, 0)"
						>Score 0</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][2]" @click="handleClick(4, 2)"
						>Score 2</ion-checkbox
					>
				</ion-item>
				<CheckComments
					:update-comment="water_quality_comments"
					@update-comment="updateWaterQualityComments"
				/>
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'fifthCriteriaEnvironment'
			"
		>
			<ion-card-title>{{ $t('sixthSubCriteriaEnvironment') }}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('sixthSubCriteriaEnvironment')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[5][0]" @click="handleClick(5, 0)"
						>Score 0</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[5][2]" @click="handleClick(5, 2)"
						>Score 2</ion-checkbox
					>
				</ion-item>
				<CheckComments
					:update-comment="water_temperature_comments"
					@update-comment="updateWaterTemperatureComments"
				/>
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'sixthCriteriaEnvironment'
			"
		>
			<ion-card-title>{{ $t('seventhSubCriteriaEnvironment') }}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('seventhSubCriteriaEnvironment')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[6][0]" @click="handleClick(6, 0)"
						>Score 0</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[6][2]" @click="handleClick(6, 2)"
						>Score 2</ion-checkbox
					>
				</ion-item>
				<CheckComments
					:update-comment="sufficient_shade_comments"
					@update-comment="updateSufficientShadeComments"
				/>
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'sixthCriteriaEnvironment'
			"
		>
			<ion-card-title>{{ $t('eigthSubCriteriaEnvironment') }}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('eigthSubCriteriaEnvironment')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[7][0]" @click="handleClick(7, 0)"
						>Score 0</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[7][2]" @click="handleClick(7, 2)"
						>Score 2</ion-checkbox
					>
				</ion-item>
				<CheckComments
					:update-comment="reflecting_colours_comments"
					@update-comment="updateReflectingColoursComments"
				/>
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'seventhCriteriaEnvironment'
			"
		>
			<ion-card-title>{{ $t('ninthSubCriteriaEnvironment') }}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('ninthSubCriteriaEnvironment')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[8][0]" @click="handleClick(8, 0)"
						>Score 0</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[8][2]" @click="handleClick(8, 2)"
						>Score 2</ion-checkbox
					>
				</ion-item>
				<CheckComments
					:update-comment="acoustic_comfort_comments"
					@update-comment="updateAcousticComfortComments"
				/>
			</ion-list>
		</ion-card>
		<div
			v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria !== null"
			class="button-container"
		>
			<ion-button fill="clear" size="large" @click="getUserManual">
				{{ $t('userManual') }}
				<ion-icon slot="start" :icon="download"></ion-icon>
			</ion-button>
			<ion-button fill="clear" size="large" @click="getStandardsAndGuidelines">
				Standards & Guidelines
				<ion-icon slot="start" :icon="download"></ion-icon>
			</ion-button>
			<ion-button fill="clear" size="large" @click="getDolphinWETMatrix">
				Dolphin WET Matrix
				<ion-icon slot="start" :icon="download"></ion-icon>
			</ion-button>
		</div>
	</ion-content>
	<!-- End of Checkboxes-->
	<ion-footer>
		<ion-toolbar>
			<ion-button color="light" slot="start" @click="storeData">
				{{ $t('buttonFinish') }}
			</ion-button>
			<ion-button color="light" slot="end" @click="confirmRefresh">
				<ion-icon src="/icons/arrow-forward-outline.svg"></ion-icon>
				{{ $t('buttonNext') }}
			</ion-button>
		</ion-toolbar>
	</ion-footer>
</template>

<script lang="ts">
import {
	IonItem,
	IonList,
	IonSelect,
	IonSelectOption,
	IonModal,
	IonHeader,
	IonFooter,
	IonToolbar,
	IonContent,
	IonTitle,
	IonCardTitle,
	IonButtons,
	IonButton,
	IonCheckbox,
	IonCard,
	IonIcon,
	alertController,
} from '@ionic/vue';
//import axios from 'axios';
import CheckComments from '@/components/CheckComments.vue';
import { useDolphinsStore } from '@/store/dolphinsStore';
import { useEvaluationHousingStore } from '@/store/evaluationHousingStore';
import { baseUrl } from '@/utils/baseUrl';
import { toast } from 'vue3-toastify';
import { download } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';
import 'vue3-toastify/dist/index.css';

const dolphinsStore = useDolphinsStore();
const evaluationHousingStore = useEvaluationHousingStore();
let dataInBody; //Variable which gets saved in localstorage with either true or false, depending if data is in checkboxes or evaluationHousingStore

interface Dolphin {
	dolphin_id: number;
	name: string;
	sex: number;
	on_site: number;
	year_of_birth: number;
	min_weight_measured: number;
	max_weight_measured: number;
	min_kcal_calculations: number;
	max_kcal_calculations: number;
}

export default {
	components: {
		IonItem,
		IonList,
		IonSelect,
		IonSelectOption,
		IonModal,
		IonHeader,
		IonToolbar,
		IonIcon,
		IonContent,
		IonTitle,
		CheckComments,
		IonFooter,
		IonButtons,
		IonButton,
		IonCheckbox,
		IonCard,
		IonCardTitle,
	},
	async mounted() {
		// This makes sure that the reference areas are updated while the component is
		// mounted. But only if there is internet connectivity. If not, the displayed
		// reference areas are the ones from the animalList.json
		//await dolphinsStore.fill();
		const dolphinsStore = useDolphinsStore();
		console.log('DolphinsStore: ', dolphinsStore);
		// The fill method resets the bodies
		evaluationHousingStore.fill(dolphinsStore.dolphinList);
		// Reset here data while page is mounted
		localStorage.setItem('backButtonClicked', 'false');
		localStorage.setItem('dataInBody', 'false');
		localStorage.setItem('created_at', '');
	},
	data() {
		return {
			language: 'en',
			download,
			dolphinsStore: dolphinsStore,
			dolphinList: dolphinsStore.dolphinList as Dolphin[],
			dolphinSelect: [] as string[],
			oldDolphinSelect: [] as string[],
			criteria: null as string | null,
			subcriteria: null as string | null,
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
		setOpenManual(subcriteria: string) {
			//Set the subcriteria to display the correct user manual if the user manual is opened
			this.subcriteria = subcriteria;
			this.isOpenManual = !this.isOpenManual;
			if (this.isOpenManual === false) {
				this.subcriteria = ''; //set empty if user manual is closed
			}
		},
		//Method to open scoring desciption
		setOpenScoring(isOpen: boolean) {
			this.isOpenScoring = isOpen;
		},
		//Method uses boolean array. So no multiple checking for one test is possible. --> Every test can have one checked Checkbox
		handleClick(row: number, column: number) {
			if (this.CheckboxArray[row][column]) {
				this.CheckboxArray[row][column] = false;
			} else {
				this.CheckboxArray[row][column] = true;
			}
			for (let i = 0; i < 3; i++) {
				if (i != column) {
					this.CheckboxArray[row][i] = false;
				}
			}
			dataInBody = true;
			localStorage.setItem('dataInBody', dataInBody.toString());
		},
		// ion-select method to check if all dolphins are selected
		checkAllDolphinsSelected() {
			if (this.dolphinSelect.includes('all')) {
				this.dolphinSelect = this.dolphinList.map(
					(dolphin: Dolphin) => dolphin.name
				);
			}
			/*if (this.dolphinSelect.includes('all')) {
				this.dolphinSelect = [...this.dolphinsStore.dolphinList];
			}*/
			/*if (this.dolphinSelect.includes('all')) {
				this.dolphinSelect = this.dolphinsStore.dolphinList.map(
					(dolphin) => dolphin.name
				);
			}*/
		},
		// Method to collect the checked checkboxes and give request Body the scores
		async storeCheckedValues() {
			for (
				let k = 0;
				k < evaluationHousingStore.requestBodiesHousing.length;
				k++
			) {
				if (
					this.dolphinSelect &&
					this.dolphinSelect.includes(
						evaluationHousingStore.requestBodiesHousing[k]['dolphin_name']
					)
				) {
					/*if (this.dolphinSelect!== null){
						evaluationHousingStore.requestBodiesHousing[k]["dolphin_name"] = this.dolphinSelect;
					}*/
					for (let i = 0; i < this.CheckboxArray.length; i++) {
						for (let j = 0; j < this.CheckboxArray[i].length; j++) {
							if (this.CheckboxArray[i][j] === true && i === 0) {
								evaluationHousingStore.requestBodiesHousing[k][
									'enclosure_barrier_safety'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 1) {
								evaluationHousingStore.requestBodiesHousing[k][
									'foreign_body_ingestion'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 2) {
								evaluationHousingStore.requestBodiesHousing[k]['pool_design'] =
									j;
							} else if (this.CheckboxArray[i][j] === true && i === 3) {
								evaluationHousingStore.requestBodiesHousing[k][
									'forced_loneliness'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 4) {
								evaluationHousingStore.requestBodiesHousing[k][
									'water_quality'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 5) {
								evaluationHousingStore.requestBodiesHousing[k][
									'water_temperature'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 6) {
								evaluationHousingStore.requestBodiesHousing[k][
									'sufficient_shade'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 7) {
								evaluationHousingStore.requestBodiesHousing[k][
									'reflecting_colours'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 8) {
								evaluationHousingStore.requestBodiesHousing[k][
									'acoustic_comfort'
								] = j;
							}
						}
					}
					// Code here the comments into the request body
					// First check with if statement if comments had been updated or not. If we don´t do that we override the comments with
					// an empty string if we click on 'Next Test'
					if (this.enclosure_barrier_safety_comments != '') {
						evaluationHousingStore.requestBodiesHousing[k][
							'enclosure_barrier_safety_comments'
						] = this.enclosure_barrier_safety_comments;
					}
					if (this.foreign_body_ingestion_comments != '') {
						evaluationHousingStore.requestBodiesHousing[k][
							'foreign_body_ingestion_comments'
						] = this.foreign_body_ingestion_comments;
					}
					if (this.pool_design_comments != '') {
						evaluationHousingStore.requestBodiesHousing[k][
							'pool_design_comments'
						] = this.pool_design_comments;
					}
					if (this.forced_loneliness_comments != '') {
						evaluationHousingStore.requestBodiesHousing[k][
							'forced_loneliness_comments'
						] = this.forced_loneliness_comments;
					}
					if (this.water_quality_comments != '') {
						evaluationHousingStore.requestBodiesHousing[k][
							'water_quality_comments'
						] = this.water_quality_comments;
					}
					if (this.water_temperature_comments != '') {
						evaluationHousingStore.requestBodiesHousing[k][
							'water_temperature_comments'
						] = this.water_temperature_comments;
					}
					if (this.sufficient_shade_comments != '') {
						evaluationHousingStore.requestBodiesHousing[k][
							'sufficient_shade_comments'
						] = this.sufficient_shade_comments;
					}
					if (this.reflecting_colours_comments != '') {
						evaluationHousingStore.requestBodiesHousing[k][
							'reflecting_colours_comments'
						] = this.reflecting_colours_comments;
					}
					if (this.acoustic_comfort_comments != '') {
						evaluationHousingStore.requestBodiesHousing[k][
							'acoustic_comfort_comments'
						] = this.acoustic_comfort_comments;
					}
					if (localStorage.getItem('created_at') !== '') {
						evaluationHousingStore.requestBodiesHousing[k]['created_at'] =
							localStorage.getItem('created_at') as string;
					}
				}
			}

			//this.resetData();
			dataInBody = true;
			localStorage.setItem('dataInBody', dataInBody.toString());
		},
		async resetData() {
			// Reset request body
			evaluationHousingStore.resetBodies();

			// Reset checkboxes
			for (let i = 0; i <= 8; i++) {
				for (let j = 0; j < 3; j++) {
					if (this.CheckboxArray[i][j] === true) {
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
			return new Promise((resolve) => {
				alertController
					.create({
						header: this.$t('confirmationHeader'),
						message: this.$t('dataCurrent'),
						buttons: [
							{
								text: this.$t('yes'),
								role: 'cancel',
								cssClass: 'secondary',
								handler: () => {
									console.log('Yes clicked');
									resolve(void 0);
								},
							},
							{
								text: this.$t('no'),
								handler: () => {
									(async () => {
										await this.showDateInputAlert();
										resolve(void 0);
									})();
								},
							},
						],
					})
					.then((alert) => {
						alert.present();
					});
			});
		},

		async showDateInputAlert() {
			return new Promise((resolve, reject) => {
				alertController
					.create({
						header: this.$t('enterDate'),
						inputs: [
							{
								name: 'date',
								type: 'date',
							},
						],
						buttons: [
							{
								text: this.$t('cancelChoice'),
								role: '',
								cssClass: 'secondary',
								handler: () => {
									console.log('Cancel clicked');
									reject();
									this.storeData();
								},
							},
							{
								text: this.$t('confirm'),
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
					})
					.then((alert) => {
						alert.present();
					});
			});
		},

		//Method to send the data to database
		async storeData() {
			const confirmed = true; //confirm(this.$t('savingDataNext'));
			if (confirmed) {
				//Check if the date of the test is the current date
				await this.confirmTestDate();
				//Store the checked values in the request body
				await this.storeCheckedValues();

				// Flag to only show network error alert once instead of several times after another
				let alertShown = false;
				console.log(this.CheckboxArray);
				for (
					let i = 0;
					i < evaluationHousingStore.requestBodiesHousing.length;
					i++
				) {
					await this.$axios
						.post(
							this.urlPost,
							evaluationHousingStore.requestBodiesHousing[i],
							{ withCredentials: true }
						)
						.then((response: any) => {
							console.log('Response:', response.data);
							if (
								i ===
								evaluationHousingStore.requestBodiesHousing.length - 1
							) {
								const targetUrl = '/detailHousing'; //'/folder/Evaluate';
								toast.success(this.$t('dataUploadSuccessfull'), {
									autoClose: 3000,
								});
								setTimeout(() => {
									// Set flag to false, so if user wants to go to another route he can
									// without losing data, because data is now successfully uploaded
									dataInBody = false;
									localStorage.setItem('dataInBody', dataInBody.toString());
									localStorage.setItem('backButtonClicked', 'false');
									this.$router.push(targetUrl);
									//Reset data saved in checkboxes and comment strings. Doesn´t affect the request body
									this.resetData();
								}, 2000);
								//evaluationHousingStore.resetBodies();
								//The fill method now resets the bodies:
								evaluationHousingStore.fill(dolphinsStore.dolphinList);
								localStorage.setItem('created_at', '');
								this.dolphinSelect = [];
								this.criteria = null;
							}
						})
						.catch((error: any) => {
							console.error('Error:', error.response.data);
							const targetUrl = `/detailHousing`;
							if (error.message === 'Network Error' && !alertShown) {
								//console.log('Inside error catch block');
								alertShown = true;
								toast.error(this.$t('dataUploadFailed'), {
									autoClose: 4000,
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
			console.log(evaluationHousingStore.requestBodiesHousing);
			await this.switchDolphin(null, true);

			// Switching between dolphins only makes sense if only one or
			// no dolphin is currently selected
			/*if (this.dolphinSelect.length === 1 || this.dolphinSelect.length === 0) {
				console.log('Inside dolphin selector');
				// Find the index of the currently selected dolphin
				const currentIndex = this.dolphinList.findIndex(
					(dolphin) => dolphin.name === this.dolphinSelect[0] //takes the first value of this.dolphinSelect since there is anyway only one dolphin or no dolphin selected while we are here switching the dolphins
				);

				if (currentIndex !== -1) {
					// Check if there is a next dolphin in the list
					if (currentIndex < this.dolphinList.length - 1) {
						// Select the next dolphin in the dolphinList
						this.dolphinSelect = [this.dolphinList[currentIndex + 1].name];
					} else {
						// If it was the last dolphin, de-select or loop back to the first dolphin
						this.dolphinSelect = []; // Optionally loop back to the first dolphin
						toast.success(this.$t('principleFinished'), {
							autoClose: 5000,
						});
					}
				} else {
					// If no dolphin is selected or the current selection is not found, start from the first dolphin
					this.dolphinSelect = [this.dolphinList[0].name];
				}
			}*/
			// Doing the same dolphinSelect with the next criteria in the list:
			/*switch (this.criteria) {
				case 'firstCriteriaEnvironment':
					this.criteria = 'secondCriteriaEnvironment';
					toast.success(this.$t('dataSavedTemporary'), {
						autoClose: 3000,
					});
					break;
				case 'secondCriteriaEnvironment':
					this.criteria = 'thirdCriteriaEnvironment';
					toast.success(this.$t('dataSavedTemporary'), {
						autoClose: 3000,
					});
					break;
				case 'thirdCriteriaEnvironment':
					this.criteria = 'fourthCriteriaEnvironment';
					toast.success(this.$t('dataSavedTemporary'), {
						autoClose: 3000,
					});
					break;
				case 'fourthCriteriaEnvironment':
					this.criteria = 'fifthCriteriaEnvironment';
					toast.success(this.$t('dataSavedTemporary'), {
						autoClose: 3000,
					});
					break;
				case 'fifthCriteriaEnvironment':
					this.criteria = 'sixthCriteriaEnvironment';
					toast.success(this.$t('dataSavedTemporary'), {
						autoClose: 3000,
					});
					break;
				case 'sixthCriteriaEnvironment':
					this.criteria = 'seventhCriteriaEnvironment';
					toast.success(this.$t('dataSavedTemporary'), {
						autoClose: 3000,
					});
					break;
				case 'seventhCriteriaEnvironment':
					// De-select the criteria selector, so that no ion-card is shown when principle is finished
					// and do a toast pop up message that principle has ended
					this.criteria = 'seventhCriteriaEnvironment';
					toast.success(this.$t('principleFinished'), {
						autoClose: 5000,
					});
					break;
				default:
					this.criteria = 'firstCriteriaEnvironment';
			}*/

			//const targetUrl = `/detailHousing`;
			//this.$router.push(targetUrl);
		},
		async handleCriteriaChange(event: any) {
			await this.storeCheckedValues();
			if (this.criteria != null) {
				toast.success(this.$t('dataSavedTemporary'), {
					autoClose: 2000,
				});
			}
			this.criteria = event?.target?.value;
			console.log('Criteria changed: ', this.criteria);
		},
		//Method to handle the change of the selected dolphins
		async handleDolphinChange(calledFromConfirmRefresh = false) {
			/*console.log('Dolphin changed: ', this.dolphinSelect);
			if (this.dolphinSelect.includes('all')) {
				this.dolphinSelect = this.dolphinsStore.dolphinList.map(
					(dolphin) => dolphin.name
				);
			}
			await this.switchDolphin(calledFromConfirmRefresh); //passes the boolean value to the switchDolphin method
			// Saves the current dolphin name as the old name for later use
			// Important when manually switching the dolphin to save the data of the old dolphin
			if (calledFromConfirmRefresh) {
				// Get the current index to get the previous dolphin in the dolphinList later on
				const currentIndex = this.dolphinList.findIndex(
					(dolphin) => dolphin.name === this.dolphinSelect[0] //takes the first value of this.dolphinSelect since there is anyway only one dolphin or no dolphin selected while we are here switching the dolphins
				);
				console.log('Current index in handleDolphinChange: ', currentIndex);
				// Check if there is a previous dolphin in the list and the list is not at its end
				if (currentIndex !== 0 && currentIndex < this.dolphinList.length) {
					//if (currentIndex < this.dolphinList.length - 1) {
					// Select the previous dolphin in the dolphinList
					this.oldDolphinSelect = [this.dolphinList[currentIndex].name];
					//}
					console.log(
						'1 Old dolphin in handleDolphinChange: ',
						this.oldDolphinSelect
					);
				} else {
					// No previous dolphin in the list
					this.oldDolphinSelect = this.dolphinSelect;
					console.log(
						'2 Old dolphin in handleDolphinChange: ',
						this.oldDolphinSelect
					);
				}
			} else {
				// If called from manually switching the dolphins
				this.oldDolphinSelect = this.dolphinSelect;
				console.log(
					'3 Old dolphin in handleDolphinChange: ',
					this.oldDolphinSelect
				);
			}*/
		},
		//Method to switch the dolphin
		async switchDolphin(newValue: any, calledFromConfirmRefresh = false) {
			// Save the current data if the user switches the dolphin without clicking on the next button
			// false is passed so the method knows it has been called from the switchDolphin method
			// true if called from the confirmRefresh method
			await this.storeCheckedValues();

			console.log('switchDolphin called');
			console.log('Dolphin in switchDolphin: ', this.dolphinSelect);

			if (calledFromConfirmRefresh) {
				let currentIndex;
				console.log('Length of dolphinSelect: ', this.dolphinSelect.length);
				if (!Array.isArray(this.dolphinSelect)) {
					// Find the index of the currently selected dolphin
					const tempDolphinSelect = this.dolphinSelect;
					currentIndex = this.dolphinList.findIndex(
						(dolphin) => dolphin.name === tempDolphinSelect //takes the first value of this.dolphinSelect since there is anyway only one dolphin or no dolphin selected while we are here switching the dolphins
					);
					console.log('Current index in switchDolphin: ', currentIndex);
				} else {
					// Find the indexes of all selected dolphins when multiple are selected
					currentIndex = this.dolphinSelect.map((selectedDolphin) => {
						return this.dolphinList.findIndex(
							(dolphin) => dolphin.name === selectedDolphin
						);
					});
				}
				console.log('Current index in switchDolphin: ', currentIndex);
				if (Array.isArray(currentIndex)) {
					// currentIndex is an array, handle the first index case
					if (
						currentIndex[0] !== -1 &&
						currentIndex[0] < this.dolphinList.length - 1
					) {
						// Select the next dolphin in the dolphinList
						newValue = this.dolphinList[currentIndex[0] + 1].name;
					} else {
						newValue = null; // De-select the dolphin
						toast.success(this.$t('principleFinished'), {
							autoClose: 5000,
						});
					}
				} else {
					if (currentIndex === -1) {
						// If no dolphin is selected or the current selection is not found, no dolphin will be selected when clicking on confirmRefresh
						newValue = null;
					}
					if (currentIndex < this.dolphinList.length - 1) {
						// Select the next dolphin in the dolphinList, reassign newValue for this
						newValue = this.dolphinList[currentIndex + 1].name;
					} else {
						// If it was the last dolphin, de-select or loop back to the first dolphin
						newValue = null; // Optionally loop back to the first dolphin
						toast.success(this.$t('principleFinished'), {
							autoClose: 5000,
						});
					}
				}
			}
			// After everything has been uploaded, update the this.dolphinSelect
			console.log('newValue: ', newValue);
			this.dolphinSelect = newValue;

			///////////////////////////////////////////////////////////////////////////
			// Reset checkboxes before filling them again with current data
			for (let i = 0; i <= 8; i++) {
				for (let j = 0; j < 3; j++) {
					if (this.CheckboxArray[i][j] === true) {
						this.CheckboxArray[i][j] = false;
					}
				}
			}

			// Reset comments before filling them again with current data
			this.enclosure_barrier_safety_comments = '';
			this.foreign_body_ingestion_comments = '';
			this.pool_design_comments = '';
			this.forced_loneliness_comments = '';
			this.water_quality_comments = '';
			this.water_temperature_comments = '';
			this.sufficient_shade_comments = '';
			this.reflecting_colours_comments = '';
			this.acoustic_comfort_comments = '';

			console.log(
				'The requestBody in switchDolphin: ',
				evaluationHousingStore.requestBodiesHousing
			);
			// Get the data of the selected dolphin, if user has already entered some data for the selected dolphin
			for (
				let k = 0;
				k < evaluationHousingStore.requestBodiesHousing.length;
				k++
			) {
				// k stands for the different dolphins. It iterates through the array of dolphins in requestBodiesHousing.json
				// Select the k-th requestBody which is equivalent to this.dolphinSelect
				if (
					this.dolphinSelect &&
					this.dolphinSelect.includes(
						evaluationHousingStore.requestBodiesHousing[k]['dolphin_name']
					)
				) {
					// Now the correct dolphin is selected
					console.log(
						'Dolphin selected: ',
						evaluationHousingStore.requestBodiesHousing[k]['dolphin_name']
					);

					// Here the data from the requestBodiesHousing is assigned to the checkboxes

					for (let i = 0; i < this.CheckboxArray.length; i++) {
						for (let j = 0; j < this.CheckboxArray[i].length; j++) {
							// Get the data from the requestBodiesHousing BCScore
							const enclosure_barrier_safety =
								evaluationHousingStore.requestBodiesHousing[k][
									'enclosure_barrier_safety'
								];
							const foreign_body_ingestion =
								evaluationHousingStore.requestBodiesHousing[k][
									'foreign_body_ingestion'
								];
							const pool_design =
								evaluationHousingStore.requestBodiesHousing[k]['pool_design'];
							const forced_loneliness =
								evaluationHousingStore.requestBodiesHousing[k][
									'forced_loneliness'
								];
							const water_quality =
								evaluationHousingStore.requestBodiesHousing[k]['water_quality'];
							const water_temperature =
								evaluationHousingStore.requestBodiesHousing[k][
									'water_temperature'
								];
							const sufficient_shade =
								evaluationHousingStore.requestBodiesHousing[k][
									'sufficient_shade'
								];
							const reflecting_colours =
								evaluationHousingStore.requestBodiesHousing[k][
									'reflecting_colours'
								];
							const acoustic_comfort =
								evaluationHousingStore.requestBodiesHousing[k][
									'acoustic_comfort'
								];

							if (enclosure_barrier_safety !== null) {
								// Assign the value of the body condition score to the checkbox array
								const j = enclosure_barrier_safety;
								this.CheckboxArray[0][j] = true;
							}
							if (foreign_body_ingestion !== null) {
								const j = foreign_body_ingestion;
								this.CheckboxArray[1][j] = true;
							}
							if (pool_design !== null) {
								const j = pool_design;
								this.CheckboxArray[2][j] = true;
							}
							if (forced_loneliness !== null) {
								const j = forced_loneliness;
								this.CheckboxArray[3][j] = true;
							}
							if (water_quality !== null) {
								const j = water_quality;
								this.CheckboxArray[4][j] = true;
							}
							if (water_temperature !== null) {
								const j = water_temperature;
								this.CheckboxArray[5][j] = true;
							}
							if (sufficient_shade !== null) {
								const j = sufficient_shade;
								this.CheckboxArray[6][j] = true;
							}
							if (reflecting_colours !== null) {
								const j = reflecting_colours;
								this.CheckboxArray[7][j] = true;
							}
							if (acoustic_comfort !== null) {
								const j = acoustic_comfort;
								this.CheckboxArray[8][j] = true;
							}
						}
					}
					// Code here the comments into the request body
					// First check with if statement if comments had been updated or not. If we don´t do that we override the comments with
					// an empty string if we click on 'Next Test'
					this.enclosure_barrier_safety_comments =
						evaluationHousingStore.requestBodiesHousing[k][
							'enclosure_barrier_safety_comments'
						] ?? '';
					this.foreign_body_ingestion_comments =
						evaluationHousingStore.requestBodiesHousing[k][
							'foreign_body_ingestion_comments'
						] ?? '';
					this.pool_design_comments =
						evaluationHousingStore.requestBodiesHousing[k][
							'pool_design_comments'
						] ?? '';
					this.forced_loneliness_comments =
						evaluationHousingStore.requestBodiesHousing[k][
							'forced_loneliness_comments'
						] ?? '';
					this.water_quality_comments =
						evaluationHousingStore.requestBodiesHousing[k][
							'water_quality_comments'
						] ?? '';
					this.water_temperature_comments =
						evaluationHousingStore.requestBodiesHousing[k][
							'water_temperature_comments'
						] ?? '';
					this.sufficient_shade_comments =
						evaluationHousingStore.requestBodiesHousing[k][
							'sufficient_shade_comments'
						] ?? '';
					this.reflecting_colours_comments =
						evaluationHousingStore.requestBodiesHousing[k][
							'reflecting_colours_comments'
						] ?? '';
					this.acoustic_comfort_comments =
						evaluationHousingStore.requestBodiesHousing[k][
							'acoustic_comfort_comments'
						] ?? '';

					if (localStorage.getItem('created_at') !== '') {
						evaluationHousingStore.requestBodiesHousing[k]['created_at'] =
							localStorage.getItem('created_at') as string;
					}
				}
			}
		},

		async getUserManual() {
			// Get the platform of the device (iOS or Android)
			//const platform = (await Device.getInfo()).platform;
			try {
				const fileName = '2024-05-27_Dolphin_WET_Handbook.pdf'; // file name of the file saved on the server
				const fileUrl = baseUrl + '/api/files/' + fileName;
				await Browser.open({ url: fileUrl });
			} catch (error) {
				console.error('Error: ', error);
			}
		},
		async getStandardsAndGuidelines() {
			// Get the platform of the device (iOS or Android)
			//const platform = (await Device.getInfo()).platform;
			try {
				const fileName = 'EAAM-Standards-and-guidelines-2019.pdf'; // file name of the file saved on the server
				const fileUrl = baseUrl + '/api/files/' + fileName;
				await Browser.open({ url: fileUrl });
			} catch (error) {
				console.error('Error: ', error);
			}
		},
		async getDolphinWETMatrix() {
			try {
				const fileName = 'Dolphin_WET_Matrix.pdf'; // file name of the file saved on the server
				const fileUrl = baseUrl + '/api/files/' + fileName;
				await Browser.open({ url: fileUrl });
			} catch (error) {
				console.error('Error: ', error);
			}
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
ion-card-title {
	margin: 5px;
}
.button-container {
	display: flex;
	flex-direction: column;
}
</style>
