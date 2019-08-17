import {Dispatch} from 'redux';
import {Message, MessageDictionary, MessageDictionaryMap} from '../../types/model/Message';
import {MessageAction, MessageActionTypes} from '../../types/store/MessageActionTypes';
import {fetchToken, NO_TOKEN_MESSAGE} from './AuthActions';
import {fetchRequest} from '../../util';

const MESSAGES_PATH = 'api/messages';

const receiveMessages = (messages: Message[], messageDictionary: MessageDictionary): MessageAction => ({
    type: MessageActionTypes.RECEIVE,
    payload: {
        messages: messages,
        messageDictionary: messageDictionary
    }
});

const messageError = (error: string) => ({
    type: MessageActionTypes.ERROR,
    payload: error
});

export const fetchMessages = () => async (dispatch: Dispatch<any>) => {
    await retrieveMessages(dispatch);
};

export const saveMessage = (message: Message) => async (dispatch: Dispatch<any>) => {
    const token = fetchToken();
    if (token === null) {
        dispatch(messageError(NO_TOKEN_MESSAGE));
    } else {
        try {
            await fetchRequest(
                `${MESSAGES_PATH}/${message.id}`,
                'PUT',
                token,
                message,
                true
            );
            await retrieveMessages(dispatch);
        } catch (e) {
            dispatch(messageError('Failed to save message'));
        }
    }
};

async function retrieveMessages(dispatch: Dispatch<any>) {
    try {
        const messages: Message[] = await fetchRequest(
            MESSAGES_PATH,
            'GET'
        );

        const dictionary = messages.reduce((previous: any, current) => {
            console.log(previous)
            console.log(current)
            previous[MessageDictionaryMap[current.id]] = current.content;
            return previous;
        }, {});

        dispatch(receiveMessages(messages, dictionary));
    } catch (e) {
        dispatch(messageError(`Error fetching messges list`));
    }
}
