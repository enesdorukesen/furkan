import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const question = createSlice({
	name: 'question',
	initialState,
	reducers: {
		getQuestion: (state, action) => {
			state = action.payload;
			return state;
		},
	},
});

export const { getQuestion, removeQuestion } = question.actions;
export default question.reducer;
