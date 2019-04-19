import {Email} from '../model/Email';

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
}

export interface EmailEditProps {
    email?: Email
    onEmailChanged: (email: Email) => void
}

export interface EmailEditState {
    isEditing: boolean
}