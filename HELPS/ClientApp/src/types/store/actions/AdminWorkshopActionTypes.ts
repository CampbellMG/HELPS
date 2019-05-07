export enum AdminWorkshopActionType {
    ADD_SKILL = 'ADMIN_WORKSHOP_ACTION_ADD_SKILL',
    RECEIVE_WORKSHOPS = 'ADMIN_WORKSHOP_ACTION_RECEIVE_WORKSHOPS',
    SHOW_CURRENT = 'ADMIN_WORKSHOP_ACTION_SHOW_CURRENT',
    SHOW_ARCHIVED = 'ADMIN_WORKSHOP_ACTION_SHOW_ARCHIVED'
}

export interface AdminWorkshopAction {
    type: AdminWorkshopActionType,
    payload?: any
}