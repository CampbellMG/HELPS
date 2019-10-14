import {HELPSEvent} from './HELPSEvent';

export interface SessionFile {
    id: number
    name: string
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
    fileIds: number[]
    files?: SessionFile[]
}

export function isSession(event: HELPSEvent): event is Session {
    return 'type' in event;
}