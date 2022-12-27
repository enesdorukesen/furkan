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

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '../store/auth/authSlice';
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
			{/* <Link color="inherit" href="https://mui.com/">
				K12 Data Science
			</Link>{' '} */}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginPage = () => {
	const dispatch = useDispatch();
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

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			navigate('/');
		}
	}, [navigate]);

	const loginHandler = async (username, password) => {
		const info = {
			password: password,
			username: username,
		};
		let res;
		await AuthApi.loginUser(info)
			.then((response) => {
				res = response;
			})
			.catch((e) => (res = e));
		if (res['accessToken']) {
			dispatch(login(res));
			navigate('/');
		} else {
			setSeverity('error');
			setToastMessage(`Error! ${res['detail']}`);
			setOpenToast(true);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		loginHandler(data.get('username'), data.get('password'));
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
						Sign in
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="User Name"
							name="username"
							autoComplete="username"
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
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link to="/register" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
};

export default LoginPage;
