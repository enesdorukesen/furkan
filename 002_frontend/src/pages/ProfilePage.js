import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import React, { useState } from 'react';

import AuthApi from '../libs/request';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/auth/authSlice';

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProfilePage = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth);
	const [openToast, setOpenToast] = useState(false);
	const [severity, setSeverity] = useState('');
	const [toastMessage, setToastMessage] = useState('');

	const ToastClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenToast(false);
	};

	const updateHandler = async (first_name, last_name, mobile) => {
		let res;
		await AuthApi.updateUser({ first_name, last_name, mobile })
			.then((response) => {
				res = response;
			})
			.catch((e) => (res = e));
		if (res['message'] === 'Success') {
			setSeverity('success');
			setToastMessage(`Success! User profile updated!`);
			setOpenToast(true);
			const fetchData = async () => {
				let res;
				await AuthApi.getUser()
					.then((response) => (res = response))
					.catch((e) => (res = e));
				dispatch(setUser(res));
			};
			fetchData();
		} else {
			setSeverity('error');
			setToastMessage(`Error! Update failed!`);
			console.log(toastMessage);
			setOpenToast(true);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		updateHandler(
			data.get('first_name'),
			data.get('last_name'),
			data.get('mobile')
		);
	};

	return (
		<ThemeProvider theme={theme}>
			<Snackbar open={openToast} autoHideDuration={1000} onClose={ToastClose}>
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
					<Typography component="h1" variant="h5">
						User Profile
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
									fullWidth
									id="username"
									label="Username"
									name="username"
									defaultValue={user.userName}
									disabled
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									defaultValue={user.email}
									disabled
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									id="status"
									label="Status"
									name="status"
									defaultValue={user.status}
									disabled
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									id="firstname"
									label="First Name"
									name="first_name"
									defaultValue={user.firstName}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									id="lastname"
									label="Last Name"
									name="last_name"
									defaultValue={user.lastName}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									id="mobile"
									label="Mobile Number"
									name="mobile"
									defaultValue={user.mobile}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Update
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default ProfilePage;
