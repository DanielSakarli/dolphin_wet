import { defineStore } from 'pinia';

import requestBodiesFeeding from '@/data/requestBodiesFeeding.json';

interface RequestBodyFeeding {
	body_condition_score: number | null;
	weight_measured: number | null;
	kcal_calculations: number | null;
	blood_hydration: number | null;
	fish_quality: number | null;
	fish_variety: number | null;
	body_condition_score_comments: string;
	weight_measured_comments: string;
	kcal_calculations_comments: string;
	blood_hydration_comments: string;
	fish_quality_comments: string;
	fish_variety_comments: string;
	created_at: string;
}

export const useEvaluationFeedingStore = defineStore('evaluationFeedingStore', {
	state: (): { requestBodiesFeeding: RequestBodyFeeding[] } => ({
		requestBodiesFeeding,
	}),

	actions: {
		// Fills the requestBodiesFeeding with the default
		// values for the variables
		async fill(dolphinList: any[]) {
			this.requestBodiesFeeding = dolphinList.map((dolphin) => ({
				dolphin_name: dolphin.name,
				body_condition_score: null,
				weight_measured: null,
				kcal_calculations: null,
				blood_hydration: null,
				fish_quality: null,
				fish_variety: null,
				body_condition_score_comments: '',
				weight_measured_comments: '',
				kcal_calculations_comments: '',
				blood_hydration_comments: '',
				fish_quality_comments: '',
				fish_variety_comments: '',
				created_at: '',
			}));
			return this.requestBodiesFeeding;
		},

		resetBodies() {
			for (let i = 0; i < requestBodiesFeeding.length; i++) {
				requestBodiesFeeding[i]['body_condition_score'] = null;
				requestBodiesFeeding[i]['blood_hydration'] = null;
				requestBodiesFeeding[i]['weight_measured'] = null;
				requestBodiesFeeding[i]['kcal_calculations'] = null;
				requestBodiesFeeding[i]['fish_quality'] = null;
				requestBodiesFeeding[i]['fish_variety'] = null;
				requestBodiesFeeding[i]['body_condition_score_comments'] = '';
				requestBodiesFeeding[i]['weight_measured_comments'] = '';
				requestBodiesFeeding[i]['kcal_calculations_comments'] = '';
				requestBodiesFeeding[i]['blood_hydration_comments'] = '';
				requestBodiesFeeding[i]['fish_quality_comments'] = '';
				requestBodiesFeeding[i]['fish_variety_comments'] = '';
				requestBodiesFeeding[i]['created_at'] = '';
			}
		},
	},
});
