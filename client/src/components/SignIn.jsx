import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Loader from './Loader.jsx';
import Copyright from './Copyright.jsx';
import isAlreadyLoggedIn from '../helpers/isAlreadyLoggedIn.js';
import { axiosInstance } from '../helpers/axiosInstances';
import { authenticatedInstance } from '../helpers/axiosInstances.js';



export default function SignInSide() {

	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			if (await isAlreadyLoggedIn()) {
				navigate('/home')
			} else {
				setLoading(false)
			}
		})()

	}, [])

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		try {
			let { data: {
				token,
				roles,
				permissions
			} } = await axiosInstance.post(`http://localhost:8082/api/auth/login`, {
				username: formData.get('username'),
				password: formData.get('password'),
			});
			localStorage.setItem('token', token);
			localStorage.setItem('roles', JSON.stringify(roles));
			localStorage.setItem('permissions', JSON.stringify(permissions));
			Object.assign(authenticatedInstance.defaults, { headers: { Authorization: token } });
			console.log(token);
			navigate('/home')
		} catch (e) {
			console.log(e)
		}
	};

	if (loading) {
		return <Loader />
	}

	return (
		<Stack justifyContent="center"
			alignItems="center" sx={{ height: '100vh', width: '100vw' }}>
			<Box
				sx={{
					textAlign: "center",
					width: "350px"
				}}
			>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="given-name"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link to="/register">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
					<Copyright sx={{ mt: 5 }} />
				</Box>
			</Box>
		</Stack>
	);
}