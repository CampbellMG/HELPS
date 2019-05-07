export enum AdminWorkshopActionType {
    ADD_SKILL = 'ADMIN_WORKSHOP_ACTION_ADD_SKILL',
    RECEIVE_WORKSHOPS = 'ADMIN_WORKSHOP_ACTION_RECEIVE_WORKSHOPS'
}

export interface AdminWorkshopAction {
    type: AdminWorkshopActionType,
    payload?: any
}