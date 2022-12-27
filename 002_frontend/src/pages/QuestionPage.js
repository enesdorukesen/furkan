import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authApi from '../libs/request';
import { getQuestion } from '../store/slices/questionSlice';

const QuestionPage = () => {
	const dispacth = useDispatch();
	const questions = useSelector((state) => state.question);
	let questionData;
	const getData = async () => {
		await authApi
			.getQuestion()
			.then((response) => (questionData = response))
			.catch((e) => (questionData = e));
		dispacth(getQuestion(questionData));
	};
	getData();

	return (
		<>
			{questions.map((item) => {
				return <p>{item}</p>;
			})}
		</>
	);
};

export default QuestionPage;
