import {AuthAction, AuthActionType} from '../../types/store/actions/AuthActionTypes';
import {Dispatch} from 'redux';

const requestLogin = (): AuthAction => ({
    type: AuthActionType.REQUEST_LOGIN
});

const receiveLogin = (): AuthAction => ({
    type: AuthActionType.RECEIVE_LOGIN
});

const doLogout = (): AuthAction => ({
    type: AuthActionType.LOGOUT
});

const loginError = (message: string): AuthAction => ({
    type: AuthActionType.LOGIN_ERROR,
    payload: message
});



export const LS_STORAGE_KEY = 'id_token';

export const login = (username: string, password: string) => async (dispatch: Dispatch<any>) => {
    dispatch(requestLogin());

    const loginResponse = await fetch('api/login', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({username, password})
    });

    const loginResult = await loginResponse.json();

    if (!loginResponse.ok || !loginResult.access_token) {
        dispatch(loginError(loginResult.message ? loginResult.message : 'Login request failed'));
        return;
    }

    // This is a bit sketchy but will work for now
    localStorage.setItem(LS_STORAGE_KEY, loginResult.access_token);

    dispatch(receiveLogin());
};

export const logout = () => async (dispatch: Dispatch<any>) => {
    localStorage.removeItem(LS_STORAGE_KEY);
    dispatch(doLogout());
};