import {AuthState} from './reducers/AuthReducerTypes';
import {UserState} from './reducers/UserReducerTypes';
import {WorkshopState} from './reducers/WorkshopReducerTypes';
import {AdminWorkshopState} from './reducers/AdminWorkshopReducerTypes';

export interface AppState {
    auth: AuthState,
    user: UserState,
    workshops: WorkshopState,
    admin: AdminWorkshopState
}