<<<<<<< HEAD
import {AuthState} from './reducers/AuthReducerTypes';
import {UserState} from './reducers/UserReducerTypes';
import {WorkshopState} from './reducers/WorkshopReducerTypes';
import {AdminWorkshopState} from './reducers/AdminWorkshopReducerTypes';
=======
import {AuthState} from './AuthReducerTypes';
import {UserState} from './UserReducerTypes';
import {WorkshopState} from './WorkshopReducerTypes';
import {EmailState} from './EmailReducerTypes';
>>>>>>> 4cc801208e3175e8aa811062f83d5776fa4c0b61

export interface AppState {
    auth: AuthState,
    user: UserState,
<<<<<<< HEAD
    workshops: WorkshopState,
    admin: AdminWorkshopState
=======
    email: EmailState
    workshops: WorkshopState
>>>>>>> 4cc801208e3175e8aa811062f83d5776fa4c0b61
}