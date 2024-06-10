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
					<ion-select-option
						v-for="dolphin in dolphinsStore.dolphinList"
						v-bind:key="dolphin.name"
					>
						{{ dolphin.name }}
					</ion-select-option>
				</ion-select>
			</ion-item>
			<ion-item>
				<ion-select
					:value="criteria"
					@IonChange="criteria = $event.target.value"
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
		<!--<ion-button v-if="criteria" fill="outline" @click="setOpenManual()">{{
			$t('userManual')
		}}</ion-button>-->

		<ion-modal :is-open="isOpenManual">
			<ion-header>
				<ion-toolbar>
					<ion-title v-if="criteria === 'firstCriteriaHealth'"
						>{{ $t('firstCriteriaHealth') }}
					</ion-title>
					<ion-title v-else-if="criteria === 'secondCriteriaHealth'"
						>{{ $t('secondCriteriaHealth') }}
					</ion-title>
					<ion-title v-else-if="criteria === 'thirdCriteriaHealth'"
						>{{ $t('thirdCriteriaHealth') }}
					</ion-title>
					<ion-title v-else-if="criteria === 'fourthCriteriaHealth'"
						>{{ $t('fourthCriteriaHealth') }}
					</ion-title>
					<ion-title v-else-if="criteria === 'fifthCriteriaHealth'"
						>{{ $t('fifthCriteriaHealth') }}
					</ion-title>
					<ion-title v-else-if="criteria === 'sixthCriteriaHealth'"
						>{{ $t('sixthCriteriaHealth') }}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="setOpenManual('')">{{
							$t('close')
						}}</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<div v-if="subcriteria === 'firstSubCriteriaHealth'">
					<h1>{{ $t('firstSubCriteriaHealth') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Health1') }}
					<h3>Score 2</h3>
					{{ $t('score2Health1') }}
				</div>
				<div v-if="subcriteria === 'secondSubCriteriaHealth'">
					<h1>{{ $t('secondSubCriteriaHealth') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Health2') }}
					<h3>Score 2</h3>
					{{ $t('score2Health2') }}
				</div>
				<div v-if="subcriteria === 'thirdSubCriteriaHealth'">
					<h1>{{ $t('thirdSubCriteriaHealth') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Health3') }}
					<h3>Score 2</h3>
					{{ $t('score2Health3') }}
				</div>
				<div v-if="subcriteria === 'fourthSubCriteriaHealth'">
					<h1>{{ $t('fourthSubCriteriaHealth') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Health4') }}
					<h3>Score 2</h3>
					{{ $t('score2Health4') }}
				</div>
				<div v-if="subcriteria === 'fifthSubCriteriaHealth'">
					<h1>{{ $t('fifthSubCriteriaHealth') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Health5') }}
					<h3>Score 2</h3>
					{{ $t('score2Health5') }}
				</div>
				<div v-if="subcriteria === 'sixthSubCriteriaHealth'">
					<h1>{{ $t('sixthSubCriteriaHealth') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Health6') }}
					<h3>Score 2</h3>
					{{ $t('score2Health6') }}
					<h2>Odontogramm Template:</h2>
					<img
						src="../../public/Odontogramm_template.png"
						alt="Odontogramm Tempplate"
					/>
					<h4>Odontogramm Color Schema:</h4>
					<img
						src="../../public/Odontogramm_color_schema.png"
						alt="Odontogramm Color Schema"
					/>
				</div>
				<div v-if="subcriteria === 'seventhSubCriteriaHealth'">
					<h1>{{ $t('seventhSubCriteriaHealth') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Health7') }}
					<h3>Score 2</h3>
					{{ $t('score2Health7') }}
				</div>
				<div v-if="subcriteria === 'eigthSubCriteriaHealth'">
					<h1>{{ $t('eigthSubCriteriaHealth') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Health8') }}
					<h3>Score 2</h3>
					{{ $t('score2Health8') }}
				</div>
				<div v-if="subcriteria === 'ninthSubCriteriaHealth'">
					<h1>{{ $t('ninthSubCriteriaHealth') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Health9') }}
					<h3>Score 2</h3>
					{{ $t('score2Health9') }}
				</div>
				<div v-if="subcriteria === 'tenthSubCriteriaHealth'">
					<h1>{{ $t('tenthSubCriteriaHealth') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Health10') }}
					<h3>Score 2</h3>
					{{ $t('score2Health10') }}
				</div>
				<div v-if="subcriteria === 'eleventhSubCriteriaHealth'">
					<h1>{{ $t('eleventhSubCriteriaHealth') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Health11') }}
					<h3>Score 2</h3>
					{{ $t('score2Health11') }}
				</div>
				<div v-if="subcriteria === 'twelvthSubCriteriaHealth'">
					<h1>{{ $t('twelvthSubCriteriaHealth') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Health12') }}
					<h3>Score 2</h3>
					{{ $t('score2Health12') }}
				</div>
				<div v-if="subcriteria === 'thirteenthSubCriteriaHealth'">
					<h1>{{ $t('thirteenthSubCriteriaHealth') }}</h1>
					<h3>Score 0</h3>
					{{ $t('score0Health13') }}
					<h3>Score 2</h3>
					{{ $t('score2Health13') }}
				</div>
				<div v-if="subcriteria === 'rakeMarksScoring'">
					<h1>{{ $t('rakeMarksScoring') }}</h1>
					<h4>{{ $t('rakeMarksScoringMale') }}</h4>
					<img
						src="../../DolphinWET_RakeMarkScoring_male_DANIEL.svg"
						alt="Silhouette of male dolphin for drawing the rake marks."
					/>
					<ion-button fill="clear" size="large" @click="getSVGFemaleDolphin">
						Download SVG file
						<ion-icon slot="start" :icon="download"></ion-icon>
					</ion-button>
					<h4>{{ $t('rakeMarksScoringFemale') }}</h4>
					<img
						src="../../DolphinWET_RakeMarkScoring_female_DANIEL.svg"
						alt="Silhouette of female dolphin for drawing the rake marks."
					/>
					<ion-button fill="clear" size="large" @click="getSVGMaleDolphin">
						Download SVG file
						<ion-icon slot="start" :icon="download"></ion-icon>
					</ion-button>
				</div>
			</ion-content>
		</ion-modal>
		<!-- End of Description of Criteria (User Manual) -->
		<!-- Start of Checkboxes-->
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'firstCriteriaHealth'
			"
		>
			<ion-card-title class="card-title">{{
				$t('firstSubCriteriaHealth')
			}}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('firstSubCriteriaHealth')"
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
				<CheckComments @update-comment="updateNormalFloatabilityComments" />
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'firstCriteriaHealth'
			"
		>
			<ion-card-title class="card-title">{{
				$t('secondSubCriteriaHealth')
			}}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('secondSubCriteriaHealth')"
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
					@update-comment="updateNormalFloatabilityRecordsComments"
				/>
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'firstCriteriaHealth'
			"
		>
			<ion-card-title class="card-title" style="margin-bottom: 15px"
				>If applicable, upload your video here</ion-card-title
			>
			<ion-item>
				<VideoUpload id="video1" @form-submitted="handleFormSubmittedVideo" />
			</ion-item>
			<ion-item>
				Total file size: {{ totalFileSize.toFixed(2) }} MB / 10 MB
			</ion-item>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'secondCriteriaHealth'
			"
		>
			<ion-card-title class="card-title">{{
				$t('thirdSubCriteriaHealth')
			}}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('thirdSubCriteriaHealth')"
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
				<CheckComments @update-comment="updateEyeLesionsComments" />
				<!--<ion-item>
					<ion-label><br>Upload your eye photos here:</ion-label>
				</ion-item>
				<ion-item>
					<PhotoUpload @form-submitted="handleFormSubmittedEyePhoto"/>
				</ion-item>-->
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'secondCriteriaHealth'
			"
		>
			<ion-card-title class="card-title" style="margin-bottom: 15px"
				>Upload your eye photos here</ion-card-title
			>
			<ion-item>
				<ion-thumbnail slot="start">
					<img
						v-if="
							lastPictureType === 'eye' &&
							previewImageUrl &&
							previewImageUrl != ''
						"
						:src="previewImageUrl"
					/>
				</ion-thumbnail>
				<ion-button type="button" fill="clear" @click="takePhoto('eye')">
					<ion-icon slot="start" :icon="camera"></ion-icon>
					{{ $t('photo') }}
				</ion-button>
			</ion-item>
			<ion-item>
				<PhotoUpload id="eye" @form-submitted="handleFormSubmittedPhoto" />
			</ion-item>
			<ion-item>
				Total file size: {{ totalFileSize.toFixed(2) }} MB / 10 MB
			</ion-item>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'secondCriteriaHealth'
			"
		>
			<ion-card-title class="card-title">{{
				$t('fourthSubCriteriaHealth')
			}}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('fourthSubCriteriaHealth')"
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
				<CheckComments @update-comment="updateVisualCuesComments" />
				<ion-item> </ion-item>
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'secondCriteriaHealth'
			"
		>
			<ion-card-title class="card-title">{{
				$t('fifthSubCriteriaHealth')
			}}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('fifthSubCriteriaHealth')"
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
				<CheckComments @update-comment="updateEyeLesionsRecordsComments" />
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'secondCriteriaHealth'
			"
		>
			<ion-card-title class="card-title" style="margin-bottom: 15px"
				>If applicable, upload your video here</ion-card-title
			>
			<ion-item>
				<VideoUpload id="video2" @form-submitted="handleFormSubmittedVideo" />
			</ion-item>
			<ion-item>
				Total file size: {{ totalFileSize.toFixed(2) }} MB / 10 MB
			</ion-item>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'thirdCriteriaHealth'
			"
		>
			<ion-card-title class="card-title">{{
				$t('sixthSubCriteriaHealth')
			}}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('sixthSubCriteriaHealth')"
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
				<CheckComments @update-comment="updateMouthExamComments" />
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'thirdCriteriaHealth'
			"
		>
			<ion-card-title class="card-title" style="margin-bottom: 15px"
				>Upload your teeth photos here</ion-card-title
			>
			<ion-item>
				<ion-thumbnail slot="start">
					<img
						v-if="
							lastPictureType === 'teeth' &&
							previewImageUrl &&
							previewImageUrl != ''
						"
						:src="previewImageUrl"
					/>
				</ion-thumbnail>
				<ion-button type="button" fill="clear" @click="takePhoto('teeth')">
					<ion-icon slot="start" :icon="camera"></ion-icon>
					{{ $t('photo') }}
				</ion-button>
			</ion-item>
			<ion-item>
				<PhotoUpload id="teeth" @form-submitted="handleFormSubmittedPhoto" />
			</ion-item>
			<ion-item>
				Total file size: {{ totalFileSize.toFixed(2) }} MB / 10 MB
			</ion-item>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'thirdCriteriaHealth'
			"
		>
			<ion-card-title class="card-title">{{
				$t('seventhSubCriteriaHealth')
			}}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('seventhSubCriteriaHealth')"
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
				<CheckComments @update-comment="updateOralLesionsRecordsComments" />
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'thirdCriteriaHealth'
			"
		>
			<ion-card-title class="card-title" style="margin-bottom: 15px"
				>Upload your odontogramms here</ion-card-title
			>
			<ion-item>
				<ion-thumbnail slot="start">
					<img
						v-if="
							lastPictureType === 'odontogramm' &&
							previewImageUrl &&
							previewImageUrl != ''
						"
						:src="previewImageUrl"
					/>
				</ion-thumbnail>
				<ion-button
					type="button"
					fill="clear"
					@click="takePhoto('odontogramm')"
				>
					<ion-icon slot="start" :icon="camera"></ion-icon>
					{{ $t('photo') }}
				</ion-button>
			</ion-item>
			<ion-item>
				<PhotoUpload
					id="odontogramm"
					@form-submitted="handleFormSubmittedPhoto"
				/>
			</ion-item>
			<ion-item>
				Total file size: {{ totalFileSize.toFixed(2) }} MB / 10 MB
			</ion-item>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'thirdCriteriaHealth'
			"
		>
			<ion-card-title class="card-title" style="margin-bottom: 15px"
				>If applicable, upload your video here</ion-card-title
			>
			<ion-item>
				<VideoUpload id="video3" @form-submitted="handleFormSubmittedVideo" />
			</ion-item>
			<ion-item>
				Total file size: {{ totalFileSize.toFixed(2) }} MB / 10 MB
			</ion-item>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'fourthCriteriaHealth'
			"
		>
			<ion-card-title class="card-title">{{
				$t('eigthSubCriteriaHealth')
			}}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('eigthSubCriteriaHealth')"
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
					@update-comment="updateGastricAbnormalityRecordsComments"
				/>
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'fourthCriteriaHealth'
			"
		>
			<ion-card-title class="card-title" style="margin-bottom: 15px"
				>If applicable, upload your video here</ion-card-title
			>
			<ion-item>
				<VideoUpload id="video4" @form-submitted="handleFormSubmittedVideo" />
			</ion-item>
			<ion-item>
				Total file size: {{ totalFileSize.toFixed(2) }} MB / 10 MB
			</ion-item>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'fifthCriteriaHealth'
			"
		>
			<ion-card-title class="card-title">{{
				$t('ninthSubCriteriaHealth')
			}}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('ninthSubCriteriaHealth')"
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
				<CheckComments @update-comment="updateRespiratoryDiseaseComments" />
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'fifthCriteriaHealth'
			"
		>
			<ion-card-title class="card-title">{{
				$t('tenthSubCriteriaHealth')
			}}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('tenthSubCriteriaHealth')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[9][0]" @click="handleClick(9, 0)"
						>Score 0</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox v-model="CheckboxArray[9][2]" @click="handleClick(9, 2)"
						>Score 2</ion-checkbox
					>
				</ion-item>
				<CheckComments @update-comment="updateForceExpirationComments" />
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'fifthCriteriaHealth'
			"
		>
			<ion-card-title class="card-title">{{
				$t('eleventhSubCriteriaHealth')
			}}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('eleventhSubCriteriaHealth')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-list>
				<ion-item>
					<ion-checkbox
						v-model="CheckboxArray[10][0]"
						@click="handleClick(10, 0)"
						>Score 0</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox
						v-model="CheckboxArray[10][2]"
						@click="handleClick(10, 2)"
						>Score 2</ion-checkbox
					>
				</ion-item>
				<CheckComments
					@update-comment="updateRespiratoryDiseaseRecordsComments"
				/>
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'fifthCriteriaHealth'
			"
		>
			<ion-card-title class="card-title" style="margin-bottom: 15px"
				>If applicable, upload your video here</ion-card-title
			>
			<ion-item>
				<VideoUpload id="video5" @form-submitted="handleFormSubmittedVideo" />
			</ion-item>
			<ion-item>
				Total file size: {{ totalFileSize.toFixed(2) }} MB / 10 MB
			</ion-item>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'sixthCriteriaHealth'
			"
		>
			<ion-card-title class="card-title">{{
				$t('twelvthSubCriteriaHealth')
			}}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('twelvthSubCriteriaHealth')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-list>
				<ion-item>
					<ion-checkbox
						v-model="CheckboxArray[11][0]"
						@click="handleClick(11, 0)"
						>Score 0</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox
						v-model="CheckboxArray[11][2]"
						@click="handleClick(11, 2)"
						>Score 2</ion-checkbox
					>
				</ion-item>
				<CheckComments @update-comment="updateMarksComments" />
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'sixthCriteriaHealth'
			"
		>
			<ion-card-title class="card-title" style="margin-bottom: 15px"
				>Upload your marks photos here</ion-card-title
			>
			<ion-item>
				<ion-thumbnail slot="start">
					<img
						v-if="
							lastPictureType === 'marks' &&
							previewImageUrl &&
							previewImageUrl != ''
						"
						:src="previewImageUrl"
					/>
				</ion-thumbnail>
				<ion-button type="button" fill="clear" @click="takePhoto('marks')">
					<ion-icon slot="start" :icon="camera"></ion-icon>
					{{ $t('photo') }}
				</ion-button>
			</ion-item>
			<ion-item>
				<PhotoUpload id="marks" @form-submitted="handleFormSubmittedPhoto" />
			</ion-item>
			<ion-item>
				Total file size: {{ totalFileSize.toFixed(2) }} MB / 10 MB
			</ion-item>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'sixthCriteriaHealth'
			"
		>
			<ion-card-title class="card-title" style="margin-bottom: 15px">{{
				$t('rakeMarksScoring')
			}}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('rakeMarksScoring')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-item>
				<ion-thumbnail slot="start">
					<img
						v-if="
							lastPictureType === 'silhouette' &&
							previewImageUrl &&
							previewImageUrl != ''
						"
						:src="previewImageUrl"
					/>
				</ion-thumbnail>
				<ion-button type="button" fill="clear" @click="takePhoto('silhouette')">
					<ion-icon slot="start" :icon="camera"></ion-icon>
					{{ $t('photo') }}
				</ion-button>
			</ion-item>
			<ion-item>
				<PhotoUpload
					id="silhouette"
					@form-submitted="handleFormSubmittedPhoto"
				/>
			</ion-item>
			<ion-item>
				Total file size: {{ totalFileSize.toFixed(2) }} MB / 10 MB
			</ion-item>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'sixthCriteriaHealth'
			"
		>
			<ion-card-title class="card-title">{{
				$t('thirteenthSubCriteriaHealth')
			}}</ion-card-title>
			<ion-button
				v-if="criteria"
				fill="outline"
				@click="setOpenManual('thirteenthSubCriteriaHealth')"
				>{{ $t('userManual') }}</ion-button
			>
			<ion-list>
				<ion-item>
					<ion-checkbox
						v-model="CheckboxArray[12][0]"
						@click="handleClick(12, 0)"
						>Score 0</ion-checkbox
					>
				</ion-item>
				<ion-item>
					<ion-checkbox
						v-model="CheckboxArray[12][2]"
						@click="handleClick(12, 2)"
						>Score 2</ion-checkbox
					>
				</ion-item>
				<CheckComments @update-comment="updateExternalDiseaseComments" />
			</ion-list>
		</ion-card>
		<ion-card
			v-if="
				dolphinSelect &&
				dolphinSelect.length !== 0 &&
				criteria === 'sixthCriteriaHealth'
			"
		>
			<ion-card-title class="card-title" style="margin-bottom: 15px"
				>If applicable, upload your video here</ion-card-title
			>
			<ion-item>
				<VideoUpload id="video6" @form-submitted="handleFormSubmittedVideo" />
			</ion-item>
			<ion-item>
				Total file size: {{ totalFileSize.toFixed(2) }} MB / 10 MB
			</ion-item>
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
import { camera, download } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import CheckComments from '@/components/CheckComments.vue';
import PhotoUpload from '@/components/PhotoUpload.vue';
import VideoUpload from '@/components/VideoUpload.vue';
import { useDolphinsStore } from '@/store/dolphinsStore';
import { useEvaluationHealthStore } from '@/store/evaluationHealthStore';
import { baseUrl } from '@/utils/baseUrl';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { Browser } from '@capacitor/browser';

let dataInBody; //Variable which gets saved in localstorage with either true or false, depending if data is in checkboxes or evaluationFeedingStore
const dolphinsStore = useDolphinsStore();
const evaluationHealthStore = useEvaluationHealthStore();

import {
	IonItem,
	IonList,
	IonSelect,
	IonCard,
	IonCardTitle,
	IonSelectOption,
	IonModal,
	IonHeader,
	IonToolbar,
	IonContent,
	IonTitle,
	IonButtons,
	IonFooter,
	IonButton,
	IonIcon,
	IonCheckbox,
	alertController,
} from '@ionic/vue';

export default {
	components: {
		IonItem,
		IonList,
		IonSelect,
		IonSelectOption,
		IonFooter,
		IonModal,
		IonHeader,
		IonToolbar,
		IonContent,
		IonTitle,
		IonButtons,
		IonButton,
		CheckComments,
		PhotoUpload,
		VideoUpload,
		IonIcon,
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
			CheckboxArray: Array.from({ length: 13 }, () => Array(3).fill(false)),
			camera,
			previewImageUrl: '',
			lastPictureType: '',
			dolphinList: [] as { name: string }[],
			urlPost: baseUrl + '/api/good_health',
			urlPostPhoto: baseUrl + '/api/photo',
			urlPostVideo: baseUrl + '/api/video',
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

			formData: [] as FormData[],
			formDataVideo: [] as FormData[],
			sessionStorage: {
				photo_type: '',
				eye_photo_path: '',
				teeth_photo_path: '',
				odontogramm_photo_path: '',
				marks_photo_path: '',
				silhouette_photo_path: '',
				file_path: '',
				dolphin_name: '',
				video_path: '',
			},
			totalFileSize: 0,
			download,
		};
	},

	methods: {
		setOpenManual(subcriteria: string) {
			//Set the subcriteria to display the correct user manual if the user manual is opened
			this.subcriteria = subcriteria;
			this.isOpenManual = !this.isOpenManual;
			if (this.isOpenManual === false) {
				this.subcriteria = ''; //set empty if user manual is closed
			}
		},
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
		async resetData() {
			console.log('resetData() called');
			// Reset the checkboxes
			for (let i = 0; i <= 12; i++) {
				for (let j = 0; j < 3; j++) {
					if (this.CheckboxArray[i][j] === true) {
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
		handleFormSubmittedVideo({ id, files }: { id: string; files: File[] }) {
			if (files && this.dolphinSelect != '') {
				this.sessionStorage = {
					photo_type: '',
					eye_photo_path: '',
					teeth_photo_path: '',
					odontogramm_photo_path: '',
					marks_photo_path: '',
					silhouette_photo_path: '',
					file_path: '',
					video_path: '',
					dolphin_name: '',
				};
				console.log('Form Data accessed in HealthCheckCriteriaSelector.vue:');
				const newFormData = new FormData();
				if (this.dolphinSelect != '') {
					newFormData.append('dolphin_name', this.dolphinSelect || ''); // Append the dolphin name with a default value of an empty string
				}
				//newFormData.append('photo_type', 'eye'); //Append the photo type
				// Then append the rest of the fields

				console.log('Number of videos: ' + files.length);

				for (let i = 0; i < files.length; i++) {
					console.log(files[i]);
					newFormData.append('files', files[i]);
				}

				// Keep track of total file size
				let totalSize = this.totalFileSize;
				for (let i = 0; i < files.length; i++) {
					console.log(files[i]);
					// Add the size of each file to the total
					// 1 MB = 1048576 bytes
					totalSize += files[i].size / 1048576;
					newFormData.append('files', files[i]);
				}

				// If all the files exceed 10 MB the last file to be uploaded will not be uploaded
				if (totalSize < 10) {
					// This check prevents the video to be overwritten by one of the other video upload components
					if (id === 'video1') {
						this.formDataVideo.push(newFormData);
					} else if (id === 'video2') {
						this.formDataVideo.push(newFormData);
					} else if (id === 'video3') {
						this.formDataVideo.push(newFormData);
					} else if (id === 'video4') {
						this.formDataVideo.push(newFormData);
					} else if (id === 'video5') {
						this.formDataVideo.push(newFormData);
					} else if (id === 'video6') {
						this.formDataVideo.push(newFormData);
					}

					this.totalFileSize = totalSize;
					console.log(...this.formData);
					console.log('Total file size: ', this.totalFileSize);
				} else {
					//Don´t assign here totalSize to this.totalFileSize because picture wasn´t uploaded
					toast.error(
						'Total file size exceeds 10 MB! Lastly added file will not be uploaded',
						{
							autoClose: 4000,
						}
					);
				}

				console.log(...this.formDataVideo);
			}
		},
		handleFormSubmittedPhoto({ id, files }: { id: string; files: File[] }) {
			if (files && this.dolphinSelect != '') {
				this.sessionStorage = {
					photo_type: '',
					eye_photo_path: '',
					teeth_photo_path: '',
					odontogramm_photo_path: '',
					marks_photo_path: '',
					silhouette_photo_path: '',
					file_path: '',
					video_path: '',
					dolphin_name: '',
				};
				console.log('Form Data accessed in HealthCheckCriteriaSelector.vue:');
				const newFormData = new FormData();
				if (this.dolphinSelect != '') {
					newFormData.append('dolphin_name', this.dolphinSelect || ''); // Append the dolphin name with a default value of an empty string
				}

				// Then append the rest of the fields
				console.log('Number of pictures: ' + files.length);

				// This check prevents the photo to be overwritten by one of the other photo uploads
				if (id === 'eye') {
					newFormData.append('photo_type', 'eye'); //Append the photo type
				} else if (id === 'teeth') {
					newFormData.append('photo_type', 'teeth'); //Append the photo type
				} else if (id === 'odontogramm') {
					newFormData.append('photo_type', 'odontogramm'); //Append the photo type
				} else if (id === 'marks') {
					newFormData.append('photo_type', 'marks'); //Append the photo type
				} else if (id === 'silhouette') {
					newFormData.append('photo_type', 'silhouette'); //Append the photo type
				}

				// Keep track of total file size
				let totalSize = this.totalFileSize;
				for (let i = 0; i < files.length; i++) {
					console.log(files[i]);
					// Add the size of each file to the total
					// 1 MB = 1048576 bytes
					totalSize += files[i].size / 1048576;
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
					toast.error(
						'Total file size exceeds 10 MB! Lastly added file will not be uploaded',
						{
							autoClose: 4000,
						}
					);
				}
			}
		},
		async setupSessionStorage() {
			// We have to send a req.body to set up the session storage in backend
			// Even though the req.body is not being used in the backend. I don´t
			// know why, just leave it there, otherwise req.session will not work
			// in the backend
			await this.$axios
				.post(baseUrl + '/api/setup_session_storage', this.sessionStorage, {
					withCredentials: true,
					hideGlobalLoading: true,
				})
				.then((response: any) => {
					console.log('Response setup session storage:', response.data);
				})
				.catch((error: any) => {
					console.error('Error:', error);
				});
		},
		// Method to collect the checked checkboxes and give request Body the scores
		storeCheckedValues() {
			for (
				let k = 0;
				k < evaluationHealthStore.requestBodiesHealth.length;
				k++
			) {
				if (
					this.dolphinSelect ===
					evaluationHealthStore.requestBodiesHealth[k]['dolphin_name']
				) {
					if (this.dolphinSelect !== null) {
						evaluationHealthStore.requestBodiesHealth[k]['dolphin_name'] =
							this.dolphinSelect;
					}
					for (let i = 0; i < this.CheckboxArray.length; i++) {
						for (let j = 0; j < this.CheckboxArray[i].length; j++) {
							if (this.CheckboxArray[i][j] === true && i === 0) {
								evaluationHealthStore.requestBodiesHealth[k][
									'normal_floatability'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 1) {
								evaluationHealthStore.requestBodiesHealth[k][
									'records_normal_floatability'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 2) {
								evaluationHealthStore.requestBodiesHealth[k][
									'inspection_eye_lesions'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 3) {
								evaluationHealthStore.requestBodiesHealth[k][
									'response_visual_cues'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 4) {
								evaluationHealthStore.requestBodiesHealth[k][
									'records_eye_lesions'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 5) {
								evaluationHealthStore.requestBodiesHealth[k]['mouth_exam'] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 6) {
								evaluationHealthStore.requestBodiesHealth[k][
									'records_oral_lesions'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 7) {
								evaluationHealthStore.requestBodiesHealth[k][
									'records_gastric_abnormality'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 8) {
								evaluationHealthStore.requestBodiesHealth[k][
									'inspection_respiratory'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 9) {
								evaluationHealthStore.requestBodiesHealth[k][
									'force_expiration'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 10) {
								evaluationHealthStore.requestBodiesHealth[k][
									'records_respiratory_disease'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 11) {
								evaluationHealthStore.requestBodiesHealth[k][
									'inspection_marks'
								] = j;
							} else if (this.CheckboxArray[i][j] === true && i === 12) {
								evaluationHealthStore.requestBodiesHealth[k][
									'records_external_disease'
								] = j;
							}
						}
					}
					// Code here the comments into the request body
					// First check with if statement if comments had been updated or not. If we don´t do that we override the comments with
					// an empty string if we click on 'Next Test'
					if (this.normal_floatability_comments != '') {
						evaluationHealthStore.requestBodiesHealth[k][
							'normal_floatability_comments'
						] = this.normal_floatability_comments;
					}
					if (this.records_normal_floatability_comments != '') {
						evaluationHealthStore.requestBodiesHealth[k][
							'records_normal_floatability_comments'
						] = this.records_normal_floatability_comments;
					}
					if (this.inspection_eye_lesions_comments != '') {
						evaluationHealthStore.requestBodiesHealth[k][
							'inspection_eye_lesions_comments'
						] = this.inspection_eye_lesions_comments;
					}
					if (this.response_visual_cues_comments != '') {
						evaluationHealthStore.requestBodiesHealth[k][
							'response_visual_cues_comments'
						] = this.response_visual_cues_comments;
					}
					if (this.records_eye_lesions_comments != '') {
						evaluationHealthStore.requestBodiesHealth[k][
							'records_eye_lesions_comments'
						] = this.records_eye_lesions_comments;
					}
					if (this.mouth_exam_comments != '') {
						evaluationHealthStore.requestBodiesHealth[k][
							'mouth_exam_comments'
						] = this.mouth_exam_comments;
					}
					if (this.records_oral_lesions_comments != '') {
						evaluationHealthStore.requestBodiesHealth[k][
							'records_oral_lesions_comments'
						] = this.records_oral_lesions_comments;
					}
					if (this.records_gastric_abnormality_comments != '') {
						evaluationHealthStore.requestBodiesHealth[k][
							'records_gastric_abnormality_comments'
						] = this.records_gastric_abnormality_comments;
					}
					if (this.inspection_respiratory_comments != '') {
						evaluationHealthStore.requestBodiesHealth[k][
							'inspection_respiratory_comments'
						] = this.inspection_respiratory_comments;
					}
					if (this.force_expiration_comments != '') {
						evaluationHealthStore.requestBodiesHealth[k][
							'force_expiration_comments'
						] = this.force_expiration_comments;
					}
					if (this.records_respiratory_disease_comments != '') {
						evaluationHealthStore.requestBodiesHealth[k][
							'records_respiratory_disease_comments'
						] = this.records_respiratory_disease_comments;
					}
					if (this.inspection_marks_comments != '') {
						evaluationHealthStore.requestBodiesHealth[k][
							'inspection_marks_comments'
						] = this.inspection_marks_comments;
					}
					if (this.records_external_disease_comments != '') {
						evaluationHealthStore.requestBodiesHealth[k][
							'records_external_disease_comments'
						] = this.records_external_disease_comments;
					}
					if (localStorage.getItem('created_at') !== '') {
						evaluationHealthStore.requestBodiesHealth[k]['created_at'] =
							localStorage.getItem('created_at') as string;
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
		async getSVGFemaleDolphin() {
			try {
				const fileName = 'DolphinWET_RakeMarkScoring_female_DANIEL.svg'; // file name of the file saved on the server
				const fileUrl = baseUrl + '/api/files/' + fileName;
				await Browser.open({ url: fileUrl });
			} catch (error) {
				console.error('Error: ', error);
			}
		},
		async getSVGMaleDolphin() {
			try {
				const fileName = 'DolphinWET_RakeMarkScoring_male_DANIEL.svg'; // file name of the file saved on the server
				const fileUrl = baseUrl + '/api/files/' + fileName;
				await Browser.open({ url: fileUrl });
			} catch (error) {
				console.error('Error: ', error);
			}
		},
		//Method to show the alert to confirm the test date
		async confirmTestDate() {
			return new Promise((resolve) => {
				alertController
					.create({
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
					})
					.then((alert) => {
						alert.present();
					});
			});
		},

		//Method to send the data to database
		async storeData() {
			//const confirmed = confirm(this.$t('savingDataNext'));
			const confirmed = true;
			if (confirmed) {
				await this.confirmTestDate();
				await this.storeCheckedValues();
				// Flag to only show network error alert once instead of several times after another
				let alertShown = false;
				console.log(this.CheckboxArray);
				for (
					let i = 0;
					i < evaluationHealthStore.requestBodiesHealth.length;
					i++
				) {
					console.log(
						evaluationHealthStore.requestBodiesHealth[i]['dolphin_name']
					);
					// Setting up session storage
					await this.setupSessionStorage();
					await this.photoUpload(
						evaluationHealthStore.requestBodiesHealth[i]['dolphin_name']
					);
					await this.videoUpload(
						evaluationHealthStore.requestBodiesHealth[i]['dolphin_name']
					);
					console.log(
						'This is sent to backend: ',
						evaluationHealthStore.requestBodiesHealth[i]
					);
					await this.$axios
						.post(this.urlPost, evaluationHealthStore.requestBodiesHealth[i], {
							withCredentials: true,
							//hideGlobalLoading: false,
						})
						.then((response: any) => {
							console.log('Response:', response.data);
							if (i === evaluationHealthStore.requestBodiesHealth.length - 1) {
								const targetUrl = '/detailHealth'; //'/folder/Evaluate';
								toast.success('Data uploaded successfully', {
									autoClose: 1000,
								});
								setTimeout(() => {
									// Set flag to false, so if user wants to go to another route he can
									// without losing data, because data is now successfully uploaded
									dataInBody = false;
									localStorage.setItem('dataInBody', dataInBody.toString());
									localStorage.setItem('backButtonClicked', 'false');
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
						.catch((error: any) => {
							console.error('Error:', error.response.data);
							const targetUrl = `/detailHealth`;
							if (error.message === 'Network Error' && !alertShown) {
								alertShown = true;
								//console.log('Inside error catch block');
								toast.error(
									'Data upload failed! Check internet connectivity.',
									{
										autoClose: 2000,
									}
								);
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
			this.formDataVideo = [];
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
				console.log(evaluationHealthStore.requestBodiesHealth);

				this.previewImageUrl = ''; //Reset the preview image
				toast.success("Saved temporarily. Click 'Finish Tests' in the end!", {
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
						this.criteria = 'fifthCriteriaHealth';
						break;
					case 'fifthCriteriaHealth':
						this.criteria = 'sixthCriteriaHealth';
						break;
					/*case 'sixthCriteriaHealth':
						this.criteria = 'firstCriteriaHealth';
						break;*/
					default:
						this.criteria = 'firstCriteriaHealth';
				}

				//this.dolphinSelect = null;
				//this.criteria = null;
				const targetUrl = `/detailHealth`;
				this.$router.push(targetUrl);
			}
		},
		async photoUpload(dolphin_name: string) {
			// This method is called for one dolphin at a time
			// Check if there is a photo to upload
			if (this.formData != null) {
				// Find the FormData object with the desired dolphin_name
				console.log('Length formData array: ', this.formData.length);
				let desiredFormData = [];
				for (let i = 0; i < this.formData.length; i++) {
					if (this.formData[i].get('dolphin_name') === dolphin_name) {
						if (desiredFormData.length === 0) {
							//If desiredFormData doesn't exist yet, create a new array with the form data
							desiredFormData[0] = this.formData[i];
						} else {
							//If desiredFormData already exists for this dolphin, push the new form data to the array desiredFormData
							desiredFormData.push(this.formData[i]);
							console.log('Found the desired form data: ', ...desiredFormData);
						}
					}
				}

				//const desiredFormData = this.formData.find(formData => formData.get('dolphin_name') === dolphin_name);

				console.log('Desired form data:', desiredFormData);
				if (desiredFormData.length != 0) {
					console.log('Form Data accessed in HealthCheckCriteriaSelector.vue');
					console.log(...desiredFormData);

					for (let i = 0; i < desiredFormData.length; i++) {
						// Send the photo to the server
						await this.$axios
							.post(this.urlPostPhoto, desiredFormData[i], {
								/*headers: {
									'Content-Type': 'multipart/form-data',
								},*/
								withCredentials: true,
								//hideGlobalLoading: true,
							})
							.then((response: any) => {
								console.log('Response:', response.data);
							})
							.catch((error: any) => {
								console.error(
									'Error during photo Upload:',
									JSON.stringify(error)
								);
							});
					}
					//Reset the form data
					desiredFormData = [];
					this.previewImageUrl = '';
					this.lastPictureType = '';
					this.totalFileSize = 0;
					//console.log('Resetted form data: '+ this.formData);
				}
			}
		},
		async videoUpload(dolphin_name: string) {
			// This method is called for one dolphin at a time
			// Check if there is a video to upload
			if (this.formDataVideo != null) {
				// Find the FormData object with the desired dolphin_name
				console.log('Length formData array: ', this.formDataVideo.length);
				let desiredFormData = [];
				for (let i = 0; i < this.formDataVideo.length; i++) {
					if (this.formDataVideo[i].get('dolphin_name') === dolphin_name) {
						if (desiredFormData.length === 0) {
							//If desiredFormData doesn't exist yet, create a new array with the form data
							desiredFormData[0] = this.formDataVideo[i];
						} else {
							//If desiredFormData already exists for this dolphin, push the new form data to the array desiredFormData
							desiredFormData.push(this.formDataVideo[i]);
							console.log('Found the desired form data: ', ...desiredFormData);
						}
					}
				}
				console.log('Desired form data:', desiredFormData);
				if (desiredFormData.length != 0) {
					console.log('Form Data accessed in HealthCheckCriteriaSelector.vue');
					console.log(...desiredFormData);

					for (let i = 0; i < desiredFormData.length; i++) {
						// Send the video to the server
						await this.$axios
							.post(this.urlPostVideo, desiredFormData[i], {
								withCredentials: true,
								hideGlobalLoading: false,
							})
							.then((response: any) => {
								console.log('Response:', response.data);
							})
							.catch((error: any) => {
								console.error(
									'Error during video Upload:',
									JSON.stringify(error)
								);
							});
					}
					//Reset the form data
					desiredFormData = [];
					this.totalFileSize = 0;
					//console.log('Resetted form data: '+ this.formData);
				}
			}
		},

		async takePhoto(id: string) {
			const photo = await Camera.getPhoto({
				resultType: CameraResultType.Uri,
				source: CameraSource.Camera,
				allowEditing: false,
				quality: 90,
			});

			if (this.dolphinSelect != '' && photo.webPath) {
				this.previewImageUrl = photo.webPath; //Preview of the image on the mobile phone´s screen
				const newFormData = new FormData();

				// This check prevents the photo to be overwritten by one of the other photo uploads
				if (id === 'eye') {
					newFormData.append('photo_type', 'eye'); //Append the photo type
				} else if (id === 'teeth') {
					newFormData.append('photo_type', 'teeth'); //Append the photo type
				} else if (id === 'odontogramm') {
					newFormData.append('photo_type', 'odontogramm'); //Append the photo type
				} else if (id === 'marks') {
					newFormData.append('photo_type', 'marks'); //Append the photo type
				} else if (id === 'silhouette') {
					newFormData.append('photo_type', 'silhouette'); //Append the photo type
				}

				newFormData.append('dolphin_name', this.dolphinSelect || ''); // Append the dolphin name with a default value of an empty string

				// Convert the photo webPath to a blob which can be appended to the formData
				const response = await fetch(photo.webPath);
				const blob = await response.blob();
				const file = new File([blob], 'photo.jpg', { type: blob.type }); //name of file irrelevant. Will be newly named in backend

				newFormData.append('files', file);
				this.formData.push(newFormData); //this.formData will be sent to backend server
				this.lastPictureType = id; //Save the last picture type for the preview on the ion page
				console.log(...this.formData);
			}
		},
		/*emitSubCriteriaUpdated() {
            const SubCriteria = this.SubCriteria;
            
            this.$emit('SubCriteria-updated', SubCriteria);
        }*/
	},
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
.card-title {
	margin: 5px;
}
</style>
```
