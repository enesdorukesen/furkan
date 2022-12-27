import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary">
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				K12
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const Footer = () => {
	return (
		<Box
			sx={{
				position: 'absolute',
				bottom: 0,
				width: '100vw',
			}}
		>
			<CssBaseline />
			<Box
				component="footer"
				sx={{
					py: 3,
					px: 2,
					mt: 'auto',
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? theme.palette.grey[200]
							: theme.palette.grey[800],
				}}
			>
				<Container sx={{ display: 'flex', justifyContent: 'center' }}>
					<Copyright />
				</Container>
			</Box>
		</Box>
	);
};

export default Footer;
