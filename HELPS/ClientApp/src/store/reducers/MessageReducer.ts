import { MessageState } from '../../types/store/MessageReducerTypes';
import { MessageAction, MessageActionTypes } from '../../types/store/MessageActionTypes';
import { isUndefined } from 'util';
import { getIdentifiableIndexById, NO_MATCH } from '../../util';
import { MessageModel, makeMockMessage } from '../../types/model/Message';

const mockMessage = makeMockMessage();
const initialState: MessageState = {
    messages: [ mockMessage ],
    selectedMessage: mockMessage,
    editing: false,
    newMessage: Object.assign({}, mockMessage),
    filter: '',
    isNewMode: false
};

export function MessageReducer(state: MessageState = initialState, action: MessageAction): MessageState {
    switch (action.type) {
        case (MessageActionTypes.RECEIVE):
            if (isUndefined(action.messages)) {
                return errorState(state, `Message list was undefined when fetched`);
            } else {
                let selectedMessage: MessageModel = action.messages.length > 0 ? action.messages[0] : { id: Number.MAX_SAFE_INTEGER, title: 'Undefined title', content: 'Undefined content' };
                const selectedMessageId = state.selectedMessage.id;
                const maybeSelectedMessageIndex = getIdentifiableIndexById(() => state.messages, selectedMessageId);
                if (maybeSelectedMessageIndex !== NO_MATCH) {
                    selectedMessage = action.messages[maybeSelectedMessageIndex];
                }
                return {
                    ...state,
                    messages: action.messages,
                    selectedMessage,
                    newMessage: action.messages[0]
                };
            }
        case (MessageActionTypes.SELECT):
            if (isUndefined(action.message)) {
                return errorState(state, 'Failed to select undefined message');
            } else {
                return {
                    ...state,
                    selectedMessage: action.message,
                    newMessage: Object.assign({}, action.message),
                    editing: false,
                    isNewMode: false
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