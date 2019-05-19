import { Identifiable } from './Identifiable';
import { isUndefined } from 'util';

export interface MessageModel extends Identifiable {
    title: string;
    content: string;
}

export const messageEquals = (messageA: MessageModel, messageB: MessageModel, compareIds: boolean = false): boolean => {
    return (messageA.content === messageB.content && messageA.title === messageB.title) &&
        (!compareIds || messageA.id === messageB.id);
};

export const makeMockMessage: () => MessageModel = () => ({
    id: Number.MAX_SAFE_INTEGER,
    title: 'Mock Message Title',
    content: 'Mock Message Content'
});

export const isMessage: (message: MessageModel) => boolean = (message: MessageModel) => {
    return !isUndefined(message.title) && !isUndefined(message.content);
}
