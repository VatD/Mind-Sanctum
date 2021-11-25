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
import ClearIcon from '@mui/icons-material/Clear';
import Stack from '@mui/material/Stack';

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

	const clearContents = () => {
		localStorage.removeItem('title');
		localStorage.removeItem('body');
		setTitle('');
		setBody('');
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
			navigate('/notes?focus=' + id);
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
				<Stack direction='row' justifyContent='flex-end' spacing={3}>
					<Fab
						aria-label={'clear'}
						size='large'
						color='warning'
						onClick={clearContents}
					>
						<Tooltip title='clear' placement='top-end'>
							<ClearIcon />
						</Tooltip>
					</Fab>
					<Fab type='submit' aria-label={'save'} size='large' color='secondary'>
						<Tooltip title='save' placement='top-end'>
							<SaveIcon />
						</Tooltip>
					</Fab>
				</Stack>
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
