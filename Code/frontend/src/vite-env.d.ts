/// <reference types="vite/client" />

import { CustomAxiosInstance } from './axios'; // my own customized axios instance

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$axios: CustomAxiosInstance;
	}
}
