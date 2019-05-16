import { Room } from '../model/Room';
import { Editable } from '../util/Editable';

export interface RoomStateProps extends Editable {
    rooms: Room[]
}

export interface RoomDispatchProps {
    addRoom: (room: Room) => void;
    deleteRoom: (room: Room) => void;
}

export interface RoomProps extends RoomStateProps, RoomDispatchProps {}