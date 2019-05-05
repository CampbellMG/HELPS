export enum EmailActionsType {
    REQUEST_EMAIL = 'EMAIL_ACTION_REQUEST_EMAIL',
    RECEIVE_EMAIL = 'EMAIL_ACTION_RECEIVE_EMAIL',
    SUBMIT_EMAIL = 'EMAIL_ACTION_SUBMIT_EMAIL',
    EMAIL_ERROR = 'EMAIL_ACTION_EMAIL_ERROR'
}

export interface EmailAction {
    type: EmailActionsType,
    payload?: any
}