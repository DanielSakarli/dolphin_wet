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
				requestBodiesHealth[i]['records_normal_floatability'] = null;
				requestBodiesHealth[i]['inspection_eye_lesions'] = null;
				requestBodiesHealth[i]['response_visual_cues'] = null;
				requestBodiesHealth[i]['records_eye_lesions'] = null;
				requestBodiesHealth[i]['mouth_exam'] = null;
				requestBodiesHealth[i]['records_oral_lesions'] = null;
				requestBodiesHealth[i]['records_gastric_abnormality'] = null;
				requestBodiesHealth[i]['inspection_respiratory'] = null;
				requestBodiesHealth[i]['force_expiration'] = null;
				requestBodiesHealth[i]['records_respiratory_disease'] = null;
				requestBodiesHealth[i]['inspection_marks'] = null;
				requestBodiesHealth[i]['records_external_disease'] = null;
				requestBodiesHealth[i]['normal_floatability_comments'] = '';
				requestBodiesHealth[i]['records_normal_floatability_comments'] = '';
				requestBodiesHealth[i]['inspection_eye_lesions_comments'] = '';
				requestBodiesHealth[i]['response_visual_cues_comments'] = '';
				requestBodiesHealth[i]['records_eye_lesions_comments'] = '';
				requestBodiesHealth[i]['mouth_exam_comments'] = '';
				requestBodiesHealth[i]['records_oral_lesions_comments'] = '';
				requestBodiesHealth[i]['records_gastric_abnormality_comments'] = '';
				requestBodiesHealth[i]['inspection_respiratory_comments'] = '';
				requestBodiesHealth[i]['force_expiration_comments'] = '';
				requestBodiesHealth[i]['records_respiratory_disease_comments'] = '';
				requestBodiesHealth[i]['inspection_marks_comments'] = '';
				requestBodiesHealth[i]['records_external_disease_comments'] = '';
				requestBodiesHealth[i]['eye_photo_path'] = '';
				requestBodiesHealth[i]['teeth_photo_path'] = '';
				requestBodiesHealth[i]['odontogramm_photo_path'] = '';
				requestBodiesHealth[i]['marks_photo_path'] = '';
			}
		},
	},
});
