import {AuthAction, AuthActionType} from '../../types/store/actions/AuthActionTypes';
import {Dispatch} from 'redux';

const requestLogin = (): AuthAction => ({
    type: AuthActionType.REQUEST_LOGIN
});

const receiveLogin = (): AuthAction => ({
    type: AuthActionType.RECEIVE_LOGIN
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

const requestLogout = (): AuthAction => ({
    type: AuthActionType.REQUEST_LOGOUT
});

const receiveLogout = (): AuthAction => ({
    type: AuthActionType.RECEIVE_LOGOUT
});

/*export const logoutUser = () =>
    (dispatch: Dispatch<any>) => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    dispatch(receiveLogout())
    }*/

export function logoutUser() {
  return (dispatch: Dispatch<any>) => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    localStorage.removeItem('loginResult.access_token')
    localStorage.removeItem(LS_STORAGE_KEY)
    dispatch(receiveLogout())
    console.log("something")
  }
}