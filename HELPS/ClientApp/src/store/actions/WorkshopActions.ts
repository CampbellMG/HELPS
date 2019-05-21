import {Dispatch} from 'redux';
import {LS_STORAGE_KEY} from './AuthActions';
import {WorkshopAction, WorkshopActionType} from '../../types/store/WorkshopActionTypes';
import {Workshop} from '../../types/model/Workshop';
import {authenticatedFetch} from '../../util';
import {act} from 'react-dom/test-utils';

const ENDPOINT_WORKSHOP = 'api/workshops';
const ENDPOINT_STUDENT_WORKSHOP = 'api/students/workshops';

const receiveWorkshops = (workshops: Workshop[]): WorkshopAction => ({
    type: WorkshopActionType.RECEIVE_WORKSHOPS,
    payload: workshops
});

const receiveUserWorkshops = (workShops: Workshop[]): WorkshopAction => ({
    type: WorkshopActionType.RECEIVE_USER_WORKSHOPS,
    payload: workShops
});

const workshopError = (message: string): WorkshopAction => ({
    type: WorkshopActionType.WORKSHOP_ERROR,
    payload: message
});

async function dispatchUserWorkshops(dispatch: Dispatch<any>) {
    try {
        const workshops: Workshop[] = await authenticatedFetch(ENDPOINT_STUDENT_WORKSHOP);
        dispatch(receiveUserWorkshops(workshops));
    } catch (e) {
        dispatch(workshopError(e.message));
    }
}

export const retrieveWorkshops = () => async (dispatch: Dispatch<any>) => {
    try {
        const workshops: Workshop[] = await authenticatedFetch(ENDPOINT_WORKSHOP);
        dispatch(receiveWorkshops(workshops));
    } catch (e) {
        dispatch(workshopError(e.message));
    }
};

export const retrieveUserWorkshops = () => async (dispatch: Dispatch<any>) => {
    await dispatchUserWorkshops(dispatch);
};

export const bookWorkshop = (workshop: Workshop) => async (dispatch: Dispatch<any>) => {
    try {
        await authenticatedFetch(
            ENDPOINT_STUDENT_WORKSHOP,
            'POST',
            JSON.stringify(workshop),
            true
        );
        await dispatchUserWorkshops(dispatch);
    } catch (e) {
        dispatch(workshopError(e.message));
    }
};

export const cancelWorkshop = (workshop: Workshop) => async (dispatch: Dispatch<any>) => {
    try {
        // TODO - Fix this api endpoint, temporary for the client meeting
        await authenticatedFetch(`api/studentWorkshops/${workshop.id}`, 'DELETE');
        await dispatchUserWorkshops(dispatch);
    } catch (e) {
        dispatch(workshopError(e.message));
    }
};

export const addWorkshop = (workshop: Workshop) => async (dispatch: Dispatch<any>) => {
    try {
        await authenticatedFetch(
            ENDPOINT_WORKSHOP,
            'POST',
            JSON.stringify({
                ...workshop,
                id: undefined
            }),
            true
        );
        await dispatchUserWorkshops(dispatch);
    } catch (e) {
        dispatch(workshopError(e.message));
    }
};