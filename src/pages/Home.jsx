import Grid from '@mui/material/Grid';
import React from 'react';
import CreateIcon from '@mui/icons-material/Create';
import GlassCard from '../components/glasscard/GlassCard';
import MicIcon from '@mui/icons-material/Mic';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const cardList = [
	{
		icon: <CreateIcon sx={{ fontSize: 50 }} />,
		text: 'write',
		link: '/write',
	},
	{
		icon: <MicIcon sx={{ fontSize: 50 }} />,
		text: 'speak',
		link: '/speak',
	},
	{
		icon: <EmojiEmotionsIcon sx={{ fontSize: 50 }} />,
		text: 'your mood',
		link: '/mood',
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
				<Grid item xs={12} sm={4} key={text}>
					<Link component={RouterLink} to={link} underline='none'>
						<GlassCard color={'white'} text={text} icon={icon} />
					</Link>
				</Grid>
			))}
		</Grid>
	);
};

export default Home;
