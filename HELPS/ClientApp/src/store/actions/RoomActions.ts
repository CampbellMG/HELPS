import { RoomActionTypes, RoomAction } from '../../types/store/actions/RoomActionTypes';
import { Dispatch } from 'react';

const roomError = (message: string): RoomAction => ({
    type: RoomActionTypes.ERROR,
    error: message
});

export const addRoom = (roomName: string) =>
    async (dispatch: Dispatch<any>) => dispatch({ type: RoomActionTypes.ADD, roomName });

export const deleteRoom = (roomName: string) =>
    async (dispatch: Dispatch<any>) => dispatch({ type: RoomActionTypes.DELETE, roomName });

export const updateRoomName = (oldName: string, newName: string | undefined) => async (dispatch: Dispatch<RoomAction>) {
    // ({ type: RoomActionTypes.UPDATE_NAME, roomName: oldName, newName });

    if (newName === undefined) {
        dispatch(roomError(`Failed to update room - can't set name to undefined`));
    } else {

        const token = 
        const updateNameResponse = await fetch(`api/room/${oldName}`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            }),
            body: JSON.stringify({ newName })
        });
    }
};
