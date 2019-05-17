import { RoomModel } from '../model/Room';
import { Editable } from '../util/Editable';

export interface RoomStateProps extends Editable {
    rooms: RoomModel[]
}

export interface RoomDispatchProps {
    addRoom: (room: RoomModel) => void;
    deleteRoom: (room: RoomModel) => void;
}

export interface RoomProps extends RoomStateProps, RoomDispatchProps {}