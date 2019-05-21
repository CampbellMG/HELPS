export enum WorkshopActionType {
    RECEIVE_WORKSHOPS = 'WORKSHOP_ACTION_RECEIVE_WORKSHOPS',
    RECEIVE_USER_WORKSHOPS = 'WORKSHOP_ACTION_RECEIVE_USER_WORKSHOPS',
    WORKSHOP_ERROR = 'WORKSHOP_ACTION_WORKSHOP_ERROR'
}

export interface WorkshopAction {
    type: WorkshopActionType,
    payload?: any
}