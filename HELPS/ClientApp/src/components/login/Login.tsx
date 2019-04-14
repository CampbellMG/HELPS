import {connect} from 'react-redux';
import * as React from 'react';
import LoginForm from './LoginForm';
import {Component} from 'react';
import {AppState} from '../../types/store/StoreTypes';
import {Dispatch} from 'redux';
import {login, logout} from '../../store/actions/AuthActions';
import {
    HomeDispatchProps,
    HomeProps,
    HomeStateProps,
    LoginFields
} from '../../types/components/LoginTypes';
import uts from '../../res/uts.png';
import './Login.css';

class Login extends Component<HomeProps> {

    componentDidMount(): void {
        this.props.logout();
    }

    render(): React.ReactNode {
        return (
            <div className='d-flex h-100 justify-content-center'>
                <div className='align-self-center w-75 h-50'>
                    <div className='shadow bg-white rounded d-flex h-100 justify-content-center flex-column'>
                        <div className='logo-wrapper'>
                            <img src={uts} className='logo' alt='UTS Logo' width='30%'/>
                        </div>
                        <div className='align-self-center w-50 mt-5'>
                            <LoginForm onSubmit={this.onLogin}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private onLogin = (loginFields: LoginFields) => {
        this.props.login(loginFields.username, loginFields.password);
    };
}

const mapStateToProps = (state: AppState): HomeStateProps => ({
    authenticated: state.auth.authenticated,
    error: state.auth.error
});

const mapDispatchToProps = (dispatch: Dispatch<{}>): HomeDispatchProps => ({
    login: (username, password) => dispatch(login(username, password)),
    logout: () => dispatch(logout())
});

export default connect<HomeStateProps, HomeDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(Login);
