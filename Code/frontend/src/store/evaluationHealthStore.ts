import { defineStore } from 'pinia';
import requestBodiesHealth from '@/data/requestBodiesHealth.json';

interface RequestBodyHealth {
	normal_floatability: number | null;
	records_normal_floatability: number | null;
	inspection_eye_lesions: number | null;
	response_visual_cues: number | null;
	records_eye_lesions: number | null;
	mouth_exam: number | null;
	records_oral_lesions: number | null;
	records_gastric_abnormality: number | null;
	inspection_respiratory: number | null;
	force_expiration: number | null;
	records_respiratory_disease: number | null;
	inspection_marks: number | null;
	records_external_disease: number | null;
	normal_floatability_comments: string;
	records_normal_floatability_comments: string;
	inspection_eye_lesions_comments: string;
	response_visual_cues_comments: string;
	records_eye_lesions_comments: string;
	mouth_exam_comments: string;
	records_oral_lesions_comments: string;
	records_gastric_abnormality_comments: string;
	inspection_respiratory_comments: string;
	force_expiration_comments: string;
	records_respiratory_disease_comments: string;
	inspection_marks_comments: string;
	records_external_disease_comments: string;
	eye_photo_path: string;
	teeth_photo_path: string;
	odontogramm_photo_path: string;
	marks_photo_path: string;
	created_at: string;
}

export const useEvaluationHealthStore = defineStore('evaluationHealthStore', {
	state: (): { requestBodiesHealth: RequestBodyHealth[] } => ({
		requestBodiesHealth,
	}),
	actions: {
		// Fills the requestBodiesHealth with the default
		// values for the variables
		async fill(dolphinList: any[]) {
			this.requestBodiesHealth = dolphinList.map((dolphin) => ({
				dolphin_name: dolphin.name,
				normal_floatability: null,
				records_normal_floatability: null,
				inspection_eye_lesions: null,
				response_visual_cues: null,
				records_eye_lesions: null,
				mouth_exam: null,
				records_oral_lesions: null,
				records_gastric_abnormality: null,
				inspection_respiratory: null,
				force_expiration: null,
				records_respiratory_disease: null,
				inspection_marks: null,
				records_external_disease: null,
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
				eye_photo_path: '',
				teeth_photo_path: '',
				odontogramm_photo_path: '',
				marks_photo_path: '',
				created_at: '',
			}));
			return this.requestBodiesHealth;
		},
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
