import { axios as authAxios } from './axios.lib';
import { baseUrl } from './config';

class AuthApi {
	async registerUser(params) {
		const response = await authAxios.post(`${baseUrl}/api/register`, params);
		return response.data;
	}
	async loginUser(params) {
		const response = await authAxios.post(`${baseUrl}/api/login`, params);
		return response.data;
	}
	async getUser() {
		const response = await authAxios.get(`${baseUrl}/api/user`);
		return response.data;
	}
	async updateUser(params) {
		const response = await authAxios.post(`${baseUrl}/api/user/update`, params);
		return response.data;
	}
	async getQuestion() {
		const response = await authAxios.get(`${baseUrl}/api/question`);
		return response.data;
	}
	async addQuestion(params) {
		const response = await authAxios.post(`${baseUrl}/question/add`, params);
		return response.data;
	}
}

export default new AuthApi();
