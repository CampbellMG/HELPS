import { Room } from '../model/Room';
import { Editable } from '../util/Editable';

export interface RoomState extends Editable {
    rooms: Room[];
    searchTerm?: string;
    selectedRoom: Room;
    newRoomTitle: string;
    error?: string;
    filter: string;
}