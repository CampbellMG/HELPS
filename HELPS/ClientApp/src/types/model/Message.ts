export interface MessageModel {
    id: number;
    title: string;
    content: string;
}

export const messageEquals = (messageA: MessageModel, messageB: MessageModel): boolean => {
    return messageA.id === messageB.id &&
        messageA.content === messageB.content &&
        messageA.title === messageB.title;
};
