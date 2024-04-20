import { defineStore } from 'pinia';
import requestBodiesBehaviour from '@/data/requestBodiesBehaviour.json';

interface RequestBodyBehaviour {
	environmental_enrichment: number | null;
	affiliative_behaviour: number | null;
	play_behaviour: number | null;
	socio_sexual_behaviour: number | null;
	maternal_behaviour: number | null;
	displacement_behaviour: number | null;
	oral_stereotypic_behaviour: number | null;
	repetitive_body_movement: number | null;
	self_grooming_behaviour: number | null;
	regurgitation_reingestion: number | null;
	rake_marks: number | null;
	displaying_aggressive_behaviour: number | null;
	receiving_aggressive_behaviour: number | null;
	social_isolation: number | null;
	avoidance_pool_areas: number | null;
	environmental_enrichment_comments: string;
	affiliative_behaviour_comments: string;
	play_behaviour_comments: string;
	socio_sexual_behaviour_comments: string;
	maternal_behaviour_comments: string;
	displacement_behaviour_comments: string;
	oral_stereotypic_behaviour_comments: string;
	repetitive_body_movement_comments: string;
	self_grooming_behaviour_comments: string;
	regurgitation_reingestion_comments: string;
	rake_marks_comments: string;
	displaying_aggressive_behaviour_comments: string;
	receiving_aggressive_behaviour_comments: string;
	social_isolation_comments: string;
	avoidance_pool_areas_comments: string;
	created_at: string;
}

export const useEvaluationBehaviourStore = defineStore(
	'evaluationBehaviourStore',
	{
		state: (): { requestBodiesBehaviour: RequestBodyBehaviour[] } => ({
			requestBodiesBehaviour,
		}),
		actions: {
			// Fills the requestBodiesFeeding with the default
			// values for the variables for all the dolphin which
			// are in dolphinList
			async fill(dolphinList: any[]) {
				this.requestBodiesBehaviour = dolphinList.map((dolphin) => ({
					dolphin_name: dolphin.name,
					environmental_enrichment: null,
					affiliative_behaviour: null,
					play_behaviour: null,
					socio_sexual_behaviour: null,
					maternal_behaviour: null,
					displacement_behaviour: null,
					oral_stereotypic_behaviour: null,
					repetitive_body_movement: null,
					self_grooming_behaviour: null,
					regurgitation_reingestion: null,
					rake_marks: null,
					displaying_aggressive_behaviour: null,
					receiving_aggressive_behaviour: null,
					social_isolation: null,
					avoidance_pool_areas: null,
					environmental_enrichment_comments: '',
					affiliative_behaviour_comments: '',
					play_behaviour_comments: '',
					socio_sexual_behaviour_comments: '',
					maternal_behaviour_comments: '',
					displacement_behaviour_comments: '',
					oral_stereotypic_behaviour_comments: '',
					repetitive_body_movement_comments: '',
					self_grooming_behaviour_comments: '',
					regurgitation_reingestion_comments: '',
					rake_marks_comments: '',
					displaying_aggressive_behaviour_comments: '',
					receiving_aggressive_behaviour_comments: '',
					social_isolation_comments: '',
					avoidance_pool_areas_comments: '',
					created_at: '',
				}));
				return this.requestBodiesBehaviour;
			},
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
