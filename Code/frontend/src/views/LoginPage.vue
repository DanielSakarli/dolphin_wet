<template>
	<base-layout pageTitle="Login">
		<div
			class="wrapper"
			style="position: fixed; left: 0; bottom: 100px; right: 0; padding: 20px"
		>
			<h3 style="color: white">DoliMo</h3>
			<h6 style="color: white">Dolphin Health Monitoring</h6>
			<ion-button color="light" expand="block" router-link="/login"
				>Login</ion-button
			>
			<ion-button
				color="tertiary"
				style="border: 2px solid white; border-radius: 15px; margin-top: 10px"
				expand="block"
				router-link="/signup"
				>Sign Up</ion-button
			>
		</div>
	</base-layout>
</template>

<script lang="ts">
import { IonButton } from '@ionic/vue';
export default {
	components: {
		IonButton,
	},
};
</script>
