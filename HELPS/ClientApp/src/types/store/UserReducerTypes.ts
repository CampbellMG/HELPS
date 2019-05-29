import {Student} from '../model/Student';

export interface UserState {
    isLoading: boolean,
    user: Student[]
    error?: string
}