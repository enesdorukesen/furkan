import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AuthApi from '../libs/request';
import { setUser } from '../store/auth/authSlice';
import LinearRegression from '../components/LinearRegression';
import { startToaster } from '../store/slices/toasterSlice';
import PythonPlayground from '../components/PythonPlayground';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

const HomePage = () => {
	const [innerValue, setInnerValue] = useState(0);
	const dispatch = useDispatch();
	let user = useSelector((state) => state.auth);
	let toasterData;

	const innerHandleChange = (event, newValue) => {
		setInnerValue(newValue);
	};

	if (user.accessToken !== '' && user.userName === 'Guest') {
		const fetchData = async () => {
			let res;
			await AuthApi.getUser()
				.then((response) => (res = response))
				.catch((e) => (res = e));
			if (res['username']) {
				toasterData = {
					openToast: true,
					severity: 'success',
					message: `Welcome ${res.username}`,
				};
			}
			dispatch(startToaster(toasterData));
			dispatch(setUser(res));
		};
		fetchData();
	}

	return (
		<Box sx={{ width: '98vw', paddingLeft: '1vw' }}>
			<Box
				sx={{
					borderBottom: 1,
					borderColor: 'divider',
					width: '100%',
					padding: 0,
					margin: 0,
				}}
			>
				<Tabs
					value={innerValue}
					onChange={innerHandleChange}
					aria-label="basic tabs example"
				>
					<Tab label="Linear Regressions" />
					<Tab label="Other Topic1" />
					<Tab label="Other Topic2" />
				</Tabs>
			</Box>
			<TabPanel value={innerValue} index={0}>
				<LinearRegression />
				<PythonPlayground />
			</TabPanel>
			<TabPanel value={innerValue} index={1}>
				Topic 1 content
			</TabPanel>
			<TabPanel value={innerValue} index={2}>
				Topic 2 content
			</TabPanel>
		</Box>
	);
};

export default HomePage;
