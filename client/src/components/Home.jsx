import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Loader from "./Loader.jsx";
import { authenticatedInstance } from '../helpers/axiosInstances.js';

export default () => {

	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [songs, setSongs] = useState([]);
	const [roles, setRoles] = useState(() => (JSON.parse(localStorage.getItem('roles'))) || {});
	const [permissions, setPermissions] = useState(() => (JSON.parse(localStorage.getItem('permissions')) || {}));

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			navigate('/');
		}

		(async () => {
			let { data: resSong } = await authenticatedInstance.get('/api/song')
			setSongs(resSong.data.songs)
			setLoading(false);
		})()


	}, [])

	async function upgradeToPremium() {
		try {
			const { data: dbRes } = await authenticatedInstance.post('/api/user/upgrade');
			// override localStorage - roles and permissions

			// updating role and permissions in state

		} catch (e) {
			console.log(e)
		}
	}

	async function likeSong() {
		try {
			await authenticatedInstance.post('/api/song/like');
		} catch (e) {
			console.log(e)
		}
	}

	async function downloadSong() {
		try {
			await authenticatedInstance.get('/api/song/download');
		} catch (e) {
			console.log(e)
		}
	}

	if (!localStorage.getItem('token')) {
		return null
	}

	if (loading) {
		<Loader />
	}

	return <Stack
		sx={{
			width: "100vw",
			height: "100vh",
		}}
	>
		<Box sx={{
			padding: '8px',
			textAlign: "right"
		}}>
			<Button
				variant="contained"
				onClick={() => {
					localStorage.clear();
					Object.assign(authenticatedInstance.defaults, { headers: { Authorization: null } });
					navigate('/')
				}}
			>
				Logout
			</Button>
		</Box>
		<Box sx={{
			padding: '8px',
			textAlign: 'center'
		}}>
			{roles.premium || <Button
				type="info"
				variant="contained"
				onClick={upgradeToPremium}
			>Upgrade to Premium</Button>
			}
		</Box>
		<Box sx={{
			padding: '8px',
			flex: 1,
			margin: "auto"
		}}>
			{songs.map(({ _id, title, artist }) => <Stack
				key={_id}
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				sx={{
					width: "60vw",
					margin: "8px",
					padding: "16px",
					background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
					borderRadius: "10px"
				}}>
				<Box>
					<Typography>{title}</Typography>
					<Typography variant="subtitle2" ml={4}>by {artist}</Typography>
				</Box>
				<Box>
					{permissions.song?.like && <Button
						variant="contained"
						onClick={likeSong}>
						Like
					</Button>}
					{permissions.song?.download && <Button
						sx={{
							marginLeft: "8px"
						}}
						variant="contained"
						onClick={downloadSong}>
						Download
					</Button>}
				</Box>
			</Stack>)}
		</Box>
	</Stack>
}