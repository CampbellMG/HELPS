import {AuthState} from '../../types/store/AuthReducerTypes';
import {AuthAction, AuthActionType} from '../../types/store/AuthActionTypes';

const initialState: AuthState = {
    isAuthenticating: false,
    authenticated: false,
    isAdmin: false
};

export function AuthReducer(state: AuthState = initialState, action: AuthAction): AuthState {
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
                authenticated: true,
                isAdmin: action.payload
            };
        case AuthActionType.LOGIN_ERROR:
            return {
                ...state,
                isAuthenticating: false,
                authenticated: false,
                error: action.payload
            };
        case AuthActionType.REGISTER_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}