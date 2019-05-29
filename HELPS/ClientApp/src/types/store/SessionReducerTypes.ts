import {Session} from '../model/Session';

export interface SessionState {
    isLoading: boolean,
    sessions: Session[]
    userSessions: Session[]
    error?: string
}