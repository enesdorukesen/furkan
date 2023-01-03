import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authApi from '../libs/request';
import { getQuestion } from '../store/slices/questionSlice';
import AddQuestion from '../components/AddQuestion';

const theme = createTheme();

const QuestionPage = () => {
	const dispatch = useDispatch();
	const questions = useSelector((state) => state.question);
	const [filteredQuestions, setFilteredQuestions] = useState([]);
	// const user = useSelector((state) => state.auth);
	// let toasterData;

	const getData = async () => {
		let res;
		await authApi
			.getQuestion()
			.then((response) => (res = response))
			.catch((e) => (res = e))
			.finally(() => dispatch(getQuestion(res)));
		setFilteredQuestions(res);
	};

	useEffect(() => {
		getData();
	}, []);

	const filterHandler = (id, concept, quizOrSample, qtype, level) => {
		const filters = {
			id: id,
			concept: concept,
			quizOrSample: quizOrSample,
			qtype: qtype,
			level: level,
		};
		let temp = questions.filter((question) => question === filters);
		console.log(temp);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		filterHandler(
			data.get('id'),
			data.get('concept'),
			data.get('quizOrSample'),
			data.get('qtype'),
			data.get('level')
		);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				mt: 1,
			}}
		>
			<Accordion sx={{ width: '95vw' }}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography component="h1" variant="h5">
						Add Question
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<AddQuestion />
				</AccordionDetails>
			</Accordion>

			<Accordion sx={{ width: '95vw', mt: 1 }}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2a-content"
					id="panel2a-header"
				>
					<Typography component="h1" variant="h5">
						Filter Questions
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<ThemeProvider theme={theme}>
						<Container component="main">
							<FormControl fullWidth>
								<Grid
									component="form"
									onSubmit={handleSubmit}
									container
									spacing={1}
								>
									<Grid item xs={2}>
										<TextField
											name="id"
											label="Id"
											id="id"
											fullWidth
											rows={1}
										/>
									</Grid>
									<Grid item xs={2}>
										<FormControl fullWidth>
											<InputLabel id="concept">Concept</InputLabel>
											<Select
												name="concept"
												label="concept"
												id="concept"
												defaultValue={'10'}
											>
												<MenuItem value={'10'}>Item 1</MenuItem>
												<MenuItem value={'20'}>Item 2</MenuItem>
												<MenuItem value={'30'}>Item 3</MenuItem>
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={2}>
										<FormControl fullWidth>
											<InputLabel id="quizOrSample">Question of ...</InputLabel>
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
									<Grid item xs={2}>
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
									<Grid item xs={2}>
										<FormControl fullWidth>
											<InputLabel id="level">Level</InputLabel>
											<Select
												name="level"
												label="level"
												id="level"
												defaultValue={'01'}
											>
												<MenuItem value={'01'}>Easy</MenuItem>
												<MenuItem value={'02'}>Medium</MenuItem>
												<MenuItem value={'03'}>Hard</MenuItem>
											</Select>
										</FormControl>
									</Grid>

									<Grid item xs={2}>
										<div>
											<Button
												type="submit"
												variant="contained"
												sx={{ mt: 1 }}
												fullWidth
											>
												Filter
											</Button>
										</div>
									</Grid>
								</Grid>
							</FormControl>
						</Container>
					</ThemeProvider>
				</AccordionDetails>
			</Accordion>

			<TableContainer component={Paper} sx={{ width: '95vw' }}>
				<Table
					sx={{ minWidth: 650 }}
					size="small"
					aria-label="question database"
				>
					<TableHead>
						<TableRow>
							<TableCell align="left" width="10%">
								ID
							</TableCell>
							<TableCell align="left" width="15%">
								concept
							</TableCell>
							<TableCell align="left" width="15%">
								level
							</TableCell>
							<TableCell align="left" width="15%">
								qtype
							</TableCell>
							<TableCell align="left" width="35%">
								text
							</TableCell>
							<TableCell align="center" width="10%"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredQuestions.map((question) => (
							<TableRow
								key={question.given_id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell align="left" width="10%">
									{question.given_id}
								</TableCell>
								<TableCell align="left" width="15%">
									{question.concept}
								</TableCell>
								<TableCell align="left" width="15%">
									{question.level}
								</TableCell>
								<TableCell align="left" width="15%">
									{question.qtype}
								</TableCell>
								<TableCell align="left" width="35%">
									{question.text}
								</TableCell>
								<TableCell align="center" width="10%">
									<Button variant="contained">See</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default QuestionPage;
