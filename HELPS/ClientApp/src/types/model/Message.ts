export interface Message {
    id: number;
    title: string;
    content: string;
}

export const messageEquals = (messageA: Message, messageB: Message): boolean => {
    return messageA.id === messageB.id &&
        messageA.content === messageB.content &&
        messageA.title === messageB.title;
};
