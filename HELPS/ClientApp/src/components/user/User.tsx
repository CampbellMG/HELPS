import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import * as React from 'react';
import {Component} from 'react';
import {UserDispatchProps, UserProps, UserStateProps} from '../../types/components/UserTypes';
import {AppState} from '../../types/store/StoreTypes';
import {retrieveUser} from '../../store/actions/UserActions';

class User extends Component<UserProps> {

    componentDidMount() {
        if (this.props.authenticated) {
            this.props.loadUserDetails();
        }
    }

    render() {
        return (
            <div>
                <h1>Student</h1>
                {this.props.error && <p>{this.props.error}</p>}
                {this.getUserDetails()}
            </div>
        );
    }

    private getUserDetails() {
        if (this.props.authenticated && this.props.student) {
            return (
                <div>
                    <p>id: {this.props.student.id}</p>
                    <p>name: {this.props.student.name}</p>
                </div>
            );
        }

        return (
            <p>Cannot retrieve user, not authenticated...</p>
        );
    }
}

const mapStateToProps = (state: AppState): UserStateProps => ({
    authenticated: state.auth.authenticated,
    student: state.user.user,
    error: state.user.error
});

const mapDispatchToProps = (dispatch: Dispatch<{}>): UserDispatchProps => ({
    loadUserDetails: () => dispatch(retrieveUser())
});

export default connect<UserStateProps, UserDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(User);
