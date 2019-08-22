import {MessageDictionary} from '../model/Message';

export type ContentType = 'PROGRAMS' | 'FAQ';

export interface InfoState {
    activeContent: ContentType
}

export interface InfoStateProps {
    messages: MessageDictionary
}

export interface InfoDispatchProps {
    fetchMessages: () => void
}

export interface InfoProps extends InfoStateProps, InfoDispatchProps {

}