import * as React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReportList from './ReportList';
import moment from 'moment';
import {ReportGenerateData} from '../../types/components/ReportTypes';
import Datetime from 'react-datetime';

class ReportForm extends React.Component<InjectedFormProps<ReportGenerateData>> {

    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className='p-3 pl-4'>
                <Form.Group>
                    <Form.Label>Report</Form.Label>
                    <Field name='id'
                           component={this.ReportListInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>From</Form.Label>
                    <Field name='from'
                           component={this.DatePickerInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>To</Form.Label>
                    <Field name='to'
                           component={this.DatePickerInput}/>
                </Form.Group>
                <Button type='submit'
                        className='w-100 mt-4'>
                    Generate
                </Button>
            </form>
        );
    }

    private DatePickerInput = (props: any) => <Datetime {...props} value={moment(props.input.value)}
                                                        onChange={props.input.onChange}/>;

    private ReportListInput = (props: any) => <ReportList {...props} value={props.input.value}
                                                          onChange={props.input.onChange}/>;
}

export default reduxForm<ReportGenerateData, any>({
    form: 'report_generate',
    enableReinitialize: true
})(ReportForm);