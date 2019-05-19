import { MessageModel } from '../model/Message';

export interface MessageAction {
    type: MessageActionTypes;
    messages?: MessageModel[];
    message?: MessageModel;
    payload?: any;
}

export enum MessageActionTypes {
    RECEIVE = 'MESSAGE_ACTION_RECEIVE_MESSAGES',
    ERROR = 'MESSAGE_ACTION_ERROR',
    SELECT = 'MESSAGE_ACTION_SELECT'
}