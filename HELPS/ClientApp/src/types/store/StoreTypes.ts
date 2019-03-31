import {AuthState} from './reducers/AuthReducerTypes';
import {UserState} from './reducers/UserReducerTypes';

export interface AppState {
    auth: AuthState,
    user: UserState
}