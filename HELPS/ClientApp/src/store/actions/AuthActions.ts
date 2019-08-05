import { AuthAction, AuthActionType } from '../../types/store/AuthActionTypes';
import { Dispatch } from 'redux';
import { push } from 'react-router-redux';
import { RegisterFields } from '../../types/components/LoginTypes';
import { isUndefined } from 'util';

const requestLogin = (): AuthAction => ({
    type: AuthActionType.REQUEST_LOGIN
});

const receiveLogin = (isAdmin: boolean): AuthAction => ({
    type: AuthActionType.RECEIVE_LOGIN,
    payload: isAdmin
});

const doLogout = (): AuthAction => ({
    type: AuthActionType.LOGOUT
});

const loginError = (message: string): AuthAction => ({
    type: AuthActionType.LOGIN_ERROR,
    payload: message
});

const receiveRegister = (): AuthAction => ({
    type: AuthActionType.RECEIVE_REGISTER
});

const registerError = (message: string): AuthAction => ({
    type: AuthActionType.REGISTER_ERROR,
    payload: message
});

export const LS_STORAGE_KEY = 'id_token';
export const LS_ADMIN_KEY = 'id_admin';

export const getExistingSession = () => async (dispatch: Dispatch<any>) => {
    dispatch(requestLogin());

    const token = localStorage.getItem(LS_STORAGE_KEY);
    const isAdmin = localStorage.getItem(LS_ADMIN_KEY) == '1';

    if (token !== null) {
        dispatch(receiveLogin(isAdmin));
        // dispatch(push('/user')); // locally I have this line commented out because it breaks things. WS
        return;
    }
};

export const login = (username: string, password: string) => async (dispatch: Dispatch<any>) => {
    dispatch(requestLogin());

    const loginResponse = await fetch('api/login', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ username, password })
    });



    const loginResult = await loginResponse.json();

    if (!loginResponse.ok || !loginResult.accessToken) {
        dispatch(loginError(loginResult.message ? loginResult.message : 'Login request failed'));
        return;
    }

    // This is a bit sketchy but will work for now
    localStorage.setItem(LS_STORAGE_KEY, loginResult.accessToken);
    localStorage.setItem(LS_ADMIN_KEY, loginResult.isAdmin ? '1' : '0');

    dispatch(receiveLogin(loginResult.isAdmin));

    dispatch(push('/events'));
};

export const logout = () => async (dispatch: Dispatch<any>) => {
    localStorage.removeItem(LS_STORAGE_KEY);
    dispatch(doLogout());
};

export const register = (registerRequest: RegisterFields | undefined) => async (dispatch: Dispatch<any>) => {
    if (isUndefined(registerRequest)) {
        dispatch(registerError('Did you properly fill all fields?'));
    } else {
        const registerResponse = await fetch('api/register', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify(registerRequest)
        });
        if (registerResponse.ok) {
            dispatch(push('/user'));
        } else {
            alert('Register failed: ' + registerResponse.statusText);
        }
    }
};

export function fetchToken(): string | null {
    return localStorage.getItem(LS_STORAGE_KEY);
}

export const NO_TOKEN_MESSAGE: string = 'No token, have you authenticated?';

export const fetchWithAuthHeader = (token: string, path: string): Promise<Response> =>
    fetch(path, {
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    });
