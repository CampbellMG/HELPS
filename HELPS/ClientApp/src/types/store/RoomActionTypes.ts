import { Room } from '../model/Room';

export enum RoomActionTypes {
    EDIT = 'ROOM_ACTION_UPDATE_NAME',
    ERROR = 'ROOM_ERROR',
    RECEIVE = 'RECEIVE_ROOMS',
    SELECT = 'ROOM_ACTION_SELECT'
}

export interface RoomAction {
    type: RoomActionTypes;
    room?: Room;
    error?: string;
    rooms?: Room[];
}