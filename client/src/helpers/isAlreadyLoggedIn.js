import { authenticatedInstance } from './axiosInstances.js';
// import { useNavigate } from 'react-router-dom';
export default async () => {
	// const navigate = useNavigate();
	try {
		// verify token
		let { data: {
			roles,
			permissions
		} } = await authenticatedInstance.post('http://localhost:8082/api/auth')
		localStorage.setItem('roles', JSON.stringify(roles));
		localStorage.setItem('permissions', JSON.stringify(permissions));
		// if available redirect to /home
		// navigate('/home')
		return true;
	} catch {
		return false;
	}
}