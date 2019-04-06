import {UserState} from '../../types/store/reducers/UserReducerTypes';
import {UserAction, UserActionType} from '../../types/store/actions/UserActionTypes';
import {WorkshopState} from '../../types/store/reducers/WorkshopReducerTypes';
import {WorkshopAction, WorkshopActionType} from '../../types/store/actions/WorkshopActionTypes';

const initialState: WorkshopState = {
    isLoading: false,
    userWorkshops: [],
    workshops: []
};

export function WorkshopReducer(state: WorkshopState = initialState, action: WorkshopAction): WorkshopState {
    switch (action.type) {
        case WorkshopActionType.REQUEST_WORKSHOPS:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        case WorkshopActionType.RECEIVE_WORKSHOPS:
            return {
                ...state,
                workshops: action.payload,
                isLoading: false,
                error: undefined
            };
        case WorkshopActionType.REQUEST_USER_WORKSHOPS:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        case WorkshopActionType.RECEIVE_USER_WORKSHOPS:
            return {
                ...state,
                userWorkshops: action.payload,
                isLoading: false,
                error: undefined
            };
        case WorkshopActionType.BOOK_WORKSHOP:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        case WorkshopActionType.RECEIVE_BOOK_WORKSHOP:
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