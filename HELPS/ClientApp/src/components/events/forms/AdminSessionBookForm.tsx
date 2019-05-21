import * as React from 'react';
import {Field, reduxForm} from 'redux-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {AdminSessionBookFormProps, AdminSessionBookProps} from '../../../types/components/WorkshopRegistrationTypes';
import {Session} from '../../../types/model/Session';

class AdminSessionBookForm extends React.Component<AdminSessionBookFormProps> {
    TextInput = (props: any) => (
        <Form.Group controlId='login'>
            <Form.Control disabled
                          value={props.input.value}
                          onChange={props.input.onChange}
                          {...props}/>
        </Form.Group>
    );

    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className='p-3 pl-4'>
                <Form.Group>
                    <Form.Label>Workshop ID</Form.Label>
                    <Field name='id'
                           component={this.TextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Workshop Title</Form.Label>
                    <Field name='title'
                           component={this.TextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date / Time</Form.Label>
                    <Field name='time'
                           component={this.TextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Duration</Form.Label>
                    <Field name='duration'
                           component={this.TextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Room</Form.Label>
                    <Field name='room'
                           component={this.TextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Target Group</Form.Label>
                    <Field name='targetGroup'
                           component={this.TextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Field name='description'
                           component={this.TextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Available Places</Form.Label>
                    <Field
                        name='availablePlaces'
                        component={this.TextInput}
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

export default reduxForm<Session, AdminSessionBookProps>({
    form: 'admin_book',
    enableReinitialize: true
})(AdminSessionBookForm);