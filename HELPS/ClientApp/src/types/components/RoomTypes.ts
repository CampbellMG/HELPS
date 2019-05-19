import { RoomModel } from '../model/Room';
import { Editable } from '../util/Editable';

export interface RoomStateProps extends Editable {
    rooms: RoomModel[];
    selectedRoom: RoomModel;
}

export interface RoomDispatchProps {
    deleteRoom: (room: RoomModel) => void;
    fetchRooms: () => void;
    selectRoom: (room: RoomModel) => void;
    saveRoom: (id: number, title: string, isNewMode: boolean) => void;
}

export interface RoomProps extends RoomStateProps, RoomDispatchProps {}