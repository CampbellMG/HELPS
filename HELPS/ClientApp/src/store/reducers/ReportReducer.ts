import {ReportAction, ReportActionType} from '../../types/store/ReportActionTypes';
import {ReportState} from '../../types/store/ReportReducerTypes';

const initialState: ReportState = {
    reports: [],
    data: []
};

export function ReportReducer(state: ReportState = initialState, action: ReportAction): ReportState {
    switch (action.type) {
        case ReportActionType.RECEIVE_REPORT:
            return {
                ...state,
                reports: action.payload,
                error: undefined
            };
        case ReportActionType.RECEIVE_DATA:
            return {
                ...state,
                data: action.payload,
                error: undefined
            };
        case ReportActionType.ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}
