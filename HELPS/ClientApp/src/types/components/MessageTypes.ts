import {Message} from '../model/Message';
import {EditorState} from 'react-draft-wysiwyg';

export interface MessageStateProps {
    messages: Message[]
}

export interface MessageDispatchProps {
    fetchMessages: () => void
    saveMessage: (message: Message) => void
}

export interface MessageProps extends MessageStateProps, MessageDispatchProps {}

export interface MessageState {
    editorState: EditorState
    selectedMessage?: Message
    newSelectedMessage?: Message
    filter: string
}