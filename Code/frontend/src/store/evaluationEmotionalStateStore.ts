import { defineStore } from 'pinia';
import requestBodiesEmotionalState from '@/data/requestBodiesEmotionalState.json';

interface RequestBodyEmotionalState {
	willingness_to_participate: number | null;
	synchronous_swimming: number | null;
	rubbing_behaviour: number | null;
	anticipatory_behaviour: number | null;
	fast_swimming: number | null;
	tail_slapping: number | null;
	choice_and_control: number | null;
	willingness_to_participate_comments: string;
	synchronous_swimming_comments: string;
	rubbing_behaviour_comments: string;
	anticipatory_behaviour_comments: string;
	fast_swimming_comments: string;
	tail_slapping_comments: string;
	choice_and_control_comments: string;
	created_at: string;
}

export const useEvaluationEmotionalStateStore = defineStore(
	'evaluationEmotionalStateStore',
	{
		state: (): {
			requestBodiesEmotionalState: RequestBodyEmotionalState[];
		} => ({
			requestBodiesEmotionalState,
		}),
		actions: {
			// Fills the requestBodiesEmotionalState with the default
			// values for the variables
			async fill(dolphinList: any[]) {
				this.requestBodiesEmotionalState = dolphinList.map((dolphin) => ({
					dolphin_name: dolphin.name,
					willingness_to_participate: null,
					synchronous_swimming: null,
					rubbing_behaviour: null,
					anticipatory_behaviour: null,
					fast_swimming: null,
					tail_slapping: null,
					choice_and_control: null,
					willingness_to_participate_comments: '',
					synchronous_swimming_comments: '',
					rubbing_behaviour_comments: '',
					anticipatory_behaviour_comments: '',
					fast_swimming_comments: '',
					tail_slapping_comments: '',
					choice_and_control_comments: '',
					created_at: '',
				}));
				return this.requestBodiesEmotionalState;
			},
			resetBodies() {
				for (let i = 0; i < requestBodiesEmotionalState.length; i++) {
					requestBodiesEmotionalState[i]['willingness_to_participate'] = null;
					requestBodiesEmotionalState[i]['synchronous_swimming'] = null;
					requestBodiesEmotionalState[i]['rubbing_behaviour'] = null;
					requestBodiesEmotionalState[i]['anticipatory_behaviour'] = null;
					requestBodiesEmotionalState[i]['fast_swimming'] = null;
					requestBodiesEmotionalState[i]['tail_slapping'] = null;
					requestBodiesEmotionalState[i]['choice_and_control'] = null;

					requestBodiesEmotionalState[i][
						'willingness_to_participate_comments'
					] = '';
					requestBodiesEmotionalState[i]['synchronous_swimming_comments'] = '';
					requestBodiesEmotionalState[i]['rubbing_behaviour_comments'] = '';
					requestBodiesEmotionalState[i]['anticipatory_behaviour_comments'] =
						'';
					requestBodiesEmotionalState[i]['fast_swimming_comments'] = '';
					requestBodiesEmotionalState[i]['tail_slapping_comments'] = '';
					requestBodiesEmotionalState[i]['choice_and_control_comments'] = '';

					requestBodiesEmotionalState[i]['created_at'] = '';
				}
			},
		},
	}
);
