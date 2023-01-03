import { configureStore } from '@reduxjs/toolkit';

import auth from './auth/authSlice';
import question from './slices/questionSlice';
import toast from './slices/toasterSlice';

export const store = configureStore({
	reducer: {
		auth: auth,
		question: question,
		toast: toast,
	},
});
