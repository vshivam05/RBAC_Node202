import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default () => <Stack
	justifyContent="center"
	alignItems="center"
	sx={{
		width: "100vw",
		height: "100vh"
	}}>
	<CircularProgress />
</Stack>