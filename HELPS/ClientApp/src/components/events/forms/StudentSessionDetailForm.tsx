import * as React from 'react';
import {Field, reduxForm} from 'redux-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
    SessionFormData,
    StudentSessionDetailFormProps,
    StudentSessionDetailProps
} from '../../../types/components/WorkshopRegistrationTypes';
import {DisabledTextInput} from '../../forms/Components';

class StudentSessionDetailForm extends React.Component<StudentSessionDetailFormProps> {

    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className='p-3 pl-4'>
                <Form.Group>
                    <Form.Label>Workshop Title</Form.Label>
                    <Field name='title'
                           component={DisabledTextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Start</Form.Label>
                    <Field name='startTime'
                           component={DisabledTextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>End</Form.Label>
                    <Field name='endTime'
                           component={DisabledTextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Room</Form.Label>
                    <Field name='room'
                           component={DisabledTextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Target Group</Form.Label>
                    <Field name='targetGroup'
                           component={DisabledTextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Field name='description'
                           component={DisabledTextInput}
                           type='text'/>
                </Form.Group>
                <Button type='submit'
                        className='w-100 mt-4'>
                    {this.props.booked ? 'Cancel' : 'Book'}
                </Button>
            </form>
        );
    }
}

export default reduxForm<SessionFormData, StudentSessionDetailProps>({
    form: 'student_session_detail',
    enableReinitialize: true
})(StudentSessionDetailForm);