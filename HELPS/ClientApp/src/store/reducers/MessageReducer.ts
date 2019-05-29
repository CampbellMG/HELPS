import {MessageState} from '../../types/store/MessageReducerTypes';
import {MessageAction, MessageActionTypes} from '../../types/store/MessageActionTypes';

const initialState: MessageState = {
    messages: []
};

export function MessageReducer(state: MessageState = initialState, action: MessageAction): MessageState {
    switch (action.type) {
        case (MessageActionTypes.RECEIVE):
            return {
                ...state,
                messages: action.payload,
            };
        default:
            return state;
    }
}