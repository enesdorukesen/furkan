import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const question = createSlice({
	name: 'question',
	initialState,
	reducers: {
		getQuestion: (state, action) => {
			console.log(action.payload);
			action.payload.map((item) => {
				console.log(item);
				if (state.find((item) => item.name === action.payload.name)) {
					return state;
				} else {
					let object = {
						name: item.name,
						qtype: item.qtype,
						concept: item.concept,
						level: item.level,
						text: item.text,
						solution: item.solution,
						choices: item.choices,
					};
					console.log('object to add:', object);
					state = ['...state, object'];
					return state;
				}
			});
		},
		removeQuestion: (state, action) => {
			return state.filter((item) => item.name !== action.payload.name);
		},
	},
});

export const { getQuestion, removeQuestion } = question.actions;
export default question.reducer;
