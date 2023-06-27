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
				<ion-select-option value="dolphin5">{{
					$t('dolphin5')
				}}</ion-select-option>
				<ion-select-option value="dolphin6">{{
					$t('dolphin6')
				}}</ion-select-option>
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
				<ion-select-option value="firstCriteriaBehaviour">{{
					$t('firstCriteriaBehaviour')
				}}</ion-select-option>
				<ion-select-option value="secondCriteriaBehaviour">{{
					$t('secondCriteriaBehaviour')
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
				<ion-select-option v-if=" criteria === 'firstCriteriaBehaviour'" value="firstSubcriteriaBehaviour">{{
					$t('firstSubcriteriaBehaviour')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'firstCriteriaBehaviour'" value="secondSubcriteriaBehaviour">{{
					$t('secondSubcriteriaBehaviour')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'firstCriteriaBehaviour'" value="thirdSubcriteriaBehaviour">{{
					$t('thirdSubcriteriaBehaviour')
				}}</ion-select-option>
                <ion-select-option v-if=" criteria === 'firstCriteriaBehaviour'" value="fourthSubcriteriaBehaviour">{{
					$t('fourthSubcriteriaBehaviour')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'firstCriteriaBehaviour'" value="fifthSubcriteriaBehaviour">{{
					$t('fifthSubcriteriaBehaviour')
				}}</ion-select-option>
				<ion-select-option v-if=" criteria === 'secondCriteriaBehaviour'" value="sixthSubcriteriaBehaviour">{{
					$t('sixthSubcriteriaBehaviour')
				}}</ion-select-option>
                <ion-select-option v-if=" criteria === 'secondCriteriaBehaviour'" value="seventhSubcriteriaBehaviour">{{
					$t('seventhSubcriteriaBehaviour')
				}}</ion-select-option>
                <ion-select-option v-if=" criteria === 'secondCriteriaBehaviour'" value="eigthSubcriteriaBehaviour">{{
					$t('eigthSubcriteriaBehaviour')
				}}</ion-select-option>
                <ion-select-option v-if=" criteria === 'secondCriteriaBehaviour'" value="ninthSubcriteriaBehaviour">{{
					$t('ninthSubcriteriaBehaviour')
				}}</ion-select-option>
                <ion-select-option v-if=" criteria === 'secondCriteriaBehaviour'" value="tenthSubcriteriaBehaviour">{{
					$t('tenthSubcriteriaBehaviour')
				}}</ion-select-option>
                <ion-select-option v-if=" criteria === 'secondCriteriaBehaviour'" value="eleventhSubcriteriaBehaviour">{{
					$t('eleventhSubcriteriaBehaviour')
				}}</ion-select-option>
                <ion-select-option v-if=" criteria === 'secondCriteriaBehaviour'" value="twelfthSubcriteriaBehaviour">{{
					$t('twelfthSubcriteriaBehaviour')
				}}</ion-select-option>
                <ion-select-option v-if=" criteria === 'secondCriteriaBehaviour'" value="thirteenthSubcriteriaBehaviour">{{
					$t('thirteenthSubcriteriaBehaviour')
				}}</ion-select-option>
                <ion-select-option v-if=" criteria === 'secondCriteriaBehaviour'" value="fourteenthSubcriteriaBehaviour">{{
					$t('fourteenthSubcriteriaBehaviour')
				}}</ion-select-option>
                <ion-select-option v-if=" criteria === 'secondCriteriaBehaviour'" value="fifteenthSubcriteriaBehaviour">{{
					$t('fifteenthSubcriteriaBehaviour')
				}}</ion-select-option>
			</ion-select>
		</ion-item>
	</ion-list>
	<!-- End of Criteria Selector -->

	<!-- Description of Criteria (UserManual) -->
	<ion-button fill ="outline" @click="setOpenManual(true)">{{ $t('userManual') }}</ion-button>

    <ion-modal :is-open="isOpenManual">
    	<ion-header>
			<ion-toolbar>
				<ion-title v-if=" subcriteria === 'firstSubcriteriaBehaviour'"
					>{{$t('firstSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'secondSubcriteriaBehaviour'"
					>{{$t('secondSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'thirdSubcriteriaBehaviour'"
					>{{$t('thirdSubcriteriaBehaviour')}}
				</ion-title>
                <ion-title v-else-if=" subcriteria === 'fourthSubcriteriaBehaviour'"
					>{{$t('fourthSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'fifthSubcriteriaBehaviour'"
					>{{$t('fifthSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'sixthSubcriteriaBehaviour'"
					>{{$t('sixthSubcriteriaBehaviour')}}
				</ion-title>
                <ion-title v-if=" subcriteria === 'seventhSubcriteriaBehaviour'"
					>{{$t('seventhSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'eigthSubcriteriaBehaviour'"
					>{{$t('eigthSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'ninthSubcriteriaBehaviour'"
					>{{$t('ninthSubcriteriaBehaviour')}}
				</ion-title>
                <ion-title v-else-if=" subcriteria === 'tenthSubcriteriaBehaviour'"
					>{{$t('tenthSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'eleventhSubcriteriaBehaviour'"
					>{{$t('eleventhSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'twelfthSubcriteriaBehaviour'"
					>{{$t('twelfthSubcriteriaBehaviour')}}
				</ion-title>
                <ion-title v-else-if=" subcriteria === 'thirteenthSubcriteriaBehaviour'"
					>{{$t('thirteenthSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'fourteenthSubcriteriaBehaviour'"
					>{{$t('fourteenthSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'fifteenthSubcriteriaBehaviour'"
					>{{$t('fifteenthSubcriteriaBehaviour')}}
				</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="setOpenManual(false)">{{ $t('close')}}</ion-button>
				</ion-buttons>
			</ion-toolbar>
      	</ion-header>
      	<ion-content class="ion-padding">
			<p v-if=" subcriteria === 'firstSubcriteriaBehaviour'">
                <h3>Environmental enrichment program</h3>
                Assess if your environmental enrichment program follows the EAAM Standards & Guidelines.
			</p>
			<p v-if=" subcriteria === 'secondSubcriteriaBehaviour'">
                <h3>Methods behavioral observations</h3>
                1. Observations should be conducted on 5 days within an 8-day period, ideally including (1) weekend day(s).
                2. Observation duration: 3x 10 min per day (morning, noon, and afternoon) with a 5-minute interval that allows the dolphins to habituate to the presence of the observer.
                3. Modified all occurrence sampling (see Appendix) allows to assess presence/absence as well as the frequency of each behavior (that can late be used to calculate activity budgets in % for each animal).
            </p>
            <p v-if=" subcriteria === 'thirdSubcriteriaBehaviour'">
                <h3>Methods behavioral observations</h3>
                1. Observations should be conducted on 5 days within an 8-day period, ideally including (1) weekend day(s).
                2. Observation duration: 3x 10 min per day (morning, noon, and afternoon) with a 5-minute interval that allows the dolphins to habituate to the presence of the observer.
                3. Modified all occurrence sampling (see Appendix) allows to assess presence/absence as well as the frequency of each behavior (that can late be used to calculate activity budgets in % for each animal).
            </p>
			<p v-if=" subcriteria === 'fourthSubcriteriaBehaviour'">
                <h3>Methods behavioral observations</h3>
                1. Observations should be conducted on 5 days within an 8-day period, ideally including (1) weekend day(s).
                2. Observation duration: 3x 10 min per day (morning, noon, and afternoon) with a 5-minute interval that allows the dolphins to habituate to the presence of the observer.
                3. Modified all occurrence sampling (see Appendix) allows to assess presence/absence as well as the frequency of each behavior (that can late be used to calculate activity budgets in % for each animal).
            </p>
            <p v-if=" subcriteria === 'fifthSubcriteriaBehaviour'">
                <h3>Absence of stereotypic behaviors</h3>
                All stereotypic behavior types mentioned in the welfare tool (displacement and oral stereotypic behaviors, repetitive body movements without displacement, excessive self-grooming behavior, and regurgitation/reingestion) should be assessed using the modified all occurrence sampling protocol.
            </p>
			<p v-if=" subcriteria === 'sixthSubcriteriaBehaviour'">
                <h3>Absence of stereotypic behaviors</h3>
                All stereotypic behavior types mentioned in the welfare tool (displacement and oral stereotypic behaviors, repetitive body movements without displacement, excessive self-grooming behavior, and regurgitation/reingestion) should be assessed using the modified all occurrence sampling protocol.
            </p>
            <p v-if=" subcriteria === 'seventhSubcriteriaBehaviour'">
                <h3>Absence of stereotypic behaviors</h3>
                All stereotypic behavior types mentioned in the welfare tool (displacement and oral stereotypic behaviors, repetitive body movements without displacement, excessive self-grooming behavior, and regurgitation/reingestion) should be assessed using the modified all occurrence sampling protocol.
            </p>
            <p v-if=" subcriteria === 'eigthSubcriteriaBehaviour'">
                <h3>Absence of stereotypic behaviors</h3>
                All stereotypic behavior types mentioned in the welfare tool (displacement and oral stereotypic behaviors, repetitive body movements without displacement, excessive self-grooming behavior, and regurgitation/reingestion) should be assessed using the modified all occurrence sampling protocol.
            </p>
            <p v-if=" subcriteria === 'ninthSubcriteriaBehaviour'">
                <h3>Absence of stereotypic behaviors</h3>
                All stereotypic behavior types mentioned in the welfare tool (displacement and oral stereotypic behaviors, repetitive body movements without displacement, excessive self-grooming behavior, and regurgitation/reingestion) should be assessed using the modified all occurrence sampling protocol.
            </p>
            <p v-if=" subcriteria === 'tenthSubcriteriaBehaviour'">
                <h3>Absence of stereotypic behaviors</h3>
                All stereotypic behavior types mentioned in the welfare tool (displacement and oral stereotypic behaviors, repetitive body movements without displacement, excessive self-grooming behavior, and regurgitation/reingestion) should be assessed using the modified all occurrence sampling protocol.
            </p>
            <p v-if=" subcriteria === 'eleventhSubcriteriaBehaviour'">
                <h3>Absence of receiving aggressive behaviors causing negative consequences</h3>
                Using the attached template (see Appendix) and preferably using photos taken of each body side (back, belly, left & right side) of each animal, rake marks (social-related marks) should be drawn into the dolphin silhouettes. In doing so, over time, one can easily access if and to what extent a dolphin receives aggressive behavior.
            </p>
            <p v-if=" subcriteria === 'twelfthSubcriteriaBehaviour'">
                <h3>Rake marks (social-related marks)</h3>
                Using the attached template (see Appendix) and preferably using photos taken of each body side (back, belly, left & right side) of each animal, rake marks (social-related marks) should be drawn into the dolphin silhouettes. In doing so, over time, one can easily access if and to what extent a dolphin receives aggressive behavior.
            </p>
            <p v-if=" subcriteria === 'thirteenthSubcriteriaBehaviour'">
            </p>
            <p v-if=" subcriteria === 'fourteenthSubcriteriaBehaviour'">
                <h3>Evidence of social isolation</h3>
                Use trainer interviews (ask them about their observations during each day) if the e.g., the presence of other animals lead to the displacement of one animal from certain pool areas, etc., during the last three months.
            </p>
            <p v-if=" subcriteria === 'fifteenthSubcriteriaBehaviour'">
                <h3>Evidence of avoidance of certain pool areas</h3>
                Use trainer interviews to assess if a dolphin showed active avoidance of certain pool areas during the last 3 months.
            </p>
      	</ion-content>
    </ion-modal>
	<!-- End of Description of Criteria (UserManual)-->
	<!--Start of Scoring Description-->
	<ion-button fill ="outline" @click="setOpenScoring(true)">{{ $t('ScoringDescription') }}</ion-button>

    <ion-modal :is-open="isOpenScoring">
    	<ion-header>
			<ion-toolbar>
				<ion-title v-if=" subcriteria === 'firstSubcriteriaBehaviour'"
					>{{$t('firstSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'secondSubcriteriaBehaviour'"
					>{{$t('secondSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'thirdSubcriteriaBehaviour'"
					>{{$t('thirdSubcriteriaBehaviour')}}
				</ion-title>
                <ion-title v-else-if=" subcriteria === 'fourthSubcriteriaBehaviour'"
					>{{$t('fourthSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'fifthSubcriteriaBehaviour'"
					>{{$t('fifthSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'sixthSubcriteriaBehaviour'"
					>{{$t('sixthSubcriteriaBehaviour')}}
				</ion-title>
                <ion-title v-else-if=" subcriteria === 'seventhSubcriteriaBehaviour'"
					>{{$t('seventhSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'eigthSubcriteriaBehaviour'"
					>{{$t('eigthSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'ninthSubcriteriaBehaviour'"
					>{{$t('ninthSubcriteriaBehaviour')}}
				</ion-title>
                <ion-title v-else-if=" subcriteria === 'tenthSubcriteriaBehaviour'"
					>{{$t('tenthSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'eleventhSubcriteriaBehaviour'"
					>{{$t('eleventhSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'twelfthSubcriteriaBehaviour'"
					>{{$t('twelfthSubcriteriaBehaviour')}}
				</ion-title>
                <ion-title v-else-if=" subcriteria === 'thirteenthSubcriteriaBehaviour'"
					>{{$t('thirteenthSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'fourteenthSubcriteriaBehaviour'"
					>{{$t('fourteenthSubcriteriaBehaviour')}}
				</ion-title>
				<ion-title v-else-if=" subcriteria === 'fifteenthSubcriteriaBehaviour'"
					>{{$t('fifteenthSubcriteriaBehaviour')}}
				</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="setOpenScoring(false)">{{ $t('close')}}</ion-button>
				</ion-buttons>
			</ion-toolbar>
      	</ion-header>
      	<ion-content class="ion-padding">
			<p v-if=" subcriteria === 'firstSubcriteriaBehaviour'">
				<h3>Score 1</h3>
				NO/NO: No enrichment program

				<h3>Score 2</h3>
				YES/NO: Presence of enrichment program according to EAAM S&Gs but no  achievement of enrichment goals; presence of enrichment program but not in fulfillment of the EAAM S&Gs

				<h3>Score 3</h3>
				YES/YES: Presence of enrichment program according to EAAm S&Gs and the display of exploratory behaviors as planned in goal-orientated EP, EP needs to be evaluated against set goals

        	</p>
			<p v-if=" subcriteria === 'secondSubcriteriaBehaviour'">
				<h3>Score 1</h3>
				Dolphins do not display affiliative behaviors (e.g. pair swimming, flipper rubbing, etc.) during observations according to attached protocol

				<h3>Score 3</h3>
				Dolphins display affiliative behaviors (e.g. pair swimming, flipper rubbing, etc.) during observations according to attached protocol

        	</p>
            <p v-if=" subcriteria === 'thirdSubcriteriaBehaviour'">
				<h3>Score 1</h3>
				Dolphins do not display play behavior (social play, bubble ring play, object play) during observations according to attached protocol

				<h3>Score 3</h3>
				Dolphins display play behavior (social play, bubble ring play, object play) during observations according to attached protocol

        	</p>
            <p v-if=" subcriteria === 'fourthSubcriteriaBehaviour'">
				<h3>Score 1</h3>
				Dolphins do not display socio-sexual interactions (e.g. petting, goosing, etc.) during observations according to attached protocol
				<h3>Score 3</h3>
				Dolphins display socio-sexual interactions (e.g. petting, goosing, etc.) during observations according to attached protocol
        	</p>
            <p v-if=" subcriteria === 'fifthSubcriteriaBehaviour'">
				<h3>Score 1</h3>
				Presence of any inappropriate maternal behavior towards the calf
				<h3>Score 3</h3>
				Absence of inappropriate maternal behavior towards the calf 
        	</p>
			<p v-if=" subcriteria === 'sixthSubcriteriaBehaviour'">
				<h3>Score 1</h3>
				Dolphin shows the behavior
				<h3>Score 3</h3>
				Dolphin shows no evidence of this behavior
        	</p>
            <p v-if=" subcriteria === 'seventhSubcriteriaBehaviour'">
				<h3>Score 1</h3>
				Dolphin shows the behavior
				<h3>Score 3</h3>
				Dolphin shows no evidence of this behavior
        	</p>
            <p v-if=" subcriteria === 'eigthSubcriteriaBehaviour'">
				<h3>Score 1</h3>
				Dolphin shows the behavior
				<h3>Score 3</h3>
				Dolphin shows no evidence of this behavior
        	</p>
            <p v-if=" subcriteria === 'ninthSubcriteriaBehaviour'">
				<h3>Score 1</h3>
				Dolphin shows the behavior
				<h3>Score 3</h3>
				Dolphin shows no evidence of this behavior
        	</p>
			<p v-if=" subcriteria === 'tenthSubcriteriaBehaviour'">
				<h3>Score 1</h3>
				Dolphin shows the behavior
				<h3>Score 3</h3>
				Dolphin shows no evidence of this behavior
        	</p>
            <p v-if=" subcriteria === 'eleventhSubcriteriaBehaviour'">
				<h3>Score 1</h3>
				Dolphin receives aggressive behavior (e.g. biting, hitting, slapping) during observations according to attached protocol

				<h3>Score 3</h3>
				Dolphin does not receive aggressive behavior (e.g. biting, hitting, slapping) during observations according to attached protocol

        	</p>
            <p v-if=" subcriteria === 'twelfthSubcriteriaBehaviour'">
				<h3>Score 1</h3>
				> 20 % new rake marks
				<h3>Score 2</h3>
				15-20 % new rake marks and > 30 % old wounds
				<h3>Score 3</h3>
				0-15 % new rake marks and &lt; 30 % old wounds
        	</p>
            <p v-if=" subcriteria === 'thirteenthSubcriteriaBehaviour'">
				<h3>Score 1</h3>
				Dolphin displays aggressive behavior (e.g. biting, hitting, slapping) during observations according to attached protocol
				<h3>Score 3</h3>
				Dolphin does not display aggressive behavior (e.g. biting, hitting, slapping) during observations according to attached protocol
        	</p>
			<p v-if=" subcriteria === 'fourteenthSubcriteriaBehaviour'">
				<h3>Score 1</h3>
				Presence of other animals lead to displacement from certain pool areas during the last three months
				<h3>Score 3</h3>
				Absence of social isolation or displacement during the last three months

        	</p>
            <p v-if=" subcriteria === 'fifteenthSubcriteriaBehaviour'">
				<h3>Score 1</h3>
				Dolphins avoid certain pool areas on a consistent basis 
				<h3>Score 3</h3>
				Absence of active avoidance of certain pool areas during the last three months
        	</p>
      	</ion-content>
    </ion-modal>
	<!--End of Scoring Description-->
	<!-- Start of Checkboxes-->
    <ion-list v-if=" subcriteria === 'firstSubcriteriaBehaviour'">
			<ion-item>
				<ion-label>Score 1</ion-label>
				<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-label>Score 2</ion-label>
				<ion-checkbox v-model="isChecked[2]" @click="handleClick(2)"></ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-label>Score 3</ion-label>
				<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
			</ion-item>
    </ion-list>
	<ion-list v-if=" subcriteria === 'secondSubcriteriaBehaviour'">
		<ion-item>
			<ion-label>Score 1</ion-label>
			<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 3</ion-label>
			<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
		</ion-item>
    </ion-list>
	<ion-list v-if=" subcriteria === 'thirdSubcriteriaBehaviour'">
		<ion-item>
			<ion-label>Score 1</ion-label>
			<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 3</ion-label>
			<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
		</ion-item>
    </ion-list>
	<ion-list v-if=" subcriteria === 'fourthSubcriteriaBehaviour'">
		<ion-item>
			<ion-label>Score 1</ion-label>
			<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 3</ion-label>
			<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
		</ion-item>
    </ion-list>
	<ion-list v-if=" subcriteria === 'fifthSubcriteriaBehaviour'">
		<ion-item>
			<ion-label>Score 1</ion-label>
			<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 3</ion-label>
			<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
		</ion-item>
    </ion-list>
	<ion-list v-if=" subcriteria === 'sixthSubcriteriaBehaviour'">
		<ion-item>
			<ion-label>Score 1</ion-label>
			<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 3</ion-label>
			<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
		</ion-item>
    </ion-list>
    <ion-list v-if=" subcriteria === 'seventhSubcriteriaBehaviour'">
		<ion-item>
			<ion-label>Score 1</ion-label>
			<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 3</ion-label>
			<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
		</ion-item>
    </ion-list>
	<ion-list v-if=" subcriteria === 'eigthSubcriteriaBehaviour'">
		<ion-item>
			<ion-label>Score 1</ion-label>
			<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 3</ion-label>
			<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
		</ion-item>
    </ion-list>
	<ion-list v-if=" subcriteria === 'ninthSubcriteriaBehaviour'">
		<ion-item>
			<ion-label>Score 1</ion-label>
			<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 3</ion-label>
			<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
		</ion-item>
    </ion-list>
	<ion-list v-if=" subcriteria === 'tenthSubcriteriaBehaviour'">
		<ion-item>
			<ion-label>Score 1</ion-label>
			<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 3</ion-label>
			<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
		</ion-item>
    </ion-list>
	<ion-list v-if=" subcriteria === 'eleventhSubcriteriaBehaviour'">
		<ion-item>
			<ion-label>Score 1</ion-label>
			<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 3</ion-label>
			<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
		</ion-item>
    </ion-list>
    <ion-list v-if=" subcriteria === 'twelfthSubcriteriaBehaviour'">
			<ion-item>
				<ion-label>Score 1</ion-label>
				<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-label>Score 2</ion-label>
				<ion-checkbox v-model="isChecked[2]" @click="handleClick(2)"></ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-label>Score 3</ion-label>
				<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
			</ion-item>
    </ion-list>
	<ion-list v-if=" subcriteria === 'thirteenthSubcriteriaBehaviour'">
		<ion-item>
			<ion-label>Score 1</ion-label>
			<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 3</ion-label>
			<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
		</ion-item>
    </ion-list>
	<ion-list v-if=" subcriteria === 'fourteenthSubcriteriaBehaviour'">
		<ion-item>
			<ion-label>Score 1</ion-label>
			<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 3</ion-label>
			<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
		</ion-item>
    </ion-list>
	<ion-list v-if=" subcriteria === 'fifteenthSubcriteriaBehaviour'">
		<ion-item>
			<ion-label>Score 1</ion-label>
			<ion-checkbox v-model="isChecked[1]" @click="handleClick(1)"></ion-checkbox>
		</ion-item>
		<ion-item>
			<ion-label>Score 3</ion-label>
			<ion-checkbox v-model="isChecked[3]" @click="handleClick(3)"></ion-checkbox>
		</ion-item>
    </ion-list>
	<!-- End of Checkboxes-->
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
	IonText,
	IonCheckbox,
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
		IonText,
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
			isOpenManual: false,
			isOpenScoring: false,
			selectedOption: undefined,
			isChecked: {} as Record<number, boolean>,
			Score1: this.$t('fulfilled'),
			noTendency: this.$t('noTendency'),
			notFulfilled: this.$t('notFulfilled'),
		};
	},
	methods: {
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
