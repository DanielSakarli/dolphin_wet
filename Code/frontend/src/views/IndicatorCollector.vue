<template>
	<ion-content>
		<PrincipleHeader />
		<CriteriaHeader />
	</ion-content>
</template>

<script lang="ts">
import { IonContent } from '@ionic/vue';
import PrincipleHeader from '@/components/PrincipleHeader.vue';
import CriteriaHeader from '@/components/CriteriaHeader.vue';
export default {
	components: {
		IonContent,
		PrincipleHeader,
		CriteriaHeader,
	},
};
</script>
