export interface RoomStateProps {
    rooms: string[]
}

export interface RoomDispatchProps {
    addRoom: (roomName: string) => void;
    deleteRoom: (roomName: string) => void;
}

export interface RoomProps extends RoomStateProps, RoomDispatchProps {}