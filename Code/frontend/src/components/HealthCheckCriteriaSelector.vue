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
		</ion-list>
		<!-- End of Criteria Selector -->

		<!-- Description of Criteria (User Manual)-->
		<ion-button v-if="criteria" fill="outline" @click="setOpenManual(true)">{{ $t('userManual') }}</ion-button>

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
						>{{$t('thirdCriteriaHealth')}}
					</ion-title>
					<ion-title  v-else-if=" criteria === 'fourthCriteriaHealth'"
						>{{$t('fourthCriteriaHealth')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'fifthCriteriaHealth'"
						>{{$t('fifthCriteriaHealth')}}
					</ion-title>
					<ion-title v-else-if=" SubCriteria === 'sixthCriteriaHealth'"
						>{{$t('sixthCriteriaHealth')}}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenManual(false)">{{ $t('close')}}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<p v-if=" criteria === 'firstCriteriaHealth'">
					<h3>{{ $t('firstSubCriteriaHealth') }}</h3>
						<li>Score 0: {{ $t('score0Health1') }}</li>
						<li>Score 2: {{ $t('score2Health1') }}</li>
					<h3>{{ $t('secondSubCriteriaHealth') }}</h3>
						<li>Score 0: {{ $t('score0Health2') }}</li>
						<li>Score 2: {{ $t('score2Health2') }}</li>
				</p>
				<p v-if=" criteria === 'secondCriteriaHealth'">
					<h3>{{ $t('thirdSubCriteriaHealth') }}</h3>
						<li>Score 0: {{ $t('score0Health3') }}</li>
						<li>Score 2: {{ $t('score2Health3') }}</li>
					<h3>{{ $t('fourthSubCriteriaHealth') }}</h3>
						<li>Score 0: {{ $t('score0Health4') }}</li>
						<li>Score 2: {{ $t('score2Health4') }}</li>
					<h3>{{ $t('fifthSubCriteriaHealth') }}</h3>
						<li>Score 0: {{ $t('score0Health5') }}</li>
						<li>Score 2: {{ $t('score2Health5') }}</li>
				</p>
				<p v-if=" criteria === 'thirdCriteriaHealth'">
					<h3>{{ $t('sixthSubCriteriaHealth') }}</h3>
						<li>Score 0: {{ $t('score0Health6') }}</li>
						<li>Score 2: {{ $t('score2Health6') }}</li>
					<h3>Odontogramm Template:</h3>
						<img src="../../public/Odontogramm_template.png" alt="Odontogramm Tempplate">		
					<h4>Odontogramm Color Schema:</h4>
						<img src="../../public/Odontogramm_color_schema.png" alt="Odontogramm Color Schema">
					<h3>{{ $t('seventhSubCriteriaHealth') }}</h3>
						<li>Score 0: {{ $t('score0Health7') }}</li>
						<li>Score 2: {{ $t('score2Health7') }}</li>
				</p>
				<p v-if=" criteria === 'fourthCriteriaHealth'">
					<h3>{{ $t('eigthSubCriteriaHealth') }}</h3>
						<li>Score 0: {{ $t('score0Health8') }}</li>
						<li>Score 2: {{ $t('score2Health8') }}</li>
				</p>
				<p v-if=" criteria === 'fifthCriteriaHealth'">
					<h3>{{ $t('ninthSubCriteriaHealth') }}</h3>
						<li>Score 0: {{ $t('score0Health9') }}</li>
						<li>Score 2: {{ $t('score2Health9') }}</li>
					<h3>{{ $t('tenthSubCriteriaHealth') }}</h3>
						<li>Score 0: {{ $t('score0Health10') }}</li>
						<li>Score 2: {{ $t('score2Health10') }}</li>
					<h3>{{ $t('eleventhSubCriteriaHealth') }}</h3>
						<li>Score 0: {{ $t('score0Health11') }}</li>
						<li>Score 2: {{ $t('score2Health11') }}</li>
				</p>
				<p v-if=" criteria === 'sixthCriteriaHealth'">
					<h3>{{ $t('twelvthSubCriteriaHealth') }}</h3>
						<li>Score 0: {{ $t('score0Health12') }}</li>
						<li>Score 2: {{ $t('score2Health12') }}</li>
					<h3>{{ $t('thirteenthSubCriteriaHealth') }}</h3>
						<li>Score 0: {{ $t('score0Health13') }}</li>
						<li>Score 2: {{ $t('score2Health13') }}</li>
				</p>
				<!--<p v-if=" criteria === 'fourthCriteriaHealth'">
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
				</p>-->
			</ion-content>
		</ion-modal>
		<!-- End of Description of Criteria (User Manual) -->
		<!--Start of Scoring Description-->
		<ion-button v-if="criteria" fill="outline" @click="setOpenScoring(true)">{{ $t('ScoringDescription') }}</ion-button>

		<ion-modal :is-open="isOpenScoring">
			<ion-header>
				<ion-toolbar>
					<ion-title v-if=" criteria === 'firstCriteriaHealth'"
						>{{$t('firstCriteriaHealth')}}
					</ion-title>
					<ion-title v-else-if=" SubCriteria === 'secondCriteriaHealth'"
						>{{$t('secondCriteriaHealth')}}
					</ion-title>
					<ion-title v-else-if=" SubCriteria === 'thirdCriteriaHealth'"
						>{{$t('thirdCriteriaHealth')}}
					</ion-title>
					<ion-title v-else-if=" SubCriteria === 'fourthCriteriaHealth'"
						>{{$t('fourthCriteriaHealth')}}
					</ion-title>
					<ion-title v-else-if=" SubCriteria === 'fifthCriteriaHealth'"
						>{{$t('fifthCriteriaHealth')}}
					</ion-title>
					<ion-title v-else-if=" SubCriteria === 'sixthCriteriaHealth'"
						>{{$t('sixthCriteriaHealth')}}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenScoring(false)">{{ $t('close')}}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<p v-if=" criteria === 'firstCriteriaHealth'">
					<h2>{{ $t('firstSubCriteriaHealth') }}</h2>
					<h3>Score 1</h3>
					Verification of normal movements
					<h3>Score 3</h3>
					Evidence of any locomotive/floating abnormalities
				</p>
				<p v-if=" criteria === 'secondCriteriaHealth'">
					<h2>{{ $t('secondSubCriteriaHealth') }}</h2>
					<h3>Score 1</h3>
					Absence of eye lesions 
					<h3>Score 3</h3>
					Presence of eye lesions
					<h2>{{ $t('thirdSubCriteriaHealth') }}</h2>
					<h3>Score 1</h3>
					Normal response
					<h3>Score 3</h3>
					Evidence of any abnormalities
				</p>
				<p v-if=" criteria === 'thirdCriteriaHealth'">
					<h2>{{ $t('fourthSubCriteriaHealth') }}</h2>
					<h3>Score 1</h3>
					Absence of oral lesions or painful areas in the mouth (including teeth)
					on direct physical exam
					<h3>Score 3</h3>
					Presence of oral lesions or painful areas in the mouth (including teeth)
				</p>
				<p v-if=" criteria === 'fourthCriteriaHealth'">
					<h2>{{ $t('fifthSubCriteriaHealth') }}</h2>
					<h3>Score 1</h3>
					Absence of previous incidents on records during last three months
					<h3>Score 3</h3>
					Evidence of previous incidents on records during last three months
				</p>
				<p v-if=" criteria === 'fifthCriteriaHealth'">
					<h2>{{ $t('sixthSubCriteriaHealth') }}</h2>
					<h3>Score 1</h3>
					Absence of any signs or evidence of respiratory disease during direct physical exam
					<h3>Score 3</h3>
					Presence or signs of respiratory disease during direct physical exam
					<h2>{{ $t('seventhSubCriteriaHealth') }}</h2>
					<h3>Score 1</h3>
					 
					<h3>Score 3</h3>
					 
				</p>
				<p v-if=" criteria === 'sixthCriteriaHealth'">
					<h2>{{ $t('eigthSubCriteriaHealth') }}</h2>
					<h3>Score 1</h3>
					Absence of previous incidents on records during last three months
					<h3>Score 3</h3>
					Evidence of previous incidents on records during last three months
				</p>
					<!--<p v-if=" criteria === 'fourthCriteriaHealth'">
					<h2>{{ $t('eigthSubCriteriaHealth') }}</h2>
					<h3>Score 1</h3>
					Absence of previous incidents on records during last three months 
					<h3>Score 3</h3>
					Evidence of previous incidents on records during last three months 
				</p>
				<p v-if=" criteria === 'fifthCriteriaHealth'">
					<h2>{{ $t('ninthSubCriteriaHealth') }}</h2>
					<h3>Score 1</h3>
					Absence of any signs or evidence of respiratory disease during direct physical exam
					<h3>Score 3</h3>
					Presence or signs of respiratory disease during direct physical exam
					<h2>{{ $t('tenthSubCriteriaHealth') }}</h2>
					<h3>Score 1</h3>
					Absence of abnormalities
					<h3>Score 3</h3>
					Evidence of any abnormalities 
					<h2>{{ $t('eleventhSubCriteriaHealth') }}</h2>
					<h3>Score 1</h3>
					Absence of previous incidents on records during last three months
					<h3>Score 3</h3>
					Evidence of previous incidents on records during last three months 
				</p>
				<p v-if=" SubCriteria === 'sixthSubCriteriaHealth'">
					<h2>{{ $t('twelfthSubCriteriaHealth') }}</h2>
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
					<h2>{{ $t('thirteenthSubCriteriaHealth') }}</h2>
					Including complete haematology, biochemistry, ESR and fibrinogen
					determinations as well as inflammatory markers such us TWBC, WBCdiff,
					%Bands, %Ret, Hb, ALKP, ALB, FIB, IRON, ESR), biological data, or
					complementary diagnostic techniques (ultrasound, radiography, endoscopy,
					thermography, CT, microbiology, hormonal analysis, molecular techniques, etc.)
					<h3>Score 1</h3>
					Absence of previous signs/diseases on records during last three month
					<h3>Score 3</h3>
					Evidence of previous signs/diseases on records during last three months
				</p>-->
			</ion-content>
		</ion-modal>
		<!--End of Scoring Description-->
		<!-- Start of Checkboxes-->
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'firstCriteriaHealth'">
			<ion-card-title>{{$t('firstSubCriteriaHealth')}}</ion-card-title>
			<ion-list >
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[0][0]" @click="handleClick(0,0)">Score 0</ion-checkbox>
					</ion-item>
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[0][2]" @click="handleClick(0,2)">Score 2</ion-checkbox>
					</ion-item>
					<CheckComments @update-comment="updateNormalFloatabilityComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'firstCriteriaHealth'">
			<ion-card-title>{{$t('secondSubCriteriaHealth')}}</ion-card-title>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[1][0]" @click="handleClick(1,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[1][2]" @click="handleClick(1,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateNormalFloatabilityRecordsComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'secondCriteriaHealth'">
			<ion-card-title>{{$t('thirdSubCriteriaHealth')}}</ion-card-title>		
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[2][0]" @click="handleClick(2,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[2][2]" @click="handleClick(2,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateEyeLesionsComments"/>
				<!--<ion-item>
					<ion-label><br>Upload your eye photos here:</ion-label>
				</ion-item>
				<ion-item>
					<PhotoUpload @form-submitted="handleFormSubmittedEyePhoto"/>
				</ion-item>-->
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'secondCriteriaHealth'">
			<ion-card-title style="margin-bottom: 15px;">Upload your eye photos here</ion-card-title>
			<ion-item>
			<PhotoUpload @form-submitted="handleFormSubmittedEyePhoto"/>
			</ion-item>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'secondCriteriaHealth'">
			<ion-card-title>{{$t('fourthSubCriteriaHealth')}}</ion-card-title>		
			<ion-list >
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[3][0]" @click="handleClick(3,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[3][2]" @click="handleClick(3,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateVisualCuesComments"/>
				<ion-item>
				</ion-item>
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'secondCriteriaHealth'">
			<ion-card-title>{{$t('fifthSubCriteriaHealth')}}</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][0]" @click="handleClick(4,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][2]" @click="handleClick(4,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateEyeLesionsRecordsComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'thirdCriteriaHealth'">
			<ion-card-title>{{$t('sixthSubCriteriaHealth')}}</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[5][0]" @click="handleClick(5,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[5][2]" @click="handleClick(5,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateMouthExamComments"/>
				<!--<ion-item>
					<ion-label><br>Upload your teeth photos here:</ion-label>
				</ion-item>
				<ion-item style="display: flex; justify-content: center; align-items: center;">
					<PhotoUpload @form-submitted="handleFormSubmittedTeethPhoto"/>
				</ion-item>
				<ion-item>
					<ion-label><br>Upload your odontogramms here:</ion-label>
				</ion-item>
				<ion-item style="display: flex; flex-direction: column;">					
					<PhotoUpload @form-submitted="handleFormSubmittedOdontogrammPhoto"/>
				</ion-item>-->
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'thirdCriteriaHealth'">
			<ion-card-title style="margin-bottom: 15px;">Upload your teeth photos here</ion-card-title>
			<ion-item>
			<PhotoUpload @form-submitted="handleFormSubmittedTeethPhoto"/>
			</ion-item>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'thirdCriteriaHealth'">
			<ion-card-title>{{$t('seventhSubCriteriaHealth')}}</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[6][0]" @click="handleClick(6,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[6][2]" @click="handleClick(6,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateOralLesionsRecordsComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'thirdCriteriaHealth'">
			<ion-card-title style="margin-bottom: 15px;">Upload your odontogramms here</ion-card-title>
			<ion-item>
			<PhotoUpload @form-submitted="handleFormSubmittedOdontogrammPhoto"/>
			</ion-item>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'fourthCriteriaHealth'">
			<ion-card-title>{{$t('eigthSubCriteriaHealth')}}</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[7][0]" @click="handleClick(7,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[7][2]" @click="handleClick(7,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateGastricAbnormalityRecordsComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'fifthCriteriaHealth'">
			<ion-card-title>{{$t('ninthSubCriteriaHealth')}}</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[8][0]" @click="handleClick(8,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[8][2]" @click="handleClick(8,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateRespiratoryDiseaseComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'fifthCriteriaHealth'">
			<ion-card-title>{{$t('tenthSubCriteriaHealth')}}</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[9][0]" @click="handleClick(9,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[9][2]" @click="handleClick(9,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateForceExpirationComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'fifthCriteriaHealth'">
			<ion-card-title>{{$t('eleventhSubCriteriaHealth')}}</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[10][0]" @click="handleClick(10,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[10][2]" @click="handleClick(10,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateRespiratoryDiseaseRecordsComments"/>
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'sixthCriteriaHealth'">
			<ion-card-title>{{$t('twelvthSubCriteriaHealth')}}</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[11][0]" @click="handleClick(11,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[11][2]" @click="handleClick(11,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateMarksComments"/>
				<!--<ion-label><br>Upload your photos here:</ion-label>
				<ion-item>
					<PhotoUpload @form-submitted="handleFormSubmittedMarksPhoto"/>
				</ion-item>-->
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'sixthCriteriaHealth'">
			<ion-card-title style="margin-bottom: 15px;">Upload your marks photos here</ion-card-title>
			<ion-item>
			<PhotoUpload @form-submitted="handleFormSubmittedMarksPhoto"/>
			</ion-item>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'sixthCriteriaHealth'">
			<ion-card-title>{{$t('thirteenthSubCriteriaHealth')}}</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[12][0]" @click="handleClick(12,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[12][2]" @click="handleClick(12,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateExternalDiseaseComments"/>
			</ion-list>
		</ion-card>
	</ion-content>
	<!-- End of Checkboxes-->

	<!--Start of photo section-->
	<!--<ion-item v-if=" SubCriteria === 'thirdSubCriteriaHealth' || SubCriteria === 'sixthSubCriteriaHealth' || SubCriteria ==='twelfthSubCriteriaHealth'">
		<ion-thumbnail slot="start">
			<img :src="previewImageUrl" />
		</ion-thumbnail>
		<ion-button type="button" fill="clear" @click="takePhoto">
			<ion-icon slot="start" :icon="camera"></ion-icon>
			{{ $t('photo') }}
		</ion-button>
	</ion-item>-->
	<!--End of photo section-->

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
import {camera} from 'ionicons/icons';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import axios from 'axios';
import CheckComments from '@/components/CheckComments.vue';
import PhotoUpload from '@/components/PhotoUpload.vue';
import { useDolphinsStore }from '@/store/dolphinsStore';
import { useEvaluationHealthStore }from '@/store/evaluationHealthStore';
import { baseUrl } from '@/utils/baseUrl';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

let dataInBody; //Variable which gets saved in localstorage with either true or false, depending if data is in checkboxes or evaluationFeedingStore
const dolphinsStore = useDolphinsStore();
const evaluationHealthStore = useEvaluationHealthStore();

import {
	IonItem, IonList, IonSelect, IonCard, IonCardTitle,
	IonSelectOption, IonLabel, IonModal, IonHeader,
	IonToolbar, IonContent, IonTitle, IonButtons, IonFooter,
	IonButton, IonText, IonThumbnail, IonIcon, IonCheckbox, alertController
} from '@ionic/vue';


export default {
	components: {
		IonItem, IonList, IonSelect, IonSelectOption, IonFooter,
		IonModal, IonHeader, IonToolbar, IonContent,
		IonTitle, IonButtons, IonButton, CheckComments, PhotoUpload,
		IonIcon, IonCheckbox, IonCard, IonCardTitle
	},
	async mounted() {
		// This makes sure that the reference areas are updated while the component is
		// mounted. But only if there is internet connectivity. If not, the displayed
		// reference areas are the ones from the animalList.json
		//await dolphinsStore.fill();
		const dolphinsStore = useDolphinsStore();
		//evaluationHealthStore.resetBodies();
		// Now the fill method resets the bodies
		evaluationHealthStore.fill(dolphinsStore.dolphinList);
		// Reset here data while page is mounted
		localStorage.setItem('backButtonClicked', 'false');
		localStorage.setItem('dataInBody', 'false');
		localStorage.setItem('created_at', '');
		
		this.resetData();
	},
	data() {
		return {
			language: 'en',
			dolphinsStore: dolphinsStore,
			dolphinSelect: null as string | null,
			criteria: null as string | null,
			SubCriteria: '',
			firstlabel: this.$t('dolphin'),
			firstplaceholder: this.$t('selectDolphin'),
			firstcancelText: this.$t('cancelChoice'),
			secondlabel: this.$t('criteria'),
			secondplaceholder: this.$t('selectCriteria'),
			thirdlabel: this.$t('test'),
			thirdplaceholder: this.$t('selectTest'),
			isOpenManual: false,
			isOpenScoring: false,
			selectedOption: undefined,
			CheckboxArray: Array.from({ length: 13 }, () => Array(3).fill(false)),
			camera,
			previewImageUrl: '',
			dolphinList: [] as {name: string}[],
			urlPost: baseUrl + '/api/good_health',
			urlPostPhoto: baseUrl + '/api/photo',
			normal_floatability_comments: '',
			records_normal_floatability_comments: '',
			inspection_eye_lesions_comments: '',
			response_visual_cues_comments: '',
			records_eye_lesions_comments: '',
			mouth_exam_comments: '',
			records_oral_lesions_comments: '',
			records_gastric_abnormality_comments: '',
			inspection_respiratory_comments: '',
			force_expiration_comments: '',
			records_respiratory_disease_comments: '',
			inspection_marks_comments: '',
			records_external_disease_comments: '',
			
			formData: [],
			sessionStorage: {
				photo_type: '',
				eye_photo_path: '',
				teeth_photo_path: '',
				odontogramm_photo_path: '',
				marks_photo_path: '',
				file_path: '',
				dolphin_name: '',
			},
		};
	},

	methods: {
        setOpenManual(isOpen: boolean) {
            this.isOpenManual = isOpen;
        },
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
		async resetData() {
			console.log('resetData() called');
			// Reset the checkboxes
			for(let i = 0; i <= 12; i++){
				for(let j = 0; j < 3; j++){
					if (this.CheckboxArray[i][j] === true){
						this.CheckboxArray[i][j] = false;
					}
				}
			}
			// Reset comments
			this.normal_floatability_comments = '';
			this.records_normal_floatability_comments = '';
			this.inspection_eye_lesions_comments = '';
			this.response_visual_cues_comments = '';
			this.records_eye_lesions_comments = '';
			this.mouth_exam_comments = '';
			this.records_oral_lesions_comments = '';
			this.records_gastric_abnormality_comments = '';
			this.inspection_respiratory_comments = '';
			this.force_expiration_comments = '';
			this.records_respiratory_disease_comments = '';
			this.inspection_marks_comments = '';
			this.records_external_disease_comments = '';
		},
		handleFormSubmittedEyePhoto(files: File[]) {
		if (files && this.dolphinSelect != '') {
			
			this.sessionStorage = {
				photo_type: '',
				eye_photo_path: '',
				teeth_photo_path: '',
				odontogramm_photo_path: '',
				marks_photo_path: '',
				file_path: '',
				dolphin_name: '',
			};
			console.log('Form Data accessed in HealthCheckCriteriaSelector.vue:');
			const newFormData = new FormData();
			if(this.dolphinSelect != ''){
				newFormData.append('dolphin_name', this.dolphinSelect || ''); // Append the dolphin name with a default value of an empty string
			}
			newFormData.append('photo_type', 'eye'); //Append the photo type
			// Then append the rest of the fields
			
			console.log('Number of pictures: ' + files.length);

			for (let i = 0; i < files.length; i++) {
				console.log(files[i]);
				newFormData.append('files', files[i]);
			}
			this.formData.push(newFormData);
			console.log(...this.formData);
			}
		},
		handleFormSubmittedOdontogrammPhoto(files: File[]) {
		if (files && this.dolphinSelect != '') {
			
			this.sessionStorage = {
				photo_type: '',
				eye_photo_path: '',
				teeth_photo_path: '',
				odontogramm_photo_path: '',
				marks_photo_path: '',
				file_path: '',
				dolphin_name: '',
			};
			console.log('Form Data accessed in HealthCheckCriteriaSelector.vue:');
			const newFormData = new FormData();
			if(this.dolphinSelect != ''){
				newFormData.append('dolphin_name', this.dolphinSelect || ''); // Append the dolphin name with a default value of an empty string
			}
			newFormData.append('photo_type', 'odontogramm'); //Append the photo type
			// Then append the rest of the fields
			
			console.log('Number of pictures: ' + files.length);

			for (let i = 0; i < files.length; i++) {
				console.log(files[i]);
				newFormData.append('files', files[i]);
			}
			this.formData.push(newFormData);
			console.log(...this.formData);
			}
		},
		handleFormSubmittedTeethPhoto(files: File[]) {
			if (files && this.dolphinSelect != '') {
			
			this.sessionStorage = {
				photo_type: '',
				eye_photo_path: '',
				teeth_photo_path: '',
				odontogramm_photo_path: '',
				marks_photo_path: '',
				file_path: '',
				dolphin_name: '',
			};
			console.log('Form Data accessed in HealthCheckCriteriaSelector.vue:');
			const newFormData = new FormData();
			if(this.dolphinSelect != ''){
				newFormData.append('dolphin_name', this.dolphinSelect || ''); // Append the dolphin name with a default value of an empty string
			}
			newFormData.append('photo_type', 'teeth'); //Append the photo type
			// Then append the rest of the fields
			
			console.log('Number of pictures: ' + files.length);

			for (let i = 0; i < files.length; i++) {
				console.log(files[i]);
				newFormData.append('files', files[i]);
			}
			this.formData.push(newFormData);
			}
		},
		handleFormSubmittedMarksPhoto(files: File[]) {
		if (files && this.dolphinSelect != '') {
			
			this.sessionStorage = {
				photo_type: '',
				eye_photo_path: '',
				teeth_photo_path: '',
				odontogramm_photo_path: '',
				marks_photo_path: '',
				file_path: '',
				dolphin_name: '',
			};
			console.log('Form Data accessed in HealthCheckCriteriaSelector.vue:');
			const newFormData = new FormData();
			if(this.dolphinSelect != ''){
				newFormData.append('dolphin_name', this.dolphinSelect || ''); // Append the dolphin name with a default value of an empty string
			}
			newFormData.append('photo_type', 'marks'); //Append the photo type
			// Then append the rest of the fields
			
			console.log('Number of pictures: ' + files.length);

			for (let i = 0; i < files.length; i++) {
				console.log(files[i]);
				newFormData.append('files', files[i]);
			}
			this.formData.push(newFormData);
			}
		},
		async setupSessionStorage() {
			// We have to send a req.body to set up the session storage in backend
			// Even though the req.body is not being used in the backend. I don´t
			// know why, just leave it there, otherwise req.session will not work
			// in the backend
			await axios
				.post(baseUrl + '/api/setup_session_storage', this.sessionStorage, { withCredentials: true })
				.then((response) => {
				console.log('Response setup session storage:', response.data);
				})
				.catch((error) => {
				console.error('Error:', error);
				});
		},
		// Method to collect the checked checkboxes and give request Body the scores
		storeCheckedValues() {
			for(let k = 0; k < evaluationHealthStore.requestBodiesHealth.length; k++){
				if(this.dolphinSelect === evaluationHealthStore.requestBodiesHealth[k]["dolphin_name"]) {
					if (this.dolphinSelect!== null){
						evaluationHealthStore.requestBodiesHealth[k]["dolphin_name"] = this.dolphinSelect;
					}
					for(let i = 0; i < this.CheckboxArray.length; i++){
						for(let j = 0; j < this.CheckboxArray[i].length; j++){
							if (this.CheckboxArray[i][j] === true && i === 0){
								evaluationHealthStore.requestBodiesHealth[k]["normal_floatability"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 1){
								evaluationHealthStore.requestBodiesHealth[k]["records_normal_floatability"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 2){
								evaluationHealthStore.requestBodiesHealth[k]["inspection_eye_lesions"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 3){
								evaluationHealthStore.requestBodiesHealth[k]["response_visual_cues"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 4){
								evaluationHealthStore.requestBodiesHealth[k]["records_eye_lesions"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 5){
								evaluationHealthStore.requestBodiesHealth[k]["mouth_exam"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 6){
								evaluationHealthStore.requestBodiesHealth[k]["records_oral_lesions"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 7){
								evaluationHealthStore.requestBodiesHealth[k]["records_gastric_abnormality"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 8){
								evaluationHealthStore.requestBodiesHealth[k]["inspection_respiratory"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 9){
								evaluationHealthStore.requestBodiesHealth[k]["force_expiration"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 10){
								evaluationHealthStore.requestBodiesHealth[k]["records_respiratory_disease"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 11){
								evaluationHealthStore.requestBodiesHealth[k]["inspection_marks"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 12){
								evaluationHealthStore.requestBodiesHealth[k]["records_external_disease"] = j;
							}
						}
					}
					evaluationHealthStore.requestBodiesHealth[k]["normal_floatability_comments"] = this.normal_floatability_comments;
					evaluationHealthStore.requestBodiesHealth[k]["records_normal_floatability_comments"] = this.records_normal_floatability_comments;
					evaluationHealthStore.requestBodiesHealth[k]["inspection_eye_lesions_comments"] = this.inspection_eye_lesions_comments;
					evaluationHealthStore.requestBodiesHealth[k]["response_visual_cues_comments"] = this.response_visual_cues_comments;
					evaluationHealthStore.requestBodiesHealth[k]["records_eye_lesions_comments"] = this.records_eye_lesions_comments;
					evaluationHealthStore.requestBodiesHealth[k]["mouth_exam_comments"] = this.mouth_exam_comments;
					evaluationHealthStore.requestBodiesHealth[k]["records_oral_lesions_comments"] = this.records_oral_lesions_comments;
					evaluationHealthStore.requestBodiesHealth[k]["records_gastric_abnormality_comments"] = this.records_gastric_abnormality_comments;
					evaluationHealthStore.requestBodiesHealth[k]["inspection_respiratory_comments"] = this.inspection_respiratory_comments;
					evaluationHealthStore.requestBodiesHealth[k]["force_expiration_comments"] = this.force_expiration_comments;
					evaluationHealthStore.requestBodiesHealth[k]["records_respiratory_disease_comments"] = this.records_respiratory_disease_comments;
					evaluationHealthStore.requestBodiesHealth[k]["inspection_marks_comments"] = this.inspection_marks_comments;
					evaluationHealthStore.requestBodiesHealth[k]["records_external_disease_comments"] = this.records_external_disease_comments;

					
					if(localStorage.getItem('created_at') !== "") {
						evaluationHealthStore.requestBodiesHealth[k]["created_at"] = localStorage.getItem('created_at') as string;
					}
				}
			}
			// Reset the data in checkboxes and comments
			this.resetData();
			// There is non-saved data (not sent to backend yet)
			dataInBody = true;
			localStorage.setItem('dataInBody', dataInBody.toString());
		},
		//Methods to update the comments
		updateNormalFloatabilityComments(comment: string) {
			this.normal_floatability_comments = comment;
		},
		updateNormalFloatabilityRecordsComments(comment: string) {
			this.records_normal_floatability_comments = comment;
		},
		updateEyeLesionsComments(comment: string) {
			this.inspection_eye_lesions_comments = comment;
		},
		updateVisualCuesComments(comment: string) {
			this.response_visual_cues_comments = comment;
		},
		updateEyeLesionsRecordsComments(comment: string) {
			this.records_eye_lesions_comments = comment;
		},
		updateMouthExamComments(comment: string) {
			this.mouth_exam_comments = comment;
		},
		updateOralLesionsRecordsComments(comment: string) {
			this.records_oral_lesions_comments = comment;
		},
		updateGastricAbnormalityRecordsComments(comment: string) {
			this.records_gastric_abnormality_comments = comment;
		},
		updateRespiratoryDiseaseComments(comment: string) {
			this.inspection_respiratory_comments = comment;
		},
		updateForceExpirationComments(comment: string) {
			this.force_expiration_comments = comment;
		},
		updateRespiratoryDiseaseRecordsComments(comment: string) {
			this.records_respiratory_disease_comments = comment;
		},
		updateMarksComments(comment: string) {
			this.inspection_marks_comments = comment;
		},
		updateExternalDiseaseComments(comment: string) {
			this.records_external_disease_comments = comment;
		},
		//Method to show the alert to confirm the test date
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
			//const confirmed = confirm(this.$t('savingDataNext'));
     		const confirmed = true;
			if (confirmed) {
				//await this.photoUpload();
				await this.confirmTestDate();
				await this.storeCheckedValues();
				// Flag to only show network error alert once instead of several times after another
				let alertShown = false;
				console.log(this.CheckboxArray);
				for(let i = 0; i < evaluationHealthStore.requestBodiesHealth.length; i++){
					console.log(evaluationHealthStore.requestBodiesHealth[i]["dolphin_name"]);
					// Setting up session storage
					await this.setupSessionStorage();
					await this.photoUpload(evaluationHealthStore.requestBodiesHealth[i]["dolphin_name"]);
					console.log('This is sent to backend: ', evaluationHealthStore.requestBodiesHealth[i]);
					await axios
							.post(this.urlPost, evaluationHealthStore.requestBodiesHealth[i], { withCredentials: true })
							.then((response) => {
								console.log('Response:', response.data);
								if (i === evaluationHealthStore.requestBodiesHealth.length - 1){
									const targetUrl = '/detailHealth'; //'/folder/Evaluate';
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
									//evaluationHealthStore.resetBodies();
									// Now the fill method resets the bodies
									evaluationHealthStore.fill(dolphinsStore.dolphinList);
									this.dolphinSelect = null;
									this.criteria = null;
									localStorage.setItem('created_at', '');
								}
							})
							.catch((error) => {
								console.error('Error:', error.response.data);
								const targetUrl = `/detailHealth`;
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
				////////////////////////////////////////////////////////////////
				// TEST for the photo upload: Can a single button click call two
				// different axios calls with different api routes and different
				// req.headers?
				// call function submitForm which handles the photo upload
				//submitForm();
			}
			this.formData = []; //Reset after upload
		},
		
/*
	submitForm(e, test_date, test_name) {
		// prevents the default behavior of the browser, which is to perform a full page reload.
		// I have no idea wether you need this in ionic.
		e.preventDefault();

		// gets the form input html element.
		const files = document.getElementById('files');

		// !!! The code above is needed for plain HTML and JS,
		// Maybe in Ionic you can also do it but I'm not sure...
		// Please use corresponding methods in Ionic.

		// create a new FormData object, you can learn more here
		// https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
		const formData = new FormData();

		// in case of multiple photos, use a loop here to add all photos.
		// files.files: first files is the html element,
		// second files is the name for that html element
		// The html element is like:
		// <input id="files" name="files" type="file" multiple />
		for (let i = 0; i < files.files.length; i++) {
			formData.append('files', files.files[i]);
		}

		// Give test_date and test_name for this picture!
		formData.append('test_date', test_date);
		formData.append('test_name', test_name);

		axios
			.post(baseUrl + '/api/photo', formData, {
				headers: {
					// !!! The content-type must be multipart/form-date
					// otherwise errors arise
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				console.log(response);
				if (response.status === 201) {
					// do something after uploading successfully
					console.log('success!');
				}
			})
			.catch((error) => {
				// error handling here
				console.log(error);
			});
	},*/

//	
// End of TEST for photo upload
////////////////////////////////////////////////////////////////////////
		
	async confirmRefresh() {
		const confirmed = true; //confirm(this.$t('savingDataNext'));
     	if (confirmed) {
			// Upload photos if there are any in formData
			//await this.photoUpload();

			// Store the checked scoring values
			this.storeCheckedValues();
			console.log(evaluationHealthStore.requestBodiesHealth)
			
			toast.success('Saved temporarily. Click \'Finish Tests\' in the end!', {
				autoClose: 1000,
			});

			// Doing the same dolphinSelect with the next criteria in the list:
			switch (this.criteria) {
					case 'firstCriteriaHealth':
						this.criteria = 'secondCriteriaHealth';
						break;
					case 'secondCriteriaHealth':
						this.criteria = 'thirdCriteriaHealth';
						break;
					case 'thirdCriteriaHealth':
						this.criteria = 'fourthCriteriaHealth';
						break;
					case 'fourthCriteriaHealth':
						this.criteria = 'firstCriteriaHealth';
						break;
					default:
						this.criteria = 'firstCriteriaHealth';
				}
			
			//this.dolphinSelect = null;
			//this.criteria = null;
			const currentPath = this.$route.path;
			const targetUrl = `/detailHealth`;
			this.$router.push(targetUrl);
			}	
    	},
		async photoUpload(dolphin_name: string) {
		// This method is called for one dolphin at a time
		// Check if there is a photo to upload
		if(this.formData != null) {
		// Find the FormData object with the desired dolphin_name
		console.log('Length formData array: ', this.formData.length);
		let desiredFormData = [];
		for (let i = 0; i < this.formData.length; i++) {
		if (this.formData[i].get('dolphin_name') === dolphin_name) {
			if(desiredFormData.length === 0)
			{
				//If desiredFormData doesn't exist yet, create a new array with the form data
				desiredFormData[0] = this.formData[i];
			}else
			{
				//If desiredFormData already exists for this dolphin, push the new form data to the array desiredFormData
				desiredFormData.push(this.formData[i]);
				console.log('Found the desired form data: ', ...desiredFormData);
			}
			//break;
		}
		}

		//const desiredFormData = this.formData.find(formData => formData.get('dolphin_name') === dolphin_name);
		
		console.log('Desired form data:', desiredFormData);
		if (desiredFormData.length != 0) {
		console.log('Form Data accessed in HealthCheckCriteriaSelector.vue');
		console.log(...desiredFormData);
		
		for(let i = 0; i < desiredFormData.length; i++){
			// Send the photo to the server
			await axios
			.post(this.urlPostPhoto, desiredFormData[i], {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			withCredentials: true,
			})
			.then((response) => {
			console.log('Response:', response.data);
			})
			.catch((error) => {
			console.error('Error:', error);
			});
		}
      //Reset the form data
      desiredFormData = []; 
      //console.log('Resetted form data: '+ this.formData);
    }
  	}
		},
		/*
		async takePhoto(){
			const photo = await Camera.getPhoto({
				resultType: CameraResultType.Uri,
				source: CameraSource.Camera,
				quality: 60
			});
			if (photo.webPath !== undefined) {
				this.previewImageUrl = photo.webPath;
			}	
		}*/
        /*emitSubCriteriaUpdated() {
            const SubCriteria = this.SubCriteria;
            
            this.$emit('SubCriteria-updated', SubCriteria);
        }*/
    }
};

</script>

<style scoped>
ion-item {
	margin: 5px;
	display: flex;
	flex-direction: column;					
}
ion-card {
	margin: 5px 15px;
}

</style>
```