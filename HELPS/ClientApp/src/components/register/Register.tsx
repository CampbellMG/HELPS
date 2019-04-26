import { AppState } from '../../types/store/StoreTypes';
import React from 'react';
import { connect } from 'react-redux';
import { Component, ReactNode } from 'react';
import { RegisterDispatchProps, RegisterStateProps, RegisterProps } from '../../types/components/RegisterTypes';
import { ThunkDispatch } from 'redux-thunk';
import { register } from '../../store/actions/AuthActions';
import { LoginFields } from '../../types/components/LoginTypes';
import RegisterForm from './RegisterForm';

export class Register extends Component<RegisterProps> {

    render(): React.ReactNode {
        return (
            <div className='d-flex h-100 justify-content-center'>
                <div className='align-self-center w-50 h-50'>
                    <div className='shadow bg-white d-flex h-100 justify-content-center flex-column login-container'>
                    <div className='align-self-center mt-5'><h1>Create account</h1></div>
                        <div className='align-self-center w-50'>
                            <RegisterForm onSubmit={this.onRegister} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private onRegister = (loginFields: LoginFields) => {
        console.error('derp');
        this.props.register(loginFields.username, loginFields.password);
    }
}

const mapStateToProps = (state: AppState): RegisterStateProps => ({
    registerSuccess: state.auth.registered
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): RegisterDispatchProps => ({
    register: (username, password) => dispatch(register(username, password))
});

export default connect<RegisterStateProps, RegisterDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(Register);
