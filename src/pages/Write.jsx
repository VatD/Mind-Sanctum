import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import BookIcon from '@mui/icons-material/Book';
import Tooltip from '@mui/material/Tooltip';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Write() {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [open, setOpen] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		setOpen(true);
		console.log(title.trim(), body.trim());
	};

	return (
		<React.Fragment>
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
					label='what is in your mind...'
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
						right: 50,
					}}
					type='submit'
					aria-label={'Save and View Mood'}
					size='large'
					color='secondary'
				>
					<Tooltip title='Save and View Mood' placement='top'>
						<BookIcon />
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
