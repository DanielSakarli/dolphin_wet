import { defineStore } from 'pinia';
import requestBodiesBehaviour from '@/data/requestBodiesBehaviour.json';

export const useEvaluationBehaviourStore = defineStore(
	'evaluationBehaviourStore',
	{
		state: () => {
			return {
				requestBodiesBehaviour,
			};
		},
		actions: {
			resetBodies() {
				for (let i = 0; i < requestBodiesBehaviour.length; i++) {
					requestBodiesBehaviour[i]['environmental_enrichment'] = null;
					requestBodiesBehaviour[i]['affiliative_behaviour'] = null;
					requestBodiesBehaviour[i]['play_behaviour'] = null;
					requestBodiesBehaviour[i]['socio_sexual_behaviour'] = null;
					requestBodiesBehaviour[i]['maternal_behaviour'] = null;
					requestBodiesBehaviour[i]['displacement_behaviour'] = null;
					requestBodiesBehaviour[i]['oral_stereotypic_behaviour'] = null;
					requestBodiesBehaviour[i]['repetitive_body_movement'] = null;
					requestBodiesBehaviour[i]['self_grooming_behaviour'] = null;
					requestBodiesBehaviour[i]['regurgitation_reingestion'] = null;
					requestBodiesBehaviour[i]['rake_marks'] = null;
					requestBodiesBehaviour[i]['displaying_aggressive_behaviour'] = null;
					requestBodiesBehaviour[i]['receiving_aggressive_behaviour'] = null;
					requestBodiesBehaviour[i]['social_isolation'] = null;
					requestBodiesBehaviour[i]['avoidance_pool_areas'] = null;
					requestBodiesBehaviour[i]['environmental_enrichment_comments'] = '';
					requestBodiesBehaviour[i]['affiliative_behaviour_comments'] = '';
					requestBodiesBehaviour[i]['play_behaviour_comments'] = '';
					requestBodiesBehaviour[i]['socio_sexual_behaviour_comments'] = '';
					requestBodiesBehaviour[i]['maternal_behaviour_comments'] = '';
					requestBodiesBehaviour[i]['displacement_behaviour_comments'] = '';
					requestBodiesBehaviour[i]['oral_stereotypic_behaviour_comments'] = '';
					requestBodiesBehaviour[i]['repetitive_body_movement_comments'] = '';
					requestBodiesBehaviour[i]['self_grooming_behaviour_comments'] = '';
					requestBodiesBehaviour[i]['regurgitation_reingestion_comments'] = '';
					requestBodiesBehaviour[i]['rake_marks_comments'] = '';
					requestBodiesBehaviour[i][
						'displaying_aggressive_behaviour_comments'
					] = '';
					requestBodiesBehaviour[i]['receiving_aggressive_behaviour_comments'] =
						'';
					requestBodiesBehaviour[i]['social_isolation_comments'] = '';
					requestBodiesBehaviour[i]['avoidance_pool_areas_comments'] = '';
					requestBodiesBehaviour[i]['created_at'] = '';
				}
			},
		},
	}
);
