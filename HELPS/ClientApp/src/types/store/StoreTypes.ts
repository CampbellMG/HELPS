import {AuthState} from './AuthReducerTypes';
import {UserState} from './UserReducerTypes';
import {WorkshopState} from './WorkshopReducerTypes';
import {EmailState} from './EmailReducerTypes';
import {AdvisorState} from './AdvisorReducerTypes'

export interface AppState {
    auth: AuthState,
    user: UserState,
    email: EmailState
    workshops: WorkshopState
    advisors: AdvisorState
}