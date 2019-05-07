import { MessageModel } from '../model/Message';

export interface MessageState {
    messages: MessageModel[];
    error?: string;
    selectedMessage?: MessageModel;
}