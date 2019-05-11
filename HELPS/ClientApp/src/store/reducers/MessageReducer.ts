import { MessageState } from '../../types/store/MessageReducerTypes';
import { MessageAction, MessageActionTypes } from '../../types/store/MessageActionTypes';
import { isUndefined } from 'util';

const initialState: MessageState = {
    messages: [],
    selectedMessage: {} as any,
    editing: false,
    newMessage: {} as any,
    isLoaded: false
};

export function MessageReducer(state: MessageState = initialState, action: MessageAction): MessageState {
    switch (action.type) {
        case (MessageActionTypes.RECEIVE_MESSAGES):
            if (isUndefined(action.messages)) {
                return errorState(state, `Message list was undefined when fetched`);
            } else {
                return {
                    ...state,
                    messages: action.messages,
                    selectedMessage: Object.assign({}, action.messages[0]),
                    newMessage: action.messages[0],
                    isLoaded: true
                };
            }
        case (MessageActionTypes.SELECT_MESSAGE):
            if (isUndefined(action.message)) {
                return errorState(state, 'Failed to select undefined message');
            } else {
                return {
                    ...state,
                    selectedMessage: action.message,
                    newMessage: Object.assign({}, action.message)
                };
            }
        case (MessageActionTypes.EDIT_MESSAGE):
            if (isUndefined(action.message)) {
                return errorState(state, 'Failed to reduce editing of undefined message');
            } else {
                console.error(action.message);
                return {
                    ...state,
                    newMessage: action.message
                };
            }
        case (MessageActionTypes.CANCEL_OR_COMMENCE_EDIT_MESSAGE):
            return state.editing ?
                ({
                    ...state,
                    newMessage: state.selectedMessage,
                    editing: false
                }) :
                ({
                    ...state,
                    editing: true
                });
        case (MessageActionTypes.SAVE_MESSAGE):
            if (isUndefined(action.message)) {
                return errorState(state, 'Failed to edit undefined message');
            } else {
                console.error(action.message);
                const message = action.message;
                state.messages
                    .filter((listMessage) => listMessage.id === message.id)
                    .map((_matchedMessage) => message);
                return {
                    ...state,
                    selectedMessage: message,
                    newMessage: message
                };
            }
        default:
            return state;
    }

}

function errorState(state: MessageState, message: string): MessageState {
    return {
        ...state,
        error: message
    };
}