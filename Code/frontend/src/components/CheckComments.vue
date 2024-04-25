<template>
	<ion-item lines="none">
		<ion-textarea
			v-model="userComment"
			:label="commentLabel"
			placeholder="Type something here"
			label-placement="floating"
			:helper-text="helperTextComments"
			:auto-grow="true"
		></ion-textarea>
	</ion-item>
</template>
<!-- 
	Removed that from the ion-textarea and tried a watch function instead
	@input="updateUserComment"
-->
<script lang="ts">
import { IonItem, IonTextarea } from '@ionic/vue';
import { defineComponent } from 'vue';
//import FeedingCheckCriteriaSelector from './FeedingCheckCriteriaSelector.vue';
import { mapActions } from 'vuex';

export default defineComponent({
	components: {
		IonItem,
		IonTextarea,
		//FeedingCheckCriteriaSelector,
	},
	methods: {
		...mapActions(['updateUserComment']),
		updateUserComment(event: any) {
			this.userComment = event.target.value;
			this.updateUserComment(this.userComment);
			console.log('userComment: ', this.userComment);
		},
	},
	data() {
		return {
			commentLabel: this.$t('comments'),
			helperTextComments: this.$t('helperTextComments'),
			userComment: '', //data property that will be updated whenever the user types into the textarea --> bind it with v-model in FeedingCheckCriteriaSelector.vue
		};
	},
	watch: {
		userComment(newComment) {
			this.$emit('update-comment', newComment);
		},
	},
});
</script>
