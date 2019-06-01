export enum AdvisorActionType {
    REQUEST_ADVISORS = 'ADVISOR_ACTION_REQUEST_ADVISORS',
    RECEIVE_ADVISORS = 'ADVISOR_ACTION_RECEIVE_ADVISORS',
    ADVISOR_ERROR = 'ADVISOR_ACTION_ADVISOR_ERROR'
}

export interface AdvisorAction {
    type: AdvisorActionType,
    payload?: any
}