import {AdvisorState} from '../../types/store/AdvisorReducerTypes';
import {AdvisorAction, AdvisorActionType} from '../../types/store/AdvisorActionTypes';

const initialState: AdvisorState = {
    isLoading: false,
    advisors: []
};

export function AdvisorReducer(state: AdvisorState = initialState, action: AdvisorAction) {
    switch (action.type) {
        case AdvisorActionType.REQUEST_ADVISORS:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        case AdvisorActionType.RECEIVE_ADVISORS:
            return {
                ...state,
                isLoading: false,
                advisors: action.payload,
                error: undefined
            };
        case AdvisorActionType.REQUEST_ADVISOR_DETAILS:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        case AdvisorActionType.RECEIVE_ADVISOR_DETAILS:
            return {
                ...state,
                isLoading: false,
                advisors: action.payload,
                error: undefined
            };
        case AdvisorActionType.ADVISOR_ERROR:
            return {
                ...state,
                isLoading: false,
                error: undefined
            };
        default:
            return state;
    }
}