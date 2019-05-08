import { MessageModel } from '../model/Message';
import { Editable } from '../util/Editable';

export interface MessageState extends Editable {
    messages: MessageModel[];
    error?: string;
    selectedMessage: MessageModel;
    oldMessage?: MessageModel;
}