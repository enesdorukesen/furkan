import axios from 'axios';
import { baseUrl } from './config';
import { store } from '../store/store';
import { logout } from '../store/auth/authSlice';
const baseURL = baseUrl;
const headers = axios.defaults.headers;

headers.common['Content-Type'] = '*/*';
headers.common['Accept'] = 'application/json';

const instance = axios.create({
	baseURL,
	headers: headers,
	withCredentials: true,
});

instance.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken');
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response.status === 500) {
			store.dispatch(logout());
		}
		if (error.response && error.response.data) {
			return Promise.reject(error.response.data);
		}
		return Promise.reject(error.message);
	}
);

export { instance as axios };
