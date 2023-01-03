import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	openToast: false,
	message: '',
	severity: '',
};

const toast = createSlice({
	name: 'toast',
	initialState,
	reducers: {
		startToaster: (state, action) => {
			console.log(action.payload);
			state.openToast = action.payload.openToast;
			state.message = action.payload.message;
			state.severity = action.payload.severity;
		},
	},
});

export const { startToaster } = toast.actions;
export default toast.reducer;
