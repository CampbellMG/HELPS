import {Dispatch} from 'react';
import {fetchToken} from './AuthActions';
import {fetchRequest} from '../../util';
import {ReportAction, ReportActionType} from '../../types/store/ReportActionTypes';
import {Report} from '../../types/model/Report';
import {ReportGenerateData} from '../../types/components/ReportTypes';

const NO_TOKEN_MESSAGE: string = 'No token, have you authenticated?',
    API_REPORT_PATH = `api/reports`;

const reportError = (message: string): ReportAction => ({
    type: ReportActionType.ERROR,
    payload: message
});

const receiveReports = (reports: Report[]): ReportAction => ({
    type: ReportActionType.RECEIVE_REPORT,
    payload: reports
});

const receiveData = (data: any): ReportAction => ({
    type: ReportActionType.RECEIVE_DATA,
    payload: data
});

export const retrieveReports = () => async (dispatch: Dispatch<ReportAction>) => {
    const token = fetchToken();
    if (token === null) {
        dispatch(reportError(NO_TOKEN_MESSAGE));
    } else {
        try {
            const reports: Report[] = await fetchRequest(
                API_REPORT_PATH,
                'GET',
                token
            );
            
            dispatch(receiveReports(reports));
        } catch (e) {
            dispatch(reportError(`Error fetching report list`));
        }
    }
};

export const generateReport = (data: ReportGenerateData) => async (dispatch: Dispatch<any>) => {
    const token = fetchToken();
    if (token === null) {
        dispatch(reportError(NO_TOKEN_MESSAGE));
    } else {

        try {
            const result: any = await fetchRequest(
                API_REPORT_PATH,
                'POST',
                token,
                {
                    ...data,
                    from: data.from.format('DD/MM/YYYY'),
                    to: data.to.format('DD/MM/YYYY')
                },
                true
            );

            dispatch(receiveData(result));
        } catch (e) {
            dispatch(reportError(`Error generating report - ${e}`));
        }
    }
};
