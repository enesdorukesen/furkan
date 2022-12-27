import './App.css';
import React from 'react';

import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import QuestionPage from './pages/QuestionPage';

function App() {
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

			{/* <Footer /> */}
		</>
	);
}

export default App;
