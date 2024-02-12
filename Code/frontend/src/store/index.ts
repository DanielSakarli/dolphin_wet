import { createStore, Store } from 'vuex';

interface State {
	//userComment: string;
	body_condition_score_comments: string;
	weight_measured_comments: string;
	kcal_calculations_comments: string;
	blood_hydration_comments: string;
	fish_quality_comments: string;
	fish_variety_comments: string;
}

export default createStore<State>({
	state: {
		//userComment: '', //might need to add the specific comments??
		body_condition_score_comments: '',
		weight_measured_comments: '',
		kcal_calculations_comments: '',
		blood_hydration_comments: '',
		fish_quality_comments: '',
		fish_variety_comments: '',
	},
	mutations: {
		/*setUserComment(state: State, comment: string) {
			state.userComment = comment;
		},*/
		setBodyConditionScoreComment(state: State, comment: string) {
			state.body_condition_score_comments = comment;
		},
		setWeightMeasuredComment(state: State, comment: string) {
			state.weight_measured_comments = comment;
		},
		setKcalCalculationsComment(state: State, comment: string) {
			state.kcal_calculations_comments = comment;
		},
		setBloodHydrationComment(state: State, comment: string) {
			state.blood_hydration_comments = comment;
		},
		setFishQualityComment(state: State, comment: string) {
			state.fish_quality_comments = comment;
		},
		setFishVarietyComment(state: State, comment: string) {
			state.fish_variety_comments = comment;
		},
	},
	actions: {
		/*updateUserComment({ commit }, comment: string) {
			commit('setUserComment', comment);
		},*/
		updateBodyConditionScoreComment({ commit }, comment: string) {
			commit('setBodyConditionScoreComment', comment);
		},
		updateWeightMeasuredComment({ commit }, comment: string) {
			commit('setWeightMeasuredComment', comment);
		},
		updateKcalCalculationsComment({ commit }, comment: string) {
			commit('setKcalCalculationsComment', comment);
		},
		updateBloodHydrationComment({ commit }, comment: string) {
			commit('setBloodHydrationComment', comment);
		},
		updateFishQualityComment({ commit }, comment: string) {
			commit('setFishQualityComment', comment);
		},
		updateFishVarietyComment({ commit }, comment: string) {
			commit('setFishVarietyComment', comment);
		},
	},
	getters: {
		//getUserComment: (state: State) => state.userComment,
		getBodyConditionScoreComment: (state: State) => state.body_condition_score_comments,
		getWeightMeasuredComment: (state: State) => state.weight_measured_comments,
		getKcalCalculationsComment: (state: State) => state.kcal_calculations_comments,
		getBloodHydrationComment: (state: State) => state.blood_hydration_comments,
		getFishQualityComment: (state: State) => state.fish_quality_comments,
		getFishVarietyComment: (state: State) => state.fish_variety_comments,
	},
});
