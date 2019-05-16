import { Dispatch } from 'redux';
import { Message } from '../../types/model/Message';
import { MessageActionTypes, MessageAction } from '../../types/store/MessageActionTypes';
import { fetchToken, NO_TOKEN_MESSAGE, fetchWithAuthHeader } from './AuthActions';
import { fetchRequest as fetchJson } from '../../util';

const receiveMessages = (messages: Message[]): MessageAction => ({
    type: MessageActionTypes.RECEIVE_MESSAGES,
    messages: messages
}),
    messageError = (error: string) => ({
        type: MessageActionTypes.ERROR,
        payload: error
    }),
    MESSAGES_PATH = 'api/messages',
    selectMessagePayload = (message: Message) => ({
        type: MessageActionTypes.SELECT_MESSAGE,
        message
    }),
    editMessagePayload = (message: Message) => ({
        type: MessageActionTypes.EDIT_MESSAGE,
        message
    }),
    cancelOrCommenceEditPayload = () => ({ type: MessageActionTypes.CANCEL_OR_COMMENCE_EDIT_MESSAGE }),
    saveMessagePayload = (message: Message) => ({
        type: MessageActionTypes.SAVE_MESSAGE,
        message
    });

export const fetchMessages = () => async (dispatch: Dispatch<any>) => {

    const token = fetchToken();
    if (token === null) {
        dispatch(messageError(NO_TOKEN_MESSAGE));
    } else {
        const messageResponse: Response = await fetchWithAuthHeader(token, MESSAGES_PATH);

        if (messageResponse.ok) {
            const responseJson = await messageResponse.json();
            dispatch(receiveMessages(responseJson.messages));
        } else {
            const responseText = await messageResponse.text();
            dispatch(messageError(responseText));
        }
    }
};

export const saveMessage = (message: Message) => async (dispatch: Dispatch<any>) => {
    const token = fetchToken();
    if (token === null) {
        dispatch(messageError(NO_TOKEN_MESSAGE));
    } else {
        const saveResponse = await fetchJson(
            'api/messages',
            'POST',
            token,
            message,
            true
        );
        if (saveResponse.ok) {
            dispatch(saveMessagePayload(message));
        } else {
            dispatch(messageError('Failed to save message: ' + saveResponse.statusText));
        }
    }
};

export const deleteMessage = (id: number) => async (dispatch: Dispatch<any>) => {
    const token = fetchToken();
    if (token === null) {
        dispatch(messageError(NO_TOKEN_MESSAGE));
    } else {
        const deleteResponse: Response = await fetch(`${MESSAGES_PATH}/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        });
        if (deleteResponse.ok) {
            alert('Message deleted successfully');
            fetchMessages();
        } else {
            const errorMessage = await deleteResponse.text();
            dispatch(messageError(`Failed to delete message: ${errorMessage}`));
        }
    }
    console.error('deleting message of id ' + id);
};

export const selectMessage = (message: Message) => async (dispatch: Dispatch<any>) =>
    dispatch(selectMessagePayload(message));

export const editMessage = (message: Message) => async (dispatch: Dispatch<any>) =>
    dispatch(editMessagePayload(message));

export const cancelOrCommenceEdit = () => async (dispatch: Dispatch<any>) =>
    dispatch(cancelOrCommenceEditPayload());