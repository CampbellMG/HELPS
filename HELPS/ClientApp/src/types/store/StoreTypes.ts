import {AuthState} from './reducers/AuthReducerTypes';
import {UserState} from './reducers/UserReducerTypes';
import {WorkshopState} from './reducers/WorkshopReducerTypes';

export interface AppState {
    auth: AuthState,
    user: UserState,
    workshops: WorkshopState
}