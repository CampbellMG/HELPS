import {Dispatch} from 'redux'
import {LS_STORAGE_KEY} from './AuthActions';
import {AdvisorAction, AdvisorActionType} from '../../types/store/AdvisorActionTypes'; //EMPTY 
import {Advisor} from '../../types/model/Advisor'
import { async } from 'q';

const requestAdvisors = (): AdvisorAction => ({
    type: AdvisorActionType.REQUEST_ADVISORS
});

const receiveAdvisors = (advisors: Advisor[]): AdvisorAction => ({
    type: AdvisorActionType.RECEIVE_ADVISORS,
    payload: advisors
});

const requestAdvisorDetails = (): AdvisorAction => ({
    type: AdvisorActionType.REQUEST_ADVISOR_DETAILS
});

const receiveAdvisorDetails = (advisors: Advisor[]): AdvisorAction => ({
    type: AdvisorActionType.RECEIVE_ADVISOR_DETAILS,
    payload: advisors
});

const advisorError = (message: string): AdvisorAction => ({
    type: AdvisorActionType.ADVISOR_ERROR,
    payload: message
});

async function getAdvisors(token: string): Promise<Advisor[]> {
    const advisorResponse = await fetch('api/students/advisors', {
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    });

    const advisorResult = await advisorResponse.json();

    if (!advisorResponse.ok) {
        throw Error(advisorResult.message ? advisorResult.message : 'Retrieve advisors failed');
    }

    return advisorResult as Advisor[];
}

export const retrieveAdvisorList = () => async (dispatch: Dispatch<any>) => {
    dispatch(requestAdvisors());

    const token = localStorage.getItem(LS_STORAGE_KEY);

    if (token === null) {
        dispatch(advisorError('No token, have you authenticated?'));
        return;
    }

    const advisorResponse = await fetch('api/advisors', {
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    });

    const advisorResult = await advisorResponse.json();

    if (!advisorResponse.ok) {
        dispatch(advisorError(advisorResult.message ? advisorResult.message : 'Retrieve advisors failed'));
        return;
    }

    const advisors = advisorResult as Advisor[];

    dispatch(receiveAdvisors(advisors));
};

export const retrieveAdvisor = () => async (dispatch: Dispatch<any>) => {
    dispatch(requestAdvisorDetails());

    const token = localStorage.getItem(LS_STORAGE_KEY);

    if (token === null) {
        dispatch(advisorError('No token, have you authenticated?'));
        return;
    }

    try {
        const advisors = await getAdvisors(token);
        dispatch(receiveAdvisorDetails(advisors));
    } catch (e) {
        dispatch(advisorError(e.message));
    }
};