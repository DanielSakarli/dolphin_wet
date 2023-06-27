<template>
	<ion-button>
		<slot></slot>
	</ion-button>
</template>

<script lang="ts">
import { IonButton } from '@ionic/vue';
export default {
	components: {
		IonButton,
	},
};
</script>
