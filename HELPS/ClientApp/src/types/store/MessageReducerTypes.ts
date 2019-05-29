import { Message } from '../model/Message';
import { Editable } from '../util/Editable';

export interface MessageState {
    error?: string
    messages: Message[]
}