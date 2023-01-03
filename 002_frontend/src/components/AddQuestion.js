import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import React from 'react';
import { useDispatch } from 'react-redux';

import AuthApi from '../libs/request';
import { startToaster } from '../store/slices/toasterSlice';

const theme = createTheme();

const AddQuestion = () => {
	const dispatch = useDispatch();
	let toasterData;

	const addQuestionHandler = async (
		concept,
		quizOrSample,
		qtype,
		level,
		text,
		solution,
		a,
		b,
		c,
		d,
		e,
		answer
	) => {
		const info = {
			concept: concept,
			quiz_or_sample: quizOrSample,
			qtype: qtype,
			level: level,
			text: text,
			solution: solution,
			choices: { a, b, c, d, e, answer },
		};
		let res;
		console.log(info);
		await AuthApi.addQuestion(info)
			.then((response) => {
				res = response;
			})
			.catch((e) => (res = e));
		if (res['name']) {
			toasterData = {
				openToast: true,
				severity: 'success',
				message: `Question added successfully`,
			};
			dispatch(startToaster(toasterData));
		} else {
			toasterData = {
				openToast: true,
				severity: 'error',
				message: `Error! ${res['detail']}`,
			};
			dispatch(startToaster(toasterData));
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		addQuestionHandler(
			data.get('concept'),
			data.get('quizOrSample'),
			data.get('qtype'),
			data.get('level'),
			data.get('text'),
			data.get('solution'),
			data.get('a'),
			data.get('b'),
			data.get('d'),
			data.get('f'),
			data.get('e'),
			data.get('answer')
		);
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main">
				<FormControl fullWidth>
					<Grid component="form" onSubmit={handleSubmit} container spacing={1}>
						<Grid item xs={3}>
							<FormControl fullWidth>
								<InputLabel id="concept">Concept</InputLabel>
								<Select
									name="concept"
									label="concept"
									id="concept"
									defaultValue={10}
								>
									<MenuItem value={10}>Item 1</MenuItem>
									<MenuItem value={20}>Item 2</MenuItem>
									<MenuItem value={30}>Item 3</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={3}>
							<FormControl fullWidth>
								<InputLabel id="quizOrSample">Question for ...</InputLabel>
								<Select
									name="quizOrSample"
									label="quizOrSample"
									id="quizOrSample"
									defaultValue={'01'}
								>
									<MenuItem value={'01'}>Sample</MenuItem>
									<MenuItem value={'02'}>Quiz</MenuItem>
									<MenuItem value={'03'}>Both</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={3}>
							<FormControl fullWidth>
								<InputLabel id="qtype">Type</InputLabel>
								<Select
									name="qtype"
									label="qtype"
									id="qtype"
									defaultValue={'MC'}
								>
									<MenuItem value={'MC'}>Multiple Choice</MenuItem>
									<MenuItem value={'ST'}>Second Type </MenuItem>
									<MenuItem value={'TT'}>Third Type</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={3}>
							<FormControl fullWidth>
								<InputLabel id="level">Difficulty</InputLabel>
								<Select
									name="level"
									label="Difficulty"
									id="level"
									defaultValue={'01'}
								>
									<MenuItem value={'01'}>Easy</MenuItem>
									<MenuItem value={'02'}>Medium</MenuItem>
									<MenuItem value={'03'}>Hard</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name="text"
								label="Text"
								id="text"
								sx={{ mt: 1 }}
								fullWidth
								multiline
								rows={4}
							/>
							<TextField
								name="solution"
								label="Solution"
								id="solution"
								sx={{ mt: 1 }}
								fullWidth
								multiline
								rows={4}
							/>
						</Grid>
						<Grid item xs={3}>
							<FormControl fullWidth>
								<TextField name="a" label="choice A" id="a" sx={{ mt: 1 }} />
								<TextField name="b" label="choice B" id="b" sx={{ mt: 1 }} />
								<TextField name="c" label="choice C" id="c" sx={{ mt: 1 }} />
								<TextField name="d" label="choice D" id="d" sx={{ mt: 1 }} />
								<TextField name="e" label="choice E" id="e" sx={{ mt: 1 }} />
							</FormControl>
						</Grid>
						<Grid item xs={3}>
							<FormControl fullWidth sx={{ mt: 1 }}>
								<InputLabel id="answer">Answer</InputLabel>
								<Select
									name="answer"
									label="answer"
									id="answer"
									defaultValue={'A'}
								>
									<MenuItem value={'A'}>Choise A</MenuItem>
									<MenuItem value={'B'}>Choise B</MenuItem>
									<MenuItem value={'C'}>Choise C</MenuItem>
									<MenuItem value={'D'}>Choise D</MenuItem>
									<MenuItem value={'E'}>Choise E</MenuItem>
								</Select>
							</FormControl>{' '}
							<div
								sx={{
									marginTop: 8,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									width: '100%',
								}}
							>
								<Button
									type="submit"
									variant="contained"
									sx={{ mt: 1 }}
									fullWidth
								>
									Add Question
								</Button>
							</div>
						</Grid>
					</Grid>
				</FormControl>
			</Container>
		</ThemeProvider>
	);
};

export default AddQuestion;
