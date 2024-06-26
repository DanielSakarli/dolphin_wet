<template>
	<ion-app>
		<ion-page>
			<ion-split-pane content-id="main-content">
				<ion-menu content-id="main-content" type="overlay">
					<ion-content>
						<ion-list id="page-list">
							<ion-menu-toggle
								:auto-hide="false"
								v-for="(p, i) in translatedAppPages"
								:key="i"
							>
								<ion-item
									@click="navigateTo(p.url, i)"
									lines="none"
									:detail="false"
									class="hydrated"
									:class="{ selected: selectedIndex === i }"
								>
									<ion-label>{{ p.title }}</ion-label>
									<!-- Updated to display the translated title -->
								</ion-item>
							</ion-menu-toggle>
							<!--<ion-list-header @click="navigateTo('/folder/Evaluate', 0)"
								>Dolphin WET</ion-list-header
							>-->
							<!--<ion-menu-toggle
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
									<ion-item
								@click="selectedIndex = i"
								router-direction="root"
								:router-link="p.url"
								lines="none"
								:detail="false"
								class="hydrated"
								:class="{ selected: selectedIndex === i }"
							>-->
							<!--<ion-label>{{ p.key }}</ion-label>
								</ion-item>
							</ion-menu-toggle>-->
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
	IonContent,
	IonItem,
	IonLabel,
	IonList,
	IonMenuToggle,
	IonSplitPane,
	alertController,
} from '@ionic/vue';
import { computed, defineComponent } from 'vue';
import { ref } from 'vue';
import { Device, DevicePlugin } from '@capacitor/device';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { baseUrl } from './utils/baseUrl';
import { useI18n } from 'vue-i18n';

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
				(page: any) => page.title.toLowerCase() === path.toLowerCase()
			);
		}
		localStorage.setItem('backButtonClicked', 'false');
	},
	methods: {
		async showAlert() {
			return new Promise((resolve, reject) => {
				alertController
					.create({
						header: this.$t('confirmationHeader'),
						message: this.$t('confirmationMessage'),
						buttons: [
							{
								text: this.$t('stayOnPage'),
								role: 'cancel',
								cssClass: 'secondary',
								handler: () => {
									console.log('Cancel clicked');
									reject();
								},
							},
							{
								text: this.$t('loseData'),
								handler: () => {
									console.log('Confirm Okay');
									localStorage.setItem('dataInBody', 'false');
									localStorage.setItem('backButtonClicked', 'false');
									this.$router.back();
									resolve(void 0);
								},
							},
						],
					})
					.then((alert) => {
						alert.present();
					});
			});
		},
		navigateTo(url: string, index: number) {
			if (localStorage.getItem('dataInBody') === 'true') {
				this.showAlert();
				//this.selectedIndex = index; // Use .value to access or modify the value of a ref
			} else {
				this.selectedIndex = index; // Use .value to access or modify the value of a ref
				console.log('url: ', url);
				console.log('index: ', index);
				if (url === '/home') {
					// Page needs a full reload when pressing on 'Logout' and
					// then go to /home, but I don´t know why
					this.$router.push(url); //.then(() => window.location.reload());
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
					this.$router.push(url);
				}
			}
		},
		changeLanguage($event: any) {
			this.$i18n.locale = $event.detail.value;
		},
	},
	data() {
		return {
			selectedIndex: 0,
			appPages: [
				{
					key: 'evaluate',
					url: '/folder/Evaluate',
				},
				{
					key: 'dolphins',
					url: '/folder/Dolphins',
				},
				{
					key: 'viewData',
					url: '/folder/Data',
				},
				{
					key: 'settings',
					url: '/folder/Settings',
				},
				{
					key: 'logout',
					url: '/home',
				},
			],
			token: '',
		};
	},
	components: {
		IonApp,
		IonPage,
		IonRouterOutlet,
		IonMenu,
		IonContent,
		IonItem,
		IonLabel,
		IonList,
		IonMenuToggle,
		IonSplitPane,
	},
	computed: {
		isLoggedIn(): boolean {
			console.log('token: ', localStorage.getItem('token'));
			return !!this.token.valueOf;
		},
		translatedAppPages() {
			return this.appPages.map((page) => ({
				...page,
				title: this.$t(page.key),
			}));
		},
		/*translatedAppPages() {
			return this.appPages.map((page) => ({
				...page,
				display: this.$t(page.display),
			}));
		},*/
	},
	/*setup() {
		const { t } = useI18n(); // Use the i18n instance to get the translation function
		// Handles the navigation to other routes
		const selectedIndex = ref(0); // Create a reactive variable
		const router = useRouter();
		// Stay in sync with the localStorage:
		const token = computed({
			get: () => localStorage.getItem('token') || '',
			set: (value: string) => localStorage.setItem('token', value),
		});

		/*const showAlert = async () => {
			return new Promise((resolve, reject) => {
				alertController
					.create({
						header: t('confirmationHeader'),
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
					})
					.then((alert) => {
						alert.present();
					});
			});
		};

		const navigateTo = (url: string, index: number) => {
			if (localStorage.getItem('dataInBody') === 'true') {
				showAlert();
				//selectedIndex.value = index; // Use .value to access or modify the value of a ref
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
			//showAlert,
			navigateTo,
			selectedIndex, // Make selectedIndex available in the template
			token,
			appPages: [
				{
					display: 'evaluate',
					value: 'Evaluate',
					url: '/folder/Evaluate',
				},
				{
					display: 'dolphins',
					value: 'Dolphins',
					url: '/folder/Dolphins',
				},
				{
					display: 'viewData',
					value: 'View Data',
					url: '/folder/Data',
				},
				{
					display: 'settings',
					value: 'Settings',
					url: '/folder/Settings',
				},
				{
					display: 'logout',
					value: 'Logout',
					url: '/home',
				},
				/*{title: this.$t('evaluate'),
					url: '/folder/Evaluate',
				},
				{
					title: 'Dolphins', //t('dolphins'),
					url: '/folder/Dolphins',
				},
				{
					title: 'View Data', // t('viewData'),
					url: '/folder/Data',
				},
				{
					title: 'Settings', //t('settings'),
					url: '/folder/Settings',
				},
				{
					title: 'Logout', //t('logout'),
					url: '/home',
				},
			],
		};*/
	//},

	/*watch: {
		token() {
			this.token.valueOf = localStorage.getItem('token');
		},
	},*/

	/*data() {
		return {
			//selectedIndex: 0,
			//token: localStorage.getItem('token'),
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
	},*/
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
