import { MessageModel } from '../model/Message';

export interface MessageAction {
    type: MessageActionTypes;
    messages?: MessageModel[];
    message?: MessageModel;
    payload?: any;
}

export enum MessageActionTypes {
    RECEIVE_MESSAGES = 'MESSAGE_ACTION_RECEIVE_MESSAGES',
    ERROR = 'MESSAGE_ACTION_ERROR',
    SELECT_MESSAGE = 'MESSAGE_ACTION_SELECT',
    EDIT_MESSAGE = 'MESSAGE_ACTION_EDIT',
    CANCEL_OR_COMMENCE_EDIT_MESSAGE = 'MESSAGE_ACTION_CANCEL_OR_COMMENCE_EDIT',
    SAVE_MESSAGE = 'MESSAGE_ACTION_SAVE'
}