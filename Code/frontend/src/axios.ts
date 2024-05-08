// axios.ts
// This file is used to extend AxiosRequestConfig with a custom property hideGlobalLoading.
import 'axios';

declare module 'axios' {
	export interface AxiosRequestConfig {
		hideGlobalLoading?: boolean;
	}
}

/*export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
	hideGlobalLoading?: boolean;
	headers: AxiosRequestHeaders;
}

export interface CustomAxiosInstance extends AxiosStatic {
	(config: CustomAxiosRequestConfig): Promise<any>;
}

// TEST
const customAxios = axios.create();

export default customAxios;
*/
