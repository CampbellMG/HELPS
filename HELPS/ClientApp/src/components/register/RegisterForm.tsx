import { Form, Button } from 'react-bootstrap';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { LoginFields } from '../../types/components/LoginTypes';
import React from 'react';

export class RegisterForm extends React.Component<InjectedFormProps<LoginFields>> {

    render(): JSX.Element {
        return (<div>
            <Form onSubmit={this.props.handleSubmit.bind(this)}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Field name='username' type='text' component='input'></Field>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Field name='password' type='password' component='input'></Field>
                </Form.Group>

            </Form>
            <Button type='submit' className='w-100 mt-4'>
                Register
                </Button>
        </div>);
    }
}

export default reduxForm<LoginFields>({
    form: 'register'
})(RegisterForm);
