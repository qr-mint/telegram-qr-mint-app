import { apiClient } from './request';

export const mint = async (key: string) => {
	const res = await apiClient.post(`/collections/${key}/mint`);
	return res.data;
};

export const getCollection = async (key: string) => {
	const res = await apiClient.get(`/collections/${key}`);
	return res.data.data;
};