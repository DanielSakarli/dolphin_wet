<template>
	<ion-app>
		<ion-router-outlet />
		<indicator-collector></indicator-collector>
	</ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import IndicatorCollector from './views/IndicatorCollector.vue';
</script>
