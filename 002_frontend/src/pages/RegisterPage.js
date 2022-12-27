import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthApi from '../libs/request';

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				K12 Data Science
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RegisterPage = () => {
	const navigate = useNavigate();
	const [openToast, setOpenToast] = useState(false);
	const [severity, setSeverity] = useState('');
	const [toastMessage, setToastMessage] = useState('');

	const ToastClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenToast(false);
	};

	const registerHandler = async (email, password) => {
		const info = {
			email: email,
			password: password,
			username: 'user',
		};
		let res;
		await AuthApi.registerUser(info)
			.then((response) => {
				res = response;
			})
			.catch((e) => (res = e));
		console.log(res);
		if (res['message'] === 'success') {
			setSeverity('success');
			setToastMessage(`Success! Please check ${res.email}`);
			setOpenToast(true);
			navigate('/login');
		} else {
			setSeverity('error');
			setToastMessage(`Error! Email alredy in use`);
			console.log(toastMessage);
			setOpenToast(true);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get('email'),
			password: data.get('password'),
		});
		registerHandler(data.get('email'), data.get('password'));
	};

	return (
		<ThemeProvider theme={theme}>
			<Snackbar open={openToast} autoHideDuration={6000} onClose={ToastClose}>
				<Alert onClose={ToastClose} severity={severity} sx={{ width: '100%' }}>
					{toastMessage}
				</Alert>
			</Snackbar>

			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox value="allowExtraEmails" color="primary" />
									}
									label="I agree to the terms and conditions and privacy policy"
								/>
							</Grid>
						</Grid>
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
								<Link to="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
};

export default RegisterPage;
