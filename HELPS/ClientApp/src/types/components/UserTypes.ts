import {Student} from '../model/Student';

export interface UserStateProps {
    authenticated: boolean
    student?: Student
    error?: string
    loading: boolean
}

export interface UserDispatchProps {
    loadUserDetails: () => void
    updateUser: (user: Student) => void
    submit: () => void
}

export interface UserProps extends UserStateProps, UserDispatchProps {

}