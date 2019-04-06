import {connect} from 'react-redux';
import * as React from 'react';
import {Component} from 'react';
import {HomeDispatchProps, HomeStateProps} from '../../types/components/HomeTypes';
import {AppState} from '../../types/store/StoreTypes';
import {Dispatch} from 'redux';
import {login} from '../../store/actions/AuthActions';
import {
    WorkshopRegistrationDispatchProps, WorkshopRegistrationProps,
    WorkshopRegistrationStateProps
} from '../../types/components/WorkshopRegistrationTypes';
import {
    bookWorkshop,
    retrieveUserWorkshops,
    retrieveWorkshops
} from '../../store/actions/WorkshopActions';

class WorkshopRegistration extends Component<WorkshopRegistrationProps> {
    render(): React.ReactNode {
        return (
            <div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): WorkshopRegistrationStateProps => ({
    authenticated: state.auth.authenticated,
    workshops: state.workshops.workshops,
    userWorkshops: state.workshops.userWorkshops,
    error: state.workshops.error
});

const mapDispatchToProps = (dispatch: Dispatch<{}>): WorkshopRegistrationDispatchProps => ({
    retrieveWorkshops: () => dispatch(retrieveWorkshops()),
    retrieveUserWorkshops: (student) => dispatch(retrieveUserWorkshops(student)),
    bookWorkshop: (student, workshop) => dispatch(bookWorkshop(student, workshop))
});

export default connect<WorkshopRegistrationStateProps, WorkshopRegistrationDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(WorkshopRegistration);
