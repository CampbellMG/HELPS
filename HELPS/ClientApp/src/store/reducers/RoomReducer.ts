import { RoomAction, RoomActionTypes } from '../../types/store/actions/RoomActionTypes';
import { RoomState } from '../../types/store/reducers/RoomReducerTypes';
import { Reducer } from 'redux';

const initialState: RoomState = {
    rooms: ['room1', 'room2', 'room3'],
    selectedRoom: '',
    searchTerm: '',
    editing: false
};

export function RoomReducer(state: RoomState = initialState, action: RoomAction): RoomState {
    if (action.roomName) {
        switch (action.type) {
            case (RoomActionTypes.ADD):
                console.error(`adding ${action.roomName}`);
                state.rooms.push(action.roomName);
                return { ...state };
            case (RoomActionTypes.DELETE):
                console.error(`deleting ${action.roomName}`);
                state.rooms.forEach((room) => {
                    if (room === action.roomName) {
                        state.rooms.splice(state.rooms.indexOf(room));
                    }
                });
                return { ...state };
            default:
                console.error('failed to reduce room');
                return { ...state };
        }
    } else { return state; }
}