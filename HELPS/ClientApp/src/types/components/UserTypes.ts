import {Student} from '../model/Student';

export interface UserStateProps {
    authenticated: boolean
    student?: Student
    error?: string
}

export interface UserDispatchProps {
    loadUserDetails: () => void
    updateUser: (user: Student) => void
}

export interface UserProps extends UserStateProps, UserDispatchProps {

}