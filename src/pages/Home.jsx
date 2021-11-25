import Grid from '@mui/material/Grid';
import React from 'react';
import CreateIcon from '@mui/icons-material/Create';
import GlassCard from '../components/glasscard/GlassCard';
// import MicIcon from '@mui/icons-material/Mic';
import BookIcon from '@mui/icons-material/Book';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const cardList = [
	{
		icon: <CreateIcon sx={{ fontSize: 50 }} />,
		text: 'write',
		link: '/write',
	},
	// {
	// 	icon: <MicIcon sx={{ fontSize: 50 }} />,
	// 	text: 'speak',
	// 	link: '/speak',
	// },
	{
		icon: <BookIcon sx={{ fontSize: 50 }} />,
		text: 'notes',
		link: '/notes',
	},
];

const Home = () => {
	return (
		<Grid
			container
			spacing={6}
			sx={{
				p: 5,
				alignItems: 'center',
			}}
		>
			{cardList.map(({ text, icon, link }) => (
				<Grid item xs={12} sm={12 / cardList.length} key={text}>
					<Link component={RouterLink} to={link} underline='none'>
						<GlassCard color={'white'} text={text} icon={icon} />
					</Link>
				</Grid>
			))}
		</Grid>
	);
};

export default Home;
