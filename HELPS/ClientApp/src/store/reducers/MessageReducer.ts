import { MessageState } from '../../types/store/MessageReducerTypes';
import { MessageAction, MessageActionTypes } from '../../types/store/MessageActionTypes';
import { isUndefined } from 'util';

const initialState: MessageState = {
    messages: []
};

export function MessageReducer(state: MessageState = initialState, action: MessageAction): MessageState {
    switch (action.type) {
        case (MessageActionTypes.RECEIVE_MESSAGES):
            if (isUndefined(action.messages)) {
                return {
                    ...state,
                    error: `Message list was undefined when fetched`
                };
            } else {
                return {
                    ...state,
                    messages: action.messages
                };
            }
        default:
            return state;
    }

}