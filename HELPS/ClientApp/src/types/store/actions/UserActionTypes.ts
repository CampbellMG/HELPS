export enum UserActionType {
    REQUEST_USER = 'USER_ACTION_REQUEST_USER',
    RECEIVE_USER = 'USER_ACTION_RECEIVE_USER',
    USER_ERROR = 'USER_ACTION_USER_ERROR'
}

export interface UserAction {
    type: UserActionType,
    payload?: any
}