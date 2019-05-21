import {WorkshopState} from '../../types/store/WorkshopReducerTypes';
import {WorkshopAction, WorkshopActionType} from '../../types/store/WorkshopActionTypes';

const initialState: WorkshopState = {
    isLoading: false,
    userWorkshops: [],
    workshops: []
};

export function WorkshopReducer(state: WorkshopState = initialState, action: WorkshopAction): WorkshopState {
    switch (action.type) {
        case WorkshopActionType.RECEIVE_WORKSHOPS:
            return {
                ...state,
                workshops: action.payload,
                isLoading: false,
                error: undefined
            };
        case WorkshopActionType.RECEIVE_USER_WORKSHOPS:
            return {
                ...state,
                userWorkshops: action.payload,
                isLoading: false,
                error: undefined
            };
        case WorkshopActionType.WORKSHOP_ERROR:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        default:
            return state;
    }
}