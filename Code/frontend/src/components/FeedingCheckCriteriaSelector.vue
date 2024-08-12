<!-- eslint-disable vue/no-unused-components -->
<template>
	<!-- Criteria Selector v-on:click="showDolphins" @click="showDolphins"-->
	<ion-content>
		<ion-list>
			<!-- Dolphin Selector -->
			<ion-item>
				<ion-select
					:label="firstlabel"
					:placeholder="firstplaceholder"
					okText="OK"
					:cancelText="firstcancelText"
					v-model="dolphinSelect"
					multiple
					@ionChange="handleDolphinChange()"
				>
					<ion-select-option value="all">{{
						$t('allDolphins')
					}}</ion-select-option>
					<ion-select-option
						v-for="dolphin in dolphinList"
						v-bind:key="dolphin.name"
					>
						{{ dolphin.name }}
					</ion-select-option>
				</ion-select>
			</ion-item>
			<ion-item>
				<ion-select
					:value="criteria"
					@IonChange="handleCriteriaChange"
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
		<!--<ion-button v-if="criteria" fill="outline" @click="setOpenManual()">{{
			$t('userManual')
		}}</ion-button>-->

		<ion-modal :is-open="isOpenManual">
			<ion-header>
				<ion-toolbar>
					<ion-title v-if="criteria === 'firstCriteriaNutrition'"
						>{{ $t('firstCriteriaNutrition') }}
					</ion-title>
					<ion-title v-else-if="criteria === 'secondCriteriaNutrition'"
						>{{ $t('secondCriteriaNutrition') }}
					</ion-title>
					<ion-title v-else-if="criteria === 'thirdCriteriaNutrition'"
						>{{ $t('thirdCriteriaNutrition') }}
					</ion-title>
					<ion-title v-else-if="criteria === 'fourthCriteriaNutrition'"
						>{{ $t('fourthCriteriaNutrition') }}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenManual('')">{{
							$t('close')
						}}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<div v-if="subcriteria === 'firstSubCriteriaNutrition'">
					<h1>{{ $t('firstSubCriteriaNutrition') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Nutrition1') }}
					<h3>Score 1</h3>
					{{ $t('score1Nutrition1') }}
					<h3>Score 2</h3>
					{{ $t('score2Nutrition1') }}
				</div>
				<div v-if="subcriteria === 'secondSubCriteriaNutrition'">
					<h1>{{ $t('secondSubCriteriaNutrition') }}</h1>
					<h2 style="font-style: italic">
						{{ $t('bwosRemark') }}
					</h2>
					<h3>Score 0</h3>
					{{ $t('score0Nutrition2') }}
					<h3>Score 2</h3>
					{{ $t('score2Nutrition2') }}
				</div>
				<div v-if="subcriteria === 'thirdSubCriteriaNutrition'">
					<h1>{{ $t('thirdSubCriteriaNutrition') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Nutrition3') }}
					<h3>Score 2</h3>
					{{ $t('score2Nutrition3') }}
				</div>
				<div v-if="subcriteria === 'fourthSubCriteriaNutrition'">
					<h1>{{ $t('fourthSubCriteriaNutrition') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Nutrition4') }}
					<h3>Score 1</h3>
					{{ $t('score1Nutrition4') }}
					<h3>Score 2</h3>
					{{ $t('score2Nutrition4') }}
				</div>
				<div v-if="subcriteria === 'fifthSubCriteriaNutrition'">
					<h1>{{ $t('fifthSubCriteriaNutrition') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Nutrition5') }}
					<h3>Score 2</h3>
					{{ $t('score2Nutrition5') }}
				</div>
				<div v-if="subcriteria === 'sixthSubCriteriaNutrition'">
					<h1>{{ $t('sixthSubCriteriaNutrition') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Nutrition6') }}
					<h3>Score 1</h3>
					{{ $t('score1Nutrition6') }}
					<h3>Score 2</h3>
					{{ $t('score2Nutrition6') }}
				</div>
			</ion-content>
		</ion-modal>
		<!-- End of Description of Criteria (UserManual)-->
		<!--Start of Reference Area-->
		<ion-button
			v-if="criteria"
			fill="outline"
			@click="setOpenReferenceArea(true)"
			>{{ $t('ReferenceArea') }}</ion-button
		>

		<ion-modal :is-open="isOpenReferenceArea">
			<ion-header>
				<ion-toolbar>
					<ion-title>
						{{ $t('ReferenceArea') }}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenReferenceArea(false)">{{
							$t('close')
						}}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>

			<ion-content class="ion-padding">
				<div v-if="criteria === 'firstCriteriaNutrition'">
					<!--Here are the values of reference area-->
					<h3>{{ $t('weightArea') }}</h3>
					<div v-if="dolphinSelect">
						<div
							v-for="selectedDolphin in dolphinSelect"
							:key="selectedDolphin"
						>
							<h4>{{ selectedDolphin }}</h4>
							<p>
								{{ $t('minimum') }}
								{{
									dolphinsStore.dolphinList.find(
										(dolphin) => dolphin.name === selectedDolphin
									)?.min_weight_measured ?? null
								}}
							</p>
							<p>
								{{ $t('maximum') }}
								{{
									dolphinsStore.dolphinList.find(
										(dolphin) => dolphin.name === selectedDolphin
									)?.max_weight_measured ?? null
								}}
							</p>
						</div>
					</div>
				</div>
				<div v-if="criteria === 'secondCriteriaNutrition'">
					<!--Here are the values of reference area-->
					<h3>{{ $t('kcalCalculation') }}</h3>
					<div v-if="dolphinSelect">
						<div
							v-for="selectedDolphin in dolphinSelect"
							:key="selectedDolphin"
						>
							<h4>{{ selectedDolphin }}</h4>
							<p>
								{{ $t('minimum') }}
								{{
									dolphinsStore.dolphinList.find(
										(dolphin) => dolphin.name === selectedDolphin
									)?.min_kcal_calculations ?? null
								}}
							</p>
							<p>
								{{ $t('maximum') }}
								{{
									dolphinsStore.dolphinList.find(
										(dolphin) => dolphin.name === selectedDolphin
									)?.max_kcal_calculations ?? null
								}}
							</p>
						</div>
					</div>
				</div>
			</ion-content>
		</ion-modal>
		<!--End of Reference Area-->
		<!-- Start of Checkboxes-->
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'firstCriteriaNutrition'
			"
		>
			<ion-card-title>{{ $t('firstSubCriteriaNutrition') }}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('firstSubCriteriaNutrition')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[0][0]" @click="handleClick(0, 0)"
						>Score 0</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[0][1]" @click="handleClick(0, 1)"
						>Score 1</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[0][2]" @click="handleClick(0, 2)"
						>Score 2</ion-checkbox
					>
				</ion-item>
				<CheckComments
					:update-comment="body_condition_score_comments"
					@update-comment="updateBodyConditionScoreComments"
				/>
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'firstCriteriaNutrition'
			"
		>
			<ion-card-title>{{ $t('secondSubCriteriaNutrition') }}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('secondSubCriteriaNutrition')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-list>
				<ion-item>
					<ion-input
						:label="weightLabel"
						:placeholder="weightPlaceholder"
						v-model="weight_measured"
					>
					</ion-input>
				</ion-item>
				<ion-item>
					<ion-input
						value="Score will be calculated automatically"
						:readonly="true"
					></ion-input>
				</ion-item>
				<CheckComments
					:update-comment="weight_measured_comments"
					@update-comment="updateWeightMeasuredComments"
				/>
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'secondCriteriaNutrition'
			"
		>
			<ion-card-title>{{ $t('thirdSubCriteriaNutrition') }}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('thirdSubCriteriaNutrition')"
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
					:update-comment="kcal_calculations_comments"
					@update-comment="updateKcalCalculationsComments"
				/>
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'secondCriteriaNutrition'
			"
		>
			<ion-card-title>{{ $t('fourthSubCriteriaNutrition') }}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('fourthSubCriteriaNutrition')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[2][0]" @click="handleClick(2, 0)"
						>Score 0</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[2][1]" @click="handleClick(2, 1)"
						>Score 1</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[2][2]" @click="handleClick(2, 2)"
						>Score 2</ion-checkbox
					>
				</ion-item>
				<CheckComments
					:update-comment="blood_hydration_comments"
					@update-comment="updateBloodHydrationComments"
				/>
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'thirdCriteriaNutrition'
			"
		>
			<ion-card-title>{{ $t('fifthSubCriteriaNutrition') }}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('fifthSubCriteriaNutrition')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[3][0]" @click="handleClick(3, 0)"
						>Score 0</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[3][2]" @click="handleClick(3, 1)"
						>Score 2</ion-checkbox
					>
				</ion-item>
				<CheckComments
					:update-comment="fish_quality_comments"
					@update-comment="updateFishQualityComments"
				/>
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'thirdCriteriaNutrition'
			"
		>
			<ion-card-title>{{ $t('laboratoryFile') }}</ion-card-title>
			<ion-list>
				<ion-item>
					<FileUpload @form-submitted="handleFormSubmittedFile" />
				</ion-item>
				<ion-item>
					{{ $t('fileSize') }}{{ totalFileSize.toFixed(2) }} MB / 10 MB
				</ion-item>
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'fourthCriteriaNutrition'
			"
		>
			<ion-card-title>{{ $t('sixthSubCriteriaNutrition') }}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('sixthSubCriteriaNutrition')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][0]" @click="handleClick(4, 0)"
						>Score 0</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][1]" @click="handleClick(4, 1)"
						>Score 1</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][2]" @click="handleClick(4, 2)"
						>Score 2</ion-checkbox
					>
				</ion-item>
				<CheckComments
					:update-comment="fish_variety_comments"
					@update-comment="updateFishVarietyComments"
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
	IonToolbar,
	IonContent,
	IonTitle,
	IonButtons,
	IonButton,
	IonCheckbox,
	IonInput,
	IonCard,
	IonCardTitle,
	IonFooter,
	IonIcon,
	alertController,
} from '@ionic/vue';
//import axios from 'axios';
import CheckComments from '@/components/CheckComments.vue';
import { useDolphinsStore } from '@/store/dolphinsStore';
import { useEvaluationFeedingStore } from '@/store/evaluationFeedingStore';
import { baseUrl } from '@/utils/baseUrl';
import FileUpload from '@/components/FileUpload.vue';
//import { chevronCollapseSharp } from 'ionicons/icons';
import { toast } from 'vue3-toastify';
import { download } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';
import 'vue3-toastify/dist/index.css';

const dolphinsStore = useDolphinsStore();

interface Dolphin {
	dolphin_id: number;
	name: string;
	sex: number;
	on_site: number;
	year_of_birth: number;
}
//dolphinsStore.fill();
const evaluationFeedingStore = useEvaluationFeedingStore();

let dataInBody; //Variable which gets saved in localstorage with either true or false, depending if data is in checkboxes or evaluationFeedingStore
const token = localStorage.getItem('token'); //Get current JWT token of the user
console.log('Token accessed from localStorage: ', token);

export default {
	components: {
		// needed Vue components:
		IonItem,
		IonList,
		IonSelect,
		IonSelectOption,
		IonModal,
		IonHeader,
		IonToolbar,
		IonContent,
		IonTitle,
		IonButtons,
		IonButton,
		IonCheckbox,
		IonInput,
		IonCard,
		IonCardTitle,
		CheckComments,
		IonFooter,
		IonIcon,
		FileUpload,
	},
	async mounted() {
		// This makes sure that the reference areas are updated while the component is
		// mounted. But only if there is internet connectivity. If not, the displayed
		// reference areas are the ones from the animalList.json. Also it adds the dolphins
		// which are added by the user and not in the animalList.json

		// this.dolphinsStore = useDolphinsStore();
		// await this.dolphinsStore.fill();
		//evaluationFeedingStore.resetBodies();
		// The fill method now resets the bodies
		const dolphinsStore = useDolphinsStore();
		evaluationFeedingStore.fill(dolphinsStore.dolphinList);
		// Reset here data while page is mounted
		localStorage.setItem('backButtonClicked', 'false');
		localStorage.setItem('dataInBody', 'false');
		localStorage.setItem('created_at', '');
	},
	data() {
		return {
			// Variables:
			language: 'en',
			dialog: false,
			download,
			dolphinsStore: dolphinsStore,
			dolphinList: dolphinsStore.dolphinList as Dolphin[],
			dolphinSelect: [] as string[], //null as string | null,
			oldDolphinSelect: [] as string[], //null as string | null,
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
			weight_measured: undefined as number | undefined,
			weightPlaceholder: this.$t('weightPlaceholder'),
			CheckboxArray: Array.from({ length: 5 }, () => Array(3).fill(false)),
			urlDolphins: baseUrl + '/api/dolphins', //'https://88395-17112.pph-server.de/api/dolphins', //the api route to get the dolphins
			urlPost: baseUrl + '/api/good_feeding',
			urlPostFile: baseUrl + '/api/file',
			body_condition_score_comments: '',
			weight_measured_comments: '',
			kcal_calculations_comments: '',
			blood_hydration_comments: '',
			fish_quality_comments: '',
			fish_variety_comments: '',
			//formData: null as FormData | null,
			formData: [] as FormData[],
			setupSessionStorage: {
				photo_type: '',
				eye_photo_path: '',
				teeth_photo_path: '',
				marks_photo_path: '',
				file_path: '',
				dolphin_name: '',
			},
			totalFileSize: 0,
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
		//Method to open reference area
		setOpenReferenceArea(isOpen: boolean) {
			if (isOpen) {
				// Update the data of the dolphins when the reference area is opened
				this.dolphinsStore.fill();
			}
			this.isOpenReferenceArea = isOpen;
		},
		async confirmRefresh() {
			// Upload photos if there are any in formData
			await this.fileUpload();
			console.log(evaluationFeedingStore.requestBodiesFeeding);
			await this.handleDolphinChange(true);

			// Switching between dolphins only makes sense if only one or
			// no dolphin is currently selected
			if (this.dolphinSelect.length === 1 || this.dolphinSelect.length === 0) {
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
			}
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
			console.log('Dolphin changed: ', this.dolphinSelect);
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
			}
		},
		//Method to switch the dolphin
		async switchDolphin(calledFromConfirmRefresh = false) {
			// Save the current data if the user switches the dolphin without clicking on the next button
			// false is passed so the method knows it has been called from the switchDolphin method
			// true if called from the confirmRefresh method
			await this.fileUpload();
			await this.storeCheckedValues(calledFromConfirmRefresh);
			if (this.oldDolphinSelect.length !== 0) {
				toast.success(this.$t('dataSavedTemporary'), {
					autoClose: 2000,
				});
			}
			console.log('switchDolphin called');
			console.log('Dolphin in switchDolphin: ', this.dolphinSelect);
			let dolphinSelect;
			if (calledFromConfirmRefresh) {
				// Find the index of the currently selected dolphin
				const currentIndex = this.dolphinList.findIndex(
					(dolphin) => dolphin.name === this.dolphinSelect[0] //takes the first value of this.dolphinSelect since there is anyway only one dolphin or no dolphin selected while we are here switching the dolphins
				);
				// Select the next dolphin in the dolphinList
				dolphinSelect = [this.dolphinList[currentIndex + 1].name];
				// set oldDolphinSelect to dolphinSelect since there is a clash if you combine switching dolphins with confirmRefresh and manual switching
				//this.oldDolphinSelect = this.dolphinSelect;
			} else {
				dolphinSelect = this.dolphinSelect;
			}

			// Reset checkboxes before filling them again with current data
			for (let i = 0; i <= 4; i++) {
				for (let j = 0; j < 3; j++) {
					if (this.CheckboxArray[i][j] === true) {
						this.CheckboxArray[i][j] = false;
					}
				}
			}

			// Reset comments before filling them again with current data
			this.body_condition_score_comments = '';
			this.weight_measured_comments = '';
			this.kcal_calculations_comments = '';
			this.blood_hydration_comments = '';
			this.fish_quality_comments = '';
			this.fish_variety_comments = '';
			console.log('Reseted the checkboxes and comment fields.');
			console.log(
				'The requestBody in switchDolphin: ',
				evaluationFeedingStore.requestBodiesFeeding
			);
			// Get the data of the selected dolphin, if user has already entered some data for the selected dolphin
			for (
				let k = 0;
				k < evaluationFeedingStore.requestBodiesFeeding.length;
				k++
			) {
				//k stands for the different dolphins. It iterates through the array of dolphins in requestBodiesFeeding.json
				// Select the k-th requestBody which is equivalent to this.dolphinSelect
				if (
					dolphinSelect &&
					dolphinSelect.includes(
						evaluationFeedingStore.requestBodiesFeeding[k]['dolphin_name']
					)
				) {
					// Now the correct dolphin is selected
					console.log(
						'Dolphin currently selected: ',
						evaluationFeedingStore.requestBodiesFeeding[k]['dolphin_name']
					);

					// Here the data from the requestBodiesFeeding is assigned to the checkboxes

					// Assigns null to the requestBodie if this.weight_measured is undefined
					this.weight_measured =
						evaluationFeedingStore.requestBodiesFeeding[k]['weight_measured'] ??
						undefined;

					for (let i = 0; i < this.CheckboxArray.length; i++) {
						for (let j = 0; j < this.CheckboxArray[i].length; j++) {
							// Get the data from the requestBodiesFeeding BCScore
							const bodyConditionScore =
								evaluationFeedingStore.requestBodiesFeeding[k][
									'body_condition_score'
								];
							const kcalCalculations =
								evaluationFeedingStore.requestBodiesFeeding[k][
									'kcal_calculations'
								];
							const bloodHydration =
								evaluationFeedingStore.requestBodiesFeeding[k][
									'blood_hydration'
								];
							const fishQuality =
								evaluationFeedingStore.requestBodiesFeeding[k]['fish_quality'];
							const fishVariety =
								evaluationFeedingStore.requestBodiesFeeding[k]['fish_variety'];

							if (bodyConditionScore !== null) {
								// Assign the value of the body condition score to the checkbox array
								const j = bodyConditionScore;
								this.CheckboxArray[0][j] = true;
								console.log('Body condition score displayed: ', j);
							}
							if (kcalCalculations !== null) {
								const j = kcalCalculations;
								this.CheckboxArray[1][j] = true;
							}
							if (bloodHydration !== null) {
								const j = bloodHydration;
								this.CheckboxArray[2][j] = true;
							}
							if (fishQuality !== null) {
								const j = fishQuality;
								this.CheckboxArray[3][j] = true;
							}
							if (fishVariety !== null) {
								const j = fishVariety;
								this.CheckboxArray[4][j] = true;
							}
						}
					}
					// Code here the comments into the request body
					// First check with if statement if comments had been updated or not. If we don´t do that we override the comments with
					// an empty string if we click on 'Next Test'
					console.log('The comments: ', this.body_condition_score_comments);
					/*this.body_condition_score_comments =
						evaluationFeedingStore.requestBodiesFeeding[k][
							'body_condition_score_comments'
						];
					console.log('The comments: ', this.body_condition_score_comments);*/
					this.body_condition_score_comments =
						evaluationFeedingStore.requestBodiesFeeding[k][
							'body_condition_score_comments'
						] ?? '';
					this.weight_measured_comments =
						evaluationFeedingStore.requestBodiesFeeding[k][
							'weight_measured_comments'
						] ?? '';
					this.kcal_calculations_comments =
						evaluationFeedingStore.requestBodiesFeeding[k][
							'kcal_calculations_comments'
						] ?? '';
					this.blood_hydration_comments =
						evaluationFeedingStore.requestBodiesFeeding[k][
							'blood_hydration_comments'
						] ?? '';
					this.fish_quality_comments =
						evaluationFeedingStore.requestBodiesFeeding[k][
							'fish_quality_comments'
						] ?? '';
					this.fish_variety_comments =
						evaluationFeedingStore.requestBodiesFeeding[k][
							'fish_variety_comments'
						] ?? '';

					if (localStorage.getItem('created_at') !== '') {
						evaluationFeedingStore.requestBodiesFeeding[k]['created_at'] =
							localStorage.getItem('created_at') as string;
					}
				}
			}
		},
		handleFormSubmittedFile(files: File[]) {
			if (files && this.dolphinSelect.length !== 0) {
				this.setupSessionStorage = {
					photo_type: '',
					eye_photo_path: '',
					teeth_photo_path: '',
					marks_photo_path: '',
					file_path: '',
					dolphin_name: '',
				};
				console.log('Form Data accessed in HealthCheckCriteriaSelector.vue:');
				//this.formData = new FormData();
				const newFormData = new FormData();
				const dolphinNames = this.dolphinSelect.join(',');
				if (this.dolphinSelect.length !== 0) {
					//this.formData.append('dolphin_name', dolphinNames); // Append the dolphin name as a comma-separated string
					newFormData.append('dolphin_name', dolphinNames); // Append the dolphin name as a comma-separated string
				}

				// Then append the rest of the fields
				// Keep track of total file size
				let totalSize = this.totalFileSize;
				console.log('Number of pictures: ' + files.length);
				for (let i = 0; i < files.length; i++) {
					console.log(files[i]);
					// Add the size of each file to the total
					// 1 MB = 1048576 bytes
					totalSize += files[i].size / 1048576;
					//this.formData.append('files', files[i]);
					newFormData.append('files', files[i]);
				}

				// If all the files exceed 10 MB the last file to be uploaded will not be uploaded
				if (totalSize < 10) {
					this.formData.push(newFormData);
					this.totalFileSize = totalSize;
					console.log(...this.formData);
					console.log('Total file size: ', this.totalFileSize);
				} else {
					//Don´t assign here totalSize to this.totalFileSize because picture wasn´t uploaded
					toast.error(this.$t('toastFileSize'), {
						autoClose: 4000,
					});
				}
			}
		},
		async fileUpload() {
			// Initialize session storage
			await this.$axios
				.post(baseUrl + '/api/setup_session_storage', null, {
					withCredentials: true,
					hideGlobalLoading: true,
				})
				.then((response: any) => {
					console.log('Response setup session storage:', response.data);
				})
				.catch((error: any) => {
					console.error('Error:', error);
				});
			// Check if there is a photo to upload
			if (this.formData != null) {
				// Setup the session storage
				console.log('Form Data accessed in FeedingCheckCriteriaSelector.vue');

				// Send the file to the server
				this.$axios
					.post(this.urlPostFile, this.formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
						withCredentials: true,
						hideGlobalLoading: true,
					})
					.then((response: any) => {
						console.log('Response:', response.data);
					})
					.catch((error: any) => {
						console.error('Error:', error);
					});

				//Reset the form data
				this.formData = []; //null;
				// Reset the total file size
				this.totalFileSize = 0;
				console.log('Resetted form data: ' + this.formData);
			}
		},
		//Method uses boolean array. So no multiple checking for one test is possible. --> Every test can have one checked Checkbox
		handleClick(row: number, column: number) {
			console.log(this.CheckboxArray, row, column);
			dataInBody = true;
			localStorage.setItem('dataInBody', dataInBody.toString());
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
			//console.log('Dolphin selected: ', this.dolphinSelect);
		},
		// Method to collect the checked checkboxes and give request Body the scores
		async storeCheckedValues(calledFromConfirmRefresh = false) {
			///////////////////////////////////////////////////////////////////////////
			// This part checks from where the store method is called
			// If it is called from the switchDolphin method, the data shall be saved
			// for the previously selected dolphin!
			let dolphinSelect;
			if (calledFromConfirmRefresh === true) {
				console.log('storeCheckedValues called from next button click.');
				dolphinSelect = this.dolphinSelect;
			} else {
				console.log('storeCheckedValues called from dolphinSwitch method');
				if (this.oldDolphinSelect === undefined) {
					// If there is no old dolphin select, then the CURRENT dolphin select is used
					console.log('No old dolphin select found.');
					dolphinSelect = this.dolphinSelect;
				} else {
					// If there is an old dolphin select, then the OLD dolphin select is used
					console.log('Old dolphin select found:', this.oldDolphinSelect);
					dolphinSelect = this.oldDolphinSelect;
				}
			}
			console.log('Current data saved for: ', dolphinSelect);
			///////////////////////////////////////////////////////////////////////////

			console.log(
				'This is the dolphinsStore: ',
				this.dolphinsStore.dolphinList
			);
			for (
				let k = 0;
				k < evaluationFeedingStore.requestBodiesFeeding.length;
				k++
			) {
				//k stands for the different dolphins. It iterates through the array of dolphins in requestBodiesFeeding.json
				if (
					dolphinSelect &&
					dolphinSelect.includes(
						evaluationFeedingStore.requestBodiesFeeding[k]['dolphin_name']
					)
				) {
					// Assigns null to the requestBodies if this.weight_measured is undefined
					evaluationFeedingStore.requestBodiesFeeding[k]['weight_measured'] =
						this.weight_measured !== undefined ? this.weight_measured : null;

					for (let i = 0; i < this.CheckboxArray.length; i++) {
						for (let j = 0; j < this.CheckboxArray[i].length; j++) {
							if (this.CheckboxArray[i][j] === true && i === 0) {
								evaluationFeedingStore.requestBodiesFeeding[k][
									'body_condition_score'
								] = j;
								console.log(
									'BCS in storeCheckedValues: ',
									evaluationFeedingStore.requestBodiesFeeding[k][
										'body_condition_score'
									]
								);
							} else if (this.CheckboxArray[i][j] === true && i === 1) {
								evaluationFeedingStore.requestBodiesFeeding[k][
									'kcal_calculations'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 2) {
								evaluationFeedingStore.requestBodiesFeeding[k][
									'blood_hydration'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 3) {
								evaluationFeedingStore.requestBodiesFeeding[k]['fish_quality'] =
									j;
							} else if (this.CheckboxArray[i][j] === true && i === 4) {
								evaluationFeedingStore.requestBodiesFeeding[k]['fish_variety'] =
									j;
							}
						}
					}
					// Code here the comments into the request body
					// First check with if statement if comments had been updated or not. If we don´t do that we override the comments with
					// an empty string if we click on 'Next Test'
					if (this.body_condition_score_comments != '') {
						evaluationFeedingStore.requestBodiesFeeding[k][
							'body_condition_score_comments'
						] = this.body_condition_score_comments;
					}
					if (this.weight_measured_comments != '') {
						evaluationFeedingStore.requestBodiesFeeding[k][
							'weight_measured_comments'
						] = this.weight_measured_comments;
					}
					if (this.kcal_calculations_comments != '') {
						evaluationFeedingStore.requestBodiesFeeding[k][
							'kcal_calculations_comments'
						] = this.kcal_calculations_comments;
					}
					if (this.blood_hydration_comments != '') {
						evaluationFeedingStore.requestBodiesFeeding[k][
							'blood_hydration_comments'
						] = this.blood_hydration_comments;
					}
					if (this.fish_quality_comments != '') {
						evaluationFeedingStore.requestBodiesFeeding[k][
							'fish_quality_comments'
						] = this.fish_quality_comments;
					}
					if (this.fish_variety_comments != '') {
						evaluationFeedingStore.requestBodiesFeeding[k][
							'fish_variety_comments'
						] = this.fish_variety_comments;
					}

					if (localStorage.getItem('created_at') !== '') {
						evaluationFeedingStore.requestBodiesFeeding[k]['created_at'] =
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
			evaluationFeedingStore.resetBodies();

			// Reset checkboxes
			for (let i = 0; i <= 4; i++) {
				for (let j = 0; j < 3; j++) {
					if (this.CheckboxArray[i][j] === true) {
						this.CheckboxArray[i][j] = false;
					}
				}
			}
			// Reset comments
			this.body_condition_score_comments = '';
			this.weight_measured_comments = '';
			this.kcal_calculations_comments = '';
			this.blood_hydration_comments = '';
			this.fish_quality_comments = '';
			this.fish_variety_comments = '';

			// Reset the total file size
			this.totalFileSize = 0;
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
			//console.log('config', config);
			//const confirmed = confirm(this.$t('savingDataNext')); //Where is the variable savingDataNext initialized and what does it do?
			const confirmed = true;
			if (confirmed) {
				await this.fileUpload();
				//Check if the date of the test is the current date
				await this.confirmTestDate();
				//Store the checked values in the request body
				await this.storeCheckedValues();

				console.log(this.CheckboxArray);
				// Flag to only show network error alert once instead of several times after another
				let alertShown = false;
				console.log('Reached this');
				for (
					let i = 0;
					i < evaluationFeedingStore.requestBodiesFeeding.length;
					i++
				) {
					/*for(const data in evaluationFeedingStore.requestBodiesFeeding[i]){
						if(evaluationFeedingStore.requestBodiesFeeding[i].content(data)){}
					}*/
					await this.$axios
						.post(
							this.urlPost,
							evaluationFeedingStore.requestBodiesFeeding[i],
							{ withCredentials: true, hideGlobalLoading: false }
						)
						.then((response: any) => {
							console.log('Response:', response.data);
							if (
								i ===
								evaluationFeedingStore.requestBodiesFeeding.length - 1
							) {
								const targetUrl = '/detailFeeding'; //'/folder/Evaluate';
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
								}, 2000);
								//Reset data saved in checkboxes and comment strings. Doesn´t affect the request body
								this.resetData();
								// The fill method now resets the bodies
								//evaluationFeedingStore.resetBodies();
								evaluationFeedingStore.fill(dolphinsStore.dolphinList);
								this.dolphinSelect = [];
								this.criteria = null;
								localStorage.setItem('created_at', '');
							}
						})
						.catch((error: any) => {
							const targetUrl = `/detailFeeding`;
							if (error.message === 'Network Error' && !alertShown) {
								alertShown = true;
								//console.log('Inside error catch block');
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
		/*async confirmRefresh() {
			// Upload photos if there are any in formData
			await this.fileUpload();
			const confirmed = true; //confirm(this.$t('savingDataNext'));
			if (confirmed) {
				this.storeCheckedValues();
				console.log(evaluationFeedingStore.requestBodiesFeeding);

				// Doing the same dolphinSelect with the next criteria in the list:
				switch (this.criteria) {
					case 'firstCriteriaNutrition':
						this.criteria = 'secondCriteriaNutrition';
						toast.success(this.$t('dataSavedTemporary'), {
							autoClose: 3000,
						});
						break;
					case 'secondCriteriaNutrition':
						this.criteria = 'thirdCriteriaNutrition';
						toast.success(this.$t('dataSavedTemporary'), {
							autoClose: 3000,
						});
						break;
					case 'thirdCriteriaNutrition':
						this.criteria = 'fourthCriteriaNutrition';
						toast.success(this.$t('dataSavedTemporary'), {
							autoClose: 3000,
						});
						break;
					case 'fourthCriteriaNutrition':
						// De-select the criteria selector, so that no ion-card is shown when principle is finished
						// and do a toast pop up message that principle has ended
						this.criteria = 'fourthCriteriaNutrition';
						toast.success(this.$t('principleFinished'), {
							autoClose: 5000,
						});
						break;
					default:
						this.criteria = 'firstCriteriaNutrition';
				}
				//this.dolphinSelect = [];
				//this.criteria = null;

				//const currentPath = this.$route.path;
				const targetUrl = `/detailFeeding`;
				// No need to check if dataInBody true or false, because /detailFeeding doesn´t
				// need to be protected from losing data
				this.$router.push(targetUrl);
			}
		},
		//Method to get the Dolphins
		showDolphins() {
			//this.dolphins = this.dolphinsStore.dolphinList;
			//console.log(this.dolphinsStore.dolphinList);
			//console.log(this.dolphins);
			//console.log(evaluationFeedingStore.requestBodiesFeeding);
		},*/
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
