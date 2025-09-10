import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';

const wrapper = document.querySelector('.wrapper') as Element;

const root = ReactDOM.createRoot(wrapper);

root.render(
	<BrowserRouter basename="/sky_earth_website">
		<App />
	</BrowserRouter>
);
