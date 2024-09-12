import { apiClient } from './request';

export const getCollections = async () => {
	const res = await apiClient.get('nft/collections');
	return res.data.data;
};

export const getAttributes = async (text: string) => {
	const res = await apiClient.get(`nft/attributes?text=${encodeURI(text)}`);
	return res.data.data;
};

interface DateI {
	image: string;
	info: string;
	attributes: any[];
}

export const mint = async (data: DateI) => {
	const form = new FormData();
	form.set('image', data.image);
	form.set('info', data.info);
	form.set('attributes', JSON.stringify(data.attributes));
	const res = await apiClient.post('nft/mint', form, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
	return res.data.data;
};

export const getCollection = async () => {
	const res = await apiClient.get('nft/collection');
	return res.data.data;
};
