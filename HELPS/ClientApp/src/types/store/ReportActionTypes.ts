export enum ReportActionType {
    RECEIVE_REPORT = 'REPORT_ACTION_RECEIVE_REPORT',
    RECEIVE_DATA = 'REPORT_ACTION_RECEIVE_DATA',
    ERROR = 'REPORT_ACTION_ERROR'
}

export interface ReportAction {
    type: ReportActionType,
    payload?: any
}