<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button></ion-menu-button>
				</ion-buttons>
				<ion-title>DoliMo - DolphinMonitoring</ion-title>
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
						<ion-select-option v-for="principle in principles">{{
							principle
						}}</ion-select-option>
					</ion-select>
				</ion-item>
			</ion-list>
			<ion-button expand="block" @click="showData">
				<ion-icon slot="start" :icon="reload"></ion-icon>Show Data</ion-button
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
										<p>Dolphin Name: {{ feedingRecord.dolphin_name }}</p>
										<p>
											Body Condition Score:
											{{ feedingRecord.body_condition_score }}
										</p>
										<p>
											Weight Measured [kg]: {{ feedingRecord.weight_measured }}
										</p>
										<p>
											Kcal Calculations: {{ feedingRecord.kcal_calculations }}
										</p>
										<p>Blood Hydration: {{ feedingRecord.blood_hydration }}</p>
										<p>Fish Quality: {{ feedingRecord.fish_quality }}</p>
										<p>Fish Variety: {{ feedingRecord.fish_variety }}</p>
										<p>Comments: {{ feedingRecord.comments || 'N/A' }}</p>
										<p>Created At: {{ feedingRecord.created_at }}</p>
										<p>Updated At: {{ feedingRecord.updated_at }}</p>
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
										<p>Dolphin Name: {{ HousingRecord.dolphin_name }}</p>
										<p>
											Enclosure Barrier Safety:
											{{ HousingRecord.enclosure_barrier_safety }}
										</p>
										<p>
											Foreign Body Ingestion:
											{{ HousingRecord.foreign_body_ingestion }}
										</p>
										<p>Pool Design: {{ HousingRecord.pool_design }}</p>
										<p>
											Forced Loneliness: {{ HousingRecord.forced_loneliness }}
										</p>
										<p>Water Quality: {{ HousingRecord.water_quality }}</p>
										<p>
											Sufficient Shade: {{ HousingRecord.sufficient_shade }}
										</p>
										<p>
											Acoustic Comfort: {{ HousingRecord.acoustic_comfort }}
										</p>
										<p>Comments: {{ HousingRecord.comments || 'N/A' }}</p>
										<p>Created At: {{ HousingRecord.created_at }}</p>
										<p>Updated At: {{ HousingRecord.updated_at }}</p>
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
										<p>Dolphin Name: {{ HealthRecord.dolphin_name }}</p>
										<p>
											Normal Floatability:
											{{ HealthRecord.normal_floatability }}
										</p>
										<p>Eye Lesions: {{ HealthRecord.eye_lesions }}</p>
										<p>Visual Cues: {{ HealthRecord.visual_cues }}</p>
										<p>Mouth Exam: {{ HealthRecord.mouth_exam }}</p>
										<p>
											Respiratory Disease:
											{{ HealthRecord.respiratory_disease }}
										</p>
										<p>Force Expiration: {{ HealthRecord.force_expiration }}</p>
										<p>
											External Disease Signs:
											{{ HealthRecord.external_disease_signs }}
										</p>
										<p>Comments: {{ HealthRecord.comments || 'N/A' }}</p>
										<p>Created At: {{ HealthRecord.created_at }}</p>
										<p>Updated At: {{ HealthRecord.updated_at }}</p>
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
										<p>Comments: {{ BehaviourRecord.comments || 'N/A' }}</p>
										<p>Created At: {{ BehaviourRecord.created_at }}</p>
										<p>Updated At: {{ BehaviourRecord.updated_at }}</p>
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
	IonMenu,
	IonMenuButton,
	IonIcon,
	IonSelect,
	IonSelectOption,
	IonItem,
	IonCard,
	IonLabel,
} from '@ionic/vue';
import { reload } from 'ionicons/icons';
import axios from 'axios';
import { useDolphinsStore } from '@/store/dolphinsStore';
import { baseUrl } from '@/utils/baseUrl';

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
	comments: string | null;
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
	sufficient_shade: number;
	acoustic_comfort: number;
	comments: null;
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
	eye_lesions: number;
	visual_cues: number;
	mouth_exam: number;
	respiratory_disease: number;
	force_expiration: number;
	external_disease_signs: number;
	comments: null;
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
	comments: null;
	created_at: string;
	updated_at: string;
}
interface DataBehaviour {
	[monthYear: string]: BehaviourRecord[];
}

export default {
	data() {
		return {
			reload,
			dolphinsStore: dolphinsStore,
			dolphinSelect: null as string | null,
			principleSelect: null as string | null,
			principles: [
				this.$t('principleFeeding'),
				this.$t('principleHousing'),
				this.$t('principleHealth'),
				this.$t('principleBehaviour'),
				this.$t('principleEmotionalState'),
			],
			dataFeeding: null as DataFeeding | null,
			dataHousing: null as DataHousing | null,
			dataBehaviour: null as DataBehaviour | null,
			dataHealth: null as DataHealth | null,
			urlFeeding: baseUrl + '/api/good_feeding?name=', //'http://88395-17112.pph-server.de/api/good_feeding?name=',
			urlHousing: baseUrl + '/api/good_housing?name=', //http://88395-17112.pph-server.de/api/good_housing?name=',
			urlBehaviour: baseUrl + '/api/behaviour?name=', //http://88395-17112.pph-server.de/api/behaviour?name=',
			urlHealth: baseUrl + '/api/good_health?name=', //http://88395-17112.pph-server.de/api/good_health?name=',
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
		IonMenu,
		IonMenuButton,
		IonIcon,
		IonSelect,
		IonSelectOption,
		IonItem,
		IonCard,
		IonLabel,
	},

	methods: {
		async showData() {
			this.dataFeeding = null;
			this.dataHousing = null;
			this.dataBehaviour = null;
			this.dataHealth = null;
			if (this.principleSelect === 'Feeding') {
				console.log(this.urlFeeding + this.dolphinSelect);
				await axios
					.get(this.urlFeeding + this.dolphinSelect)
					.then((response) => {
						this.dataFeeding = response.data;
						console.log('Response:', response.data);
					})
					.catch((e) => {
						console.error(e);
					});
			} else if (this.principleSelect === 'Housing/Environment') {
				console.log(this.urlHousing + this.dolphinSelect);
				await axios
					.get(this.urlHousing + this.dolphinSelect)
					.then((response) => {
						this.dataHousing = response.data;
						console.log('Response:', response.data);
					})
					.catch((e) => {
						console.error(e);
					});
			} else if (this.principleSelect === 'Behaviour') {
				console.log(this.urlBehaviour + this.dolphinSelect);
				await axios
					.get(this.urlBehaviour + this.dolphinSelect)
					.then((response) => {
						this.dataHousing = response.data;
						console.log('Response:', response.data);
					})
					.catch((e) => {
						console.error(e);
					});
			} else if (this.principleSelect === 'Health') {
				console.log(this.urlHealth + this.dolphinSelect);
				await axios
					.get(this.urlHealth + this.dolphinSelect)
					.then((response) => {
						this.dataHealth = response.data;
						console.log('Response:', response.data);
					})
					.catch((e) => {
						console.error(e);
					});
			}
		},

		changeLanguage($event: any) {
			this.$i18n.locale = $event.detail.value;
		},
	},
};
</script>
