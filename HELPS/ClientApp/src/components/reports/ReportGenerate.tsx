import * as React from 'react';
import {Component, ReactElement} from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ReportForm from './ReportForm';
import {AppState} from '../../types/store/StoreTypes';
import {ReportDispatchProps, ReportProps, ReportStateProps} from '../../types/components/ReportTypes';
import {ThunkDispatch} from 'redux-thunk';
import {generateReport} from '../../store/actions/ReportActions';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import {Field, formValueSelector} from 'redux-form';
import moment from 'moment';
import {Report} from '../../types/model/Report';
import Form from 'react-bootstrap/Form';
import {TextInput} from '../forms/Components';

class ReportGenerate extends Component<ReportProps, {}> {

    private get selectedReport(): Report | undefined {
        const {selectedReportId, reports} = this.props;

        if (reports && selectedReportId !== undefined && selectedReportId !== null) {
            const reportIndex = reports.findIndex(report => report.id.toString() === selectedReportId.toString());
            if (reportIndex !== -1) {
                return reports[reportIndex];
            }
        }

        return undefined;
    }

    private get extraFields(): ReactElement[] | undefined {
        const report = this.selectedReport;

        if (!report || !report.extraFields) {
            return undefined;
        }

        return report.extraFields.map(extraField => {
            if (extraField.options.length === 0) {
                return (
                    <Form.Group>
                        <Form.Label>{extraField.title}</Form.Label>
                        <Field name={extraField.identifier}
                               component={TextInput}/>
                    </Form.Group>
                );
            }

            return <div/>;
        });
    }

    render(): React.ReactNode {
        return (
            <div className='h-100 d-flex flex-fill'>
                <div className='col-lg-2 border-right overflow-auto list shadow'>
                    <ReportForm onSubmit={this.props.generateReport}
                                onDownload={this.onDownload}
                                downloadAvailable={this.props.data.length > 0}
                                extraFields={this.extraFields}/>
                </div>
                <div className='d-flex flex-column flex-fill overflow-auto content'>
                    {this.renderDataTable()}
                </div>
            </div>
        );
    }

    private renderDataTable(): React.ReactElement {
        const {data} = this.props;
        if (!data || !data.length) {
            return <div/>;
        }

        const keys = Object.keys(data[0]);

        return (
            <Table className='b-2'>
                <thead>
                <tr>
                    {keys.map(key => <th>{key}</th>)}
                </tr>
                </thead>
                <tbody>
                {data.map((datum: any) => (
                    <tr>
                        {keys.map(key => <td>{datum[key]}</td>)}
                    </tr>
                ))}
                </tbody>
            </Table>
        );
    }

    private onDownload = () => {
        let fileName = 'report';
        const {data} = this.props;
        const link = document.createElement('a');
        const selectedReport = this.selectedReport;

        if (!data) {
            return;
        }

        if (selectedReport) {
            fileName = selectedReport.title.toLowerCase().replace(' ', '_');
        }

        fileName += moment().format('_DD_MM_YY_HH_mm') + '.csv';

        const keys = Object.keys(data[0]);
        const formattedData: string[][] = data.map(datum => keys.map(key => datum[key]));
        formattedData.unshift(keys);

        const csvData = 'data:text/csv;charset=utf-8,' + formattedData.map(datum => datum.join(',')).join('\n');

        link.setAttribute('href', encodeURI(csvData));
        link.setAttribute('download', fileName);
        document.body.appendChild(link);

        link.click();
    };
}

const selector = formValueSelector('report_generate');
const mapStateToProps = (state: AppState): ReportStateProps => ({
    data: state.report.data,
    selectedReportId: selector(state, 'report'),
    reports: state.report.reports
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): ReportDispatchProps => ({
    generateReport: data => dispatch(generateReport(data))
});

export default connect<ReportStateProps, ReportDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(ReportGenerate);
