import {Student} from '../model/Student';
import {InjectedFormProps} from 'redux-form';
import {Deleteable} from './WorkshopRegistrationTypes';
import {Editable} from '../util/Editable';
import {MessageDictionary} from '../model/Message';

export interface UserStateProps {
    authenticated: boolean
    students?: Student[]
    error?: string
    loading: boolean
    isAdmin: boolean
    messages: MessageDictionary
}

export interface UserDispatchProps {
    loadUserDetails: () => void
    updateUser: (user: Student) => void
    submit: () => void
    retrieveMessages: () => void
}

export interface UserProps extends UserStateProps, UserDispatchProps {

}

export interface UserState {
    selectedStudent?: Student
    filter: string
}

export interface StudentFormData extends Student, Deleteable {

}

export interface StudentFormDispatchProps {
    submit: () => void
}

export interface UserFormExtraProps {
    isAdmin?: boolean
}

export interface UserFormProps extends UserFormExtraProps, InjectedFormProps<StudentFormData, UserFormExtraProps>, StudentFormDispatchProps {

}

export interface UserFormState extends Editable {

}