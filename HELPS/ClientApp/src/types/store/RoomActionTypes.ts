import { RoomModel } from '../model/Room';

export enum RoomActionTypes {
    ADD = 'ROOM_ACTION_ADD',
    DELETE = 'ROOM_ACTION_DELETE',
    UPDATE = 'ROOM_ACTION_UPDATE_NAME',
    ERROR = 'ROOM_ERROR',
    RECEIVE_ROOMS = 'RECEIVE_ROOMS'
}

export interface RoomAction {
    type: RoomActionTypes;
    room?: RoomModel;
    error?: string;
    rooms?: RoomModel[];
}