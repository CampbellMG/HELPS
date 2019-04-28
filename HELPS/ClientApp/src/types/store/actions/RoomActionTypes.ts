import { RoomModel } from '../../model/Room';

export enum RoomActionTypes {
    ADD = 'ROOM_ACTION_ADD',
    DELETE = 'ROOM_ACTION_DELETE',
    UPDATE_NAME = 'ROOM_ACTION_UPDATE_NAME',
    ERROR = 'ROOM_ERROR',
    RECEIVE_ROOMS = 'RECEIVE_ROOMS'
}

export interface RoomAction {
    type: RoomActionTypes;
    roomName?: string;
    newName?: string;
    error?: string;
    rooms?: RoomModel[];
}