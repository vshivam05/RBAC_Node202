import { authenticatedInstance } from './axiosInstances.js';

export default async () => {
	try {
		// verify token
		let { data: {
			roles,
			permissions
		} } = await authenticatedInstance.post('/api/auth')
		localStorage.setItem('roles', JSON.stringify(roles));
		localStorage.setItem('permissions', JSON.stringify(permissions));
		// if available redirect to /home
		return true;
	} catch (e) {
		return false;
	}
}