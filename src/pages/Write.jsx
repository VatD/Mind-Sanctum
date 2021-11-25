import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SaveIcon from '@mui/icons-material/Save';
import Tooltip from '@mui/material/Tooltip';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import processEntry from '../utils/processEntry';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function Write() {
	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [open, setOpen] = useState(false);
	const [error, setError] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setError(false);
	};

	useEffect(() => {
		const title = localStorage.getItem('title');
		const body = localStorage.getItem('body');
		if (title && body) {
			setTitle(title);
			setBody(body);
		}
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();

		if (title.trim() === '') {
			setTitle('');
			return;
		}
		if (body.trim() === '') {
			setBody('');
			return;
		}

		setOpen(true);

		const [id, error] = await processEntry(title.trim(), body.trim());

		if (id) {
			localStorage.removeItem('title');
			localStorage.removeItem('body');
			navigate('/notes?redirect=true');
		} else if (error) {
			localStorage.setItem('title', title);
			localStorage.setItem('body', body);
			setOpen(false);
			setError(true);
		}
	};

	return (
		<React.Fragment>
			<Snackbar open={error} autoHideDuration={5000} onClose={handleClose}>
				<Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
					error! refresh or try again later.
				</Alert>
			</Snackbar>
			<Box
				component='form'
				autoComplete='off'
				onSubmit={(e) => onSubmit(e)}
				sx={{
					pl: 3,
					pr: 3,
					display: 'grid',
					gap: 5,
					gridTemplateRows: 'max-content 1fr',
				}}
			>
				<TextField
					id='title'
					label='title'
					fullWidth
					variant='standard'
					margin='dense'
					color='secondary'
					required
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<TextField
					id='body'
					label='what is on your mind...'
					fullWidth
					variant='filled'
					multiline
					required
					color='secondary'
					value={body}
					onChange={(e) => setBody(e.target.value)}
				/>
				<Fab
					sx={{
						position: 'absolute',
						bottom: 25,
						right: 25,
					}}
					type='submit'
					aria-label={'save'}
					size='large'
					color='secondary'
				>
					<Tooltip title='save' placement='top'>
						<SaveIcon />
					</Tooltip>
				</Fab>
			</Box>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
			>
				<CircularProgress color='inherit' />
			</Backdrop>
		</React.Fragment>
	);
}

export default Write;
