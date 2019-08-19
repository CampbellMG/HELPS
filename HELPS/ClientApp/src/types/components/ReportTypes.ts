import {Report} from '../model/Report';
import {FormControlProps} from 'react-bootstrap';
import {Moment} from 'moment';

export interface ReportListStateProps {
    reports: Report[]
}

export interface ReportListDispatchProps {
    loadReports: () => void
}

export interface ReportListProps extends ReportListDispatchProps, ReportListStateProps, FormControlProps {

}

export interface ReportStateProps {
    data: any
}

export interface ReportDispatchProps {
    generateReport: (data: ReportGenerateData) => void
}

export interface ReportProps extends ReportStateProps, ReportDispatchProps {

}

export interface ReportGenerateData {
    from: Moment,
    to: Moment,
    id: number
}