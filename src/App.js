import React from 'react';
import Box from '@mui/material/Box';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import bgimg from './static/bg.jpg';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Home from './pages/Home';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useSpring, animated } from 'react-spring';

const AnimatedPaper = animated(Paper);

function App() {
	const [isBooped, setIsBooped] = React.useState(false);

	React.useEffect(() => {
		if (!isBooped) {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			setIsBooped(false);
		}, 150);

		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [isBooped]);

	const trigger = () => {
		setIsBooped(true);
	};

	const style = useSpring({
		backfaceVisibility: 'hidden',
		transform: isBooped ? 'translate(0px, 3px)' : 'translate(0px, 0px)',
		config: {
			tension: 300,
			friction: 10,
		},
	});

	return (
		<Box
			sx={{
				width: '100%',
				pt: 2,
				pb: 10,
				minHeight: '100%',
				background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgimg}) center no-repeat`,
				backgroundSize: 'cover',
				display: 'grid',
				gridTemplateRows: 'max-content 1fr',
			}}
		>
			<Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, mb: 5 }}>
				<Link component={RouterLink} to='/' underline='none'>
					<AnimatedPaper
						style={style}
						onClick={trigger}
						onPointerEnter={trigger}
						elevation={6}
						sx={{
							p: 2,
							background: 'rgba(255,255,255,0.05)',
							backdropFilter: 'blur(40px)',
							borderClip: 'padding-box',
							border: 'solid 2px transparent',
							borderRadius: '10px',
							display: 'flex',
						}}
					>
						<AcUnitIcon fontSize='large' sx={{ color: 'white', mr: 2 }} />
						<Typography variant={'h4'} component='h1' color='white'>
							Mind Sanctum
						</Typography>
					</AnimatedPaper>
				</Link>
			</Box>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='mood' element={<Home />} />
				<Route path='speak' element={<Home />} />
				<Route path='write' element={<Home />} />
			</Routes>
		</Box>
	);
}

export default App;
