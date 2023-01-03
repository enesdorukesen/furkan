import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AuthApi from '../libs/request';
import { setUser } from '../store/auth/authSlice';
import { startToaster } from '../store/slices/toasterSlice';

const theme = createTheme();

const ProfilePage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth);
	let toasterData;

	const updateHandler = async (first_name, last_name, mobile) => {
		let res;
		await AuthApi.updateUser({ first_name, last_name, mobile })
			.then((response) => {
				res = response;
			})
			.catch((e) => (res = e));
		if (res['message'] === 'Success') {
			toasterData = {
				openToast: true,
				severity: 'success',
				message: `Success! User profile updated!`,
			};
			dispatch(startToaster(toasterData));
			navigate('/');

			const fetchData = async () => {
				let res;
				await AuthApi.getUser()
					.then((response) => (res = response))
					.catch((e) => (res = e));
				dispatch(setUser(res));
			};
			fetchData();
		} else {
			toasterData = {
				openToast: true,
				severity: 'error',
				message: `Error! Update failed!`,
			};
			dispatch(startToaster(toasterData));
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
