import {Dispatch} from 'redux';
import {fetchToken, NO_TOKEN_MESSAGE} from './AuthActions';
import {AdvisorAction, AdvisorActionType} from '../../types/store/AdvisorActionTypes';
import {Advisor} from '../../types/model/Advisor';
import {fetchRequest} from '../../util';

const API_ADVISOR_PATH = 'api/advisors';

const requestAdvisors = (): AdvisorAction => ({
    type: AdvisorActionType.REQUEST_ADVISORS
});

const receiveAdvisors = (advisors: Advisor[]): AdvisorAction => ({
    type: AdvisorActionType.RECEIVE_ADVISORS,
    payload: advisors
});

const advisorError = (message: string): AdvisorAction => ({
    type: AdvisorActionType.ADVISOR_ERROR,
    payload: message
});

export const retrieveAdvisorList = () => async (dispatch: Dispatch<any>) => {
    await retrieveAdvisors(dispatch);
};

export const addAdvisor = (advisor: Advisor) => async (dispatch: Dispatch<AdvisorAction>) => {
    await saveAdvisor(advisor, false, dispatch);
    await retrieveAdvisors(dispatch);
};

export const updateAdvisor = (advisor: Advisor) => async (dispatch: Dispatch<AdvisorAction>) => {
    await saveAdvisor(advisor, true, dispatch);
    await retrieveAdvisors(dispatch);
};

export const deleteAdvisor = (advisor: Advisor) => async (dispatch: Dispatch<any>) => {
    const token = fetchToken();
    if (token === null) {
        return dispatch(advisorError(NO_TOKEN_MESSAGE));
    }

    try {
        await fetchRequest(
            `${API_ADVISOR_PATH}/${advisor.id}`,
            'DELETE',
            token
        );
    } catch (e) {
        dispatch(advisorError(`Error deleting advisor - ${e}`));
    }

    await retrieveAdvisors(dispatch);
};

async function saveAdvisor(advisor: Advisor, isNew: boolean, dispatch: Dispatch<AdvisorAction>) {
    const token = fetchToken();
    if (token === null) {
        return dispatch(advisorError(NO_TOKEN_MESSAGE));
    }

    try {
        if (isNew) {
            return await fetchRequest(
                API_ADVISOR_PATH,
                'POST',
                token,
                advisor,
                true
            );
        }

        await fetchRequest(
            `${API_ADVISOR_PATH}/${advisor.id}`,
            'PUT',
            token,
            advisor,
            true
        );

    } catch (e) {
        dispatch(advisorError(`Error updating advisor title: ${e}`));
    }
}

async function retrieveAdvisors(dispatch: Dispatch<AdvisorAction>) {
    dispatch(requestAdvisors());

    const token = fetchToken();
    if (token === null) {
        return dispatch(advisorError(NO_TOKEN_MESSAGE));
    }

    const advisors: Advisor[] = await fetchRequest(
        API_ADVISOR_PATH,
        'GET',
        token
    );

    dispatch(receiveAdvisors(advisors));
}