import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PythonPlayground = () => {
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>
				<Typography variant="h4" component="div">
					Run your python code
				</Typography>
				<iframe
					title="iframe"
					src="https://trinket.io/embed/python/73f4d9630f"
					width="100%"
					height="356"
					marginweight="0"
					allowFullScreen
				></iframe>
			</CardContent>
		</Card>
	);
};

export default PythonPlayground;
