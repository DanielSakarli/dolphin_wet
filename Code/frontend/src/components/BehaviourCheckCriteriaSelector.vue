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
					<ion-select-option value="firstCriteriaBehaviour">
						Display of exploratory behavior
					</ion-select-option>
					<ion-select-option value="secondCriteriaBehaviour">
						Display of affiliative behavior, play, socio-sexual behavior
					</ion-select-option>
					<ion-select-option value="thirdSubcriteriaBehaviour">
						Display of Maternal behavior when justified
					</ion-select-option>
					<ion-select-option value="forthSubcriteriaBehaviour">
						Absence of repetitive abnormal behaviors
					</ion-select-option>
					<ion-select-option value="fifthSubcriteriaBehaviour">
						Absence of receving aggressive behaviors causing negative consequences
					</ion-select-option>
					<ion-select-option value="sixthSubcriteriaBehaviour">
						Absence of receving aggressive behaviors causing negative consequences
					</ion-select-option>
					<ion-select-option value="seventhSubcriteriaBehaviour">
						Evidence of social isolation
					</ion-select-option>
					<ion-select-option value="eighthSubcriteriaBehaviour">
						Evidence avoidance of certain pool regions
					</ion-select-option>
				</ion-select>
			</ion-item>
			<ion-item>
				<ion-select
					:value="subcriteria"
					@IonChange="subcriteria=$event.target.value"
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
		<ion-button fill="outline" @click="setOpenManual(true)">{{ $t('userManual') }}</ion-button>

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
					<h3>Absence of stereotypic behaviors</h3>
					All stereotypic behavior types mentioned in the welfare tool (displacement and oral stereotypic behaviors, repetitive body movements without displacement, excessive self-grooming behavior, and regurgitation/reingestion) should be assessed using the modified all occurrence sampling protocol.
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
		<ion-button fill="outline" @click="setOpenScoring(true)">{{ $t('ScoringDescription') }}</ion-button>

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
					No enrichment program

					<h3>Score 2</h3>
					Presence of enrichment program according to EAAM S&Gs but no  achievement of enrichment goals; presence of enrichment program but not in fulfillment of the EAAM S&Gs

					<h3>Score 3</h3>
					Presence of enrichment program according to EAAm S&Gs and the display of exploratory behaviors as planned in goal-orientated EP, EP needs to be evaluated against set goals

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
				<ion-checkbox v-model="CheckboxArray[0][0]" @click="handleClick(0,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[0][1]" @click="handleClick(0,1)">Score 2</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[0][2]" @click="handleClick(0,2)">Score 3</ion-checkbox>
			</ion-item>
			<CheckComments />
		</ion-list>
		<ion-list v-if=" subcriteria === 'secondSubcriteriaBehaviour'">
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[1][0]" @click="handleClick(1,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[2][2]" @click="handleClick(1,2)">Score 3</ion-checkbox>
			</ion-item>
		</ion-list>
		<ion-list v-if=" subcriteria === 'thirdSubcriteriaBehaviour'">
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[2][0]" @click="handleClick(2,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[2][2]" @click="handleClick(2,2)">Score 3</ion-checkbox>
			</ion-item>
		</ion-list>
		<ion-list v-if=" subcriteria === 'fourthSubcriteriaBehaviour'">
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[3][0]" @click="handleClick(3,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[3][2]" @click="handleClick(3,2)">Score 3</ion-checkbox>
			</ion-item>
		</ion-list>
		<ion-list v-if=" subcriteria === 'fifthSubcriteriaBehaviour'">
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[4][0]" @click="handleClick(4,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[4][2]" @click="handleClick(4,2)">Score 3</ion-checkbox>
			</ion-item>
		</ion-list>
		<ion-list v-if=" subcriteria === 'sixthSubcriteriaBehaviour'">
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[5][0]" @click="handleClick(5,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[5][2]" @click="handleClick(5,2)">Score 3</ion-checkbox>
			</ion-item>
		</ion-list>
		<ion-list v-if=" subcriteria === 'seventhSubcriteriaBehaviour'">
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[6][0]" @click="handleClick(6,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[6][2]" @click="handleClick(6,2)">Score 3</ion-checkbox>
			</ion-item>
		</ion-list>
		<ion-list v-if=" subcriteria === 'eigthSubcriteriaBehaviour'">
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[7][0]" @click="handleClick(7,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[7][2]" @click="handleClick(7,2)">Score 3</ion-checkbox>
			</ion-item>
		</ion-list>
		<ion-list v-if=" subcriteria === 'ninthSubcriteriaBehaviour'">
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[8][0]" @click="handleClick(8,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[8][2]" @click="handleClick(8,2)">Score 3</ion-checkbox>
			</ion-item>
		</ion-list>
		<ion-list v-if=" subcriteria === 'tenthSubcriteriaBehaviour'">
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[9][0]" @click="handleClick(9,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[9][2]" @click="handleClick(9,2)">Score 3</ion-checkbox>
			</ion-item>
		</ion-list>
		<ion-list v-if=" subcriteria === 'eleventhSubcriteriaBehaviour'">
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[10][0]" @click="handleClick(10,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[10][2]" @click="handleClick(10,2)">Score 3</ion-checkbox>
			</ion-item>
		</ion-list>
		<ion-list v-if=" subcriteria === 'twelfthSubcriteriaBehaviour'">
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[11][0]" @click="handleClick(11,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[11][1]" @click="handleClick(11,1)">Score 2</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[11][2]" @click="handleClick(11,2)">Score 3</ion-checkbox>
			</ion-item>
			<CheckComments />
		</ion-list>
		<ion-list v-if=" subcriteria === 'thirteenthSubcriteriaBehaviour'">
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[12][0]" @click="handleClick(12,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[12][2]" @click="handleClick(12,2)">Score 3</ion-checkbox>
			</ion-item>
			<CheckComments />
		</ion-list>
		<ion-list v-if=" subcriteria === 'fourteenthSubcriteriaBehaviour'">
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[13][0]" @click="handleClick(13,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[13][2]" @click="handleClick(13,2)">Score 3</ion-checkbox>
			</ion-item>
			<CheckComments />
		</ion-list>
		<ion-list v-if=" subcriteria === 'fifteenthSubcriteriaBehaviour'">
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[14][0]" @click="handleClick(14,0)">Score 1</ion-checkbox>
			</ion-item>
			<ion-item>
				<ion-checkbox v-model="CheckboxArray[14][2]" @click="handleClick(14,2)">Score 3</ion-checkbox>
			</ion-item>
			<CheckComments />
		</ion-list>
	</ion-content>
	<!-- End of Checkboxes-->
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
	IonItem, IonList, IonSelect, IonSelectOption, IonLabel,
	IonModal, IonHeader, IonToolbar, IonContent, IonTitle,
	IonButtons, IonButton, IonText, IonCheckbox, IonFooter, IonIcon
} from '@ionic/vue';
import CheckComments from '@/components/CheckComments.vue';
import axios from 'axios';
import { useDolphinsStore }from '@/store/dolphinsStore';
import { useEvaluationBehaviourStore }from '@/store/evaluationBehaviourStore';
import { baseUrl } from '@/utils/baseUrl';

const dolphinsStore = useDolphinsStore();
const evaluationBehaviourStore = useEvaluationBehaviourStore();

export default {
	components: {
		IonItem, IonList, IonSelect, IonSelectOption, IonFooter,
		IonLabel, IonModal, IonHeader, IonToolbar, IonContent, IonIcon,
		IonTitle, IonButtons, IonButton, IonText, IonCheckbox, CheckComments
	},
	data() {
		return {
			language: 'en',
			dolphinsStore: dolphinsStore,
			dolphinSelect: null as string | null,
			criteria: null as string | null,
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
			CheckboxArray: Array.from({ length: 15 }, () => Array(3).fill(false)),
			Score1: this.$t('fulfilled'),
			urlPost: baseUrl + '/api/behaviour',//'http://88395-17112.pph-server.de/api/behaviour',
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
			console.log(this.CheckboxArray[row][column], row, column); //log on console if Checkbox is checked or not

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
			for(let k = 0; k < evaluationBehaviourStore.requestBodiesBehaviour.length; k++){
				if(this.dolphinSelect === evaluationBehaviourStore.requestBodiesBehaviour[k]["dolphin_name"]) {
					if (this.dolphinSelect!== null){
						evaluationBehaviourStore.requestBodiesBehaviour[k]["dolphin_name"] = this.dolphinSelect;
					}
					for(let i = 0; i < this.CheckboxArray.length; i++){
						for(let j = 0; j < this.CheckboxArray[i].length; j++){
							if (this.CheckboxArray[i][j] === true && i === 0){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["environmental_enrichment"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 1){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["affiliative_behaviour"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 2){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["play_behaviour"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 3){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["socio_sexual_behaviour"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 4){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["maternal_behaviour"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 5){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["displacement_behaviour"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 6){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["oral_stereotypic_behaviour"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 7){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["repetitive_body_movement"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 8){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["self_grooming_behaviour"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 9){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["regurgitation_reingestion"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 10){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["rake_marks"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 11){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["displaying_aggressive_behaviour"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 12){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["receiving_aggressive_behaviour"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 13){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["social_isolation"] = j + 1;
							}else if (this.CheckboxArray[i][j] === true && i === 14){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["avoidance_pool_areas"] = j + 1;
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
				for(let i = 0; i < evaluationBehaviourStore.requestBodiesBehaviour.length; i++){
					await axios
							.post(this.urlPost, evaluationBehaviourStore.requestBodiesBehaviour[i])
							.then((response) => {
								console.log('Response:', response.data);
								if (i === evaluationBehaviourStore.requestBodiesBehaviour.length - 1){
									const targetUrl = '/folder/Evaluate';
									this.$router.push(targetUrl);
									evaluationBehaviourStore.resetBodies();
									this.dolphinSelect = null;
									this.criteria = null;
								}
							})
							.catch((error) => {
								console.error('Error:', error.response.data);
								const targetUrl = `/detailBehaviour`;
								this.$router.push(targetUrl);
							});
				}
			}
		},
		confirmRefresh() {
			const confirmed = confirm(this.$t('savingDataNext'));
     		if (confirmed) {
				this.storeCheckedValues();
				console.log(evaluationBehaviourStore.requestBodiesBehaviour)
				this.dolphinSelect = null;
				this.criteria = null;
				const currentPath = this.$route.path;
				const targetUrl = `/detailFeeding`;
				this.$router.push(targetUrl);
			}	
    	},
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
