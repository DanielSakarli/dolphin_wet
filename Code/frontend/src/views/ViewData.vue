<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button></ion-menu-button>
				</ion-buttons>
				<ion-title>Dolphin WET - Welfare Evaluation Tool</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ion-list>
				<ion-item>
					<ion-select
						label="Dolphins"
						placeholder="select Dolphin"
						okText="OK"
						cancelText="Cancel"
						v-model="dolphinSelect"
					>
						<ion-select-option value="">All dolphins</ion-select-option>
						<ion-select-option
							v-for="dolphin in dolphinsStore.dolphinList"
							v-bind:key="dolphin.name"
							>{{ dolphin.name }}</ion-select-option
						>
					</ion-select>
				</ion-item>
				<ion-item>
					<ion-select
						label="Principle"
						placeholder="select Principle"
						okText="OK"
						cancelText="Cancel"
						v-model="principleSelect"
					>
						<ion-select-option
							v-for="(principle, index) in principles"
							:key="index"
							:value="principle.value"
						>
							{{ principle.display }}
						</ion-select-option>
						<!--<ion-select-option v-for="principle in principles">{{
							principle
						}}</ion-select-option>-->
					</ion-select>
				</ion-item>
				<!--Put here the button for choosing how long ago the data should be displayed (1, 2, 3, ... months and so on)-->
				<ion-item>
					<ion-select
						label="Time Period"
						placeholder="select Time Period"
						okText="OK"
						cancelText="Cancel"
						v-model="numMonths"
					>
						<ion-select-option value="1">1 month</ion-select-option>
						<ion-select-option value="2">2 months</ion-select-option>
						<ion-select-option value="3">3 months</ion-select-option>
						<!--If numMonths === 10, all data is send from backend to frontend-->
						<ion-select-option value="10">All data</ion-select-option>
					</ion-select>
				</ion-item>
			</ion-list>
			<ion-button expand="block" @click="showData">
				<ion-icon slot="start" :icon="reload"></ion-icon>Show Data</ion-button
			>
			<ion-button expand="block" @click="sendCSV">
				<ion-icon slot="start" :icon="mailOutline"></ion-icon>Send csv File via
				E-Mail</ion-button
			>
			<ion-card v-if="dataFeeding">
				<ion-list>
					<ion-item v-for="(data, monthYear) in dataFeeding" :key="monthYear">
						<ion-list>
							<h3>{{ monthYear }}</h3>
							<ion-list v-if="data">
								<ion-item
									v-for="feedingRecord in data"
									:key="feedingRecord.feeding_record_id"
								>
									<ion-label>
										<p>
											<span class="bold-text">Record created at:</span>
											{{ feedingRecord.created_at }}
										</p>
										<p>Dolphin name: {{ feedingRecord.dolphin_name }}</p>
										<p>User ID: {{ feedingRecord.user_id }}</p>
										<p>
											Body condition score:
											{{ feedingRecord.body_condition_score }}
										</p>
										<p>
											Body condition score comments:
											{{ feedingRecord.body_condition_score_comments || 'N/A' }}
										</p>
										<p>
											Weight measured [kg]: {{ feedingRecord.weight_measured }}
										</p>
										<p>
											Weight measured comments:
											{{ feedingRecord.weight_measured_comments || 'N/A' }}
										</p>
										<p>
											Kcal calculations: {{ feedingRecord.kcal_calculations }}
										</p>
										<p>
											Kcal calculation comments:
											{{ feedingRecord.kcal_calculations_comments || 'N/A' }}
										</p>
										<p>Blood hydration: {{ feedingRecord.blood_hydration }}</p>

										<p>
											Blood hydration comments:
											{{ feedingRecord.blood_hydration_comments || 'N/A' }}
										</p>
										<p>Fish quality: {{ feedingRecord.fish_quality }}</p>
										<p>
											Fish quality comments:
											{{ feedingRecord.fish_quality_comments || 'N/A' }}
										</p>
										<p class="break-words">
											Laboratory data file:
											<template v-if="feedingRecord.file_path">
												<a
													v-for="(path, index) in feedingRecord.file_path.split(
														','
													)"
													:key="index"
													:href="path.trim()"
													target="_blank"
												>
													{{ path.trim() }}
												</a>
											</template>
											<template v-else>
												{{ feedingRecord.file_path }}
											</template>
										</p>
										<p>Fish variety: {{ feedingRecord.fish_variety }}</p>

										<p>
											Fish variety comments:
											{{ feedingRecord.fish_variety_comments || 'N/A' }}
										</p>

										<!--<p>Updated At: {{ feedingRecord.updated_at }}</p>-->
									</ion-label>
								</ion-item>
							</ion-list>
							<ion-label v-else>
								<p>No data available for this month and year.</p>
							</ion-label>
						</ion-list>
					</ion-item>
				</ion-list>
			</ion-card>
			<ion-card v-if="dataHousing">
				<ion-list>
					<ion-item v-for="(data, monthYear) in dataHousing" :key="monthYear">
						<ion-list>
							<h3>{{ monthYear }}</h3>
							<ion-list v-if="data">
								<ion-item
									v-for="HousingRecord in data"
									:key="HousingRecord.housing_record_id"
								>
									<ion-label>
										<p>
											<span class="bold-text">Record created at:</span
											>{{ HousingRecord.created_at }}
										</p>
										<p>Dolphin name: {{ HousingRecord.dolphin_name }}</p>
										<p>
											Enclosure barrier safety:
											{{ HousingRecord.enclosure_barrier_safety }}
										</p>
										<p>
											Enclosure barrier safety comments:
											{{
												HousingRecord.enclosure_barrier_safety_comments || 'N/A'
											}}
										</p>
										<p>
											Foreign body ingestion:
											{{ HousingRecord.foreign_body_ingestion }}
										</p>
										<p>
											Foreign body ingestion comments:
											{{
												HousingRecord.foreign_body_ingestion_comments || 'N/A'
											}}
										</p>
										<p>Pool design: {{ HousingRecord.pool_design }}</p>

										<p>
											Pool design comments:
											{{ HousingRecord.pool_design_comments || 'N/A' }}
										</p>
										<p>
											Forced loneliness: {{ HousingRecord.forced_loneliness }}
										</p>

										<p>
											Forced loneliness comments:
											{{ HousingRecord.forced_loneliness_comments || 'N/A' }}
										</p>
										<p>Water quality: {{ HousingRecord.water_quality }}</p>

										<p>
											Water quality comments:
											{{ HousingRecord.water_quality_comments || 'N/A' }}
										</p>
										<p>
											Water temperature: {{ HousingRecord.water_temperature }}
										</p>

										<p>
											Water temperature comments:
											{{ HousingRecord.water_temperature_comments || 'N/A' }}
										</p>
										<p>
											Sufficient shade: {{ HousingRecord.sufficient_shade }}
										</p>

										<p>
											Sufficient shade comments:
											{{ HousingRecord.sufficient_shade_comments || 'N/A' }}
										</p>
										<p>
											Reflecting colours: {{ HousingRecord.reflecting_colours }}
										</p>

										<p>
											Reflecting colours comments:
											{{ HousingRecord.reflecting_colours_comments || 'N/A' }}
										</p>
										<p>
											Acoustic comfort: {{ HousingRecord.acoustic_comfort }}
										</p>

										<p>
											Acoustic comfort comments:
											{{ HousingRecord.acoustic_comfort_comments || 'N/A' }}
										</p>
									</ion-label>
								</ion-item>
							</ion-list>
							<ion-label v-else>
								<p>No data available for this month and year.</p>
							</ion-label>
						</ion-list>
					</ion-item>
				</ion-list>
			</ion-card>
			<ion-card v-if="dataHealth">
				<ion-list>
					<ion-item v-for="(data, monthYear) in dataHealth" :key="monthYear">
						<ion-list>
							<h3>{{ monthYear }}</h3>
							<ion-list v-if="data">
								<ion-item
									v-for="HealthRecord in data"
									:key="HealthRecord.health_record_id"
								>
									<ion-label>
										<p>
											<span class="bold-text">Record created at:</span>
											{{ HealthRecord.created_at }}
										</p>

										<p>Dolphin name: {{ HealthRecord.dolphin_name }}</p>
										<p>
											Normal floatability:
											{{ HealthRecord.normal_floatability }}
										</p>
										<p>
											Normal floatability comments:
											{{ HealthRecord.normal_floatability_comments || 'N/A' }}
										</p>
										<p>
											Records normal floatability:
											{{ HealthRecord.records_normal_floatability }}
										</p>
										<p>
											Records normal floatability comments:
											{{
												HealthRecord.records_normal_floatability_comments ||
												'N/A'
											}}
										</p>
										<p>
											Inspection eye lesions:
											{{ HealthRecord.inspection_eye_lesions }}
										</p>

										<p>
											Inspection eye lesions comments:
											{{
												HealthRecord.inspection_eye_lesions_comments || 'N/A'
											}}
										</p>
										<p>
											Response visual cues:
											{{ HealthRecord.response_visual_cues }}
										</p>

										<p>
											Response visual cues comments:
											{{ HealthRecord.response_visual_cues_comments || 'N/A' }}
										</p>
										<p>
											Records eye lesions:
											{{ HealthRecord.records_eye_lesions }}
										</p>

										<p>
											Records eye lesions comments:
											{{ HealthRecord.records_eye_lesions_comments || 'N/A' }}
										</p>
										<p>Mouth exam: {{ HealthRecord.mouth_exam }}</p>

										<p>
											Mouth exam comments:
											{{ HealthRecord.mouth_exam_comments || 'N/A' }}
										</p>
										<p>
											Records oral lesions:
											{{ HealthRecord.records_oral_lesions }}
										</p>

										<p>
											Records oral lesions comments:
											{{ HealthRecord.records_oral_lesions_comments || 'N/A' }}
										</p>
										<p>
											Records gastric abnormality:
											{{ HealthRecord.records_gastric_abnormality }}
										</p>

										<p>
											Records gastric abnormality comments:
											{{
												HealthRecord.records_gastric_abnormality_comments ||
												'N/A'
											}}
										</p>
										<p>
											Inspection respiratory disease:
											{{ HealthRecord.inspection_respiratory }}
										</p>

										<p>
											Inspection respiratory disease comments:
											{{
												HealthRecord.inspection_respiratory_comments || 'N/A'
											}}
										</p>
										<p>
											Forced expiration:
											{{ HealthRecord.force_expiration }}
										</p>

										<p>
											Forced expiration comments:
											{{ HealthRecord.force_expiration_comments || 'N/A' }}
										</p>
										<p>
											Records respiratory disease:
											{{ HealthRecord.records_respiratory_disease }}
										</p>

										<p>
											Records respiratory disease comments:
											{{
												HealthRecord.records_respiratory_disease_comments ||
												'N/A'
											}}
										</p>
										<p>
											Inspection rake marks:
											{{ HealthRecord.inspection_marks }}
										</p>

										<p>
											Inspection rake marks comments:
											{{ HealthRecord.inspection_marks_comments || 'N/A' }}
										</p>
										<p>
											Records external diseases:
											{{ HealthRecord.records_external_disease }}
										</p>
										<p>
											Records external diseases comments:
											{{
												HealthRecord.records_external_disease_comments || 'N/A'
											}}
										</p>
										<p>
											Eye photo path:
											<template v-if="HealthRecord.eye_photo_path">
												<a
													v-for="(
														path, index
													) in HealthRecord.eye_photo_path.split(',')"
													:key="index"
													:href="path.trim()"
													target="_blank"
												>
													{{ path.trim() }}
												</a>
											</template>
											<template v-else>
												{{ HealthRecord.eye_photo_path }}
											</template>
										</p>
										<p>
											Teeth photo path:
											<template v-if="HealthRecord.teeth_photo_path">
												<a
													v-for="(
														path, index
													) in HealthRecord.teeth_photo_path.split(',')"
													:key="index"
													:href="path.trim()"
													target="_blank"
												>
													{{ path.trim() }}
												</a>
											</template>
											<template v-else>
												{{ HealthRecord.teeth_photo_path }}
											</template>
										</p>
										<p>
											Odontogramm photo path:
											<template v-if="HealthRecord.odontogramm_photo_path">
												<a
													v-for="(
														path, index
													) in HealthRecord.odontogramm_photo_path.split(',')"
													:key="index"
													:href="path.trim()"
													target="_blank"
												>
													{{ path.trim() }}
												</a>
											</template>
											<template v-else>
												{{ HealthRecord.odontogramm_photo_path }}
											</template>
										</p>
										<p>
											Marks photo path:
											<template v-if="HealthRecord.marks_photo_path">
												<a
													v-for="(
														path, index
													) in HealthRecord.marks_photo_path.split(',')"
													:key="index"
													:href="path.trim()"
													target="_blank"
												>
													{{ path.trim() }}
												</a>
											</template>
											<template v-else>
												{{ HealthRecord.marks_photo_path }}
											</template>
										</p>
									</ion-label>
								</ion-item>
							</ion-list>
							<ion-label v-else>
								<p>No data available for this month and year.</p>
							</ion-label>
						</ion-list>
					</ion-item>
				</ion-list>
			</ion-card>
			<ion-card v-if="dataBehaviour">
				<ion-list>
					<ion-item v-for="(data, monthYear) in dataBehaviour" :key="monthYear">
						<ion-list>
							<h3>{{ monthYear }}</h3>
							<ion-list v-if="data">
								<ion-item
									v-for="BehaviourRecord in data"
									:key="BehaviourRecord.behaviour_record_id"
								>
									<ion-label>
										<p>
											<span class="bold-text">Record created at:</span>
											{{ BehaviourRecord.created_at }}
										</p>

										<p>Dolphin Name: {{ BehaviourRecord.dolphin_name }}</p>
										<p>
											Environmental Enrichment:
											{{ BehaviourRecord.environmental_enrichment }}
										</p>
										<p>
											Affiliative Behaviour:
											{{ BehaviourRecord.affiliative_behaviour }}
										</p>
										<p>Play Behaviour: {{ BehaviourRecord.play_behaviour }}</p>
										<p>
											Socio Sexual Behaviour:
											{{ BehaviourRecord.socio_sexual_behaviour }}
										</p>
										<p>
											Maternal Behaviour:
											{{ BehaviourRecord.maternal_behaviour }}
										</p>
										<p>
											Displacement Behaviour:
											{{ BehaviourRecord.displacement_behaviour }}
										</p>
										<p>
											Oral Stereotypic Behaviour:
											{{ BehaviourRecord.oral_stereotypic_behaviour }}
										</p>
										<p>
											Repetitive Body Movement:
											{{ BehaviourRecord.repetitive_body_movement }}
										</p>
										<p>
											Self Grooming Behaviour:
											{{ BehaviourRecord.self_grooming_behaviour }}
										</p>
										<p>
											Regurgitation Reingestion:
											{{ BehaviourRecord.regurgitation_reingestion }}
										</p>
										<p>Rake Marks: {{ BehaviourRecord.rake_marks }}</p>
										<p>
											Displaying Aggressive Behaviour:
											{{ BehaviourRecord.displaying_aggressive_behaviour }}
										</p>
										<p>
											Reveiving Aggressive Behaviour:
											{{ BehaviourRecord.receiving_aggressive_behaviour }}
										</p>
										<p>
											Social Isolation: {{ BehaviourRecord.social_isolation }}
										</p>
										<p>
											Avoidance Pool Areas:
											{{ BehaviourRecord.avoidance_pool_areas }}
										</p>
										<p>
											Environmental Enrichment Comments:
											{{
												BehaviourRecord.environmental_enrichment_comments ||
												'N/A'
											}}
										</p>
										<p>
											Affiliative Behaviour Comments:
											{{
												BehaviourRecord.affiliative_behaviour_comments || 'N/A'
											}}
										</p>
										<p>
											Play Behaviour Comments:
											{{ BehaviourRecord.play_behaviour_comments || 'N/A' }}
										</p>
										<p>
											Socio Sexual Behaviour Comments:
											{{
												BehaviourRecord.socio_sexual_behaviour_comments || 'N/A'
											}}
										</p>
										<p>
											Maternal Behaviour Comments:
											{{ BehaviourRecord.maternal_behaviour_comments || 'N/A' }}
										</p>
										<p>
											Displacement Behaviour Comments:
											{{
												BehaviourRecord.displacement_behaviour_comments || 'N/A'
											}}
										</p>
										<p>
											Oral Stereotypic Behaviour Comments:
											{{
												BehaviourRecord.oral_stereotypic_behaviour_comments ||
												'N/A'
											}}
										</p>
										<p>
											Repetitive Body Movement Comments:
											{{
												BehaviourRecord.repetitive_body_movement_comments ||
												'N/A'
											}}
										</p>
										<p>
											Self Grooming Behaviour Comments:
											{{
												BehaviourRecord.self_grooming_behaviour_comments ||
												'N/A'
											}}
										</p>
										<p>
											Regurgitation Reingestion Comments:
											{{
												BehaviourRecord.regurgitation_reingestion_comments ||
												'N/A'
											}}
										</p>
										<p>
											Rake Marks Comments:
											{{ BehaviourRecord.rake_marks_comments || 'N/A' }}
										</p>
										<p>
											Displaying Aggressive Behaviour Comments:
											{{
												BehaviourRecord.displaying_aggressive_behaviour_comments ||
												'N/A'
											}}
										</p>
										<p>
											Receiving Aggressive Behaviour Comments:
											{{
												BehaviourRecord.receiving_aggressive_behaviour_comments ||
												'N/A'
											}}
										</p>
										<p>
											Social Isolation Comments:
											{{ BehaviourRecord.social_isolation_comments || 'N/A' }}
										</p>
										<p>
											Avoidance Pool Areas Comments:
											{{
												BehaviourRecord.avoidance_pool_areas_comments || 'N/A'
											}}
										</p>
									</ion-label>
								</ion-item>
							</ion-list>
							<ion-label v-else>
								<p>No data available for this month and year.</p>
							</ion-label>
						</ion-list>
					</ion-item>
				</ion-list>
			</ion-card>
			<ion-card v-if="dataEmotionalState">
				<ion-list>
					<ion-item
						v-for="(data, monthYear) in dataEmotionalState"
						:key="monthYear"
					>
						<ion-list>
							<h3>{{ monthYear }}</h3>
							<ion-list v-if="data">
								<ion-item
									v-for="EmotionalStateRecord in data"
									:key="EmotionalStateRecord.emotional_state_record_id"
								>
									<ion-label>
										<p>
											<span class="bold-text">Record created at:</span>
											{{ EmotionalStateRecord.created_at }}
										</p>

										<p>Dolphin Name: {{ EmotionalStateRecord.dolphin_name }}</p>
										<p>
											Willingness to participate:
											{{ EmotionalStateRecord.willingness_to_participate }}
										</p>
										<p>
											Synchronous swimming:
											{{ EmotionalStateRecord.synchronous_swimming }}
										</p>
										<p>
											Rubbing behaviour:
											{{ EmotionalStateRecord.rubbing_behaviour }}
										</p>
										<p>
											Anticipatory behaviour:
											{{ EmotionalStateRecord.anticipatory_behaviour }}
										</p>
										<p>
											Fast swimming:
											{{ EmotionalStateRecord.fast_swimming }}
										</p>
										<p>
											Tail slapping:
											{{ EmotionalStateRecord.tail_slapping }}
										</p>
										<p>
											Choice and control:
											{{ EmotionalStateRecord.choice_and_control }}
										</p>
										<p>
											Willingness to participate comments:
											{{
												EmotionalStateRecord.willingness_to_participate_comments ||
												'N/A'
											}}
										</p>
										<p>
											Synchronous swimming comments:
											{{
												EmotionalStateRecord.synchronous_swimming_comments ||
												'N/A'
											}}
										</p>
										<p>
											Rubbing behaviour comments:
											{{
												EmotionalStateRecord.rubbing_behaviour_comments || 'N/A'
											}}
										</p>
										<p>
											Anticipatory behaviour comments:
											{{
												EmotionalStateRecord.anticipatory_behaviour_comments ||
												'N/A'
											}}
										</p>
										<p>
											Fast swimming comments:
											{{ EmotionalStateRecord.fast_swimming_comments || 'N/A' }}
										</p>
										<p>
											Tail slapping comments:
											{{ EmotionalStateRecord.tail_slapping_comments || 'N/A' }}
										</p>
										<p>
											Choice and control comments:
											{{
												EmotionalStateRecord.choice_and_control_comments ||
												'N/A'
											}}
										</p>
									</ion-label>
								</ion-item>
							</ion-list>
							<ion-label v-else>
								<p>No data available for this month and year.</p>
							</ion-label>
						</ion-list>
					</ion-item>
				</ion-list>
			</ion-card>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonList,
	IonButton,
	IonButtons,
	IonMenuButton,
	IonIcon,
	IonSelect,
	IonSelectOption,
	IonItem,
	IonCard,
	IonLabel,
} from '@ionic/vue';
import { reload, mailOutline } from 'ionicons/icons';
import axios from 'axios';
import { useDolphinsStore } from '@/store/dolphinsStore';
import { baseUrl } from '@/utils/baseUrl';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const dolphinsStore = useDolphinsStore();

