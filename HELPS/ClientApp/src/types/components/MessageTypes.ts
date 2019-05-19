import { MessageModel } from '../model/Message';
import { Editable } from '../util/Editable';

export interface MessageStateProps extends Editable {
    messages: MessageModel[];
    selectedMessage: MessageModel;
}

export interface MessageDispatchProps {
    fetchMessages: () => void;
    saveMessage: (messageId: number, newMessage: MessageModel, isNewMode: boolean) => void;
    deleteMessage: (messageId: number) => void;
    selectMessage: (message: MessageModel) => void;
}

export interface MessageProps extends MessageStateProps, MessageDispatchProps {}