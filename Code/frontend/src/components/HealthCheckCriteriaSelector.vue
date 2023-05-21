<template>
	<!-- Criteria Selector -->
	<ion-list>
		<ion-item>
			<ion-select
				:label="firstlabel"
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
					<ion-button @click="setOpen(false)">Close</ion-button>
				</ion-buttons>
			</ion-toolbar>
      	</ion-header>
      	<ion-content class="ion-padding">
			<p v-if=" subcriteria === 'firstSubcriteriaHealth'">
				<h1>Normal floatability and locomotion test</h1>
				1. underwater and out of water observation for 2 min  of the animal floating inactive keeping position on the water. Special attention to normal movement of both pectoral flippers, lack of organic restrictions or deformities (e.g.: scoliosis), lack of permanent inclination leaning on one side, lack of external wounds or scars potentially compromising movement, normal buoyancy.
				2. underwater and out of water observation for 3 min of active swimming pattern and dynamic movements (requested on command) including free jumps, fast swims, etc.. Special attention to normal and fluid tail movements, normal movement of both pectoral flippers, normal maneuvering to both sides avoiding objects, walls and pool mates, lack of organic restrictions or deformities (e.g.: scoliosis), lack of permanent inclination leaning on one side, capacity to perform basic dynamic behaviors.
				<h1>Records on previous incidents/diseases altering locomotion or floatability</h1>
				Verification with the team of trainers and veterinarians that there is no previous incident/disease altering locomotion or floatability during the previous 3 months .
			</p>
			<p v-if=" subcriteria === 'secondSubcriteriaHealth'">
				<h1>Direct veterinary inspection</h1>
				Eyes are wide open, no opacities, corneal scars, changes in colour, etc. 
				<h1>Normal responses on both eyes to visual cues from the trainer</h1>

				<h1>Records on previous eye lesions/incidents/diseases</h1>
				Verification with the team of trainers and veterinarians there are no previous eye lesions/incidents/diseases (altering vision or not) during the previous 3 months.
			</p>
			<p v-if=" subcriteria === 'thirdSubcriteriaHealth'">
				Direct physical exam of mouth
				Absence of oral lesions or painful areas in the mouth on direct inspection (excessive dental wear or fractures with pulp exposure, mucosal lesions, abnormal masses, changes in colour, etc.).
				Please check:
				-	Presence of teeth wearing, broken teeth, missing teeth
				-	Presence of gingivitis
				-	Tongue – presence of injuries, fungal lesions
				-	Mucosae
				Records on previous dental or oral lesions
				Verification with the team of trainers and veterinarians there have been no previous lesions/diseases/behaviors altering or reflecting alteration of oral health or associated feeding behaviour during the previous 3 months.
			</p>
			<p v-if=" subcriteria === 'fourthSubcriteriaHealth'">
				Records of previous gastric/fecal abnormalities on records
				Verification with the team of trainers and veterinarians there have been no previous lesions/diseases/behaviours reflecting or potentially causing alteration of gastrointestinal tract or associated feeding behaviour during the previous 3 months.
			</p>
			<p v-if=" subcriteria === 'fifthSubcriteriaHealth'">
				Direct physical exam including blowhole visual evaluation, and respiration performance
				Blowhole visual evaluation (movement, internal plaques, secretions, odor, discoloration/hyperpigmentation, etc.), auscultation (respiratory sounds), and apparent ventilation performance (respiratory noises, exhalation duration, ventilation relative volume, respiratory rate).
				Please check:
				-	Presence of foul odor
				-	Presence of foam/mucus
				-	Chuff without resulting in coughing
				-	Abnormal respiratory rates
				Forced expiration test
				Records on previous respiratory diseases
				verification with the team of trainers and veterinarians there have been no previous signs/diseases/behaviors reflecting respiratory disease during the previous 3 months.
			</p>
			<p v-if=" subcriteria === 'sixthSubcriteriaHealth'">
				Direct physical exam
				Direct physical exam of on skin and other natural openings, including global skin condition (color, number and severity of viral lesions, major wounds, cracking, relative desquamation, scars, thermal ischemic necrosis, etc.), genital slit (exudates, mucosal colour, mucosal lesions), ears (exudates, pain to touch, bulging), rostrum (wounds, callosity).  
				Please check:
				Skin condition (general):
				-	Presence of pox virus, mycobacterium, or papilloma like lesions. 
				-	Presence of active traumatic lesions (especially at rostrum level and fins)
				-	Presence of hematomas
				-	Presence of abnormal coloration, blistering, etc. 
				-	Coloration around eyes and blowhole
				Genital area:
				-	Presence of herpes/papilloma
				Records on previous incidents
				Verification with the team of trainers and veterinarians there have been no other previous signs/diseases/behaviors on records (including complete blood works (including complete hematology, biochemistry, ESR and fibrinogen determinations as well as inflammatory markers such us TWBC, WBCdiff, %Bands, %Ret, Hb, ALKP, ALB, FIB, IRON, ESR), biological data, or complementary diagnostic techniques (ultrasound, radiography, endoscopy, thermography, CT, microbiology, hormonal analysis, molecular techniques, etc.) )
				Complete blood profile methodology
				Perform a complete full blood profile of the dolphin within the previous 2 weeks of the welfare evaluation. Blood analysis should contain a complete panel on hematology, biochemistry, and coagulation parameters (30 in total), including most relevant markers or inflammation (see (Gulland, F. M., Dierauf, L. A., & Whitman, K. L. (Eds.). (2018). CRC Handbook of marine mammal medicine. CRC Press). 
				Main inflammation markers:  
				-	White blood cell count
				-	Differential count 
				-	Immature neutrophils (bands) 
				-	Reticulocytes
				-	Erythrocyte sedimentation rate
				-	Fibrinogen
				-	Albumin
				-	Globulin
				-	Total proteins
				-	Alkaline Phosphatase (ALKP)
				-	Iron
				Additional markers to evaluate red blood cell series: 
				-	Red blood cell count
				-	Haematocrit
				-	Haemoglobin
				Additional markers for liver and kidney function evaluation: 
				Alanine Amino Transferase (ALT), Gamma Glutamyl Transferase (GGT), Lactate Dehydrogenase (LDH), Triglycerides, Cholesterol, Total Bilirubin
				Blood Urea Nitrogen (BUN)/Urea, Creatinine
				Other relevant markers and electrolytes: 
				-	Glucose
				-	Uric acid
				-	Creatin Kinase
				-	Sodium, potassium, chloride, calcium, and phosphate. 
				Ideally the blood should be collected from fasted animals, first time in the morning and under voluntary behaviour.
				Criteria: 
				All 30 parameters measured should remain in the normal range for the species (according to Appendix 1 @ Gulland, F. M., Dierauf, L. A., & Whitman, K. L. (Eds.). (2018). CRC handbook of marine mammal medicine. CRC Press. (Page 1003) and (if available) within the individual reference values/ranges according to previous analysis (at least including one year period and ideally more) under the same lab and technique.
				In case of a relevant deviation of one or more parameters from normal average values or ranges, the veterinarian should further on study the individual in search of a potential disease that could compromise welfare.
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
	IonButton
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
		IonButton
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
