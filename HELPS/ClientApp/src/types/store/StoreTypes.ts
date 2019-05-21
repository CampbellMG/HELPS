import {AuthState} from './AuthReducerTypes';
import {UserState} from './UserReducerTypes';
import {WorkshopState} from './WorkshopReducerTypes';
import {EmailState} from './EmailReducerTypes';
import {AdvisorState} from './AdvisorReducerTypes'
import { MessageState } from './MessageReducerTypes';
import { RoomState } from './RoomReducerTypes';
import {SessionState} from './SessionReducerTypes';

export interface AppState {
    auth: AuthState,
    user: UserState,
    room: RoomState;
    email: EmailState
    workshops: WorkshopState
    advisors: AdvisorState
    message: MessageState
    session: SessionState
}