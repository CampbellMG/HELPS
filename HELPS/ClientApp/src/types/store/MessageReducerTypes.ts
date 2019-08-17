import {Message, MessageDictionary} from '../model/Message';

export interface MessageState {
    error?: string
    messages: Message[]
    indexedMessages: MessageDictionary
}