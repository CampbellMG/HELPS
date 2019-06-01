import * as React from 'react';
import {Component} from 'react';
import {
    RoomListDispatchProps,
    RoomListProps,
    RoomListStateProps
} from '../../../types/components/WorkshopRegistrationTypes';
import {Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import {AppState} from '../../../types/store/StoreTypes';
import {ThunkDispatch} from 'redux-thunk';
import {fetchRooms} from '../../../store/actions/RoomActions';

class RoomList extends Component<RoomListProps> {

    componentDidMount(): void {
        this.props.loadRooms();
    }

    render() {
        return (
            <Form.Control as='select' {...this.props}>
                <option value=''/>
                {this.props.rooms.map(room => (
                    <option value={room.id} key={room.id}>{room.title}</option>
                ))}
            </Form.Control>
        );
    }
}

const mapStateToProps = (state: AppState): RoomListStateProps => ({
    rooms: state.room.rooms
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): RoomListDispatchProps => ({
    loadRooms: () => dispatch(fetchRooms())
});

export default connect<RoomListStateProps, RoomListDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(RoomList);