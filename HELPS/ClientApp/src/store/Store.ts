import {History} from 'history';
import {AuthReducer} from './reducers/AuthReducer';
import thunk from 'redux-thunk';
import {routerMiddleware, routerReducer} from 'react-router-redux';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import {UserReducer} from './reducers/UserReducer';
import {WorkshopReducer} from './reducers/WorkshopReducer';

export default function configureStore(history: History) {
    const reducers = {
        auth: AuthReducer,
        user: UserReducer,
        workshops: WorkshopReducer,
        form: reduxFormReducer,
    };

    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    const rootReducer = combineReducers({
        ...reducers,
        routing: routerReducer
    });

    return createStore(
        rootReducer,
        compose(applyMiddleware(...middleware))
    );
}