import * as React from 'react';
import {Field, reduxForm} from 'redux-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Workshop} from '../../../types/model/Workshop';
import {
    StudentWorkshopDetailFormProps,
    StudentWorkshopDetailProps, WorkshopFormData
} from '../../../types/components/WorkshopRegistrationTypes';
import {TextInput} from '../../forms/Components';

class StudentWorkshopDetailForm extends React.Component<StudentWorkshopDetailFormProps> {

    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className='p-3 pl-4'>
                <Form.Group>
                    <Form.Label>Workshop ID</Form.Label>
                    <Field name='id'
                           component={TextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Workshop Title</Form.Label>
                    <Field name='title'
                           component={TextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Start</Form.Label>
                    <Field name='startDate'
                           component={TextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>End</Form.Label>
                    <Field name='endDate'
                           component={TextInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Duration</Form.Label>
                    <Field name='duration'
                           component={TextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Room</Form.Label>
                    <Field name='room'
                           component={TextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Target Group</Form.Label>
                    <Field name='targetGroup'
                           component={TextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Field name='description'
                           component={TextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Available Places</Form.Label>
                    <Field
                        name='availablePlaces'
                        component={TextInput}
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

export default reduxForm<WorkshopFormData, StudentWorkshopDetailProps>({
    form: 'student_workshop_detail',
    enableReinitialize: true
})(StudentWorkshopDetailForm);