import { Message } from '../model/Message';
import { Editable } from '../util/Editable';

export interface MessageState extends Editable {
    error?: string;
    selectedMessage: Message;
    newMessage: Message;
    messages: Message[];
    filter: string;
}