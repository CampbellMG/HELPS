import { AuthState } from './AuthReducerTypes';
import { UserState } from './UserReducerTypes';
import { WorkshopState } from './WorkshopReducerTypes';
import { EmailState } from './EmailReducerTypes';
import { MessageState } from './MessageReducerTypes';
import { RoomState } from './RoomReducerTypes';

export interface AppState {
    auth: AuthState,
    user: UserState,
    room: RoomState;
    email: EmailState
    workshops: WorkshopState
    message: MessageState

}