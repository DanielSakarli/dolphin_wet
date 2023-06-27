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
			>
				<ion-select-option v-for="dolphin in dolphinList" v-bind:key="dolphin.id">
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
				<ion-select-option value="firstCriteriaHealth">{{
					$t('firstCriteriaHealth')
				}}</ion-select-option>
				<ion-select-option value="secondCriteriaHealth">{{
					$t('secondCriteriaHealth')
				}}</ion-select-option>
				<ion-select-option value="thirdCriteriaHealth">{{
					$t('thirdCriteriaHealth')
				}}</ion-select-option>
                <ion-select-option value="fourthCriteriaHealth">{{
					$t('fourthCriteriaHealth')
				}}</ion-select-option>
				<ion-select-option value="fifthCriteriaHealth">{{
					$t('fifthCriteriaHealth')
				}}</ion-select-option>
				<ion-select-option value="sixthCriteriaHealth">{{
					$t('sixthCriteriaHealth')
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
			>
				<ion-select-option v-if=" criteria === 'firstCriteriaHealth'" value="firstSubcriteriaHealth">{{
					$t('firstSubcriteriaHealth')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'firstCriteriaHealth'" value="secondSubcriteriaHealth">{{
					$t('secondSubcriteriaHealth')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'secondCriteriaHealth'" value="thirdSubcriteriaHealth">{{
					$t('thirdSubcriteriaHealth')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'secondCriteriaHealth'" value="fourthSubcriteriaHealth">{{
					$t('fourthSubcriteriaHealth')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'secondCriteriaHealth'" value="fifthSubcriteriaHealth">{{
					$t('fifthSubcriteriaHealth')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'thirdCriteriaHealth'" value="sixthSubcriteriaHealth">{{
					$t('sixthSubcriteriaHealth')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'thirdCriteriaHealth'" value="seventhSubcriteriaHealth">{{
					$t('seventhSubcriteriaHealth')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'fourthCriteriaHealth'" value="eigthSubcriteriaHealth">{{
					$t('eigthSubcriteriaHealth')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'fifthCriteriaHealth'" value="ninthSubcriteriaHealth">{{
					$t('ninthSubcriteriaHealth')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'fifthCriteriaHealth'" value="tenthSubcriteriaHealth">{{
					$t('tenthSubcriteriaHealth')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'fifthCriteriaHealth'" value="eleventhSubcriteriaHealth">{{
					$t('eleventhSubcriteriaHealth')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'sixthCriteriaHealth'" value="twelfthSubcriteriaHealth">{{
					$t('twelfthSubcriteriaHealth')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'sixthCriteriaHealth'" value="thirteenthSubcriteriaHealth">{{
					$t('thirteenthSubcriteriaHealth')
				}}</ion-select-option>
			</ion-select>
		</ion-item>
	</ion-list>
	<!-- End of Criteria Selector -->

	<!-- Description of Criteria (User Manual)-->
	<ion-button fill ="outline" @click="setOpenManual(true)">{{ $t('userManual') }}</ion-button>

    <ion-modal :is-open="isOpenManual">
    	<ion-header>
			<ion-toolbar>
				<ion-title v-if=" criteria === 'firstCriteriaHealth'"
					>{{$t('firstCriteriaHealth')}}
				</ion-title>
				<ion-title v-else-if=" criteria === 'secondCriteriaHealth'"
					>{{$t('secondCriteriaHealth')}}
				</ion-title>
				<ion-title v-else-if=" criteria === 'thirdCriteriaHealth'"
					>{{$t('thirdSubcriteriaHealth')}}
				</ion-title>
				<ion-title  v-else-if=" criteria === 'fourthCriteriaHealth'"
					>{{$t('fourthCriteriaHealth')}}
				</ion-title>
				<ion-title v-else-if=" criteria === 'fifthCriteriaHealth'"
					>{{$t('fifthCriteriaHealth')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'sixthCriteriaHealth'"
					>{{$t('sixthCriteriaHealth')}}
				</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="setOpenManual(false)">{{ $t('close')}}</ion-button>
				</ion-buttons>
			</ion-toolbar>
      	</ion-header>
      	<ion-content class="ion-padding">
			<p v-if=" criteria === 'firstCriteriaHealth'">
				<h3>{{ $t('correctLocomotion1') }}</h3>
				<ol>
					<li>{{ $t('correctLocomotion2') }}</li>
					<li>{{ $t('correctLocomotion3') }}</li>
				</ol>
				<h3>{{ $t('correctLocomotion4') }}</h3>
				{{ $t('correctLocomotion5') }}
			</p>
			<p v-if=" criteria === 'secondCriteriaHealth'">
				<h3>{{ $t('AbsenceOfEyeLesions1') }}</h3>
				{{ $t('AbsenceOfEyeLesions2') }}
				<h3>{{ $t('AbsenceOfEyeLesions3') }}</h3>

				<h3>{{ $t('AbsenceOfEyeLesions4') }}</h3>
				{{ $t('AbsenceOfEyeLesions5') }}
			</p>
			<p v-if=" criteria === 'thirdCriteriaHealth'">
				<h3>{{$t('GoodMouthCondition1')}}</h3>
				{{$t('GoodMouthCondition2')}}
				<h3>{{ $t('pleaseCheck') }}</h3>
				<ul>
					<li>{{$t('GoodMouthCondition3')}}</li>
					<li>{{ $t('GoodMouthCondition4') }}</li>
					<li> {{ $t('GoodMouthCondition5') }}</li>
					<li>{{ $t('GoodMouthCondition6') }} </li>
				</ul>
				<h3>{{ $t('GoodMouthCondition7') }}</h3>
				{{ $t('GoodMouthCondition8') }}
			</p>
			<p v-if=" criteria === 'fourthCriteriaHealth'">
				<h3>Records of previous gastric/fecal abnormalities on records</h3>
				Verification with the team of trainers and veterinarians there have been no previous lesions/diseases/behaviours reflecting or potentially causing alteration of gastrointestinal tract or associated feeding behaviour during the previous 3 months.
			</p>
			<p v-if=" criteria === 'fifthCriteriaHealth'">
				<h3>Direct physical exam including blowhole visual evaluation, and respiration performance</h3>
				Blowhole visual evaluation (movement, internal plaques, secretions, odor, discoloration/hyperpigmentation, etc.), auscultation (respiratory sounds), and apparent ventilation performance (respiratory noises, exhalation duration, ventilation relative volume, respiratory rate).
				<h3>Please check:</h3>
				<ul>
					<li> Presence of foul odor</li>
					<li> Presence of foam/mucus</li>
					<li> Chuff without resulting in coughing</li>
					<li> Abnormal respiratory rates</li>
				</ul>
				<h3>Forced expiration test</h3>
				<h3>Records on previous respiratory diseases</h3>
				verification with the team of trainers and veterinarians there have been no previous signs/diseases/behaviors reflecting respiratory disease during the previous 3 months.
			</p>
			<p v-if=" criteria === 'sixthCriteriaHealth'">
				<h3>Direct physical exam</h3>
				Direct physical exam of on skin and other natural openings, including global skin condition (color, number and severity of viral lesions, major wounds, cracking, relative desquamation, scars, thermal ischemic necrosis, etc.), genital slit (exudates, mucosal colour, mucosal lesions), ears (exudates, pain to touch, bulging), rostrum (wounds, callosity).  
				<h3>Please check:</h3>
				<h4>Skin condition (general):</h4>
				<ul>
					<li> Presence of pox virus, mycobacterium, or papilloma like lesions</li>
					<li> Presence of active traumatic lesions (especially at rostrum level and fins)</li>
					<li> Presence of hematomas</li>
					<li> Presence of abnormal coloration, blistering, etc.</li>
					<li> Coloration around eyes and blowhole</li>
				</ul>
				<h4>Genital area:</h4>
				<ul>
					<li> Presence of herpes/papilloma</li>
				</ul>
				<h3>Records on previous incidents</h3>
				Verification with the team of trainers and veterinarians there have been no other previous signs/diseases/behaviors on records (including complete blood works (including complete hematology, biochemistry, ESR and fibrinogen determinations as well as inflammatory markers such us TWBC, WBCdiff, %Bands, %Ret, Hb, ALKP, ALB, FIB, IRON, ESR), biological data, or complementary diagnostic techniques (ultrasound, radiography, endoscopy, thermography, CT, microbiology, hormonal analysis, molecular techniques, etc.) )
				<h3>Complete blood profile methodology</h3>
				Perform a complete full blood profile of the dolphin within the previous 2 weeks of the welfare evaluation. Blood analysis should contain a complete panel on hematology, biochemistry, and coagulation parameters (30 in total), including most relevant markers or inflammation (see (Gulland, F. M., Dierauf, L. A., & Whitman, K. L. (Eds.). (2018). CRC Handbook of marine mammal medicine. CRC Press). 
				<h3>Main inflammation markers:</h3>
				<ul> 
					<li> White blood cell count</li>
					<li> Differential count </li>
					<li> Immature neutrophils (bands) </li>
					<li> Reticulocytes</li>
					<li> Erythrocyte sedimentation rate</li>
					<li> Fibrinogen</li>
					<li> Albumin</li>
					<li> Globulin</li>
					<li> Total proteins</li>
					<li> Alkaline Phosphatase (ALKP)</li>
					<li> Iron</li>
				</ul> 
				<h3>Additional markers to evaluate red blood cell series:</h3>
				<ul> 
					<li> Red blood cell count</li>
					<li> Haematocrit</li>
					<li> Haemoglobin</li>
				</ul>
				<h3>Additional markers for liver and kidney function evaluation:</h3>
				Alanine Amino Transferase (ALT), Gamma Glutamyl Transferase (GGT), Lactate Dehydrogenase (LDH), Triglycerides, Cholesterol, Total Bilirubin,
				Blood Urea Nitrogen (BUN)/Urea, Creatinine
				<h3>Other relevant markers and electrolytes:</h3>
				<ul>
					<li> Glucose</li>
					<li> Uric acid</li>
					<li> Creatin Kinase</li>
					<li> Sodium, potassium, chloride, calcium, and phosphate</li> 
				</ul>
				Ideally the blood should be collected from fasted animals, first time in the morning and under voluntary behaviour.
				<h3>Criteria:</h3> 
				All 30 parameters measured should remain in the normal range for the species (according to Appendix 1 @ Gulland, F. M., Dierauf, L. A., & Whitman, K. L. (Eds.). (2018). CRC handbook of marine mammal medicine. CRC Press. (Page 1003)) and (if available) within the individual reference values/ranges according to previous analysis (at least including one year period and ideally more) under the same lab and technique.
				In case of a relevant deviation of one or more parameters from normal average values or ranges, the veterinarian should further on study the individual in search of a potential disease that could compromise welfare.
				<p>*</p>
			</p>
      	</ion-content>
    </ion-modal>
	<!-- End of Description of Criteria (User Manual) -->
	<!--Start of Scoring Description-->
	<ion-button fill ="outline" @click="setOpenScoring(true)">{{ $t('ScoringDescription') }}</ion-button>

    <ion-modal :is-open="isOpenScoring">
    	<ion-header>
			<ion-toolbar>
				<ion-title v-if=" subcriteria === 'firstSubcriteriaHealth'"
					>{{$t('firstSubcriteriaHealth')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'secondSubcriteriaHealth'"
					>{{$t('secondSubcriteriaHealth')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'thirdSubcriteriaHealth'"
					>{{$t('thirdSubcriteriaHealth')}}
				</ion-title>
                <ion-title v-else-if=" subcriteria === 'fourthSubcriteriaHealth'"
					>{{$t('fourthSubcriteriaHealth')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'fifthSubcriteriaHealth'"
					>{{$t('fifthSubcriteriaHealth')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'sixthSubcriteriaHealth'"
					>{{$t('sixthSubcriteriaHealth')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'seventhSubcriteriaHealth'"
					>{{$t('seventhSubcriteriaHealth')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'eigthSubcriteriaHealth'"
					>{{$t('eigthSubcriteriaHealth')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'ninthSubcriteriaHealth'"
					>{{$t('ninthSubcriteriaHealth')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'tenthSubcriteriaHealth'"
					>{{$t('tenthSubcriteriaHealth')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'eleventhSubcriteriaHealth'"
					>{{$t('eleventhSubcriteriaHealth')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'twelfthSubcriteriaHealth'"
					>{{$t('twelfthSubcriteriaHealth')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'thirteenthSubcriteriaHealth'"
					>{{$t('thirteenthSubcriteriaHealth')}}
				</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="setOpenScoring(false)">{{ $t('close')}}</ion-button>
				</ion-buttons>
			</ion-toolbar>
      	</ion-header>
      	<ion-content class="ion-padding">
			<p v-if=" subcriteria === 'firstSubcriteriaHealth'">
				<h3>Score 1</h3>
				Verification of normal movements
				<h3>Score 3</h3>
				Evidence of any locomotive/floating abnormalities
        	</p>
			<p v-if=" subcriteria === 'secondSubcriteriaHealth'">
				<h3>Score 1</h3>
				No evidence of any locomotive/floating abnormalities on records  
				<h3>Score 3</h3>
				Evidence of any locomotion/floating abnormalities on records
			</p>
			<p v-if=" subcriteria === 'thirdSubcriteriaHealth'">
				<h3>Score 1</h3>
				Absence of eye lesions 
				<h3>Score 3</h3>
				Presence of eye lesions
            </p>
            <p v-if=" subcriteria === 'fourthSubcriteriaHealth'">
				<h3>Score 1</h3>
				Normal response
				<h3>Score 3</h3>
				Evidence of any abnormalities
            </p>
			<p v-if=" subcriteria === 'fifthSubcriteriaHealth'">
				<h3>Score 1</h3>
				Absence of previous incidents on records during last three months
				<h3>Score 3</h3>
				Evidence of previous incidents on records during last three months
            </p>
			<p v-if=" subcriteria === 'sixthSubcriteriaHealth'">
				<h3>Score 1</h3>
				Absence of oral lesions or painful areas in the mouth (including teeth)
				on direct physical exam
				<h3>Score 3</h3>
				Presence of oral lesions or painful areas in the mouth (including teeth)
            </p>
			<p v-if=" subcriteria === 'seventhSubcriteriaHealth'">
				<h3>Score 1</h3>
				Absence of previous incidents on records during last three months 
				<h3>Score 3</h3>
				Evidence of previous incidents on records during last three months 
            </p>
			<p v-if=" subcriteria === 'eigthSubcriteriaHealth'">
				<h3>Score 1</h3>
				Absence of previous incidents on records during last three months 
				<h3>Score 3</h3>
				Evidence of previous incidents on records during last three months 
            </p>
			<p v-if=" subcriteria === 'ninthSubcriteriaHealth'">
				<h3>Score 1</h3>
				Absence of any signs or evidence of respiratory disease during direct physical exam
				<h3>Score 3</h3>
				Presence or signs of respiratory disease during direct physical exam
            </p>
			<p v-if=" subcriteria === 'tenthSubcriteriaHealth'">
				<h3>Score 1</h3>
				Absence of abnormalities
				<h3>Score 3</h3>
				Evidence of any abnormalities 
            </p>
			<p v-if=" subcriteria === 'eleventhSubcriteriaHealth'">
				<h3>Score 1</h3>
				Absence of previous incidents on records during last three months
				<h3>Score 3</h3>
				Evidence of previous incidents on records during last three months 
            </p>
			<p v-if=" subcriteria === 'twelfthSubcriteriaHealth'">
				<h3>Score 1</h3>
				Absence of external active signs of disease on skin or other natural openings on direct physical exam
				including global skin condition (colour, number and severity of viral lesions, major wounds, cracking,
				relative desquamation, scars, thermal ischemic necrosis, etc. excluding rake marks), genital slit
				(exudates, mucosal colour, mucosal lesions), ears (exudates, pain to touch, bulging), rostrum (wounds, callosity).
				<h3>Score 3</h3>
				Presence of external active signs of disease on skin or other natural openings on direct physical exam
				including global skin condition (colour, number and severity of viral lesions, major wounds, cracking,
				relative desquamation, scars, thermal ischemic necrosis, etc. excluding rake marks), genital slit
				(exudates, mucosal colour, mucosal lesions), ears (exudates, pain to touch, bulging), rostrum (wounds, callosity).
            </p>
			<p v-if=" subcriteria === 'thirtennthSubcriteriaHealth'">
				Including complete haematology, biochemistry, ESR and fibrinogen
				determinations as well as inflammatory markers such us TWBC, WBCdiff,
				%Bands, %Ret, Hb, ALKP, ALB, FIB, IRON, ESR), biological data, or
				complementary diagnostic techniques (ultrasound, radiography, endoscopy,
				thermography, CT, microbiology, hormonal analysis, molecular techniques, etc.)
				<h3>Score 1</h3>
				Absence of previous signs/diseases on records during last three month
				<h3>Score 3</h3>
				Evidence of previous signs/diseases on records during last three months
            </p>
      	</ion-content>
    </ion-modal>
	<!--End of Scoring Description-->
	<!--Start of Scoring-->
	<ion-item lines="none">
		<ion-checkbox justify="space-between" value="Score1"
			>Score 1 (good)
		</ion-checkbox>
	</ion-item>
	<ion-item lines="none">
		<ion-checkbox justify="space-between" value="Score3"
			>Score 3 (bad)
		</ion-checkbox>
	</ion-item>
	<!--End of Scoring-->
	<!--Start of photo section-->
	<ion-item v-if=" subcriteria === 'thirdSubcriteriaHealth' || subcriteria === 'sixthSubcriteriaHealth' || subcriteria ==='twelfthSubcriteriaHealth'">
		<ion-thumbnail slot="start">
			<img :src = "previewImageUrl" />
		</ion-thumbnail>
		<ion-button type="button" fill="clear" @click="takePhoto">
			<ion-icon slot="start" :icon="camera"></ion-icon>
			{{ $t('photo') }}
		</ion-button>
	</ion-item>
	<!--End of photo section-->
</template>

<script lang="ts">
import {camera} from 'ionicons/icons';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';

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
	IonThumbnail,
	IonIcon,
	IonCheckbox
} from '@ionic/vue';

import axios from 'axios';
const url = 'http://88395-17112.pph-server.de/api/dolphins';

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
		IonThumbnail,
		IonIcon,
		IonCheckbox
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
			isOpen: false,
			isOpenManual: false,
			isOpenScoring: false,
			selectedOption: undefined,
			isChecked: {} as Record<number, boolean>,
			Score1: this.$t('fulfilled'),
			noTendency: this.$t('noTendency'),
			notFulfilled: this.$t('notFulfilled'),
			camera,
			previewImageUrl: '',
			dolphinList: [ { id: 1, name: 'Dolphin 1' },
						{ id: 2, name: 'Dolphin 2' },
						{ id: 3, name: 'Dolphin 3' },],
		};
	},

	methods: {
		async showDolphins() {
			console.log("Someone wants to selct a dolphin")
			await axios.get(url)
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
		async takePhoto(){
			const photo = await Camera.getPhoto({
				resultType: CameraResultType.Uri,
				source: CameraSource.Camera,
				quality: 60
			});
			if (photo.webPath !== undefined) {
				this.previewImageUrl = photo.webPath;
			}	
		}
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
