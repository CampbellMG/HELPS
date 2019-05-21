import {HELPSEvent} from './HELPSEvent';

export interface Session extends HELPSEvent {
    advisorId: number
    studentId: number
    type: string
}

export function isSession(event: HELPSEvent): event is Session {
    return 'type' in event;
}