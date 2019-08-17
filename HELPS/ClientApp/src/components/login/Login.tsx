import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import * as React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import LoginForm from './LoginForm';
import {AppState} from '../../types/store/StoreTypes';
import {login, logout} from '../../store/actions/AuthActions';
import {
    HomeDispatchProps,
    HomeProps,
    HomeStateProps,
    LoginFields
} from '../../types/components/LoginTypes';
import uts from '../../res/uts.png';
import './Login.css';
import {fetchMessages} from '../../store/actions/MessageActions';

class Login extends Component<HomeProps> {

    componentDidMount(): void {
        this.props.logout();
        this.props.fetchMessages();
    }

    render(): React.ReactNode {
        const {messages} = this.props;
        return (
            <div className='d-flex h-100 justify-content-center flex-fill'>
                <div className='align-self-center w-50 h-50'>
                    <div
                        className='shadow bg-white d-flex h-100 justify-content-center flex-column login-container'>
                        <div className='logo-wrapper'>
                            <img src={uts} className='logo' alt='UTS Logo' width='30%'/>
                        </div>
                        <div className='align-self-center w-50 m-5 pt-5'>
                            <LoginForm onSubmit={this.onLogin}/>
                            <Link to='register/'><Button
                                className='w-100 mt-4'>Register</Button></Link>
                        </div>
                    </div>
                    {
                        messages.loginNotification &&
                        <div className='bg-primary login-container mt-2 text-light justify-content-center d-flex pt-3'
                             dangerouslySetInnerHTML={{__html: messages.loginNotification}}/>
                    }
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
    error: state.auth.error,
    messages: state.message.indexedMessages
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): HomeDispatchProps => ({
    login: (username, password) => dispatch(login(username, password)),
    logout: () => dispatch(logout()),
    fetchMessages: () => dispatch(fetchMessages())
});

export default connect<HomeStateProps, HomeDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(Login);
