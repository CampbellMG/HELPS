import {Workshop} from '../model/Workshop';
import {Event} from 'react-big-calendar';
import {InjectedFormProps} from 'redux-form';
import {HELPSEvent} from '../model/HELPSEvent';
import {Session} from '../model/Session';
import * as React from 'react';
import {Room} from '../model/Room';
import {FormControlProps} from 'react-bootstrap';
import {Student} from '../model/Student';
import {Advisor} from '../model/Advisor';
import {Skill} from '../model/Skill';

export type EventFormProps<E extends HELPSEvent, P> = P & InjectedFormProps<E, P>;

export interface AdminSessionBookProps {
    booked: boolean
}

export type AdminSessionBookFormProps = EventFormProps<Session, AdminSessionBookProps>;

export interface AdminSessionDetailProps {
}

export type AdminSessionDetailFormProps = EventFormProps<Session, AdminSessionDetailProps>;

export interface AdminWorkshopDetailProps {
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
    updateWorkshop: (workshop: Workshop) => void

    retrieveSessions: () => void
    retrieveUserSessions: () => void
    bookSession: (session: Session) => void
    cancelSession: (session: Session) => void
    addSession: (session: Session) => void
    updateSession: (session: Session) => void
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
    eventChanged: (event: CalendarEvent) => void
}

export interface RoomListStateProps {
    rooms: Room[]
}
export interface RoomListDispatchProps {
    loadRooms: () => void
}

export interface RoomListProps extends RoomListDispatchProps, RoomListStateProps, FormControlProps {

}

export interface SkillListStateProps {
    skills: Skill[]
}
export interface SkillListDispatchProps {
    loadSkills: () => void
}

export interface SkillListProps extends SkillListDispatchProps, SkillListStateProps, FormControlProps {

}

export interface StudentListStateProps {
    students: Student[]
}
export interface StudentListDispatchProps {
    loadStudents: () => void
}

export interface StudentListProps extends StudentListDispatchProps, StudentListStateProps, FormControlProps {

}

export interface AdvisorListStateProps {
    advisors: Advisor[]
}
export interface AdvisorListDispatchProps {
    loadAdvisors: () => void
}

export interface AdvisorListProps extends AdvisorListDispatchProps, AdvisorListStateProps, FormControlProps {

}