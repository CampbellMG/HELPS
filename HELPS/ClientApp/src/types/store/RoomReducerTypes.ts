import { RoomModel } from '../model/Room';
import { Editable } from '../util/Editable';

export interface RoomState extends Editable {
    rooms: RoomModel[];
    searchTerm?: string;
    selectedRoom: RoomModel;
    newRoomTitle: string;
    error?: string;
    filter: string;
    isNewMode: boolean;
}