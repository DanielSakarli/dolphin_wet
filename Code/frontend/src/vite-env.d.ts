/// <reference types="vite/client" />

import { CustomAxiosInstance } from './axios'; // adjust the path as needed

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$axios: CustomAxiosInstance;
	}
}
