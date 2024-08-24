import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Loader from './Loader.jsx';
import Copyright from './Copyright.jsx';
import { axiosInstance } from '../helpers/axiosInstances';
import isAlreadyLoggedIn from '../helpers/isAlreadyLoggedIn.js';

export default function SignUp() {


	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

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
			let res = await axiosInstance.post('/api/auth/register', {
				username: formData.get('username'),
				password: formData.get('password'),
			});
			navigate('/')
		} catch (e) {
			// handle errors here
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
					Sign up
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						autoComplete="given-name"
						name="username"
						required
						fullWidth
						id="username"
						label="Username"
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
						autoComplete="new-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link to="/">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{ mt: 5 }} />
		</Stack>
	);
}