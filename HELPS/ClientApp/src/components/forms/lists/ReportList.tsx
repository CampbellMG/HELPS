import * as React from 'react';
import {Component} from 'react';
import {
    ReportListDispatchProps,
    ReportListProps,
    ReportListStateProps
} from '../../../types/components/ReportTypes';
import {AppState} from '../../../types/store/StoreTypes';
import {ThunkDispatch} from 'redux-thunk';
import {connect} from 'react-redux';
import {retrieveReports} from '../../../store/actions/ReportActions';
import {Form} from 'react-bootstrap';

class ReportList extends Component<ReportListProps> {

    componentDidMount(): void {
        this.props.loadReports();
    }

    render() {
        return (
            <Form.Control as='select' {...this.props}>
                <option value=''/>
                {this.props.reports.map(report => (
                    <option value={report.id} key={report.id}>{report.title}</option>
                ))}
            </Form.Control>
        );
    }
}

const mapStateToProps = (state: AppState): ReportListStateProps => ({
    reports: state.report.reports
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): ReportListDispatchProps => ({
    loadReports: () => dispatch(retrieveReports())
});

export default connect<ReportListStateProps, ReportListDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(ReportList);