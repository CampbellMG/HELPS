import { MessageModel } from '../model/Message';
import { Editable } from '../util/Editable';

export interface MessageStateProps extends Editable {
    messages: MessageModel[];
    selectedMessage: MessageModel;
    newMessage: MessageModel;
}

export interface MessageDispatchProps {
    fetchMessages: () => void;
    saveMessage: (message: MessageModel) => void;
    deleteMessage: (messageId: number) => void;
    selectMessage: (message: MessageModel) => void;
    editMessage: (message: MessageModel) => void;
    cancelOrCommenceEdit: () => void;
}

export interface MessageProps extends MessageStateProps, MessageDispatchProps {}