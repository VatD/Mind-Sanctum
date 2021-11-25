import Grid from '@mui/material/Grid';
import React from 'react';
import Paper from '@mui/material/Paper';
import { db } from '../db/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import happyEmoji from '../static/happy.gif';
import sadEmoji from '../static/sad.gif';
import mixedEmoji from '../static/mixed.gif';
import neutralEmoji from '../static/neutral.webp';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

const emotions = {
	happy: {
		text: 'happy',
		emoji: happyEmoji,
		desc: 'you are happy',
	},
	sad: {
		text: 'sad',
		emoji: sadEmoji,
		desc: 'you are sad',
	},
	mixed: {
		text: 'mixed',
		emoji: mixedEmoji,
		desc: 'you have mixed feelings',
	},
	neutral: {
		text: 'neutral',
		emoji: neutralEmoji,
		desc: 'you are feeling neutral',
	},
};

const glassStyles = (alpha, blur) => {
	return {
		background: `rgba(255,255,255,${alpha})`,
		backdropFilter: `blur(${blur}px)`,
		border: 'solid 3px transparent',
	};
};

const boxStyles = {
	height: '250px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const Home = () => {
	const [open, setOpen] = React.useState(false);
	const [note, setNote] = React.useState(null);
	const [pageSize, setPageSize] = React.useState(5);
	const [emotion, setEmotion] = React.useState(null);

	const emotionSetter = async (id) => {
		try {
			const focusNote = await db.journals
				.where('id')
				.equals(parseInt(id))
				.toArray();

			const { score, magnitude } = focusNote[0];

			if (score >= 0.4) setEmotion(emotions.happy);
			else if (score <= -0.4) setEmotion(emotions.sad);
			else if (magnitude >= 1) setEmotion(emotions.mixed);
			else setEmotion(emotions.neutral);
		} catch (e) {}
	};

	const deleteNote = (id) => {
		db.journals.delete(id);
	};

	React.useEffect(() => {
		const focusid = new URLSearchParams(window.location.search).get('focus');
		if (focusid !== null) emotionSetter(focusid);
	}, []);

	const notes = useLiveQuery(() =>
		db.journals.toArray((notes) =>
			notes.map((note, i) => {
				return {
					...note,
					index: i,
				};
			})
		)
	);

	const columns = [
		{ field: 'date', headerName: 'Date', type: 'date', flex: 1 },
		{
			field: 'index',
			headerName: 'Note',
			renderCell: (params) => (
				<IconButton
					aria-label='view note'
					onClick={() => {
						setNote(notes[params.value]);
						setOpen(true);
					}}
					color='secondary'
				>
					<VisibilityIcon />
				</IconButton>
			),
			flex: 1,
		},
		{ field: 'title', headerName: 'Title', flex: 2 },
		{ field: 'body', headerName: 'Body', hide: true, flex: 4 },
		{ field: 'score', headerName: 'Emotion', type: 'number', flex: 1 },
		{ field: 'magnitude', headerName: 'Strength', type: 'number', flex: 1 },
		{
			field: 'id',
			headerName: 'Delete',
			renderCell: (params) => (
				<IconButton
					aria-label='delete note'
					onClick={() => {
						deleteNote(params.value);
					}}
					color='error'
				>
					<DeleteIcon />
				</IconButton>
			),
			flex: 1,
		},
	];

	return (
		<React.Fragment>
			<Grid container spacing={6} p={3}>
				{emotion ? (
					<React.Fragment>
						<Grid item xs={6}>
							<Paper
								elevation={6}
								sx={{ ...glassStyles(0.1, 20), ...boxStyles }}
							>
								<img
									src={emotion?.emoji}
									alt={emotion?.text || ''}
									style={{ maxHeight: '100%', maxWidth: '100%' }}
								/>
							</Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper
								elevation={6}
								sx={{ ...glassStyles(0.1, 20), ...boxStyles }}
							>
								<Typography variant='h4' textAlign='center'>
									{emotion?.desc}
								</Typography>
							</Paper>
						</Grid>
					</React.Fragment>
				) : null}
				<Grid item xs={12} sx={{ display: 'flex' }}>
					<div style={{ flexGrow: 1 }}>
						<DataGrid
							components={{
								Toolbar: GridToolbar,
							}}
							autoHeight
							rows={notes || []}
							columns={columns}
							rowsPerPageOptions={[5, 10, 20]}
							pageSize={pageSize}
							onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
							pagination
							disableSelectionOnClick
						/>
					</div>
				</Grid>
			</Grid>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby={note?.title}
				scroll='paper'
				fullWidth
				maxWidth='md'
			>
				<DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<span>{note?.title}</span>
					<span>{note?.date}</span>
				</DialogTitle>
				<DialogContent dividers={true}>
					<DialogContentText tabIndex={-1}>{note?.body}</DialogContentText>
				</DialogContent>
				<DialogContent dividers={false}>
					<Stack direction='row' justifyContent='flex-end' spacing={1}>
						<Chip
							label={`emotion: ${note?.score}`}
							color='info'
							size='small'
							variant='outlined'
						/>
						<Chip
							label={`strength: ${note?.magnitude}`}
							color='info'
							size='small'
							variant='outlined'
						/>
					</Stack>
				</DialogContent>
			</Dialog>
		</React.Fragment>
	);
};

export default Home;
