import {Student} from '../model/Student';

export interface UserStateProps {
    authenticated: boolean
    student?: Student
    error?: string
}

export interface UserDispatchProps {
    loadUserDetails: () => void
}

export interface UserProps extends UserStateProps, UserDispatchProps {

}