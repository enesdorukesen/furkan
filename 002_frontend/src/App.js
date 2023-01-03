import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import QuestionPage from './pages/QuestionPage';
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { startToaster } from './store/slices/toasterSlice';

function App() {
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});
	const dispatch = useDispatch();
	const toast = useSelector((state) => state.toast);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		const toasterData = {
			openToast: false,
			severity: '',
			message: ``,
		};
		dispatch(startToaster(toasterData));
	};

	return (
		<>
			<Header />

			<Routes>
				<Route exact path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/question" element={<QuestionPage />} />
			</Routes>

			<Snackbar
				open={toast.openToast}
				autoHideDuration={2000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity={toast.severity}
					sx={{ width: '100%' }}
				>
					{toast.message}
				</Alert>
			</Snackbar>
		</>
	);
}

export default App;
