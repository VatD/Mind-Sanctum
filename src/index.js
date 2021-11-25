import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<React.StrictMode>
		<CssBaseline />
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorkerRegistration.register();
// reportWebVitals();
