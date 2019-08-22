import {MessageDictionary} from '../model/Message';

export interface LoginFields {
    username: string,
    password: string
}

export interface RegisterFields extends LoginFields {
    isAdmin: boolean;
}

export interface HomeStateProps {
    authenticated: boolean,
    error?: string
    messages: MessageDictionary
}

export interface HomeDispatchProps {
    login: (username: string, password: string) => void
    logout: () => void
    fetchMessages: () => void
}

export interface HomeProps extends HomeStateProps, HomeDispatchProps {

}