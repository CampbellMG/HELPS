import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import App from './App';
import * as React from 'react';
import {render} from 'react-dom';

it('renders without crashing', () => {
    const storeFake = (state: any) => ({
        default: () => {
        },
        subscribe: () => {
        },
        dispatch: () => {
        },
        getState: () => ({...state}),
        replaceReducer: () => {
        }
    });
    const store = storeFake({});

    const div = document.createElement('div');
    render(
        // @ts-ignore
        <Provider store={store}>
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        </Provider>, div);
});