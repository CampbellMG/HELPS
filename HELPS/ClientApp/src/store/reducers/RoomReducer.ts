import {RoomAction, RoomActionTypes} from '../../types/store/RoomActionTypes';
import {RoomState} from '../../types/store/RoomReducerTypes';
import {Room} from '../../types/model/Room';
import {isUndefined} from 'util';
import {getIdentifiableIndexById, NO_MATCH} from '../../util';

const initialRoom: Room = {id: 0, title: ''};
const initialState: RoomState = {
    rooms: [],
    selectedRoom: initialRoom,
    searchTerm: '',
    editing: false,
    filter: '',
    newRoomTitle: initialRoom.title,
    isNewMode: false
};

export function RoomReducer(state: RoomState = initialState, action: RoomAction): RoomState {
    switch (action.type) {
        case (RoomActionTypes.RECEIVE):
            if (isUndefined(action.rooms)) {
                return {...state, error: `Can't received undefined list of rooms`};
            } else {
                let selectedRoom = action.rooms.length > 0 ? action.rooms[0] : {
                    id: Number.MAX_SAFE_INTEGER,
                    title: 'Undefined title'
                };
                const selectedRoomId = state.selectedRoom.id;
                const maybeSelectedRoomIndex = getIdentifiableIndexById(() => state.rooms, selectedRoomId);
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
        case (RoomActionTypes.SELECT):
            if (isUndefined(action.room)) {
                return {...state, error: `Can't select undefined room`};
            } else {
                return {
                    ...state,
                    selectedRoom: action.room,
                    newRoomTitle: action.room.title,
                    editing: false,
                    isNewMode: false
                };
            }
        default:
            return state;
    }
}
