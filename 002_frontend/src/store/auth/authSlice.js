import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	accessToken: '',
	userName: 'Guest',
	email: '',
	status: '',
	firstName: '',
	lastName: '',
	mobile: '',
	loggedin: false,
};

const auth = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			if (localStorage.getItem('accessToken')) {
				state.accessToken = localStorage.getItem('accessToken');
			} else {
				localStorage.setItem('accessToken', action.payload.accessToken);
				state.accessToken = action.payload.accessToken;
			}
		},
		logout: (state) => {
			localStorage.removeItem('accessToken');
			state = initialState;
			return state;
		},
		setUser(state, action) {
			state.userName = action.payload.username;
			state.email = action.payload.email;
			state.status = action.payload.status;
			state.email = action.payload.email;
			state.firstName = action.payload.first_name;
			state.lastName = action.payload.last_name;
			state.mobile = action.payload.mobile;
			state.loggedin = true;
		},
	},
});

export const { login, logout, setUser } = auth.actions;
export default auth.reducer;
