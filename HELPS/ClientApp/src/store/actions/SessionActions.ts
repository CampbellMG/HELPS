import {Dispatch} from 'redux';
import {SessionAction, SessionActionType} from '../../types/store/SessionActionTypes';
import {Session} from '../../types/model/Session';
import {authenticatedFetch} from '../../util';
import moment from 'moment';

const ENDPOINT_SESSION = 'api/sessions';
const ENDPOINT_STUDENT_SESSION = 'api/students/sessions';
export const ENDPOINT_FILE = 'api/files';

const receiveSessions = (sessions: Session[]): SessionAction => ({
    type: SessionActionType.RECEIVE_SESSIONS,
    payload: sessions
});

const receiveUserSessions = (sessions: Session[]): SessionAction => ({
    type: SessionActionType.RECEIVE_USER_SESSIONS,
    payload: sessions
});

const sessionError = (message: string): SessionAction => ({
    type: SessionActionType.SESSION_ERROR,
    payload: message
});

function formatSession(sessions: Session[]): Session[] {
    return sessions.map(session => {
        if (!session.endTime) {
            session.endTime = moment(session.startTime).add(session.duration, 'minutes').toLocaleString();
        }
        return session;
    });
}

async function dispatchUserSessions(dispatch: Dispatch<any>) {
    try {
        let sessions: Session[] = await authenticatedFetch(ENDPOINT_STUDENT_SESSION);
        sessions = formatSession(sessions);
        dispatch(receiveUserSessions(sessions));
    } catch (e) {
        dispatch(sessionError(e.message));
    }
}

async function dispatchSessions(dispatch: Dispatch<any>) {
    try {
        let sessions: Session[] = await authenticatedFetch(ENDPOINT_SESSION);
        sessions = formatSession(sessions)
        dispatch(receiveSessions(sessions));
    } catch (e) {
        dispatch(sessionError(e.message));
    }
}

export const retrieveUserSessions = () => async (dispatch: Dispatch<any>) => {
    await dispatchUserSessions(dispatch);
};

export const retrieveSessions = () => async (dispatch: Dispatch<any>) => {
    await dispatchSessions(dispatch);
};

export const bookSession = (session: Session) => async (dispatch: Dispatch<any>) => {
    try {
        await authenticatedFetch(
            ENDPOINT_STUDENT_SESSION,
            'POST',
            session,
            true,
            false
        );
        await dispatchUserSessions(dispatch);
    } catch (e) {
        dispatch(sessionError(e.message));
    }
};

export const cancelSession = (session: Session) => async (dispatch: Dispatch<any>) => {
    try {
        await authenticatedFetch(`${ENDPOINT_STUDENT_SESSION}/${session.id}`, 'DELETE', undefined, undefined, false);
        await dispatchSessions(dispatch);
        await dispatchUserSessions(dispatch);
    } catch (e) {
        dispatch(sessionError(e.message));
    }
};

export const addSession = (session: Session) => async (dispatch: Dispatch<any>) => {
    try {
        await authenticatedFetch(
            ENDPOINT_SESSION,
            'POST',
            {...session, id: undefined},
            true
        );
        await dispatchSessions(dispatch);
    } catch (e) {
        dispatch(sessionError(e.message));
    }
};

export const updateSession = (session: Session) => async (dispatch: Dispatch<any>) => {
    try {
        await authenticatedFetch(
            `${ENDPOINT_SESSION}/${session.id}`,
            'PUT',
            session,
            true,
            false
        );
        await dispatchSessions(dispatch);
    } catch (e) {
        dispatch(sessionError(e.message));
    }
};