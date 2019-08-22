import * as React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import {ReportFormExtraProps, ReportGenerateData} from '../../types/components/ReportTypes';
import {DatePickerInput, ReportListInput} from '../forms/Components';

class ReportForm extends React.Component<ReportFormExtraProps & InjectedFormProps<ReportGenerateData, ReportFormExtraProps>> {

    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className='p-3 pl-4'>
                <Form.Group>
                    <Form.Label>Report</Form.Label>
                    <Field name='report'
                           component={ReportListInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>From</Form.Label>
                    <Field name='from'
                           component={DatePickerInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>To</Form.Label>
                    <Field name='to'
                           component={DatePickerInput}/>
                </Form.Group>
                {this.props.extraFields && this.props.extraFields}
                <Button type='submit'
                        className='w-100 mt-4'>
                    Generate
                </Button>
                <Button className='w-100 mt-4'
                        onClick={this.props.onDownload}
                        disabled={!this.props.downloadAvailable}>
                    Download
                </Button>
            </form>
        );
    }
}

export default reduxForm<ReportGenerateData, ReportFormExtraProps>({
    form: 'report_generate',
    enableReinitialize: true,
    initialValues: {
        report: 0,
        from: moment().subtract(14, 'days'),
        to: moment()
    }
})(ReportForm);