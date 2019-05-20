import {Student} from '../model/Student';

export interface UserStateProps {
    authenticated: boolean
    students?: Student[]
    error?: string
    loading: boolean
    isAdmin: boolean
}

export interface UserDispatchProps {
    loadUserDetails: (isAdmin: boolean) => void
    updateUser: (user: Student) => void
    submit: () => void
}

export interface UserProps extends UserStateProps, UserDispatchProps {

}

export interface UserState {
    selectedStudent?: Student
    filter: string
}