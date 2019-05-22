import {HELPSEvent} from './HELPSEvent';

export interface File {
    id: number
    title: string
}

export interface Session extends HELPSEvent {
    advisorId: number
    studentId: number
    type: string
    purpose: string
    subjectName: string
    assignmentType: string
    groupAssignment: boolean
    assistance: string
    attendance: boolean
    comments: string
    files: File[]
}

export function isSession(event: HELPSEvent): event is Session {
    return 'type' in event;
}