import {Student} from '../model/Student';
import {Workshop} from '../model/Workshop';

export interface WorkshopRegistrationStateProps {
    authenticated: boolean
    workshops: Workshop[]
    userWorkshops: Workshop[],
    error?: string
}

export interface WorkshopRegistrationDispatchProps {
    retrieveWorkshops: () => void
    retrieveUserWorkshops: (student: Student) => void
    bookWorkshop: (student: Student, workshop: Workshop) => void
}

export interface WorkshopRegistrationProps extends WorkshopRegistrationStateProps, WorkshopRegistrationDispatchProps {

}