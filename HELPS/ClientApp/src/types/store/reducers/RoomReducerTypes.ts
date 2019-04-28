import { RoomModel } from '../../model/Room';

export interface RoomState {
    rooms: RoomModel[];
    searchTerm?: string;
    selectedRoom: RoomModel;
    newRoomName?: string;
    editing: boolean;
}