import {Email} from '../model/Email';
import {EditorState, ContentState} from 'react-draft-wysiwyg';
import Draft from 'draft-js';

export interface EmailStateProps {
    emails: Email[]
}

export interface EmailDispatchProps {
    requestEmails: () => void
    submitEmail: (email: Email) => void
}

export interface EmailProps extends EmailStateProps, EmailDispatchProps {

}

export interface EmailState {
    selectedEmail?: Email
    isEditingText: boolean
    editorState: EditorState
}

export interface EmailEditProps {
    email?: Email
    onEmailChanged: (email: Email) => void
    onContentChanged: (editorState: ContentState) => void
}

export interface EmailEditState {
    editorState: EditorState
}