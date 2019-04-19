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
    hoveredWordIndex: number
    draggingVariableIndex: number
    selectedEmail?: Email
}