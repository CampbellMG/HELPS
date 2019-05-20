import { Message } from '../model/Message';
import { Editable } from '../util/Editable';

export interface MessageStateProps extends Editable {
    messages: Message[];
    selectedMessage: Message;
}

export interface MessageDispatchProps {
    fetchMessages: () => void;
    saveMessage: (messageId: number, newMessage: Message, isNewMode: boolean) => void;
    deleteMessage: (messageId: number) => void;
    selectMessage: (message: Message) => void;
}

export interface MessageProps extends MessageStateProps, MessageDispatchProps {}