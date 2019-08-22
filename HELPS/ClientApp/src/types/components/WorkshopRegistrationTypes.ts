import {Workshop} from '../model/Workshop';
import {Event} from 'react-big-calendar';
import {InjectedFormProps} from 'redux-form';
import {HELPSEvent} from '../model/HELPSEvent';
import {Session, SessionFile} from '../model/Session';
import * as React from 'react';
import {Room} from '../model/Room';
import {FormControlProps} from 'react-bootstrap';
import {Student} from '../model/Student';
import {Advisor} from '../model/Advisor';
import {Skill} from '../model/Skill';
import {RouteComponentProps} from 'react-router';
import {MessageDictionary} from '../model/Message';

export type EventFormProps<E extends DeleteableHELPSEvent, P> = P & InjectedFormProps<E, P>;

export interface AdminSessionDetailProps {
}

export type AdminSessionDetailFormProps = EventFormProps<SessionFormData, AdminSessionDetailProps>;

export interface AdminSessionDetailFormState {
    sessionFiles: SessionFile[]
}

export interface AdminWorkshopDetailFormState {
    recurrenceModalVisible: boolean
    recurrenceRule: string
    workshopStudentIds: number[]
}

export interface AdminWorkshopFormStateProps {
    students: Student[]
}

export interface AdminWorkshopFormDispatchProps {
    retrieveStudents: () => void
}

export interface AdminWorkshopDetailProps{
}

export type AdminWorkshopDetailFormProps = EventFormProps<WorkshopFormData, AdminWorkshopDetailProps> &  AdminWorkshopFormDispatchProps & AdminWorkshopFormStateProps;

export interface StudentSessionDetailProps {
    booked: boolean
}

export type StudentSessionDetailFormProps = EventFormProps<SessionFormData, StudentSessionDetailProps>;

export interface StudentWorkshopDetailProps {
    booked: boolean
}

export type StudentWorkshopDetailFormProps = EventFormProps<WorkshopFormData, StudentWorkshopDetailProps>;

export interface CalendarEvent extends Event, HELPSEvent {
    start: Date
    end: Date
}

export interface Deleteable {
    delete: boolean
    rRule?: string
}

export type DeleteableHELPSEvent = HELPSEvent & Deleteable;

export interface WorkshopFormData extends Workshop, Deleteable {
}

export interface SessionFormData extends Session, Deleteable {
}

export interface EventViewStateProps {
    authenticated: boolean
    workshops: Workshop[]
    userWorkshops: Workshop[]
    sessions: Session[]
    userSessions: Session[]
    error?: string
    isAdmin: boolean
    messages: MessageDictionary
}

export interface EventViewDispatchProps {
    retrieveWorkshops: () => void
    retrieveUserWorkshops: () => void
    bookWorkshop: (workshop: Workshop) => void
    cancelWorkshop: (workshop: Workshop) => void
    addWorkshops: (workshop: Workshop[]) => void
    updateWorkshop: (workshop: Workshop) => void

    retrieveSessions: () => void
    retrieveUserSessions: () => void
    bookSession: (session: Session) => void
    cancelSession: (session: Session) => void
    addSession: (session: Session) => void
    updateSession: (session: Session) => void

    retrieveMessages: () => void
}

export interface EventViewProps extends EventViewStateProps, EventViewDispatchProps, RouteComponentProps {

}

export interface EventViewState {
    selectedEvent?: CalendarEvent
    searchTerm: string
    filters: Filter[]
    newEventRef?: any
}

export type HELPSEventType = 'SESSION' | 'WORKSHOP';

export enum EmailType {
    NONE = "Don't Email",
    STUDENT = 'Email Student',
    ADVISOR = 'Email Advisor',
    BOTH = 'Email Both'
}

export interface NewEventOverlayProps {
    newEventRef?: any
    container?: React.ReactInstance | Node
    onSelect: (type: HELPSEventType) => void
}

export type Filter = 'Booked' | 'Sessions' | 'Workshops';

export interface CalendarFilterProps {
    onSearchUpdated: (event: any) => void
    onFilterUpdated: (filters: Filter[]) => void
}

export interface CalendarFilterState {
    filters: Filter[]
}

export interface EmailSubmitProps {
    buttonText: string
    onSubmit: (emailType: EmailType) => void
}

export interface EmailSubmitState {
    emailType: EmailType
}

export interface EventFormComponentProps {
    selectedEvent?: CalendarEvent
    isAdmin: boolean
    onEventSubmitted: (event: DeleteableHELPSEvent) => void
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