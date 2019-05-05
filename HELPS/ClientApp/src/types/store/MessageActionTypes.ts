import { MessageModel } from '../model/Message';

export interface MessageAction {
    type: MessageActionTypes;
    messages?: MessageModel[];
    payload?: any;
}

export enum MessageActionTypes {
    RECEIVE_MESSAGES = 'MESSAGE_ACTION_RECEIVE_MESSAGES',
    ERROR = 'MESSAGE_ACTION_ERROR'
}