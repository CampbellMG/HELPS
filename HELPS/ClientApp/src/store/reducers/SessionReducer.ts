import {SessionState} from '../../types/store/SessionReducerTypes';
import {SessionAction, SessionActionType} from '../../types/store/SessionActionTypes';

const initialState: SessionState = {
    isLoading: false,
    userSessions: [],
    sessions: []
};

export function SessionReducer(state: SessionState = initialState, action: SessionAction): SessionState {
    switch (action.type) {
        case SessionActionType.RECEIVE_SESSIONS:
            return {
                ...state,
                sessions: action.payload,
                isLoading: false,
                error: undefined
            };
        case SessionActionType.RECEIVE_USER_SESSIONS:
            return {
                ...state,
                userSessions: action.payload,
                isLoading: false,
                error: undefined
            };
        case SessionActionType.SESSION_ERROR:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        default:
            return state;
    }
}