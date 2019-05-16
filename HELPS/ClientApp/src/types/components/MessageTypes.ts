import { Message } from '../model/Message';
import { Editable } from '../util/Editable';

export interface MessageStateProps extends Editable {
    messages: Message[];
    selectedMessage: Message;
    newMessage: Message;
    isLoaded: boolean;
}

export interface MessageDispatchProps {
    fetchMessages: () => void;
    saveMessage: (message: Message) => void;
    deleteMessage: (messageId: number) => void;
    selectMessage: (message: Message) => void;
    editMessage: (message: Message) => void;
    cancelOrCommenceEdit: () => void;
}

export interface MessageProps extends MessageStateProps, MessageDispatchProps {}