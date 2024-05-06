import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { IonicVue } from '@ionic/vue';
import { createPinia } from 'pinia';
import store from '@/store/index';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/core.css';
import { createI18n } from 'vue-i18n';
import { globalizationList } from './data/globalization';
import BaseLayout from './views/BaseLayout.vue';
import axios from 'axios';
import { CustomAxiosInstance, CustomAxiosRequestConfig } from './axios'; // adjust the path as needed

import { loadingController } from '@ionic/vue';

//import VueAxios from 'vue-axios';

/* Global components */

const i18n = createI18n({
	locale: 'en', // set locale
	fallbackLocale: 'en', // set fallback locale
	messages: globalizationList, // set locale messages
	preserveDirectiveContent: true,
});

const pinia = createPinia();
const app = createApp(App).use(IonicVue).use(router).use(i18n);

app.component('base-layout', BaseLayout);
app.use(pinia);

////////////////////////////////////////////////
// Loading component for all axios requests:
//const LoadingController = new loadingController();
/*interface CustomAxiosRequestConfig extends AxiosRequestConfig {
	hideGlobalLoading?: boolean;
	headers: AxiosRequestHeaders;
}
interface CustomAxiosInstance extends AxiosStatic {
	(config: CustomAxiosRequestConfig): Promise<any>;
}*/
const customAxios = axios as CustomAxiosInstance;

let loading: HTMLIonLoadingElement | undefined;

async function showLoading() {
	loading = await loadingController.create({
		message: 'Please wait...',
	});
	await loading.present();

	// Dismiss loading after 4 seconds
	setTimeout(() => {
		if (loading) {
			loading.dismiss();
			loading = undefined;
		}
	}, 15000); //auto-closes ion-loading after certain time if no response came yet from the server to prevent ion-loading from just running forever during a runtime-error
}

function hideLoading() {
	if (loading) {
		loading.dismiss();
	}
}

axios.interceptors.request.use(
	(config: CustomAxiosRequestConfig) => {
		if (!config.hideGlobalLoading) {
			showLoading();
		}
		return config;
	},
	(error) => {
		hideLoading();
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		hideLoading();
		return response;
	},
	(error) => {
		hideLoading();
		return Promise.reject(error);
	}
);
app.config.globalProperties.$axios = customAxios;
app.provide('loadingController', loadingController);
////////////////////////////////////////////////

//app.use(VueAxios, axios)
//app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'
//app.mount('#app')
// Register component

router.isReady().then(() => {
	app.use(store).mount('#app');
});
