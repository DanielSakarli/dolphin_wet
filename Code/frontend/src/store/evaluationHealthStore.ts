import { defineStore } from 'pinia';
import requestBodiesHealth from '@/data/requestBodiesHealth.json';

export const useEvaluationHealthStore = defineStore('evaluationHealthStore', {
	state: () => {
		return {
			requestBodiesHealth,
		};
	},
	actions: {
		resetBodies() {
			for (let i = 0; i < requestBodiesHealth.length; i++) {
				requestBodiesHealth[i]['normal_floatability'] = null;
				requestBodiesHealth[i]['eye_lesions'] = null;
				requestBodiesHealth[i]['visual_cues'] = null;
				requestBodiesHealth[i]['mouth_exam'] = null;
				requestBodiesHealth[i]['respiratory_disease'] = null;
				requestBodiesHealth[i]['force_expiration'] = null;
				requestBodiesHealth[i]['gastric_abnormality'] = null;
				requestBodiesHealth[i]['external_disease_signs'] = null;
				requestBodiesHealth[i]['normal_floatability_comments'] = '';
				requestBodiesHealth[i]['eye_lesions_comments'] = '';
				requestBodiesHealth[i]['visual_cues_comments'] = '';
				requestBodiesHealth[i]['mouth_exam_comments'] = '';
				requestBodiesHealth[i]['respiratory_disease_comments'] = '';
				requestBodiesHealth[i]['force_expiration_comments'] = '';
				requestBodiesHealth[i]['gastric_abnormality_comments'] = '';
				requestBodiesHealth[i]['external_disease_signs_comments'] = '';
			}
		},
	},
});
