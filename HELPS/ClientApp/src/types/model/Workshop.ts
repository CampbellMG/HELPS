import {HELPSEvent} from './HELPSEvent';

export interface Workshop extends HELPSEvent {
    title: string
    cutOff: number
    maximum: number
    targetGroup: string
    description: string
    availablePlaces: number
    skillId: number
    assignedStudentIds: number[]
}

export function isWorkshop(event: HELPSEvent): event is Workshop {
    return 'title' in event;
}