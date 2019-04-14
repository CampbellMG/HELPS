import {Dispatch} from 'redux';
import {UserAction, UserActionType} from '../../types/store/actions/UserActionTypes';
import {Student} from '../../types/model/Student';
import {LS_STORAGE_KEY} from './AuthActions';

const requestUser = (): UserAction => ({
    type: UserActionType.REQUEST_USER
});

const receiveUser = (user: Student): UserAction => ({
    type: UserActionType.RECEIVE_USER,
    payload: user
});

const userError = (message: string): UserAction => ({
    type: UserActionType.USER_ERROR,
    payload: message
});

export const updateUser = (user: Student) => async (dispatch: Dispatch<any>) => {
    dispatch(requestUser());

    const token = localStorage.getItem(LS_STORAGE_KEY);

    if (token === null) {
        dispatch(userError('No token, have you authenticated?'));
        return;
    }

    const userResponse = await fetch('api/students', {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        }),
        body: JSON.stringify(user)
    });

    const userResult = await userResponse.json();

    if (!userResponse.ok || !userResult.id || !userResult.name) {
        dispatch(userError(userResult.message ? userResult.message : 'Login request failed'));
        return;
    }

    const student = userResult as Student;

    dispatch(receiveUser(student));
};

export const retrieveUser = () => async (dispatch: Dispatch<any>) => {
    dispatch(requestUser());

    const token = localStorage.getItem(LS_STORAGE_KEY);

    if (token === null) {
        dispatch(userError('No token, have you authenticated?'));
        return;
    }

    const userResponse = await fetch('api/students', {
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    });

    const userResult = await userResponse.json();

    if (!userResponse.ok || !userResult.id || !userResult.name) {
        dispatch(userError(userResult.message ? userResult.message : 'Login request failed'));
        return;
    }

    const student = userResult as Student;

    dispatch(receiveUser(student));
};