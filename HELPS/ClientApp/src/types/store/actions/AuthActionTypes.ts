export enum AuthActionType {
    REQUEST_LOGIN = 'AUTH_ACTION_REQUEST_LOGIN',
    RECEIVE_LOGIN = 'AUTH_ACTION_RECEIVE_LOGIN',
    LOGIN_ERROR = 'AUTH_ACTION_LOGIN_ERROR'
}

export interface AuthAction {
    type: AuthActionType,
    payload?: any
}