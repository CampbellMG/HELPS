import { Room } from '../model/Room';
import { Editable } from '../util/Editable';

export interface RoomStateProps extends Editable {
    rooms: Room[];
    selectedRoom: Room;
}

export interface RoomDispatchProps {
    deleteRoom: (room: Room) => void;
    fetchRooms: () => void;
    selectRoom: (room: Room) => void;
    saveRoom: (id: number, title: string, isNewMode: boolean) => void;
}

export interface RoomProps extends RoomStateProps, RoomDispatchProps {}