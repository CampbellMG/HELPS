import {UserState} from '../../types/store/UserReducerTypes';
import {UserAction, UserActionType} from '../../types/store/UserActionTypes';

const initialState: UserState = {
    user: [],
    isLoading: false
};

export function UserReducer(state: UserState = initialState, action: UserAction) {
    switch (action.type) {
        case UserActionType.REQUEST_USER:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        case UserActionType.RECEIVE_USER:
            return {
                ...state,
                isLoading: false,
                user: action.payload
            };
        case UserActionType.USER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
}