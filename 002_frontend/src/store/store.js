import { configureStore } from '@reduxjs/toolkit';

import auth from './auth/authSlice';
import question from './slices/questionSlice';

export const store = configureStore({
	reducer: {
		auth: auth,
		question: question,
	},
});
