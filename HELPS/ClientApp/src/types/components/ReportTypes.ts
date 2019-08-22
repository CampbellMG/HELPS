import {Report} from '../model/Report';
import {FormControlProps} from 'react-bootstrap';
import {Moment} from 'moment';
import {ReactElement} from 'react';

export interface ReportListStateProps {
    reports: Report[]
}

export interface ReportListDispatchProps {
    loadReports: () => void
}

export interface ReportListProps extends ReportListDispatchProps, ReportListStateProps, FormControlProps {

}

export interface ReportStateProps {
    data: any[]
    selectedReportId: string
    reports: Report[]
}

export interface ReportDispatchProps {
    generateReport: (data: ReportGenerateData) => void
}

export interface ReportProps extends ReportStateProps, ReportDispatchProps {

}

export interface ReportGenerateData {
    from: Moment,
    to: Moment,
    report: number
}

export interface ReportFormExtraProps {
    onDownload: () => void
    downloadAvailable: boolean
    extraFields?: ReactElement[]
}