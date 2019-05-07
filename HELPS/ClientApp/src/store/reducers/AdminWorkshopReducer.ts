import {UserState} from '../../types/store/reducers/UserReducerTypes';
import {AdminWorkshopState} from '../../types/store/reducers/AdminWorkshopReducerTypes';
import {AdminWorkshopAction, AdminWorkshopActionType} from '../../types/store/actions/AdminWorkshopActionTypes';

const initialState: AdminWorkshopState = {
    workshops: [],
    skills: [],
    isCurrent: true
};

export function AdminWorkshopReducer(state: AdminWorkshopState = initialState, action: AdminWorkshopAction): AdminWorkshopState {
    switch (action.type) {
        case AdminWorkshopActionType.ADD_SKILL:
            return {
                ...state,
                skills: action.payload
            };
        case AdminWorkshopActionType.SHOW_ARCHIVED:
            return {
                ...state,
                isCurrent: false
            };
        case AdminWorkshopActionType.SHOW_CURRENT:
            return {
                ...state,
                isCurrent: true
            };
        default:
            return state;
    }
}

