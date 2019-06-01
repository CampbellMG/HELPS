import 'bootstrap/dist/css/bootstrap.css';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {createBrowserHistory} from 'history';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as React from 'react';
import {render} from 'react-dom';
import configureStore from './store/Store';
import './App.scss';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({basename: baseUrl === null ? undefined : baseUrl});

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();
