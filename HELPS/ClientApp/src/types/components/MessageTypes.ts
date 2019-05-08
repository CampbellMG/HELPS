import { MessageModel } from '../model/Message';

export interface MessageStateProps {
    messages: MessageModel[];
}

export interface MessageDispatchProps {
    fetchMessages: () => void;
    updateMessage: (message: MessageModel) => void;
    deleteMessage: (messageId: number) => void;
}

export interface MessageProps extends MessageStateProps, MessageDispatchProps {}