<template>
	<ion-item lines="none">
		<ion-textarea
			:label="commentLabel"
			placeholder="Type something here"
			label-placement="floating"
			:helper-text="helperTextComments"
			:auto-grow="true"
		></ion-textarea>
	</ion-item>
	<!--<FeedingCheckCriteriaSelector :user-comment="userComment" />-->
</template>

<script lang="ts">
import { IonItem, IonTextarea } from '@ionic/vue';
import FeedingCheckCriteriaSelector from './FeedingCheckCriteriaSelector.vue';

export default {
	components: {
		IonItem,
		IonTextarea,
		//FeedingCheckCriteriaSelector,
	},
	data() {
		return {
			commentLabel: this.$t('comments'),
			helperTextComments: this.$t('helperTextComments'),
			//userComment: '', //data property that will be updated whenever the user types into the textarea --> bind it with v-model in FeedingCheckCriteriaSelector.vue
		};
	},
};
</script>

<!--<style scoped>
ion-item {
	margin: 0.5rem 2rem;
}
</style>-->
