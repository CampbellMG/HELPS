import { MessageModel } from '../model/Message';

export interface MessageStateProps {
    messages: MessageModel[];
}

export interface MessageDispatchProps {

}

export interface MessageProps extends MessageStateProps, MessageDispatchProps {}