import axios from 'axios';
import { useAuthStore } from '@/store/auth';

export const apiClient = axios.create({
	baseURL: process.env.API_URL,
	withCredentials: true,
	timeout: 30000,
});

interface IHeader {
	'Authorization': string,
}

apiClient.interceptors.request.use((config: any) => {
	const { access_token } = useAuthStore.getState();

	if (access_token) {
		const headers: IHeader = {
			Authorization: `Bearer ${access_token}`,
		};
		config.headers = headers;
	}
	return config;
});


apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (!error) return;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const { refreshToken, disconnect, access_token } = useAuthStore.getState();
			try {
				await refreshToken();
	
				if (access_token) {
					const headers: IHeader = {
						Authorization: `Bearer ${access_token}`,
					};
					originalRequest.headers = headers;
				}
				return apiClient(originalRequest);
			} catch (err) {
				disconnect();
				return Promise.resolve(err);
			}
		} else if (error.response.status === 406) {
			const { disconnect } = useAuthStore.getState();
			await disconnect();
			return Promise.resolve(error);
		} else {
			return Promise.reject(error);
		}
	},
);
