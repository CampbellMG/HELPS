import { RoomActionTypes, RoomAction } from '../../types/store/RoomActionTypes';
import { Dispatch } from 'react';
import { fetchToken } from './AuthActions';
import { Room } from '../../types/model/Room';
import { fetchRequest } from '../../util';

const NO_TOKEN_MESSAGE: string = 'No token, have you authenticated?',
    API_ROOM_PATH = `api/rooms`;

const roomError = (message: string): RoomAction => ({
    type: RoomActionTypes.ERROR,
    error: message
});

const receiveRooms = (rooms: Room[]): RoomAction => ({
    type: RoomActionTypes.RECEIVE,
    rooms
});

const selectRoomAction = (room: Room): RoomAction => ({
    type: RoomActionTypes.SELECT,
    room
});

export const fetchRooms = () => async (dispatch: Dispatch<RoomAction>) => {
    const token = fetchToken();
    if (token === null) {
        dispatch(roomError(NO_TOKEN_MESSAGE));
    } else {
        try {
            const rooms: Room[] = await fetchRequest(
                API_ROOM_PATH,
                'GET',
                token
            );
            dispatch(receiveRooms(rooms));
        } catch (e) {
            dispatch(roomError(`Error fetching rooms list`));
        }
    }
};

export const deleteRoom = (room: Room) => async (dispatch: Dispatch<any>) => {
    const token = fetchToken();
    if (token === null) {
        dispatch(roomError(NO_TOKEN_MESSAGE));
    } else {
        try {
            await fetch(`${API_ROOM_PATH}/${room.id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Authorization': `Bearer ${token}`
                })
            });
        } catch (e) {
            dispatch(roomError(`Error deleting room - ${e}`));
        }
    }
};

export const updateRoomName = (roomId: number, newTitle: string, isNewMode: boolean) => async (dispatch: Dispatch<RoomAction>) => {
    const token = fetchToken();

    if (token === null) {
        dispatch(roomError(NO_TOKEN_MESSAGE));
    } else {
        try {
            if (isNewMode) {
                await fetchRequest(
                    `${API_ROOM_PATH}`,
                    'POST',
                    token,
                    { title: newTitle },
                    true
                );
            } else {
                const updatedRoom = { id: roomId, title: newTitle };
                await fetchRequest(
                    `${API_ROOM_PATH}/${roomId}`,
                    'PUT',
                    token,
                    updatedRoom,
                    true
                );
            }
        } catch (e) {
            dispatch(roomError(`Error updating room title: ${e}`));
        }
    }
};

export const selectRoom = (room: Room) => async (dispatch: Dispatch<RoomAction>) => dispatch(selectRoomAction(room));
