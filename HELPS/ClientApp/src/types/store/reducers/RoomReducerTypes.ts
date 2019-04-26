export interface RoomState {
    rooms: string[];
    searchTerm?: string;
    selectedRoom: string;
    newRoomName?: string;
    editing: boolean;
}