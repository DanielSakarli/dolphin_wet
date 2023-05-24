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
</template>

<script lang="ts">
import { IonItem, IonTextarea } from '@ionic/vue';
export default {
	components: {
		IonItem,
		IonTextarea,
	},
	data() {
		return {
			commentLabel: this.$t('comments'),
			helperTextComments: this.$t('helperTextComments'),
		};
	},
};
</script>

<!--<style scoped>
ion-item {
	margin: 0.5rem 2rem;
}
</style>-->
