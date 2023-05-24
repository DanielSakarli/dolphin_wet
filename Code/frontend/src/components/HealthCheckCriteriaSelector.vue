<template>
	<!-- Criteria Selector -->
	<ion-list>
		<ion-item>
			<ion-select
				:label= "firstlabel"
				:placeholder="firstplaceholder"
				okText="OK"
				:cancelText="firstcancelText"
			>
				<ion-select-option value="dolphin1">{{
					$t('dolphin1')
				}}</ion-select-option>
				<ion-select-option value="dolphin2">{{
					$t('dolphin2')
				}}</ion-select-option>
						<ion-select-option value="dolphin3">{{
					$t('dolphin3')
				}}</ion-select-option>
				<ion-select-option value="dolphin4">{{
					$t('dolphin4')
				}}</ion-select-option>
			</ion-select>
		</ion-item>
		<ion-item>
			<ion-select
				:value="subcriteria"
				@IonChange ="subcriteria=$event.target.value"
				:label="secondlabel"
				:placeholder="secondplaceholder"
				okText="OK"
				:cancelText="firstcancelText"
			>
				<ion-select-option value="firstSubcriteriaHealth">{{
					$t('firstSubcriteriaHealth')
				}}</ion-select-option>
				<ion-select-option value="secondSubcriteriaHealth">{{
					$t('secondSubcriteriaHealth')
				}}</ion-select-option>
				<ion-select-option value="thirdSubcriteriaHealth">{{
					$t('thirdSubcriteriaHealth')
				}}</ion-select-option>
				<ion-select-option value="fourthSubcriteriaHealth">{{
					$t('fourthSubcriteriaHealth')
				}}</ion-select-option>
				<ion-select-option value="fifthSubcriteriaHealth">{{
					$t('fifthSubcriteriaHealth')
				}}</ion-select-option>
				<ion-select-option value="sixthSubcriteriaHealth">{{
					$t('sixthSubcriteriaHealth')
				}}</ion-select-option>
			</ion-select>
		</ion-item>
	</ion-list>
	<!-- End of Criteria Selector -->

	<!-- Description of Criteria -->
	<ion-button fill ="outline" @click="setOpen(true)">{{ $t('userManual') }}</ion-button>

    <ion-modal :is-open="isOpen">
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
				<ion-title  v-else-if=" subcriteria === 'fourthSubcriteriaHealth'"
					>{{$t('fourthSubcriteriaHealth')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'fifthSubcriteriaHealth'"
					>{{$t('fifthSubcriteriaHealth')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'sixthSubcriteriaHealth'"
					>{{$t('sixthSubcriteriaHealth')}}
				</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="setOpen(false)">{{ $t('close')}}</ion-button>
				</ion-buttons>
			</ion-toolbar>
      	</ion-header>
      	<ion-content class="ion-padding">
			<p v-if=" subcriteria === 'firstSubcriteriaHealth'">
				<h3>{{ $t('correctLocomotion1') }}</h3>
				<ol>
					<li>{{ $t('correctLocomotion2') }}</li>
					<li>{{ $t('correctLocomotion3') }}</li>
				</ol>
				<h3>{{ $t('correctLocomotion4') }}</h3>
				{{ $t('correctLocomotion5') }}
			</p>
			<p v-if=" subcriteria === 'secondSubcriteriaHealth'">
				<h3>{{ $t('AbsenceOfEyeLesions1') }}</h3>
				{{ $t('AbsenceOfEyeLesions2') }}
				<h3>{{ $t('AbsenceOfEyeLesions3') }}</h3>

				<h3>{{ $t('AbsenceOfEyeLesions4') }}</h3>
				{{ $t('AbsenceOfEyeLesions5') }}
			</p>
			<p v-if=" subcriteria === 'thirdSubcriteriaHealth'">
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
			<p v-if=" subcriteria === 'fourthSubcriteriaHealth'">
				<h3>Records of previous gastric/fecal abnormalities on records</h3>
				Verification with the team of trainers and veterinarians there have been no previous lesions/diseases/behaviours reflecting or potentially causing alteration of gastrointestinal tract or associated feeding behaviour during the previous 3 months.
			</p>
			<p v-if=" subcriteria === 'fifthSubcriteriaHealth'">
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
			<p v-if=" subcriteria === 'sixthSubcriteriaHealth'">
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
	<!-- End of Description of Criteria -->
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
	IonText
} from '@ionic/vue';
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
		IonText
	},
	data() {
		return {
			language: 'en',
			subcriteria: '',
			firstlabel: this.$t('dolphin'),
			firstplaceholder: this.$t('selectDolphin'),
			firstcancelText: this.$t('cancelChoice'),
			secondlabel: this.$t('test'),
			secondplaceholder: this.$t('selectTest'),
			isOpen: false,
		};
	},
	methods: {
      setOpen(isOpen: boolean) {
        this.isOpen = isOpen;
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
