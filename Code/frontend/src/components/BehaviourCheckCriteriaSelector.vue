<!-- eslint-disable vue/no-unused-components -->
<template>
	<!-- Criteria Selector v-on:click="showDolphins" @click="showDolphins"-->
	<ion-content>
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
					<ion-select-option value="firstCriteriaBehaviour">{{
						$t('firstCriteriaBehaviour')
					}}</ion-select-option>
					<ion-select-option value="secondCriteriaBehaviour">{{
						$t('secondCriteriaBehaviour')
					}}</ion-select-option>
					<ion-select-option value="thirdCriteriaBehaviour">{{
						$t('thirdCriteriaBehaviour')
					}}</ion-select-option>
					<ion-select-option value="fourthCriteriaBehaviour">{{
						$t('fourthCriteriaBehaviour')
					}}</ion-select-option>
                    <ion-select-option value="fifthCriteriaBehaviour">{{
                        $t('fifthCriteriaBehaviour')
                    }}</ion-select-option>
                    <ion-select-option value="sixthCriteriaBehaviour">{{
                        $t('sixthCriteriaBehaviour')
                    }}</ion-select-option>
                    <ion-select-option value="seventhCriteriaBehaviour">{{
                        $t('seventhCriteriaBehaviour')
                    }}</ion-select-option>
                    <ion-select-option value="eighthCriteriaBehaviour">{{
                        $t('eighthCriteriaBehaviour')
                    }}</ion-select-option>
				</ion-select>
			</ion-item>
		</ion-list>
		<!-- End of Criteria Selector -->

		<!-- Description of Criteria (UserManual) -->
		<ion-button v-if="criteria" fill="outline" @click="setOpenManual(true)">{{ $t('userManual') }}</ion-button>

		<ion-modal :is-open="isOpenManual">
			<ion-header>
				<ion-toolbar>
					<ion-title v-if=" criteria === 'firstCriteriaBehaviour'"
						>{{$t('firstCriteriaBehaviour')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'secondCriteriaBehaviour'"
						>{{$t('secondCriteriaBehaviour')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'thirdCriteriaBehaviour'"
						>{{$t('thirdCriteriaBehaviour')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'fourthCriteriaBehaviour'"
						>{{$t('fourthCriteriaBehaviour')}}
					</ion-title>
                    <ion-title v-else-if=" criteria === 'fifthCriteriaBehaviour'"
                        >{{$t('fifthCriteriaBehaviour')}}
                    </ion-title>
                    <ion-title v-else-if=" criteria === 'sixthCriteriaBehaviour'"
                        >{{$t('sixthCriteriaBehaviour')}}
                    </ion-title>
                    <ion-title v-else-if=" criteria === 'seventhCriteriaBehaviour'"
                        >{{$t('seventhCriteriaBehaviour')}}
                    </ion-title>
                    <ion-title v-else-if=" criteria === 'eighthCriteriaBehaviour'"
                        >{{$t('eighthCriteriaBehaviour')}}
                    </ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenManual(false)">{{ $t('close')}}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<p v-if=" criteria === 'firstCriteriaBehaviour'">
					<h1>{{ $t('firstSubCriteriaBehaviour') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0Behaviour1') }}
                    <h3>Score 1</h3>
                    {{  $t('score1Behaviour1') }}
					<h3>Score 2</h3>
					{{  $t('score2Behaviour1') }}
				</p>
				<p v-if=" criteria === 'secondCriteriaBehaviour'">
					<h1>{{ $t('secondSubCriteriaBehaviour') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0Behaviour2') }}
					<h3>Score 2</h3>
					{{  $t('score2Behaviour2') }}
                    <h1>{{ $t('thirdSubCriteriaBehaviour') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0Behaviour3') }}
					<h3>Score 2</h3>
					{{  $t('score2Behaviour3') }}
                    <h1>{{ $t('fourthSubCriteriaBehaviour') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0Behaviour4') }}
					<h3>Score 2</h3>
					{{  $t('score2Behaviour4') }}
				</p>
				<p v-if=" criteria === 'thirdCriteriaBehaviour'">
					<h1>{{ $t('fifthSubCriteriaBehaviour') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0Behaviour5') }}
					<h3>Score 2</h3>
					{{  $t('score2Behaviour5') }}
				</p>
				<p v-if=" criteria === 'fourthCriteriaBehaviour'">
					<h1>{{ $t('sixthSubCriteriaBehaviour') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0Behaviour6') }}
					<h3>Score 2</h3>
					{{  $t('score2Behaviour6') }}
                    <h1>{{ $t('seventhSubCriteriaBehaviour') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0Behaviour7') }}
					<h3>Score 2</h3>
					{{  $t('score2Behaviour7') }}
                    <h1>{{ $t('eighthSubCriteriaBehaviour') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0Behaviour8') }}
					<h3>Score 2</h3>
					{{  $t('score2Behaviour8') }}
                    <h1>{{ $t('ninthSubCriteriaBehaviour') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0Behaviour9') }}
					<h3>Score 2</h3>
					{{  $t('score2Behaviour9') }}
                    <h1>{{ $t('tenthSubCriteriaBehaviour') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0Behaviour10') }}
					<h3>Score 2</h3>
					{{  $t('score2Behaviour10') }}
				</p>
                <p v-if=" criteria === 'fifthCriteriaBehaviour'">
					<h1>{{ $t('eleventhSubCriteriaBehaviour') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0Behaviour11') }}
					<h3>Score 2</h3>
					{{  $t('score2Behaviour11') }}
                    <h1>{{ $t('twelfthSubCriteriaBehaviour') }}</h1>
					<h3>Score 0</h3>
					{{  $t('score0Behaviour12') }}
                    <h3>Score 1</h3>
                    {{  $t('score1Behaviour12') }}
					<h3>Score 2</h3>
					{{  $t('score2Behaviour12') }}
				</p>
                <p v-if=" criteria === 'sixthCriteriaBehaviour'">
                    <h1>{{ $t('thirteenthSubCriteriaBehaviour') }}</h1>
                    <h3>Score 0</h3>
                    {{  $t('score0Behaviour13') }}
                    <h3>Score 2</h3>
                    {{  $t('score2Behaviour13') }}
                </p>
                <p v-if=" criteria === 'seventhCriteriaBehaviour'">
                <h1>{{ $t('fourteenthSubCriteriaBehaviour') }}</h1>
                <h3>Score 0</h3>
                {{  $t('score0Behaviour14') }}
                <h3>Score 2</h3>
                {{  $t('score2Behaviour14') }}
                </p>
                <p v-if=" criteria === 'eighthCriteriaBehaviour'">
                    <h1>{{ $t('fifteenthSubCriteriaBehaviour') }}</h1>
                    <h3>Score 0</h3>
                    {{  $t('score0Behaviour15') }}
                    <h3>Score 2</h3>
                    {{  $t('score2Behaviour15') }}
                </p>
			</ion-content>
		</ion-modal>
		<!-- End of Description of Criteria (UserManual)-->
		<!--Start of Scoring Description-->
		<ion-button v-if="criteria" fill="outline" @click="setOpenScoring(true)">{{ $t('ScoringDescription') }}</ion-button>

		<ion-modal :is-open="isOpenScoring">
			<ion-header>
				<ion-toolbar>
					<ion-title v-if=" criteria === 'firstCriteriaBehaviour'"
						>{{$t('firstCriteriaBehaviour')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'secondCriteriaBehaviour'"
						>{{$t('secondCriteriaBehaviour')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'thirdCriteriaBehaviour'"
						>{{$t('thirdCriteriaBehaviour')}}
					</ion-title>
					<ion-title v-else-if=" criteria === 'fourthCriteriaBehaviour'"
						>{{$t('fourthCriteriaBehaviour')}}
					</ion-title>
                    <ion-title v-else-if=" criteria === 'fifthCriteriaBehaviour'"
                        >{{$t('fifthCriteriaBehaviour')}}
                    </ion-title>
                    <ion-title v-else-if=" criteria === 'sixthCriteriaBehaviour'"
                        >{{$t('sixthCriteriaBehaviour')}}
                    </ion-title>
                    <ion-title v-else-if=" criteria === 'seventhCriteriaBehaviour'"
                        >{{$t('seventhCriteriaBehaviour')}}
                    </ion-title>
                    <ion-title v-else-if=" criteria === 'eighthCriteriaBehaviour'"
                        >{{$t('eighthCriteriaBehaviour')}}
                    </ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenScoring(false)">{{ $t('close')}}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<!--<p v-if=" criteria === 'firstCriteriaBehaviour'">
					<h1>Body Condition Score:</h1>
					<h3>Score 1</h3>
					BCS of 3 = adequate
					<h3>Score 2</h3>
					BCS of 2 (underweight) or 4(overweight)
					<h3>Score 3</h3>
					BCS of 1 (emaciated) or 5(obese)
					<h1>Weight oscillation during the year:</h1>
					<h3>Score 1</h3>
					Body weight oscillation (BWOS): &le;13% along the year or &le;5% in a 3-month period  
					<h3>Score 3</h3>
					BWOS: &gt;13% along the year or &lt;5% in a 3-month period
				</p>
				<p v-if=" criteria === 'secondCriteriaBehaviour'">
					<h1>Kcal calculations</h1>
					<h3>Score 1</h3>
					Diet designed on the basis of EAAM S&G
					<h3>Score 3</h3>
					Diet not designed on the basis of EAAM S&G
					<h1>Blood parameters for adequate hydration:</h1>
					<h3>Score 1</h3>
					Within the range
					<h3>Score 2</h3>
					10% out of range
					<h3>Score 3</h3>
					&gt;10% out of range
				</p>
				<p v-if=" criteria === 'thirdCriteriaBehaviour'">
					<h1>Food quality Microbiology, Physico-chemical analysis:</h1>
					<h3>Score 1</h3>
					Fulfilled according to EAAM S&G
					<h3>Score 3</h3>
					Not fulfilled according to EAAM S&G
				</p>
				<p v-if=" criteria === 'fourthCriteriaBehaviour'">
					<h1>Food variety along the year:</h1>
					<h3>Score 1</h3>
					At least 5 species are fed throughout the year, 
					each individual's diet is adapted to its individual Behavioural needs and preferences, 
					amount of food fed varies between sessions, 
					part of the diet is given via enrichment
					<h3>Score 2</h3>
					At least 3, but no more than 5 species are fed throughout the year, 
					each individual's diet is adapted to its individual Behavioural needs, but the 
					amount of food provided to the dolphins during each session is the same, 
					favorite species/animal preferences are neglected
					<h3>Score 3</h3>
					Only 3 or less species of food are fed throughout the year, no variation along the year, 
					diet is not adapted to individual preferences/specific need
				</p>-->
			</ion-content>
		</ion-modal>
		<!--End of Scoring Description-->
		<!--Start of Reference Area-->
		<!--<ion-button v-if="criteria" fill="outline" @click="setOpenReferenceArea(true)">{{ $t('ReferenceArea') }}</ion-button>

		<ion-modal :is-open="isOpenReferenceArea">
			<ion-header>
				<ion-toolbar>
					<ion-title>
						{{$t('ReferenceArea')}}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenReferenceArea(false)">{{ $t('close')}}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>

			<ion-content class="ion-padding">
				<p v-if=" criteria === 'firstCriteriaBehaviour'">-->
					<!--Here are the values of reference area-->
					<!--<h3>Wanted weight area:</h3>
					<div v-if="dolphinSelect">
						<div v-for="selectedDolphin in dolphinSelect" :key="selectedDolphin">
							<h4>{{ selectedDolphin }}</h4>
							<p>
							  Minimum: 
							  {{ 
								(dolphinsStore.dolphinList.find(
								  (dolphin) => dolphin.name === selectedDolphin
								)?.min_weight_measured) ?? null
							  }}
							</p>
							<p>
							  Maximum: 
							  {{ 
								(dolphinsStore.dolphinList.find(
								  (dolphin) => dolphin.name === selectedDolphin
								)?.max_weight_measured) ?? null
							  }}
							</p>
						  </div>
					  </div>
				</p>
				<p v-if=" criteria === 'secondCriteriaBehaviour'">-->
					<!--Here are the values of reference area-->
					<!--<h3>Kcal calculations</h3>
					<div v-if="dolphinSelect">
						<div v-for="selectedDolphin in dolphinSelect" :key="selectedDolphin">
							<h4>{{ selectedDolphin }}</h4>
							<p>
							  Minimum: 
							  {{ 
								(dolphinsStore.dolphinList.find(
								  (dolphin) => dolphin.name === selectedDolphin
								)?.min_kcal_calculations) ?? null
							  }}
							</p>
							<p>
							  Maximum: 
							  {{ 
								(dolphinsStore.dolphinList.find(
								  (dolphin) => dolphin.name === selectedDolphin
								)?.max_kcal_calculations) ?? null
							  }}
							</p>
						</div>
					</div>
				</p>
			</ion-content>
		</ion-modal>-->
		<!--End of Reference Area-->
		<!-- Start of Checkboxes-->
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'firstCriteriaBehaviour'">
			<ion-card-title>{{$t('firstSubCriteriaBehaviour')}}</ion-card-title>
			<ion-list >
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[0][0]" @click="handleClick(0,0)">Score 0</ion-checkbox>
					</ion-item>
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[0][1]" @click="handleClick(0,1)">Score 1</ion-checkbox>
					</ion-item>
					<ion-item>
						<ion-checkbox v-model="CheckboxArray[0][2]" @click="handleClick(0,2)">Score 2</ion-checkbox>
					</ion-item>
					<CheckComments @update-comment="updateEnvironmentEnrichmentComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'secondCriteriaBehaviour'">
			<ion-card-title>{{$t('secondSubCriteriaBehaviour')}}</ion-card-title>
			<ion-list >
				<ion-item>
                    <ion-checkbox v-model="CheckboxArray[1][0]" @click="handleClick(1,0)">Score 0</ion-checkbox>
                </ion-item>
                <ion-item>
                    <ion-checkbox v-model="CheckboxArray[1][2]" @click="handleClick(1,2)">Score 2</ion-checkbox>
                </ion-item>
                <CheckComments @update-comment="updateAffiliativeBehaviourComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'secondCriteriaBehaviour'">
            <ion-card-title>{{$t('thirdSubCriteriaBehaviour')}}</ion-card-title>
			<ion-list >
				<ion-item>
                    <ion-checkbox v-model="CheckboxArray[2][0]" @click="handleClick(2,0)">Score 0</ion-checkbox>
                </ion-item>
                <ion-item>
                    <ion-checkbox v-model="CheckboxArray[2][2]" @click="handleClick(2,2)">Score 2</ion-checkbox>
                </ion-item>
                <CheckComments @update-comment="updatePlayBehaviourComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'secondCriteriaBehaviour'">
            <ion-card-title>{{$t('fourthSubCriteriaBehaviour')}}</ion-card-title>
			<ion-list >
				<ion-item>
                    <ion-checkbox v-model="CheckboxArray[3][0]" @click="handleClick(3,0)">Score 0</ion-checkbox>
                </ion-item>
                <ion-item>
                    <ion-checkbox v-model="CheckboxArray[3][2]" @click="handleClick(3,2)">Score 2</ion-checkbox>
                </ion-item>
                <CheckComments @update-comment="updateSocioSexualComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'thirdCriteriaBehaviour'">
			<ion-card-title>{{$t('fifthSubCriteriaBehaviour')}}</ion-card-title>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][0]" @click="handleClick(4,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[4][2]" @click="handleClick(4,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateMaternalBehaviourComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'fourthCriteriaBehaviour'">
			<ion-card-title>{{$t('sixthSubCriteriaBehaviour')}}</ion-card-title>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[5][0]" @click="handleClick(5,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[5][2]" @click="handleClick(5,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateDisplacementBehaviourComments" />
			</ion-list>
		</ion-card>
        <ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'fourthCriteriaBehaviour'">
		<ion-card-title>{{$t('seventhSubCriteriaBehaviour')}}</ion-card-title>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[6][0]" @click="handleClick(6,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[6][2]" @click="handleClick(6,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateOralBehaviourComments" />
			</ion-list>
		</ion-card>
        <ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'fourthCriteriaBehaviour'">
		<ion-card-title>{{$t('eighthSubCriteriaBehaviour')}}</ion-card-title>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[7][0]" @click="handleClick(7,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[7][2]" @click="handleClick(7,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateRepetitiveMovementComments" />
			</ion-list>
		</ion-card>
        <ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'fourthCriteriaBehaviour'">
		<ion-card-title>{{$t('ninthSubCriteriaBehaviour')}}</ion-card-title>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[8][0]" @click="handleClick(8,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[8][2]" @click="handleClick(8,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateSelfGroomingComments" />
			</ion-list>
        </ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'fourthCriteriaBehaviour'">
		<ion-card-title>{{$t('tenthSubCriteriaBehaviour')}}</ion-card-title>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[9][0]" @click="handleClick(9,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[9][2]" @click="handleClick(9,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateRegurgitationComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'fifthCriteriaBehaviour'">
			<ion-card-title>{{$t('eleventhSubCriteriaBehaviour')}}</ion-card-title>		
			<ion-list >
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[10][0]" @click="handleClick(10,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[10][2]" @click="handleClick(10,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateReceivingAggressiveComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'fifthCriteriaBehaviour'">
			<ion-card-title>{{$t('twelfthSubCriteriaBehaviour')}}</ion-card-title>		
			<ion-list >
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[11][0]" @click="handleClick(11,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[11][1]" @click="handleClick(11,1)">Score 1</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[11][2]" @click="handleClick(11,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateRakeMarksComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'sixthCriteriaBehaviour'">
			<ion-card-title>{{$t('thirteenthSubCriteriaBehaviour')}}</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[12][0]" @click="handleClick(12,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[12][2]" @click="handleClick(12,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateDisplayingAggressiveComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'seventhCriteriaBehaviour'">
			<ion-card-title>{{$t('fourteenthSubCriteriaBehaviour')}}</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[13][0]" @click="handleClick(13,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[13][2]" @click="handleClick(13,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateSocialIsolationComments" />
			</ion-list>
		</ion-card>
		<ion-card v-if="dolphinSelect && dolphinSelect.length !== 0 && criteria === 'eighthCriteriaBehaviour'">
			<ion-card-title>{{$t('fifteenthSubCriteriaBehaviour')}}</ion-card-title>	
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[14][0]" @click="handleClick(14,0)">Score 0</ion-checkbox>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[14][2]" @click="handleClick(14,2)">Score 2</ion-checkbox>
				</ion-item>
				<CheckComments @update-comment="updateAvoidancePoolAreasComments" />
			</ion-list>
		</ion-card>
	</ion-content>
	<!-- End of Checkboxes-->
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
import {IonItem, IonList, IonSelect, IonSelectOption, IonModal,
	IonHeader, IonToolbar, IonContent, IonTitle, IonButtons, IonButton,
	IonCheckbox, IonCard, IonCardTitle, IonFooter,
	IonIcon, alertController
} from '@ionic/vue';
import axios from 'axios';
import CheckComments from '@/components/CheckComments.vue';
import { useDolphinsStore }from '@/store/dolphinsStore';
import { useEvaluationBehaviourStore }from '@/store/evaluationBehaviourStore';
import { baseUrl } from '@/utils/baseUrl';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';




const dolphinsStore = useDolphinsStore();
const evaluationBehaviourStore = useEvaluationBehaviourStore();
let dataInBody; //Variable which gets saved in localstorage with either true or false, depending if data is in checkboxes or evaluationBehaviourStore
const token = localStorage.getItem('token'); //Get current JWT token of the user
console.log('Token accessed from localStorage: ', token);

export default {
	components: {
		// needed Vue components:
		IonItem, IonList, IonSelect, IonSelectOption, IonModal, IonHeader,
		IonToolbar, IonContent, IonTitle, IonButtons, IonButton, IonCheckbox,
		IonCard, IonCardTitle, CheckComments, IonFooter, IonIcon,
	},
	async mounted()  {
		// This makes sure that the reference areas are updated while the component is
		// mounted. But only if there is internet connectivity. If not, the displayed
		// reference areas are the ones from the animalList.json
   		//await dolphinsStore.fill();
		// evaluationBehaviourStore.resetBodies();
		// The fill method resets the bodies now
		const dolphinsStore = useDolphinsStore();
		evaluationBehaviourStore.fill(dolphinsStore.dolphinList);
		// Reset here data while page is mounted
		localStorage.setItem('backButtonClicked', 'false');
		localStorage.setItem('dataInBody', 'false'); //No unsaved data present while page is mounted
		localStorage.setItem('created_at', ''); //Used so that user can choose the date of the test himself

	},
	data() {
		return {
			// Variables:
			language: 'en',
			dialog: false,
			dolphinsStore: dolphinsStore,
			dolphinSelect: null as string | null,
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
			CheckboxArray: Array.from({ length: 15 }, () => Array(3).fill(false)), //For 15 subcriterias of behaviour principle
			urlDolphins: baseUrl + '/api/dolphins', // get the dolphins
			urlPost: baseUrl + '/api/behaviour', //'https://88395-17112.pph-server.de/api/behaviour',
			//Comments initialized as empty strings, so that they can be filled with the comments of the user input:
			environmentEnrichmentComments: '',
			affiliativeBehaviourComments: '',
			playBehaviourComments: '',
			socioSexualComments: '',
			maternalBehaviourComments: '',
			displacementBehaviourComments: '',
			oralBehaviourComments: '',
			repetitiveMovementComments: '',
			selfGroomingComments: '',
			regurgitationComments: '',
			receivingAggressiveComments: '',
			rakeMarksComments: '',
			displayingAggressiveComments: '',
			socialIsolationComments: '',
			avoidancePoolAreasComments: '',
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
		//Method to open reference area
		setOpenReferenceArea(isOpen: boolean) {
			if(isOpen) {
				// Update the data of the dolphins when the reference area is opened
				this.dolphinsStore.fill();
			}
			this.isOpenReferenceArea = isOpen;
		},
		//Method uses boolean array. So no multiple checking for one test is possible. --> Every test can have one checked Checkbox
		handleClick(row: number, column: number) {
			console.log(this.CheckboxArray, row, column);
		
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
		// Method to collect the checked checkboxes and give request body the scores
		storeCheckedValues() {
			for(let k = 0; k < evaluationBehaviourStore.requestBodiesBehaviour.length; k++){
				//k stands for the different dolphins. It iterates through the array of dolphins in requestBodiesBehaviour.json
				if(this.dolphinSelect.includes(evaluationBehaviourStore.requestBodiesBehaviour[k]["dolphin_name"])) {
					for(let i = 0; i < this.CheckboxArray.length; i++){
						for(let j = 0; j < this.CheckboxArray[i].length; j++){
							if (this.CheckboxArray[i][j] === true && i === 0){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["environmental_enrichment"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 1){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["affiliative_behaviour"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 2){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["play_behaviour"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 3){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["socio_sexual_behaviour"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 4){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["maternal_behaviour"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 5){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["displacement_behaviour"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 6){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["oral_stereotypic_behaviour"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 7){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["repetitive_body_movement"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 8){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["self_grooming_behaviour"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 9){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["regurgitation_reingestion"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 10){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["receiving_aggressive_behaviour"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 11){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["rake_marks"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 12){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["displaying_aggressive_behaviour"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 13){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["social_isolation"] = j;
							}else if (this.CheckboxArray[i][j] === true && i === 14){
								evaluationBehaviourStore.requestBodiesBehaviour[k]["avoidance_pool_areas"] = j;
							}
						}
					}
					// Code here the comments into the request body
					// First check with if statement if comments had been updated or not. If we don´t do that we override the comments with
					// an empty string if we click on 'Next Test'
					if(this.environmentEnrichmentComments != '') {
						evaluationBehaviourStore.requestBodiesBehaviour[k]["environmental_enrichment_comments"] = this.environmentEnrichmentComments;
					}
					if(this.affiliativeBehaviourComments != ''){
					evaluationBehaviourStore.requestBodiesBehaviour[k]["affiliative_behaviour_comments"] = this.affiliativeBehaviourComments;
					}
					if(this.playBehaviourComments != ''){
					evaluationBehaviourStore.requestBodiesBehaviour[k]["play_behaviour_comments"] = this.playBehaviourComments;
					}
					if(this.socioSexualComments != ''){
					evaluationBehaviourStore.requestBodiesBehaviour[k]["socio_sexual_behaviour_comments"] = this.socioSexualComments;
					}
					if(this.maternalBehaviourComments != ''){
					evaluationBehaviourStore.requestBodiesBehaviour[k]["maternal_behaviour_comments"] = this.maternalBehaviourComments;
					}
					if(this.displacementBehaviourComments != ''){
					evaluationBehaviourStore.requestBodiesBehaviour[k]["displacement_behaviour_comments"] = this.displacementBehaviourComments;
					}
					if(this.oralBehaviourComments != ''){
					evaluationBehaviourStore.requestBodiesBehaviour[k]["oral_stereotypic_behaviour_comments"] = this.oralBehaviourComments;
					}
					if(this.repetitiveMovementComments != ''){
					evaluationBehaviourStore.requestBodiesBehaviour[k]["repetitive_body_movement_comments"] = this.repetitiveMovementComments;
					}
					if(this.selfGroomingComments != ''){
					evaluationBehaviourStore.requestBodiesBehaviour[k]["self_grooming_behaviour_comments"] = this.selfGroomingComments;
					}
					if(this.regurgitationComments != ''){
					evaluationBehaviourStore.requestBodiesBehaviour[k]["regurgitation_reingestion_comments"] = this.regurgitationComments;
					}
					if(this.receivingAggressiveComments != ''){
					evaluationBehaviourStore.requestBodiesBehaviour[k]["receiving_aggressive_behaviour_comments"] = this.receivingAggressiveComments;
					}
					if(this.rakeMarksComments != ''){
					evaluationBehaviourStore.requestBodiesBehaviour[k]["rake_marks_comments"] = this.rakeMarksComments;
					}
					if(this.displayingAggressiveComments != ''){
					evaluationBehaviourStore.requestBodiesBehaviour[k]["displaying_aggressive_behaviour_comments"] = this.displayingAggressiveComments;
					}
					if(this.socialIsolationComments != ''){
					evaluationBehaviourStore.requestBodiesBehaviour[k]["social_isolation_comments"] = this.socialIsolationComments;
					}
					if(this.avoidancePoolAreasComments != ''){
					evaluationBehaviourStore.requestBodiesBehaviour[k]["avoidance_pool_areas_comments"] = this.avoidancePoolAreasComments;
					}

					if(localStorage.getItem('created_at') !== "") {
						evaluationBehaviourStore.requestBodiesBehaviour[k]["created_at"] = localStorage.getItem('created_at') as string;
					}
				}
			}
			this.resetData();
			dataInBody = true;
			localStorage.setItem('dataInBody', dataInBody.toString());
		},
		async resetData() {
			// Reset checkboxes
			for(let i = 0; i <= 14; i++){
				for(let j = 0; j < 3; j++){
					if (this.CheckboxArray[i][j] === true){
						this.CheckboxArray[i][j] = false;
					}
				}
			}
			// Reset comments
			this.environmentEnrichmentComments = '';
			this.affiliativeBehaviourComments = '';
			this.playBehaviourComments = '';
			this.socioSexualComments = '';
			this.maternalBehaviourComments = '';
			this.displacementBehaviourComments = '';
			this.oralBehaviourComments = '';
			this.repetitiveMovementComments = '';
			this.selfGroomingComments = '';
			this.regurgitationComments = '';
			this.receivingAggressiveComments = '';
			this.rakeMarksComments = '';
			this.displayingAggressiveComments = '';
			this.socialIsolationComments = '';
			this.avoidancePoolAreasComments = '';
		},
		//Methods to update the comments
		updateEnvironmentEnrichmentComments(comment: string) {
			this.environmentEnrichmentComments = comment;
		},
		updateAffiliativeBehaviourComments(comment: string) {
			this.affiliativeBehaviourComments = comment;
		},
		updatePlayBehaviourComments(comment: string) {
			this.playBehaviourComments = comment;
		},
		updateSocioSexualComments(comment: string) {
			this.socioSexualComments = comment;
		},
		updateMaternalBehaviourComments(comment: string) {
			this.maternalBehaviourComments = comment;
		},
		updateDisplacementBehaviourComments(comment: string) {
			this.displacementBehaviourComments = comment;
		},
		updateOralBehaviourComments(comment: string) {
			this.oralBehaviourComments = comment;
		},
		updateRepetitiveMovementComments(comment: string) {
			this.repetitiveMovementComments = comment;
		},
		updateSelfGroomingComments(comment: string) {
			this.selfGroomingComments = comment;
		},
		updateRegurgitationComments(comment: string) {
			this.regurgitationComments = comment;
		},
		updateReceivingAggressiveComments(comment: string) {
			this.receivingAggressiveComments = comment;
		},
		updateRakeMarksComments(comment: string) {
			this.rakeMarksComments = comment;
		},
		updateDisplayingAggressiveComments(comment: string) {
			this.displayingAggressiveComments = comment;
		},
		updateSocialIsolationComments(comment: string) {
			this.socialIsolationComments = comment;
		},
		updateAvoidancePoolAreasComments(comment: string) {
			this.avoidancePoolAreasComments = comment;
		},
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
			//const confirmed = confirm(this.$t('savingDataNext')); //Where is the variable savingDataNext initialized and what does it do?
     		const confirmed = true;
			if (confirmed) {
				//Check if the date of the test is the current date
				await this.confirmTestDate();
				//Store the checked values in the request body
				this.storeCheckedValues();
				console.log(this.CheckboxArray);
				// Flag to only show network error alert once instead of several times after another
				let alertShown = false;
				console.log('Reached this');
				for(let i = 0; i < evaluationBehaviourStore.requestBodiesBehaviour.length; i++){
					await axios
							.post(this.urlPost, evaluationBehaviourStore.requestBodiesBehaviour[i], { withCredentials: true })
							.then((response) => {
								console.log('Response:', response.data);
								if (i === evaluationBehaviourStore.requestBodiesBehaviour.length - 1){
									const targetUrl = '/detailBehaviour';
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
									// The fill method now resets the bodies
									//evaluationBehaviourStore.resetBodies();
									evaluationBehaviourStore.fill(dolphinsStore.dolphinList);
									this.dolphinSelect = [];
									this.criteria = null;
									localStorage.setItem('created_at', '');
								}
							})
							.catch((error) => {					
								const targetUrl = `/detailBehaviour`;
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
			}
		},
		async confirmRefresh() {
			const confirmed = true; //confirm(this.$t('savingDataNext'));
     		if (confirmed) {
				this.storeCheckedValues();
				console.log(evaluationBehaviourStore.requestBodiesBehaviour)
				
				toast.success('Saved temporarily. Click \'Finish Tests\' in the end!', {
					autoClose: 1000,
				});
				
				// Doing the same dolphinSelect with the next criteria in the list:
				switch (this.criteria) {
					case 'firstCriteriaBehaviour':
						this.criteria = 'secondCriteriaBehaviour';
						break;
					case 'secondCriteriaBehaviour':
						this.criteria = 'thirdCriteriaBehaviour';
						break;
					case 'thirdCriteriaBehaviour':
						this.criteria = 'fourthCriteriaBehaviour';
						break;
					case 'fourthCriteriaBehaviour':
						this.criteria = 'fifthCriteriaBehaviour';
						break;
					case 'fifthCriteriaBehaviour':
						this.criteria = 'sixthCriteriaBehaviour';
						break;
					case 'sixthCriteriaBehaviour':
						this.criteria = 'seventhCriteriaBehaviour';
						break;
					case 'seventhCriteriaBehaviour':
						this.criteria = 'eighthCriteriaBehaviour';
						break;
					case 'eighthCriteriaBehaviour':
						this.criteria = 'firstCriteriaBehaviour';
						break;			
					default:
						this.criteria = 'firstCriteriaBehaviour';
				}
				const targetUrl = `/detailBehaviour`;
				// No need to check if dataInBody true or false, because /detailBehaviour doesn´t
				// need to be protected from losing data
				this.$router.push(targetUrl);
			}	
    	},
		//Method to get the Dolphins
		showDolphins(){
			//this.dolphins = this.dolphinsStore.dolphinList;
			//console.log(this.dolphinsStore.dolphinList);
			//console.log(this.dolphins);
			//console.log(evaluationBehaviourStore.requestBodiesBehaviour);
		},
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
