import * as React from 'react';
import {Button, Form, FormControlProps} from 'react-bootstrap';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {RoomDispatchProps, RoomProps, RoomStateProps} from '../../types/components/RoomTypes';
import {AppState} from '../../types/store/StoreTypes';
import {addRoom, deleteRoom, fetchRooms, updateRoomName} from '../../store/actions/RoomActions';
import {BsPrefixProps, ReplaceProps} from 'react-bootstrap/helpers';
import './RoomEdit.css';
import {Room} from '../../types/model/Room';
import {RoomState} from '../../types/store/RoomReducerTypes';
import {deleteEntity, editOrSave, getEditOrSaveText} from '../../types/util/Editable';
import {NOOP} from '../../util';
import EditorList from "../editorlist/EditorList";

class RoomEdit extends React.Component<RoomProps, RoomState> {

    constructor(props: Readonly<RoomProps>) {
        super(props);
        this.state = {rooms: props.rooms, selectedRoom: props.rooms[0], editing: false};
        fetchRooms();
    }

    render(): React.ReactNode {
        const {rooms, selectedRoom} = {...this.props, ...this.state};
        return (
            <EditorList items={rooms}
                        activeItem={selectedRoom}
                        onSelect={room => this.selectRoom(room)}
                        keyExtractor={room => room.id.toString()}
                        titleExtractor={room => room.title}>

                <div className='col m-3'>

                    <Form.Control type='text'
                                  className='flex-fill'
                                  value={this.state.selectedRoom.title}
                                  disabled={!this.state.editing}
                                  onChange={(e: any) => this.updateSearch(e)}/>

                    <div className='w-40'>
                        <Button onClick={() => this.editOrSave()} className='w-100 mt-4'>
                            {getEditOrSaveText(this.state)}
                        </Button>
                        <Button onClick={() => this.deleteRoom()} className='w-100 mt-4'>
                            Delete
                        </Button>
                    </div>

                </div>

            </EditorList>
        );
    }


    private editOrSave(): void {
        editOrSave(
            this.props,
            `Edit Room Title`,
            () => updateRoomName(this.state.selectedRoom),
            NOOP
        );
    }

    private deleteRoom() {
        deleteEntity('Room', (room: Room) => this.props.deleteRoom(room), () => this.state.selectedRoom);
    }

    private selectRoom(room: Room) {
        this.setState({selectedRoom: room});
    }

    private updateSearch(event: React.FormEvent<ReplaceProps<'input', BsPrefixProps<'input'> & FormControlProps>>
    ) {
        this.setState({searchTerm: event.currentTarget.value});
    }
}

const mapStateToProps = (state: AppState): RoomStateProps => ({
    rooms: state.room.rooms,
    editing: state.room.editing
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): RoomDispatchProps => ({
    addRoom: (room: Room) => dispatch(addRoom(room)),
    deleteRoom: (room: Room) => dispatch(deleteRoom(room))
});

export default connect<RoomStateProps, RoomDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(RoomEdit);
