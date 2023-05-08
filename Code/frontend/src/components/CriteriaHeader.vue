<template>
	<ion-card>
		<ion-item>
			<ion-label class="criteria">Absence of Disease</ion-label>
			<ion-label class="sub-criteria">Absence of Pain</ion-label>
			<ion-thumbnail slot="end">
				<ion-img
					alt="Silhouette of mountains"
					src="https://ionicframework.com/docs/img/demos/card-media.png"
				/>
			</ion-thumbnail>
		</ion-item>
	</ion-card>
</template>

<script lang="ts">
import { IonThumbnail, IonImg, IonItem, IonLabel } from '@ionic/vue';
export default {
	components: {
		IonThumbnail,
		IonImg,
		IonItem,
		IonLabel,
	},
};
</script>

<style scoped>
ion-item .criteria {
	font-weight: bolder;
	font-size: 1.1rem;
}
ion-item .sub-criteria {
	font-weight: light;
}
</style>
