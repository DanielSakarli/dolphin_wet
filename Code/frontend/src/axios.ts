// axios.ts
import { AxiosStatic, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
	hideGlobalLoading?: boolean;
	headers: AxiosRequestHeaders;
}

export interface CustomAxiosInstance extends AxiosStatic {
	(config: CustomAxiosRequestConfig): Promise<any>;
}
