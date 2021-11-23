import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import React from 'react';
import { useSpring, animated } from 'react-spring';

const AnimatedPaper = animated(Paper);

const GlassCard = ({ icon, text, color }) => {
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
		transform: isBooped ? `rotate(3deg)` : `rotate(0deg)`,
		config: {
			tension: 300,
			friction: 10,
		},
	});

	return (
		<AnimatedPaper
			style={style}
			onMouseEnter={trigger}
			onClick={trigger}
			elevation={6}
			sx={{
				minHeight: 200,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-evenly',
				alignItems: 'center',
				background: 'rgba(255,255,255,0.05)',
				backdropFilter: 'blur(5px)',
				borderClip: 'padding-box',
				border: 'solid 2px transparent',
				borderRadius: '10px',
				color: color,
			}}
		>
			<Paper
				elevation={12}
				sx={{
					zIndex: 5,
					width: 100,
					height: 100,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: 'rgba(255,255,255,0.1)',
					backdropFilter: 'blur(20px)',
					borderClip: 'padding-box',
					border: 'solid 5px transparent',
					borderRadius: '1000px',
					color: color,
				}}
			>
				{icon}
			</Paper>
			<Typography variant='h5'>{text}</Typography>
		</AnimatedPaper>
	);
};

export default GlassCard;
