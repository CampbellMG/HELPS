import {Workshop} from '../model/Workshop';
import {Event} from 'react-big-calendar';
import {InjectedFormProps} from 'redux-form';
import {HELPSEvent} from '../model/HELPSEvent';
import {Session} from '../model/Session';
import * as React from 'react';

export type EventFormProps<E extends HELPSEvent, P> = P & InjectedFormProps<E, P>;

export interface AdminSessionBookProps {
    booked: boolean
}

export type AdminSessionBookFormProps = EventFormProps<Session, AdminSessionBookProps>;

export interface AdminSessionDetailProps {
    booked: boolean
}

export type AdminSessionDetailFormProps = EventFormProps<Session, AdminSessionDetailProps>;

export interface AdminWorkshopDetailProps {
    booked: boolean
}

export type AdminWorkshopDetailFormProps = EventFormProps<Workshop, AdminWorkshopDetailProps>;

export interface StudentSessionDetailProps {
    booked: boolean
}

export type StudentSessionDetailFormProps = EventFormProps<Session, StudentSessionDetailProps>;

export interface StudentWorkshopDetailProps {
    booked: boolean
}

export type StudentWorkshopDetailFormProps = EventFormProps<Workshop, StudentWorkshopDetailProps>;

export interface CalendarEvent extends Event, HELPSEvent {
    start: Date
    end: Date
}

export interface EventViewStateProps {
    authenticated: boolean
    workshops: Workshop[]
    userWorkshops: Workshop[]
    sessions: Session[]
    userSessions: Session[]
    error?: string
    isAdmin: boolean
}

export interface EventViewDispatchProps {
    retrieveWorkshops: () => void
    retrieveUserWorkshops: () => void
    bookWorkshop: (workshop: Workshop) => void
    cancelWorkshop: (workshop: Workshop) => void
    addWorkshop: (workshop: Workshop) => void
    retrieveSessions: () => void
    retrieveUserSessions: () => void
    bookSession: (session: Session) => void
    cancelSession: (session: Session) => void
    addSession: (session: Session) => void
}

export interface EventViewProps extends EventViewStateProps, EventViewDispatchProps {

}

export interface EventViewState {
    selectedEvent?: CalendarEvent
    searchTerm: string
    filterNotBooked: boolean
    newEvent?: CalendarEvent
    newEventRef?: any
}

export type HELPSEventType = 'SESSION' | 'WORKSHOP'

export interface NewEventOverlayProps {
    newEventRef?: any
    container?: React.ReactInstance | Node
    onSelect: (type: HELPSEventType) => void
}

export interface CalendarFilterProps {
    searchTerm: string,
    filterNotBooked: boolean
    onSearchUpdated: (event: any) => void
    onFilterNotBookedToggled: (event: any) => void
}

export interface EventFormComponentProps {
    selectedEvent?: CalendarEvent
    isAdmin: boolean
    onEventSubmitted: (event: HELPSEvent) => void
    eventSelected: boolean
}