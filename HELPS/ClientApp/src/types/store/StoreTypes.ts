import {AuthState} from './AuthReducerTypes';
import {UserState} from './UserReducerTypes';
import {WorkshopState} from './WorkshopReducerTypes';
import {EmailState} from './EmailReducerTypes';

export interface AppState {
    auth: AuthState,
    user: UserState,
    email: EmailState
    workshops: WorkshopState
}