import { RoomModel } from '../model/Room';

export interface RoomState {
    rooms: RoomModel[];
    searchTerm?: string;
    selectedRoom: RoomModel;
    oldRoomName?: string;
    editing: boolean;
    error?: string;
}