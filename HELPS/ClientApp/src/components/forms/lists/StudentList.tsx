import * as React from 'react';
import {Component} from 'react';
import {
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

class StudentList extends Component<StudentListProps> {

    componentDidMount(): void {
        this.props.loadStudents();
    }

    render() {
        return (
            <Form.Control as='select' {...this.props}>
                <option value=''/>
                {this.props.students.map(student => (
                    <option value={student.id} key={student.id}>{student.name}</option>
                ))}
            </Form.Control>
        );
    }
}

const mapStateToProps = (state: AppState): StudentListStateProps => ({
    students: state.user.user
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): StudentListDispatchProps => ({
    loadStudents: () => dispatch(retrieveUser())
});

export default connect<StudentListStateProps, StudentListDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(StudentList);