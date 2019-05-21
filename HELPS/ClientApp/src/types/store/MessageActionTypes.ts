import { Message } from '../model/Message';

export interface MessageAction {
    type: MessageActionTypes;
    messages?: Message[];
    message?: Message;
    payload?: any;
}

export enum MessageActionTypes {
    RECEIVE = 'MESSAGE_ACTION_RECEIVE_MESSAGES',
    ERROR = 'MESSAGE_ACTION_ERROR'
}