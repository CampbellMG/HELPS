import {Student} from '../model/Student';
import {InjectedFormProps} from 'redux-form';
import {Deleteable} from './WorkshopRegistrationTypes';
import {Editable} from '../util/Editable';

export interface UserStateProps {
    authenticated: boolean
    students?: Student[]
    error?: string
    loading: boolean
    isAdmin: boolean
}

export interface UserDispatchProps {
    loadUserDetails: () => void
    updateUser: (user: Student) => void
    submit: () => void
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