import { defineStore } from 'pinia';
import requestBodiesHousing from '@/data/requestBodiesHousing.json';

export const useEvaluationHousingStore = defineStore('evaluationHousingStore', {
	state: () => {
		return {
			requestBodiesHousing,
		};
	},
	actions: {
		resetBodies() {
			for (let i = 0; i < requestBodiesHousing.length; i++) {
				requestBodiesHousing[i]['enclosure_barrier_safety'] = null;
				requestBodiesHousing[i]['foreign_body_ingestion'] = null;
				requestBodiesHousing[i]['pool_design'] = null;
				requestBodiesHousing[i]['forced_loneliness'] = null;
				requestBodiesHousing[i]['water_quality'] = null;
				requestBodiesHousing[i]['water_temperature'] = null;
				requestBodiesHousing[i]['sufficient_shade'] = null;
				requestBodiesHousing[i]['reflecting_colours'] = null;
				requestBodiesHousing[i]['acoustic_comfort'] = null;
				requestBodiesHousing[i]['enclosure_barrier_safety_comments'] = '';
				requestBodiesHousing[i]['foreign_body_ingestion_comments'] = '';
				requestBodiesHousing[i]['pool_design_comments'] = '';
				requestBodiesHousing[i]['forced_loneliness_comments'] = '';
				requestBodiesHousing[i]['water_quality_comments'] = '';
				requestBodiesHousing[i]['water_temperature_comments'] = '';
				requestBodiesHousing[i]['sufficient_shade_comments'] = '';
				requestBodiesHousing[i]['reflecting_colours_comments'] = '';
				requestBodiesHousing[i]['acoustic_comfort_comments'] = '';
				requestBodiesHousing[i]['created_at'] = '';
			}
		},
	},
});
