<template>
	<ion-app>
		<ion-page>
			<ion-split-pane content-id="main-content">
				<ion-menu content-id="main-content" type="overlay">
					<ion-content>
						<ion-list id="page-list">
							<!--<ion-list-header @click="navigateTo('/folder/Evaluate', 0)"
								>Dolphin WET</ion-list-header
							>-->
							<ion-menu-toggle
								:auto-hide="false"
								v-for="(p, i) in appPages"
								:key="i"
							>
								<ion-item
									@click="navigateTo(p.url, i)"
									lines="none"
									:detail="false"
									class="hydrated"
									:class="{ selected: selectedIndex === i }"
								>
									<!--<ion-item
								@click="selectedIndex = i"
								router-direction="root"
								:router-link="p.url"
								lines="none"
								:detail="false"
								class="hydrated"
								:class="{ selected: selectedIndex === i }"
							>-->
									<ion-label>{{ p.title }}</ion-label>
								</ion-item>
							</ion-menu-toggle>
						</ion-list>
					</ion-content>
				</ion-menu>
				<ion-router-outlet id="main-content"></ion-router-outlet>
			</ion-split-pane>
		</ion-page>
	</ion-app>
</template>

<script lang="ts">
import {
	IonApp,
	IonPage,
	IonRouterOutlet,
	IonMenu,
	IonListHeader,
	IonTitle,
	IonContent,
	IonItem,
	IonLabel,
	IonList,
	IonMenuToggle,
	IonSplitPane,
	alertController,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { ref } from 'vue';
import { Device, DevicePlugin } from '@capacitor/device';
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { baseUrl } from './utils/baseUrl';

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
		const path = window.location.pathname.split('folder/')[1];
		if (path !== undefined) {
			this.selectedIndex = this.appPages.findIndex(
				(page) => page.title.toLowerCase() === path.toLowerCase()
			);
		}
		localStorage.setItem('backButtonClicked', 'false');
	},
	setup() {
		// Handles the navigation to other routes
		const selectedIndex = ref(0); // Create a reactive variable
		const router = useRouter();

		const showAlert = async () => {
			return new Promise(async (resolve, reject) => {
				const alert = await alertController.create({
					header: 'Confirmation',
					message: 'Are you sure you want to proceed?',
					buttons: [
						{
							text: 'Stay on Page',
							role: 'cancel',
							cssClass: 'secondary',
							handler: () => {
								console.log('Cancel clicked');
								reject();
							},
						},
						{
							text: 'Lose Data',
							handler: () => {
								console.log('Confirm Okay');
								localStorage.setItem('dataInBody', 'false');
								localStorage.setItem('backButtonClicked', 'false');
								router.back();
								resolve(void 0);
							},
						},
					],
				});

				return alert.present();
			});
		};

		const navigateTo = (url, index) => {
			if (localStorage.getItem('dataInBody') === 'true') {
				showAlert();
				//selectedIndex.value = index; // Use .value to access or modify the value of a ref
				//router.push(url);
			} else {
				selectedIndex.value = index; // Use .value to access or modify the value of a ref
				console.log('url: ', url);
				console.log('index: ', index);
				if (url === '/home') {
					// Page needs a full reload when pressing on 'Logout' and
					// then go to /home, but I don´t know why
					router.push(url); //.then(() => window.location.reload());
					//Clear storages when user logs out
					localStorage.setItem('token', '');
					localStorage.setItem('dataInBody', 'false');
					localStorage.setItem('backButtonClicked', 'false');
					// Call the log out method of the carecentive-framework, so that
					// the token cookie gets deleted:
					axios
						.get(baseUrl + '/api/users/logout', { withCredentials: true })
						.then((response) => {
							console.log('Response:', response.data);
						})
						.catch((error) => {
							console.error('Error:', error.response.data);
						});
				} else {
					//Otherwise a normal router.push(url) is sufficient
					router.push(url);
				}
			}
		};

		return {
			showAlert,
			navigateTo,
			selectedIndex, // Make selectedIndex available in the template
		};
	},
	components: {
		IonApp,
		IonPage,
		IonRouterOutlet,
		IonMenu,
		IonListHeader,
		IonContent,
		IonItem,
		IonLabel,
		IonList,
		IonMenuToggle,
		IonSplitPane,
	},
	computed: {
		isLoggedIn() {
			console.log('token: ', localStorage.getItem('token'));
			return !!this.token;
		},
	},
	watch: {
		token() {
			this.token = localStorage.getItem('token');
		},
	},
	methods: {
		changeLanguage($event: any) {
			this.$i18n.locale = $event.detail.value;
		},
	},
	data() {
		return {
			selectedIndex: 0,
			token: localStorage.getItem('token'),
			appPages: [
				//{ title: 'Dolphin WET', url: '/folder/Evaluate' },
				{
					title: 'Evaluate',
					url: '/folder/Evaluate',
				},
				{
					title: 'Dolphins',
					url: '/folder/Dolphins',
				},
				{
					title: 'View Data',
					url: '/folder/Data',
				},
				{
					title: 'Logout',
					url: '/home',
				},
			],
		};
	},
});
</script>

<style scoped>
ion-menu ion-content {
	--background: var(--ion-item-background, var(--ion-background-color, #fff));
}
ion-menu.md ion-content {
	--padding-start: 8px;
	--padding-end: 8px;
	--padding-top: 20px;
	--padding-bottom: 20px;
}

ion-menu.md ion-list {
	padding: 20px 0;
}

ion-menu.md ion-note {
	margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
	padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
	border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
	font-size: 22px;
	font-weight: 600;

	min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
	font-size: 16px;

	margin-bottom: 18px;

	color: #757575;

	min-height: 26px;
}

ion-menu.md ion-item {
	--padding-start: 10px;
	--padding-end: 10px;
	border-radius: 4px;
}

ion-menu.md ion-item.selected {
	--background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
	color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
	color: #616e7e;
}

ion-menu.md ion-item ion-label {
	font-weight: 500;
}

ion-menu.ios ion-content {
	--padding-bottom: 20px;
}

ion-menu.ios ion-list {
	padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
	line-height: 24px;
	margin-bottom: 20px;
}

ion-menu.ios ion-item {
	--padding-start: 16px;
	--padding-end: 16px;
	--min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
	color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
	font-size: 24px;
	color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
	margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
	padding-left: 16px;
	padding-right: 16px;
}

ion-menu.ios ion-note {
	margin-bottom: 8px;
}

ion-note {
	display: inline-block;
	font-size: 16px;

	color: var(--ion-color-medium-shade);
}

ion-item.selected {
	--color: var(--ion-color-primary);
}
</style>
