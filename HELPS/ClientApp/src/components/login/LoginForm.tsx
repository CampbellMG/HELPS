import * as React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {LoginFields} from '../../types/components/LoginTypes';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class LoginForm extends React.Component<InjectedFormProps<LoginFields>> {
    TextInput = (props: any) => (
        <Form.Group controlId='login'>
            <Form.Control name='email'
                          placeholder='Login'
                          value={props.input.value}
                          onChange={props.input.onChange}
                          {...props}/>
        </Form.Group>
    );

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Field
                        name='username'
                        component={this.TextInput}
                        type='text'
                        placeholder='Username'/>
                </Form.Group>
                <Form.Group className='mt-3'>
                    <Form.Label>Password</Form.Label>
                    <Field
                        name='password'
                        component={this.TextInput}
                        type='password'
                        placeholder='Password'/>
                </Form.Group>
                <Button type='submit' className='w-100 mt-4'>
                    Login
                </Button>
            </Form>
        );
    }
}

export default reduxForm<LoginFields>({
    form: 'login'
})(LoginForm);
