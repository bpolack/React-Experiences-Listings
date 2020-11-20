import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const target = document.getElementById('rel-root');
if (target) { // If target element exists
	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
		target
	);
}
else { // Else render to the default root element for testing
	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
		document.getElementById('root')
	);
}

