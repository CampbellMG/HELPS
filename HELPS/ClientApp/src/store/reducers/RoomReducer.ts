import { RoomAction, RoomActionTypes } from '../../types/store/actions/RoomActionTypes';
import { RoomState } from '../../types/store/reducers/RoomReducerTypes';
import { Reducer } from 'redux';
import { RoomModel } from '../../types/model/Room';

const room1: RoomModel = { id: 1, title: 'room1' };
const initialState: RoomState = {
    rooms: [room1, { id: 2, title: 'room2' }, { id: 3, title: 'room3' }],
    selectedRoom: room1,
    searchTerm: '',
    editing: false
};

export function RoomReducer(state: RoomState = initialState, action: RoomAction): RoomState {
    if (action.roomName) {
        switch (action.type) {
            // case (RoomActionTypes.ADD):
            //     console.error(`adding ${action.roomName}`);
            //     state.rooms.push(action.roomName);
            //     return { ...state };
            // case (RoomActionTypes.DELETE):
            //     console.error(`deleting ${action.roomName}`);
            //     state.rooms.forEach((room) => {
            //         if (room === action.roomName) {
            //             state.rooms.splice(state.rooms.indexOf(room));
            //         }
            //     });
            //     return { ...state };
            case (RoomActionTypes.RECEIVE_ROOMS):
                return { ...state, rooms: state.rooms };
            default:
                console.error('failed to reduce room');
                return { ...state };
        }
    } else { return state; }
}