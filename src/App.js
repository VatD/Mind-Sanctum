import React from 'react';
import Box from '@mui/material/Box';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Home from './pages/Home';
import Write from './pages/Write';
import Notes from './pages/Notes';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useSpring, animated } from 'react-spring';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const AnimatedPaper = animated(Paper);

function App() {
	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

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
		<ThemeProvider theme={darkTheme}>
			<Box
				sx={{
					width: '100%',
					zIndex: 1,
					pt: 2,
					pb: 10,
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
							<AcUnitIcon fontSize='large' sx={{ mr: 2 }} />
							<Typography variant={'h4'} component='h1'>
								Mind Sanctum
							</Typography>
						</AnimatedPaper>
					</Link>
				</Box>
				<Routes>
					<Route path='notes/*' element={<Notes />} />
					<Route path='speak/*' element={<Home />} />
					<Route path='write/*' element={<Write />} />
					<Route path='*' element={<Home />} />
				</Routes>
			</Box>
		</ThemeProvider>
	);
}

export default App;
