import { Dispatch } from 'redux';
import { MessageModel } from '../../types/model/Message';
import { MessageActionTypes, MessageAction } from '../../types/store/MessageActionTypes';
import { fetchToken, NO_TOKEN_MESSAGE, fetchWithAuthHeader } from './AuthActions';

const receiveMessages = (messages: MessageModel[]): MessageAction => ({
    type: MessageActionTypes.RECEIVE_MESSAGES,
    messages: messages
}),
    messageError = (error: string) => ({
        type: MessageActionTypes.ERROR,
        payload: error
    }),
    MESSAGES_PATH = 'api/messages';

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

export const updateMessage = (message: MessageModel) => async (dispatch: Dispatch<any>) => {
    console.error('updating message');
};

export const deleteMessage = (id: number) => async (dispatch: Dispatch<any>) => {
    console.error('deleting message of id ' + id);
};
