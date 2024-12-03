// import Typography from '@mui/material/Typography';
// import { Link } from "react-router-dom";

// export default (props) => {
// 	return (
// 		<Typography variant="body2" color="text.secondary" align="center" {...props}>
// 			{'Copyright © '}
// 			<Link color="inherit" href="https://mui.com/">
// 				Your Website
// 			</Link>{' '}
// 			{new Date().getFullYear()}
// 			{'.'}
// 		</Typography>
// 	);
// }


import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Typography 
        component={Link} 
        to="/" 
        sx={{ color: 'inherit', textDecoration: 'none' }}
      >
        Your Website
      </Typography>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
