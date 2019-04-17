import {Dispatch} from 'redux';
import {LS_STORAGE_KEY} from './AuthActions';
import {WorkshopAction, WorkshopActionType} from '../../types/store/actions/WorkshopActionTypes';
import {Workshop} from '../../types/model/Workshop';

const requestWorkshops = (): WorkshopAction => ({
    type: WorkshopActionType.REQUEST_WORKSHOPS
});

const receiveWorkshops = (workshops: Workshop[]): WorkshopAction => ({
    type: WorkshopActionType.RECEIVE_WORKSHOPS,
    payload: workshops
});

const requestUserWorkshops = (): WorkshopAction => ({
    type: WorkshopActionType.REQUEST_USER_WORKSHOPS
});

const receiveUserWorkshops = (workShops: Workshop[]): WorkshopAction => ({
    type: WorkshopActionType.RECEIVE_USER_WORKSHOPS,
    payload: workShops
});

const bookUserWorkshop = (): WorkshopAction => ({
    type: WorkshopActionType.BOOK_WORKSHOP
});

const receiveBookWorkshop = (workShops: Workshop[]): WorkshopAction => ({
    type: WorkshopActionType.RECEIVE_BOOK_WORKSHOP,
    payload: workShops
});

const cancelUserWorkshop = (): WorkshopAction => ({
    type: WorkshopActionType.CANCEL_WORKSHOP
});

const receiveCancelkWorkshop = (workShops: Workshop[]): WorkshopAction => ({
    type: WorkshopActionType.RECEIVE_CANEL_WORKSHOP,
    payload: workShops
});

const workshopError = (message: string): WorkshopAction => ({
    type: WorkshopActionType.WORKSHOP_ERROR,
    payload: message
});

async function getUserWorkshops(token: string): Promise<Workshop[]> {
    const workshopResponse = await fetch(`api/students/workshops`, {
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    });

    const workshopResult = await workshopResponse.json();

    if (!workshopResponse.ok) {
        throw Error(workshopResult.message ? workshopResult.message : 'Retrieve user workshops failed');
    }

    return workshopResult as Workshop[];
}

export const retrieveWorkshops = () => async (dispatch: Dispatch<any>) => {
    dispatch(requestWorkshops());

    const token = localStorage.getItem(LS_STORAGE_KEY);

    if (token === null) {
        dispatch(workshopError('No token, have you authenticated?'));
        return;
    }

    const workshopResponse = await fetch('api/workshops', {
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    });

    const workshopResult = await workshopResponse.json();

    if (!workshopResponse.ok) {
        dispatch(workshopError(workshopResult.message ? workshopResult.message : 'Retrieve workshops failed'));
        return;
    }

    const workshops = workshopResult as Workshop[];

    dispatch(receiveWorkshops(workshops));
};

export const retrieveUserWorkshops = () => async (dispatch: Dispatch<any>) => {
    dispatch(requestUserWorkshops());

    const token = localStorage.getItem(LS_STORAGE_KEY);

    if (token === null) {
        dispatch(workshopError('No token, have you authenticated?'));
        return;
    }

    try {
        const workshops = await getUserWorkshops(token);
        dispatch(receiveUserWorkshops(workshops));
    } catch (e) {
        dispatch(workshopError(e.message));
    }
};

export const bookWorkshop = (workshop: Workshop) => async (dispatch: Dispatch<any>) => {
    dispatch(bookUserWorkshop());

    const token = localStorage.getItem(LS_STORAGE_KEY);

    if (token === null) {
        dispatch(workshopError('No token, have you authenticated?'));
        return;
    }

    const bookResponse = await fetch(`api/students/workshops`, {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        }),
        body: JSON.stringify(workshop)
    });

    const bookResult = await bookResponse.json();

    if (!bookResponse.ok) {
        dispatch(workshopError(bookResult.message ? bookResult.message : 'Book workshop failed'));
        return;
    }

    try {
        const workshops = await getUserWorkshops(token);
        dispatch(receiveBookWorkshop(workshops));
    } catch (e) {
        dispatch(workshopError(e.message));
    }
};

export const cancelWorkshop = (workshop: Workshop) => async (dispatch: Dispatch<any>) => {
    dispatch(cancelUserWorkshop());

    const token = localStorage.getItem(LS_STORAGE_KEY);

    if (token === null) {
        dispatch(workshopError('No token, have you authenticated?'));
        return;
    }

    // TODO - Fix this api endpoint, temporary for the client meeting
    const deleteResponse = await fetch(`api/studentWorkshops/${workshop.id}`, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        })
    });

    const deleteResult = await deleteResponse.json();

    if (!deleteResponse.ok) {
        dispatch(workshopError(deleteResult.message ? deleteResult.message : 'Book workshop failed'));
        return;
    }

    try {
        const workshops = await getUserWorkshops(token);
        dispatch(receiveCancelkWorkshop(workshops));
    } catch (e) {
        dispatch(workshopError(e.message));
    }
};