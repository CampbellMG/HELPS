import {EmailState} from '../../types/store/EmailReducerTypes';
import {EmailAction, EmailActionsType} from '../../types/store/EmailActionTypes';

const initialState: EmailState = {
    emails: [],
    isLoading: false
};

export function EmailReducer(state: EmailState = initialState, action: EmailAction): EmailState {
    switch (action.type) {
        case EmailActionsType.REQUEST_EMAIL:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        case EmailActionsType.RECEIVE_EMAIL:
            return {
                ...state,
                emails: action.payload,
                isLoading: false,
                error: undefined
            };
        case EmailActionsType.SUBMIT_EMAIL:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        case EmailActionsType.EMAIL_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
}