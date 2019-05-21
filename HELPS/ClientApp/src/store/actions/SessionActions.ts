import {Dispatch} from 'redux';
import {LS_STORAGE_KEY} from './AuthActions';
import {SessionAction, SessionActionType} from '../../types/store/SessionActionTypes';
import {Session} from '../../types/model/Session';
import {authenticatedFetch} from '../../util';
import {act} from 'react-dom/test-utils';

const ENDPOINT_SESSION = 'api/sessions';
const ENDPOINT_STUDENT_SESSION = 'api/students/sessions';

const receiveSessions = (sessions: Session[]): SessionAction => ({
    type: SessionActionType.RECEIVE_SESSIONS,
    payload: sessions
});

const receiveUserSessions = (workShops: Session[]): SessionAction => ({
    type: SessionActionType.RECEIVE_USER_SESSIONS,
    payload: workShops
});

const sessionError = (message: string): SessionAction => ({
    type: SessionActionType.SESSION_ERROR,
    payload: message
});

async function dispatchUserSessions(dispatch: Dispatch<any>) {
    try {
        const sessions: Session[] = await authenticatedFetch(ENDPOINT_STUDENT_SESSION);
        dispatch(receiveUserSessions(sessions));
    } catch (e) {
        dispatch(sessionError(e.message));
    }
}

async function dispatchSessions(dispatch: Dispatch<any>) {
    try {
        const sessions: Session[] = await authenticatedFetch(ENDPOINT_SESSION);
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
            true
        );
        await dispatchUserSessions(dispatch);
    } catch (e) {
        dispatch(sessionError(e.message));
    }
};

export const cancelSession = (session: Session) => async (dispatch: Dispatch<any>) => {
    try {
        // TODO - Fix this api endpoint, temporary for the client meeting
        await authenticatedFetch(`api/studentSessions/${session.id}`, 'DELETE');
        await dispatchUserSessions(dispatch);
    } catch (e) {
        dispatch(sessionError(e.message));
    }
};

export const addSession = (session: Session) => async (dispatch: Dispatch<any>) => {
    try {
        // TODO - Fix this api endpoint, temporary for the client meeting
        await authenticatedFetch(
            ENDPOINT_SESSION,
            'POST',
            {
                ...session,
                id: undefined
            },
            true
        );
        await dispatchSessions(dispatch);
    } catch (e) {
        dispatch(sessionError(e.message));
    }
};