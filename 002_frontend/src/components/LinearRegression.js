import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import React from 'react';

const LinearRegression = () => {
	const data = {
		Motivation: {
			Questions: [
				'How does high school GPA affect college success?',
				'How much advertising spending is need to have certain revenue?',
				'Can you predict the crop yields with given the amounts of fertilizer and water?',
				{
					'The following plot shows A scatter plot of height in cm and weight in kg for 1,477 schoolchildren':
						[
							'https://www.researchgate.net/figure/A-scatter-plot-of-height-in-cm-and-weight-in-kg-for-1-477-schoolchildren-with-a_fig1_269187018',
							'From this graph, can you predict of a 130 cm student weight?',
						],
				},
			],
			Objectives: [
				'Determine if the data has linear relationship (correlation)',
				'Determine if your data meets linear-regression assumptions',
				'Understand linear regression: parameters, error estimates, sum of least squares (line of best fit)',
				'Apply linear regression to real-life problems',
				'Learn necessary python tools',
			],
		},
		KnowledgeCheck: [
			{ Enterance: 'Linear function' },
			'Keys to success',
			{
				Vocabulary: [
					'Linear function',
					'Regression',
					'Prediction',
					'Residuals',
					"Pearson's correlation coefficient",
					"Spearman's correlation coefficient",
					{ Python: ['plot', 'dataframe', 'libraries'] },
				],
			},
		],
		'Table of Contents': [
			{
				'Linear Regression': [
					'Definitions, equations',
					'Residuals and error calculation',
					'Best fit',
				],
			},
			{ Examples: ['Iris dataset', 'Boston House Prices'] },
			'Multiple linear regression',
			'Regularization',
			'Polynomial regression',
		],
		'Real Life Examples': [
			'Our example',
			{ Links: 'https://www.ibm.com/topics/linear-regression' },
		],
		'Interactive codes (See below in code cell)': "what is the 'best' fit?",
		'Sample questions - (see below)': [
			'easy, hard (Only variables)',
			'randomly chosen',
			'questions will depend on variables',
		],
		'Pros and cons': [
			{
				Pros: [
					'simple to implement',
					'interpret and efficient to train performs well when the dataset is linearly separable',
					'prone to over-fitting but it can be easily avoided using some dimensionality reduction techniques,',
					'regularization (L1 and L2) techniques and cross-validation',
					'scalability',
					'optimal for online settings',
				],
			},
			{
				Cons: [
					'assumption of linearity between the dependent variable and the independent variables',
					'very sensitive to outliers',
					'prone to multicollinearity',
				],
			},
		],
		'Variations of the model': [
			'Lasso regression',
			'Ridge regression',
			'Elastic regression',
		],
		Exercise: 'Similar to the sample questions',
		'Key Point (Exit ticket)': [
			'Determine if the data has linear relationship (correlation)',
			'Determine if your data meets linear-regression assumptions',
			'Understand linear regression: parameters, error estimates, sum of least squares (line of best fit)',
			'Apply linear regression to real-life problems',
			'Learn necessary python tools',
		],
		'Links (Later)': [
			'Code examples',
			'Applications',
			'Supplementary Materials',
			'https://www.ibm.com/topics/linear-regression',
		],
	};
	const motivation = Object.keys(data.Motivation).map((key) => {
		return (
			<li>
				{key}
				<ul>
					{data.Motivation[key].map((value) => {
						if (typeof value === 'string') {
							return <li>{value}</li>;
						} else {
							return (
								<li>
									{Object.keys(value)}
									<ul>
										{Object.values(value)[0].map((item) => {
											if (item.substring(0, 4) === 'http') {
												return (
													<li>
														<a href={item}>{item}</a>
													</li>
												);
											} else {
												return <li>{item}</li>;
											}
										})}
									</ul>
								</li>
							);
						}
					})}
				</ul>
			</li>
		);
	});
	const knowledgeCheck = data.KnowledgeCheck.map((key) => {
		if (typeof key === 'object') {
			if (typeof Object.values(key)[0] === 'string') {
				return (
					<li>
						{Object.keys(key)}
						<ul>
							<li>{Object.values(key)[0]}</li>
						</ul>
					</li>
				);
			} else {
				return (
					<li>
						{Object.keys(key)}
						<ul>
							{Object.values(key)[0].map((item) => {
								if (typeof item === 'string') {
									return <li>{item}</li>;
								} else {
									return (
										<li>
											{Object.keys(item)[0]}
											<ul>
												{Object.values(item)[0].map((innerItem) => {
													return <li>{innerItem}</li>;
												})}
											</ul>
										</li>
									);
								}
							})}
						</ul>
					</li>
				);
			}
		} else {
			return <li>{key}</li>;
		}
	});
	const tableofContents = data['Table of Contents'].map((key) => {
		if (typeof key === 'string') {
			return <li>{key}</li>;
		} else {
			return (
				<li>
					{Object.keys(key)}
					<ul>
						{Object.values(key)[0].map((item) => {
							return <li>{item}</li>;
						})}
					</ul>
				</li>
			);
		}
	});
	const realLifeExamples = data['Real Life Examples'].map((key) => {
		if (typeof key === 'string') {
			return <li>{key}</li>;
		} else {
			return (
				<li>
					{Object.keys(key)}
					<ul>
						<li>
							<a href={key[Object.keys(key)]}>{key[Object.keys(key)]}</a>
						</li>
					</ul>
				</li>
			);
		}
	});
	const interactive = (
		<li>{data['Interactive codes (See below in code cell)']}</li>
	);
	const sampleQuestions = data['Sample questions - (see below)'].map((item) => {
		return <li>{item}</li>;
	});
	const prosCons = data['Pros and cons'].map((key) => {
		return (
			<li>
				{Object.keys(key)}
				<ul>
					{Object.values(key)[0].map((value) => {
						return <li>{value}</li>;
					})}
				</ul>
			</li>
		);
	});
	const variationsoftheModel = data['Variations of the model'].map((item) => {
		return <li>{item}</li>;
	});
	const exercise = <li>{data['Exercise']}</li>;
	const keyPoint = data['Key Point (Exit ticket)'].map((item) => {
		return <li>{item}</li>;
	});
	const links = data['Links (Later)'].map((item) => {
		if (item.substring(0, 4) === 'http') {
			return (
				<li>
					<a href={item}>{item}</a>
				</li>
			);
		} else return <li>{item}</li>;
	});

	return (
		<>
			{' '}
			<div>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography>Motivation</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							<ListItem component="div" disablePadding>
								<ListItemText primary={motivation} />
							</ListItem>
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
					>
						<Typography>Knowledge Check</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ListItem component="div" disablePadding>
							<ListItemText primary={knowledgeCheck} />
						</ListItem>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
					>
						<Typography>Table of Contents </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ListItem component="div" disablePadding>
							<ListItemText primary={tableofContents} />
						</ListItem>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
					>
						<Typography>Real Life Examples </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ListItem component="div" disablePadding>
							<ListItemText primary={realLifeExamples} />
						</ListItem>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
					>
						<Typography>Interactive codes (See below in code cell) </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ListItem component="div" disablePadding>
							<ListItemText primary={interactive} />
						</ListItem>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
					>
						<Typography>Sample Questions</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ListItem component="div" disablePadding>
							<ListItemText primary={sampleQuestions} />
						</ListItem>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
					>
						<Typography>Pros and cons</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ListItem component="div" disablePadding>
							<ListItemText primary={prosCons} />
						</ListItem>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
					>
						<Typography>Variations of the model</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ListItem component="div" disablePadding>
							<ListItemText primary={variationsoftheModel} />
						</ListItem>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
					>
						<Typography>Exercise</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ListItem component="div" disablePadding>
							<ListItemText primary={exercise} />
						</ListItem>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
					>
						<Typography>Key Point (Exit ticket)</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ListItem component="div" disablePadding>
							<ListItemText primary={keyPoint} />
						</ListItem>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
					>
						<Typography>Links (Later)</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ListItem component="div" disablePadding>
							<ListItemText primary={links} />
						</ListItem>
					</AccordionDetails>
				</Accordion>
			</div>
			<div></div>
		</>
	);
};

export default LinearRegression;
