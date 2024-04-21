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
				console.log('Resetting data');
				for (let i = 0; i < requestBodiesEmotionalState.length; i++) {
					console.log(
						'Resetting data for: ',
						this.requestBodiesEmotionalState[i]['dolphin_name']
					);
					this.requestBodiesEmotionalState[i]['willingness_to_participate'] =
						null;
					this.requestBodiesEmotionalState[i]['synchronous_swimming'] = null;
					this.requestBodiesEmotionalState[i]['rubbing_behaviour'] = null;
					this.requestBodiesEmotionalState[i]['anticipatory_behaviour'] = null;
					this.requestBodiesEmotionalState[i]['fast_swimming'] = null;
					this.requestBodiesEmotionalState[i]['tail_slapping'] = null;
					this.requestBodiesEmotionalState[i]['choice_and_control'] = null;

					this.requestBodiesEmotionalState[i][
						'willingness_to_participate_comments'
					] = '';
					this.requestBodiesEmotionalState[i]['synchronous_swimming_comments'] =
						'';
					this.requestBodiesEmotionalState[i]['rubbing_behaviour_comments'] =
						'';
					this.requestBodiesEmotionalState[i][
						'anticipatory_behaviour_comments'
					] = '';
					this.requestBodiesEmotionalState[i]['fast_swimming_comments'] = '';
					this.requestBodiesEmotionalState[i]['tail_slapping_comments'] = '';
					this.requestBodiesEmotionalState[i]['choice_and_control_comments'] =
						'';

					this.requestBodiesEmotionalState[i]['created_at'] = '';
				}
			},
		},
	}
);
