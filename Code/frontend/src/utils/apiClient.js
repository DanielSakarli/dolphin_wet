import axios from 'axios';
import { baseUrl } from '@/utils/baseUrl';

// Create an axios instance
const apiClient = axios.create({
	baseURL: baseUrl + '/api', //'http://88395-17112.pph-server.de/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers = {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
			};
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

export default apiClient;