interface FeedingRecord {
	feeding_record_id: number;
	user_id: number;
	dolphin_id: number;
	dolphin_name: string;
	body_condition_score: number;
	weight_measured: number;
	kcal_calculations: number;
	blood_hydration: number;
	fish_quality: number;
	fish_variety: number;
	body_condition_score_comments: string | null;
	weight_measured_comments: string | null;
	kcal_calculations_comments: string | null;
	blood_hydration_comments: string | null;
	fish_quality_comments: string | null;
	file_path: string | null;
	fish_variety_comments: string | null;
	created_at: string;
	updated_at: string;
}
interface DataFeeding {
	[monthYear: string]: FeedingRecord[];
}
interface HousingRecord {
	housing_record_id: number;
	user_id: number;
	dolphin_id: number;
	dolphin_name: string;
	enclosure_barrier_safety: number;
	foreign_body_ingestion: number;
	pool_design: number;
	forced_loneliness: number;
	water_quality: number;
	water_temperature: number;
	sufficient_shade: number;
	reflecting_colours: number;
	acoustic_comfort: number;
	enclosure_barrier_safety_comments: string | null;
	foreign_body_ingestion_comments: string | null;
	pool_design_comments: string | null;
	forced_loneliness_comments: string | null;
	water_quality_comments: string | null;
	water_temperature_comments: string | null;
	sufficient_shade_comments: string | null;
	reflecting_colours_comments: string | null;
	acoustic_comfort_comments: string | null;
	created_at: string;
	updated_at: string;
}
interface DataHousing {
	[monthYear: string]: HousingRecord[];
}
interface HealthRecord {
	health_record_id: number;
	user_id: number;
	dolphin_id: number;
	dolphin_name: string;
	normal_floatability: number;
	records_normal_floatability: number;
	inspection_eye_lesions: number;
	response_visual_cues: number;
	records_eye_lesions: number;
	mouth_exam: number;
	records_oral_lesions: number;
	records_gastric_abnormality: number;
	inspection_respiratory: number;
	force_expiration: number;
	records_respiratory_disease: number;
	inspection_marks: number;
	records_external_disease: number;
	normal_floatability_comments: string | null;
	records_normal_floatability_comments: string | null;
	inspection_eye_lesions_comments: string | null;
	response_visual_cues_comments: string | null;
	records_eye_lesions_comments: string | null;
	mouth_exam_comments: string | null;
	records_oral_lesions_comments: string | null;
	records_gastric_abnormality_comments: string | null;
	inspection_respiratory_comments: string | null;
	force_expiration_comments: string | null;
	records_respiratory_disease_comments: string | null;
	inspection_marks_comments: string | null;
	records_external_disease_comments: string | null;
	eye_photo_path: string | null;
	teeth_photo_path: string | null;
	odontogramm_photo_path: string | null;
	marks_photo_path: string | null;
	created_at: string;
	updated_at: string;
}
interface DataHealth {
	[monthYear: string]: HealthRecord[];
}
interface BehaviourRecord {
	behaviour_record_id: number;
	user_id: number;
	dolphin_id: number;
	dolphin_name: string;
	environmental_enrichment: number;
	affiliative_behaviour: number;
	play_behaviour: number;
	socio_sexual_behaviour: number;
	maternal_behaviour: number;
	displacement_behaviour: number;
	oral_stereotypic_behaviour: number;
	repetitive_body_movement: number;
	self_grooming_behaviour: number;
	regurgitation_reingestion: number;
	rake_marks: number;
	displaying_aggressive_behaviour: number;
	receiving_aggressive_behaviour: number;
	social_isolation: number;
	avoidance_pool_areas: number;
	environmental_enrichment_comments: string | null;
	affiliative_behaviour_comments: string | null;
	play_behaviour_comments: string | null;
	socio_sexual_behaviour_comments: string | null;
	maternal_behaviour_comments: string | null;
	displacement_behaviour_comments: string | null;
	oral_stereotypic_behaviour_comments: string | null;
	repetitive_body_movement_comments: string | null;
	self_grooming_behaviour_comments: string | null;
	regurgitation_reingestion_comments: string | null;
	rake_marks_comments: string | null;
	displaying_aggressive_behaviour_comments: string | null;
	receiving_aggressive_behaviour_comments: string | null;
	social_isolation_comments: string | null;
	avoidance_pool_areas_comments: string | null;
	created_at: string;
	updated_at: string;
}
interface DataBehaviour {
	[monthYear: string]: BehaviourRecord[];
}

