import { History } from 'history';
import { AuthReducer } from './reducers/AuthReducer';
import thunk from 'redux-thunk';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { UserReducer } from './reducers/UserReducer';
import { WorkshopReducer } from './reducers/WorkshopReducer';
import { RoomReducer } from './reducers/RoomReducer';
import { EmailReducer } from './reducers/EmailReducer';
import { MessageReducer } from './reducers/MessageReducer';
import {AdvisorReducer} from './reducers/AdvisorReducer';
import {SessionReducer} from './reducers/SessionReducer';
import {SkillReducer} from './reducers/SkillReducer';
import {ReportReducer} from './reducers/ReportReducer';

export default function configureStore(history: History) {
    const reducers = {
        auth: AuthReducer,
        room: RoomReducer,
        user: UserReducer,
        email: EmailReducer,
        workshops: WorkshopReducer,
        form: reduxFormReducer,
        advisors: AdvisorReducer,
        message: MessageReducer,
        session: SessionReducer,
        skill: SkillReducer,
        report: ReportReducer
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