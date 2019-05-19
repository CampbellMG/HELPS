import { MessageModel } from '../model/Message';
import { Editable } from '../util/Editable';

export interface MessageState extends Editable {
    error?: string;
    selectedMessage: MessageModel;
    newMessage: MessageModel;
    messages: MessageModel[];
    filter: string;
}