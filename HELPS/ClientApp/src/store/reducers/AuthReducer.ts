import {AuthState} from '../../types/store/reducers/AuthReducerTypes';
import {AuthAction, AuthActionType} from '../../types/store/actions/AuthActionTypes';

const initialState: AuthState = {
    isAuthenticating: false,
    authenticated: false
};

export function AuthReducer(state: AuthState = initialState, action: AuthAction) {
    switch (action.type) {
        case AuthActionType.LOGOUT:
            return {
                ...state,
                isAuthenticating: false,
                authenticated: false,
                error: undefined
            };
        case AuthActionType.REQUEST_LOGIN:
            return {
                ...state,
                isAuthenticating: true,
                authenticated: false,
                error: undefined
            };
        case AuthActionType.RECEIVE_LOGIN:
            return {
                ...state,
                isAuthenticating: false,
                authenticated: true
            };
        case AuthActionType.LOGIN_ERROR:
            return {
                ...state,
                isAuthenticating: false,
                authenticated: false,
                error: action.payload
            };
        default:
            return state;
    }
}