import {Dispatch} from 'redux';
import {LS_STORAGE_KEY} from './AuthActions';
import {EmailAction, EmailActionsType} from '../../types/store/EmailActionTypes';
import {Email} from '../../types/model/Email';

const requestEmails = (): EmailAction => ({
    type: EmailActionsType.REQUEST_EMAIL
});

const submitEmail = (): EmailAction => ({
    type: EmailActionsType.SUBMIT_EMAIL
});

const receiveEmails = (emails: Email[]): EmailAction => ({
    type: EmailActionsType.RECEIVE_EMAIL,
    payload: emails
});

const emailError = (error: string): EmailAction => ({
    type: EmailActionsType.EMAIL_ERROR,
    payload: error
});

async function getEmails(token: string): Promise<Email[]> {
    const emailResponse = await fetch('api/emails', {
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
        throw Error(emailResult.message ? emailResult.message : 'Retrieve email failed');
    }

    return emailResult as Email[];
}

export const retrieveEmails = () => async (dispatch: Dispatch<any>) => {
    dispatch(requestEmails());

    const token = localStorage.getItem(LS_STORAGE_KEY);

    if (token === null) {
        dispatch(emailError('No token, have you authenticated?'));
        return;
    }

    const emailResponse = await fetch('api/emails', {
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
        dispatch(emailError(emailResult.message ? emailResult.message : 'Retrieve emails failed'));
        return;
    }

    const emails = emailResult as Email[];

    dispatch(receiveEmails(emails));
};

export const updateEmail = (email: Email) => async (dispatch: Dispatch<any>) => {
    dispatch(submitEmail());

    const token = localStorage.getItem(LS_STORAGE_KEY);

    if (token === null) {
        dispatch(emailError('No token, have you authenticated?'));
        return;
    }

    const emailResponse = await fetch(`api/emails/${email.id}`, {
        method: 'PUT',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        }),
        body: JSON.stringify(email)
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
        dispatch(emailError(emailResult.message ? emailResult.message : 'Update email failed'));
        return;
    }

    try {
        const emails = await getEmails(token);
        dispatch(receiveEmails(emails));
    } catch (e) {
        dispatch(emailError(e.message));
    }
};