interface EmotionalStateRecord {
	emotional_state_record_id: number;
	user_id: number;
	dolphin_id: number;
	dolphin_name: string;
	willingness_to_participate: number;
	synchronous_swimming: number;
	rubbing_behaviour: number;
	anticipatory_behaviour: number;
	fast_swimming: number;
	tail_slapping: number;
	choice_and_control: number;
	willingness_to_participate_comments: string | null;
	synchronous_swimming_comments: string | null;
	rubbing_behaviour_comments: string | null;
	anticipatory_behaviour_comments: string | null;
	fast_swimming_comments: string | null;
	tail_slapping_comments: string | null;
	choice_and_control_comments: string | null;
	created_at: string;
	updated_at: string;
}
interface DataEmotionalState {
	[monthYear: string]: EmotionalStateRecord[];
}
export default {
	data() {
		return {
			reload,
			mailOutline,
			dolphinsStore: dolphinsStore,
			dolphinSelect: null as string | null,
			principleSelect: null as string | null,
			principles: [
				{ display: this.$t('principleNutrition'), value: 'Nutrition' },
				{ display: this.$t('principleEnvironment'), value: 'Environment' },
				{ display: this.$t('principleHealth'), value: 'Health' },
				{ display: this.$t('principleBehaviour'), value: 'Behaviour' },
				{
					display: this.$t('principleEmotionalState'),
					value: 'Mental State',
				},
			],
			/*principleMapping: {
				// This mapping of the principles allows to send the english translation of the principle
				// with the req.param in the sendCSV() method, no matter the users language.
				[this.$t('principleNutrition')]: 'Nutrition',
				[this.$t('principleEnvironment')]: 'Environment',
				[this.$t('principleHealth')]: 'Health',
				[this.$t('principleBehaviour')]: 'Behaviour',
				[this.$t('principleEmotionalState')]: 'Mental State',
			},*/
			dataFeeding: null as DataFeeding | null,
			dataHousing: null as DataHousing | null,
			dataBehaviour: null as DataBehaviour | null,
			dataHealth: null as DataHealth | null,
			dataEmotionalState: null as DataEmotionalState | null,
			urlFeeding: baseUrl + '/api/good_feeding?name=', //'http://88395-17112.pph-server.de/api/good_feeding?name=',
			urlHousing: baseUrl + '/api/good_housing?name=',
			urlBehaviour: baseUrl + '/api/behaviour?name=',
			urlHealth: baseUrl + '/api/good_health?name=',
			urlEmotionalState: baseUrl + '/api/emotional_state?name=',
			urlCsv: baseUrl + '/api/export-csv',
			numMonths: '3', //default value for view data is 3 months
		};
	},
	components: {
		IonPage,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonList,
		IonButton,
		IonButtons,
		IonMenuButton,
		IonIcon,
		IonSelect,
		IonSelectOption,
		IonItem,
		IonCard,
		IonLabel,
	},

	methods: {
		marksPhotoPath() {
			// get the marks photo path from the dataHealth object
			return this.dataHealth ? this.dataHealth.marks_photo_path : undefined;
		},
		async showData() {
			this.dataFeeding = null;
			this.dataHousing = null;
			this.dataBehaviour = null;
			this.dataHealth = null;
			this.dataEmotionalState = null;
			if (this.principleSelect === this.$t('principleNutrition')) {
				this.urlFeeding =
					this.urlFeeding + this.dolphinSelect + '&numMonths=' + this.numMonths; //default value numMonths=3
				await axios
					.get(this.urlFeeding, { withCredentials: true })
					.then((response) => {
						this.dataFeeding = response.data;
						console.log('Response:', response.data);
						this.urlFeeding = baseUrl + '/api/good_feeding?name='; //reset the url
					})
					.catch((e) => {
						console.error(e);
						if (
							e.message === 'Network Error' ||
							e.message.includes('net::ERR_CONNECTION_REFUSED')
						) {
							// It's a network error
							toast.error('Check your internet connectivity.', {
								autoClose: 2000,
							});
						}
						if (e.response.data.error === 'USER_NOT_AN_ADMINISTRATOR') {
							toast.error('User has no administrator rights!', {
								autoClose: 2000,
							});
						}

						this.urlFeeding = baseUrl + '/api/good_feeding?name='; //reset the url
					});
			} else if (this.principleSelect === this.$t('principleEnvironment')) {
				this.urlHousing =
					this.urlHousing + this.dolphinSelect + '&numMonths=' + this.numMonths; //default value numMonths=3
				await axios
					.get(this.urlHousing, { withCredentials: true })
					.then((response) => {
						this.dataHousing = response.data;
						console.log('Response:', response.data);
						this.urlHousing = baseUrl + '/api/good_housing?name='; //reset the url
					})
					.catch((e) => {
						console.error(e);
						if (e.response.data.error === 'USER_NOT_AN_ADMINISTRATOR') {
							toast.error('User has no administrator rights!', {
								autoClose: 2000,
							});
						}
						this.urlHousing = baseUrl + '/api/good_housing?name='; //reset the url
					});
			} else if (this.principleSelect === this.$t('principleBehaviour')) {
				this.urlBehaviour =
					this.urlBehaviour +
					this.dolphinSelect +
					'&numMonths=' +
					this.numMonths; //default value numMonths=3
				await axios
					.get(this.urlBehaviour, { withCredentials: true })
					.then((response) => {
						this.dataBehaviour = response.data;
						console.log('Response:', response.data);
						this.urlBehaviour = baseUrl + '/api/behaviour?name='; //reset the url
					})
					.catch((e) => {
						console.error(e);
						if (e.response.data.error === 'USER_NOT_AN_ADMINISTRATOR') {
							toast.error('User has no administrator rights!', {
								autoClose: 2000,
							});
						}
						this.urlBehaviour = baseUrl + '/api/behaviour?name='; //reset the url
					});
			} else if (this.principleSelect === this.$t('principleHealth')) {
				this.urlHealth =
					this.urlHealth + this.dolphinSelect + '&numMonths=' + this.numMonths; //default value numMonths=3
				await axios
					.get(this.urlHealth, { withCredentials: true })
					.then((response) => {
						this.dataHealth = response.data;
						console.log('Response:', response.data);
						this.urlHealth = baseUrl + '/api/good_health?name='; //reset the url
					})
					.catch((e) => {
						console.error(e);
						if (e.response.data.error === 'USER_NOT_AN_ADMINISTRATOR') {
							toast.error('User has no administrator rights!', {
								autoClose: 2000,
							});
						}
						this.urlHealth = baseUrl + '/api/good_health?name='; //reset the url
					});
			} else if (this.principleSelect === this.$t('principleEmotionalState')) {
				this.urlEmotionalState =
					this.urlEmotionalState +
					this.dolphinSelect +
					'&numMonths=' +
					this.numMonths; //default value numMonths=3
				await axios
					.get(this.urlEmotionalState, { withCredentials: true })
					.then((response) => {
						this.dataEmotionalState = response.data;
						console.log('Response:', response.data);
						this.urlEmotionalState = baseUrl + '/api/emotional_state?name='; //reset the url
					})
					.catch((e) => {
						console.error(e);
						if (e.response.data.error === 'USER_NOT_AN_ADMINISTRATOR') {
							toast.error('User has no administrator rights!', {
								autoClose: 2000,
							});
						}
						this.urlEmotionalState = baseUrl + '/api/emotional_state?name='; //reset the url
					});
			}
		},

		async sendCSV() {
			console.log(
				'Params: ',
				this.dolphinSelect,
				this.principleSelect,
				sessionStorage.getItem('user_name'),
				this.numMonths
			);
			//do a get request to backend
			await axios
				.get(this.urlCsv, {
					params: {
						dolphin_name: this.dolphinSelect,
						// Get the english translation of this.principleSelect:
						section: this.principleSelect,
						numMonths: this.numMonths,
					},
					withCredentials: true,
				})
				.then((response) => {
					console.log('Response:', response.data);
					toast.success('Data sent to logged in user', {
						autoClose: 2000,
					});
				})
				.catch((e) => {
					if (
						e.message === 'Network Error' ||
						e.message.includes('net::ERR_CONNECTION_REFUSED')
					) {
						// It's a network error
						toast.error('Check your internet connectivity.', {
							autoClose: 2000,
						});
					}
					if (e.response.data.error === 'USER_NOT_AN_ADMINISTRATOR') {
						toast.error('User has no administrator rights!', {
							autoClose: 2000,
						});
					}
					console.error(e);
				});
		},

		changeLanguage($event: any) {
			this.$i18n.locale = $event.detail.value;
		},
	},
};
</script>

<style scoped>
.break-words {
	word-break: break-word;
}
.bold-text {
	font-weight: bold;
}
</style>
