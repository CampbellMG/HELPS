import { RoomAction, RoomActionTypes } from '../../types/store/RoomActionTypes';
import { RoomState } from '../../types/store/RoomReducerTypes';
import { RoomModel } from '../../types/model/Room';
import { isUndefined } from 'util';
import { NO_MATCH } from '../../util';

const room1: RoomModel = { id: 1, title: 'room1' };
const initialState: RoomState = {
    rooms: [room1, { id: 2, title: 'room2' }, { id: 3, title: 'room3' }],
    selectedRoom: room1,
    searchTerm: '',
    editing: false,
    filter: '',
    newRoomTitle: room1.title,
    isNewMode: false
};

export function RoomReducer(state: RoomState = initialState, action: RoomAction): RoomState {
    switch (action.type) {
        case (RoomActionTypes.ADD):
            if (isUndefined(action.room)) {
                return { ...state, error: `Can't add undefined room` };
            } else {
                state.rooms.push(action.room);
                return { ...state };
            }
        case (RoomActionTypes.DELETE):
            const roomToDelete = action.room;
            if (isUndefined(roomToDelete)) {
                return { ...state, error: `Can't delete undefined room` };
            } else {
                state.rooms.forEach((room) => {
                    if (room.id === room.id) {
                        state.rooms.splice(state.rooms.indexOf(room));
                    }
                });
                return { ...state };
            }
        case (RoomActionTypes.RECEIVE_ROOMS):
            if (isUndefined(action.rooms)) {
                return { ...state, error: `Can't received undefined list of rooms` };
            } else {
                let selectedRoom = action.rooms.length > 0 ? action.rooms[0] : { id: Number.MAX_SAFE_INTEGER, title: 'Undefined title' };
                const selectedRoomId = state.selectedRoom.id;
                const maybeSelectedRoomIndex = getRoomIndexById(state, selectedRoomId);
                if (maybeSelectedRoomIndex !== NO_MATCH) {
                    selectedRoom = action.rooms[maybeSelectedRoomIndex];
                }
                return {
                    ...state,
                    rooms: action.rooms,
                    selectedRoom,
                    newRoomTitle: selectedRoom.title
                };
            }
        case (RoomActionTypes.UPDATE):
            if (isUndefined(action.room)) {
                return { ...state, error: `Can't update undefined room` };
            } else {
                const roomIndex: number = getRoomIndexById(state, action.room.id);
                state.rooms.splice(roomIndex, 1, action.room);
                return state;
            }
        case (RoomActionTypes.SELECT):
            if (isUndefined(action.room)) {
                return { ...state, error: `Can't select undefined room` };
            } else {
                return { ...state, selectedRoom: action.room };
            }
        default:
            return state;
    }
}

const getRoomIndexById = (state: RoomState, roomId: number) =>
    state.rooms.findIndex((room) => room.id === roomId);
