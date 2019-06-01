export enum SessionActionType {
    RECEIVE_SESSIONS = 'SESSION_ACTION_RECEIVE_SESSIONS',
    RECEIVE_USER_SESSIONS = 'SESSION_ACTION_RECEIVE_USER_SESSIONS',
    SESSION_ERROR = 'SESSION_ACTION_SESSION_ERROR'
}

export interface SessionAction {
    type: SessionActionType,
    payload?: any
}