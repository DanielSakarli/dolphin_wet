import { defineStore } from 'pinia';
import requestBodiesHousing from '@/data/requestBodiesHousing.json';

interface RequestBodyHousing {
	dolphin_name: string;
	enclosure_barrier_safety: number | null;
	foreign_body_ingestion: number | null;
	pool_design: number | null;
	forced_loneliness: number | null;
	water_quality: number | null;
	water_temperature: number | null;
	sufficient_shade: number | null;
	reflecting_colours: number | null;
	acoustic_comfort: number | null;
	enclosure_barrier_safety_comments: string;
	foreign_body_ingestion_comments: string;
	pool_design_comments: string;
	forced_loneliness_comments: string;
	water_quality_comments: string;
	water_temperature_comments: string;
	sufficient_shade_comments: string;
	reflecting_colours_comments: string;
	acoustic_comfort_comments: string;
	created_at: string;
}

export const useEvaluationHousingStore = defineStore('evaluationHousingStore', {
	state: (): { requestBodiesHousing: RequestBodyHousing[] } => ({
		requestBodiesHousing,
	}),
	actions: {
		// Fills the requestBodiesHousing with the default
		// values for the variables
		async fill(dolphinList: any[]) {
			this.requestBodiesHousing = dolphinList.map((dolphin) => ({
				dolphin_name: dolphin.name,
				enclosure_barrier_safety: null,
				foreign_body_ingestion: null,
				pool_design: null,
				forced_loneliness: null,
				water_quality: null,
				water_temperature: null,
				sufficient_shade: null,
				reflecting_colours: null,
				acoustic_comfort: null,
				enclosure_barrier_safety_comments: '',
				foreign_body_ingestion_comments: '',
				pool_design_comments: '',
				forced_loneliness_comments: '',
				water_quality_comments: '',
				water_temperature_comments: '',
				sufficient_shade_comments: '',
				reflecting_colours_comments: '',
				acoustic_comfort_comments: '',
				created_at: '',
			}));
			return this.requestBodiesHousing;
		},
		resetBodies() {
			console.log('resetBodies called in evaluationHousingStore.ts');

			// Use map to return a new array with reset properties
			this.requestBodiesHousing = this.requestBodiesHousing.map((body) => ({
				...body, // Spread the existing properties
				enclosure_barrier_safety: null,
				foreign_body_ingestion: null,
				pool_design: null,
				forced_loneliness: null,
				water_quality: null,
				water_temperature: null,
				sufficient_shade: null,
				reflecting_colours: null,
				acoustic_comfort: null,
				enclosure_barrier_safety_comments: '',
				foreign_body_ingestion_comments: '',
				pool_design_comments: '',
				forced_loneliness_comments: '',
				water_quality_comments: '',
				water_temperature_comments: '',
				sufficient_shade_comments: '',
				reflecting_colours_comments: '',
				acoustic_comfort_comments: '',
				created_at: '',
			}));

			return this.requestBodiesHousing;
		},
	},
});
