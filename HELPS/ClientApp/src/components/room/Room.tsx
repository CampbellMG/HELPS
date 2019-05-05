import * as React from 'react';
import { ListGroup, ListGroupItem, Form, InputGroup, FormControlProps, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RoomStateProps, RoomDispatchProps, RoomProps } from '../../types/components/RoomTypes';
import { AppState } from '../../types/store/StoreTypes';
import { addRoom, deleteRoom, fetchRooms } from '../../store/actions/RoomActions';
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers';
import plus from '../../res/plus.png';
import './Room.css';
import { RoomModel } from '../../types/model/Room';
import { RoomState } from '../../types/store/RoomReducerTypes';

export class Room extends React.Component<RoomProps, RoomState> {

    private static readonly EDIT_TEXT: string = 'Edit';
    private static readonly SAVE_TEXT: string = 'Save';

    constructor(props: Readonly<RoomProps>) {
        super(props);
        this.state = { rooms: props.rooms, selectedRoom: props.rooms[0], editing: false };
        fetchRooms();
    }

    render(): React.ReactNode {
        return (<div>
            <div className='col-lg-2 border-right'>
                <div>
                    <InputGroup className='align-self-stretch d-flex pb-3 sticky-top right-pad'>
                        <Form.Control type='text'
                            className='flex-fill'
                            placeholder='Search...'
                            onChange={(e: any) => this.updateSearch(e)}
                        />
                    </InputGroup>
                    <img src={plus} className='plus-button' alt='Add Room Button' />
                </div>

                <ListGroup className='m-3 sticky-top'>
                    {this.makeRoomsDisplayList()}
                </ListGroup>
            </div>

            <div className='col m-3'>
                <Form.Control type='text'
                    className='flex-fill'
                    value={this.state.selectedRoom.title}
                    disabled={!this.state.editing}
                    onChange={(e: any) => this.updateSearch(e)}
                />
                <div className='w-40'>
                    <Button onClick={(e: any) => this.editOrSave()} className='w-100 mt-4'>
                        {this.editOrSaveText()}
                    </Button>
                    <Button onClick={(e: any) => this.deleteRoom()} className='w-100 mt-4'>
                        Delete
                    </Button>
                </div>
            </div>

        </div>);
    }

    // private addRoom(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    //     this.props.addRoom(event.currentTarget.innerText);
    // }

    private editOrSaveText(): string {
        return this.state.editing ? Room.SAVE_TEXT : Room.EDIT_TEXT;
    }

    private editOrSave(): void {
        if (this.state.editing) {
            const confirmSave = confirm(`Confirm action - Change ${this.state.oldRoomName} to ${this.state.selectedRoom.title}`);
            if (confirmSave) {
                // updateRoomName(this.state.selectedRoom, this.state.newRoomName);
            }
        }
        this.setState({ editing: !this.state.editing });
    }

    private deleteRoom() {
        const confirmDelete = confirm(`Confirm action - Delete ${this.state.selectedRoom}`);
        if (confirmDelete) {
            this.props.deleteRoom(this.state.selectedRoom);
        }
    }

    private makeRoomsDisplayList(): React.ReactElement[] {
        const roomsElements: React.ReactElement[] = [];
        this.props.rooms.forEach((room) => roomsElements.push(
            <ListGroupItem
                key={room.id}
                style={{ cursor: 'pointer' }}
                active={this.isActive(room)}
                onClick={() => this.selectRoom(room)}>
                {room.title}
            </ListGroupItem>
        ));

        return roomsElements;
    }

    private selectRoom(room: RoomModel) {
        this.setState({ selectedRoom: room });
    }

    private isActive(room: RoomModel): boolean {
        return this.state.selectedRoom.title === room.title;
    }

    private updateSearch(event: React.FormEvent<ReplaceProps<'input', BsPrefixProps<'input'> & FormControlProps>>
    ) {
        this.setState({ searchTerm: event.currentTarget.value });
    }

    private show(roomName: string): boolean {
        return this.state.searchTerm == undefined || roomName.includes(this.state.searchTerm);
    }
}

const mapStateToProps = (state: AppState): RoomStateProps => {
    return ({ rooms: state.room.rooms });
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): RoomDispatchProps => ({
    addRoom: (room: RoomModel) => dispatch(addRoom(room)),
    deleteRoom: (room: RoomModel) => dispatch(deleteRoom(room))
});

export default connect<RoomStateProps, RoomDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(Room);