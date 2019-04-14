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

class Login extends Component<HomeProps> {

    componentDidMount(): void {
        this.props.logout();
    }

    render(): React.ReactNode {
        const {error} = this.props;
        return (
            <div>
                <LoginForm onSubmit={this.onLogin}/>
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
