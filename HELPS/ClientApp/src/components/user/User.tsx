import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import * as React from 'react';
import {Component} from 'react';
import {UserDispatchProps, UserProps, UserStateProps} from '../../types/components/UserTypes';
import {AppState} from '../../types/store/StoreTypes';
import {retrieveUser, updateUser} from '../../store/actions/UserActions';
import UserDetailsForm from './UserDetailsForm';

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
                    <UserDetailsForm onSubmit={this.props.updateUser}
                                     initialValues={this.props.student}/>
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
    loadUserDetails: () => dispatch(retrieveUser()),
    updateUser: student => dispatch(updateUser(student))
});

export default connect<UserStateProps, UserDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(User);
