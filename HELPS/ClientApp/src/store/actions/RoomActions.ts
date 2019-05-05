import { RoomActionTypes, RoomAction } from '../../types/store/RoomActionTypes';
import { Dispatch } from 'react';
import { fetchToken } from './AuthActions';
import { RoomModel } from '../../types/model/Room';

const NO_TOKEN_MESSAGE: string = 'No token, have you authenticated?',
    API_ROOM_PATH = `api/rooms`;

const roomError = (message: string): RoomAction => ({
    type: RoomActionTypes.ERROR,
    error: message
});

const receiveRooms = (rooms: RoomModel[]): RoomAction => ({
    type: RoomActionTypes.RECEIVE_ROOMS,
    rooms
});

const updateRoom = (room: RoomModel): RoomAction => ({
    type: RoomActionTypes.UPDATE,
    room
});

export const fetchRooms = () => async (dispatch: Dispatch<RoomAction>) => {
    const token = fetchToken();
    if (token === null) {
        dispatch(roomError(NO_TOKEN_MESSAGE));
    } else {
        const roomsResponse: Response = await fetch(API_ROOM_PATH, {
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

export const deleteRoom = (room: RoomModel) => async (dispatch: Dispatch<any>) => {
    const token = fetchToken();
    if (token === null) {
        dispatch(roomError(NO_TOKEN_MESSAGE));
    } else {
        const deleteRoomResponse = await fetch(`${API_ROOM_PATH}/${room.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        });
        if (deleteRoomResponse.ok) {
            dispatch({ type: RoomActionTypes.DELETE, room });
            fetchRooms();
        } else {
            const errorText: string = await deleteRoomResponse.text();
            dispatch(roomError(`Error deleting room - ${errorText}`));
        }
    }
};

export const updateRoomName = (roomId: number, newName: string | undefined) => async (dispatch: Dispatch<RoomAction>) => {
    const token = fetchToken();

    if (token === null) {
        dispatch(roomError(NO_TOKEN_MESSAGE));
    } else if (newName === undefined) {
        dispatch(roomError(`Failed to update room - can't set name to undefined`));
    } else {

        const room: RoomModel = { id: roomId, title: newName };
        const updateNameResponse = await fetch(`${API_ROOM_PATH}/${roomId}`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            }),
            body: JSON.stringify(room)
        });

        if (updateNameResponse.ok) {
            dispatch(updateRoom(room));
            fetchRooms();
        }
    }
};
