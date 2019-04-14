import * as React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {LoginFields} from '../../types/components/LoginTypes';

class LoginForm extends React.Component<InjectedFormProps<LoginFields>> {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div>
                    <label>First Name</label>
                    <div>
                        <Field
                            name='username'
                            component='input'
                            type='text'
                            placeholder='Username'/>
                    </div>
                </div>
                <div>
                    <label>Last Name</label>
                    <div>
                        <Field
                            name='password'
                            component='input'
                            type='password'
                            placeholder='Password'/>
                    </div>
                </div>
                <div>
                    <button type='submit'>Login</button>
                </div>
            </form>
        );
    }
}

export default reduxForm<LoginFields>({
    form: 'login'
})(LoginForm);
