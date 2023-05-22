<template>
	<ion-app>
		<ion-router-outlet></ion-router-outlet>
		<ion-menu content-id="main-content">
			<ion-header>
      			<ion-toolbar>
        			<ion-title>Menu</ion-title>
      			</ion-toolbar>
    		</ion-header>
    		<ion-content class="ion-padding">
				<ion-button expand="block" fill="clear">Evaluation</ion-button>
				<ion-button expand="block" fill="clear">Dolphins</ion-button>
				<ion-button expand="block" fill="clear">Datalog</ion-button>
			</ion-content>
    	</ion-menu>
	</ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Device, DevicePlugin } from '@capacitor/device';

export default defineComponent({
	name: 'App',
	mounted() {
		const device: DevicePlugin = Device;
		device.getLanguageCode().then((res) => {
			console.log('Default lang', res.value);
			if (res.value.includes('-')) {
				const language = res.value.split('-')[0];
				this.$i18n.locale = language;
			} else {
				this.$i18n.locale = res.value;
			}
		});
	},
	components: {
		IonApp,
		IonRouterOutlet, 
		IonMenu, 
		IonHeader, 
		IonToolbar, 
		IonTitle,
		IonContent, 
		IonButton 
	},
	methods: {
            changeLanguage($event: any) {
                this.$i18n.locale = $event.detail.value;
            },
	},
});
</script>
