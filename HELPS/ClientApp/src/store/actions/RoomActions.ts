import { RoomActionTypes, RoomAction } from '../../types/store/actions/RoomActionTypes';
import { Dispatch } from 'react';
import { LS_STORAGE_KEY, fetchToken } from './AuthActions';
import { RoomModel } from '../../types/model/Room';

const NO_TOKEN_MESSAGE: string = 'No token, have you authenticated?';

const roomError = (message: string): RoomAction => ({
    type: RoomActionTypes.ERROR,
    error: message
});

const receiveRooms = (rooms: RoomModel[]): RoomAction => ({
    type: RoomActionTypes.RECEIVE_ROOMS,
    rooms
});

export const getRooms = () => async (dispatch: Dispatch<RoomAction>) => {
    const token = fetchToken();
    if (token === null) { 
        dispatch(roomError(NO_TOKEN_MESSAGE));
    } else {
        const roomsResponse: Response = await fetch(`api/rooms`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        });

        if (roomsResponse.ok) {
            const rooms: RoomModel[] = await roomsResponse.json();
            dispatch(receiveRooms(rooms));
        } else {
            const text: string = await roomsResponse.text();
            dispatch(roomError(`Error fetching rooms list - ${text}`));
        }
    }
};

export const addRoom = (room: RoomModel) =>
    async (dispatch: Dispatch<any>) => dispatch({ type: RoomActionTypes.ADD, room });

export const deleteRoom = (room: RoomModel) =>
    async (dispatch: Dispatch<any>) => dispatch({ type: RoomActionTypes.DELETE, room });

export const updateRoomName = (oldName: string, newName: string | undefined) => async (dispatch: Dispatch<RoomAction>) => {
    // ({ type: RoomActionTypes.UPDATE_NAME, roomName: oldName, newName });
    const token = localStorage.getItem(LS_STORAGE_KEY);

    if (token === null) {
        dispatch(roomError(NO_TOKEN_MESSAGE));
    } else if (newName === undefined) {
        dispatch(roomError(`Failed to update room - can't set name to undefined`));
    } else {
        const updateNameResponse = await fetch(`api/room/${oldName}`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            }),
            body: JSON.stringify({ newName })
        });
    }
};
