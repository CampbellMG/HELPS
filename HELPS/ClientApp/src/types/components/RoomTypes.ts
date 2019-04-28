import { RoomModel } from '../model/Room';

export interface RoomStateProps {
    rooms: RoomModel[]
}

export interface RoomDispatchProps {
    addRoom: (room: RoomModel) => void;
    deleteRoom: (room: RoomModel) => void;
}

export interface RoomProps extends RoomStateProps, RoomDispatchProps {}