import axios from 'axios';
const baseURL = 'http://localhost:8000';

export const axiosInstance = axios.create({
	baseURL
});

export const authenticatedInstance = axios.create({
	baseURL,
	headers: {
		'Authorization': localStorage.getItem('token')
	}
});