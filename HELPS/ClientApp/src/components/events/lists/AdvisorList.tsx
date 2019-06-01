import * as React from 'react';
import {Component} from 'react';
import {
    AdvisorListDispatchProps, AdvisorListProps, AdvisorListStateProps,
    RoomListDispatchProps,
    RoomListProps,
    RoomListStateProps, StudentListDispatchProps, StudentListProps, StudentListStateProps
} from '../../../types/components/WorkshopRegistrationTypes';
import {Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import {AppState} from '../../../types/store/StoreTypes';
import {ThunkDispatch} from 'redux-thunk';
import {fetchRooms} from '../../../store/actions/RoomActions';
import {retrieveUser} from '../../../store/actions/UserActions';
import {retrieveAdvisorList} from '../../../store/actions/AdvisorActions';

class AdvisorList extends Component<AdvisorListProps> {

    componentDidMount(): void {
        this.props.loadAdvisors();
    }

    render() {
        return (
            <Form.Control as='select' {...this.props}>
                <option value=''/>
                {this.props.advisors.map(advisor => (
                    <option value={advisor.id} key={advisor.id}>{`${advisor.firstName} ${advisor.lastName}`}</option>
                ))}
            </Form.Control>
        );
    }
}

const mapStateToProps = (state: AppState): AdvisorListStateProps => ({
    advisors: state.advisors.advisors
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): AdvisorListDispatchProps => ({
    loadAdvisors: () => dispatch(retrieveAdvisorList())
});

export default connect<AdvisorListStateProps, AdvisorListDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(AdvisorList);