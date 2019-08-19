import * as React from 'react';
import {Component} from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ReportForm from './ReportForm';
import {AppState} from '../../types/store/StoreTypes';
import {
    ReportDispatchProps,
    ReportProps,
    ReportStateProps
} from '../../types/components/ReportTypes';
import {ThunkDispatch} from 'redux-thunk';
import {generateReport} from '../../store/actions/ReportActions';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';

class ReportGenerate extends Component<ReportProps, any> {

    render(): React.ReactNode {
        return (
            <div className='h-100 d-flex flex-fill'>
                <div className='col-lg-2 border-right overflow-auto list shadow'>
                    <ReportForm onSubmit={this.props.generateReport}/>
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
            <Table>
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
}

const mapStateToProps = (state: AppState): ReportStateProps => ({
    data: state.report.data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): ReportDispatchProps => ({
    generateReport: data => dispatch(generateReport(data))
});

export default connect<ReportStateProps, ReportDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(ReportGenerate);
