import {Identifiable} from './Identifiable';
import {isUndefined} from 'util';

export const MessageDictionaryMap: { [key: number]: keyof MessageDictionary } = {
    1: 'loginNotification',
    2: 'eventNotification',
    3: 'informationCollection',
    4: 'programs',
    5: 'FAQ'
};

export interface MessageDictionary {
    loginNotification?: string
    eventNotification?: string
    informationCollection?: string
    programs?: string
    FAQ?: string
};

export interface Message extends Identifiable {
    title: string;
    content: string;
}

export const messageEquals = (messageA: Message, messageB: Message, compareIds: boolean = false): boolean => {
    return (messageA.content === messageB.content && messageA.title === messageB.title) &&
        (!compareIds || messageA.id === messageB.id);
};

export const isMessage: (message: Message) => boolean = (message: Message) => {
    return !isUndefined(message.title) && !isUndefined(message.content);
};
