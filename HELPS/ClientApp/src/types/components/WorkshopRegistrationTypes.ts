import {Student} from '../model/Student';
import {Workshop} from '../model/Workshop';
import {Event} from 'react-big-calendar';

export interface WorkshopEvent extends Event, Workshop {
    start: Date
    end: Date
}

export interface WorkshopRegistrationStateProps {
    authenticated: boolean
    workshops: Workshop[]
    userWorkshops: Workshop[]
    error?: string
}

export interface WorkshopRegistrationDispatchProps {
    retrieveWorkshops: () => void
    retrieveUserWorkshops: () => void
    bookWorkshop: (workshop: Workshop) => void
}

export interface WorkshopRegistrationProps extends WorkshopRegistrationStateProps, WorkshopRegistrationDispatchProps {

}