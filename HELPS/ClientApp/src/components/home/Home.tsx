import {connect} from 'react-redux';
import * as React from 'react';
import LoginForm from './LoginForm';
import {Component} from 'react';
import {HomeDispatchProps, HomeProps, HomeStateProps} from '../../types/components/HomeTypes';
import {AppState} from '../../types/store/StoreTypes';
import {Dispatch} from 'redux';
import {login} from '../../store/actions/AuthActions';
import {LoginFields} from '../../types/components/LoginTypes';

class Home extends Component<HomeProps> {
    render(): React.ReactNode {
        const {authenticated, error} = this.props;
        return (
            <div>
                <h1>Hello, world!</h1>
                <p>Welcome to the HELPS app, built with:</p>
                <ul>
                    <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a
                        href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for
                        cross-platform server-side code
                    </li>
                    <li><a href='https://www.postgresql.org/'>PostgreSQL</a> for data management
                    </li>
                    <li><a href='https://facebook.github.io/react/'>React</a> and <a
                        href='https://redux.js.org/'>Redux</a> for client-side code
                    </li>
                    <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
                </ul>
                <LoginForm onSubmit={this.onLogin}/>
                {authenticated && <p>Authenticated!</p>}
                {!authenticated && <p>Not authenticated</p>}
                <p>Error: {error}</p>
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
    login: (username, password) => dispatch(login(username, password))
});

export default connect<HomeStateProps, HomeDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(Home);
