import { Component, ReactElement, ReactNode } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../types/store/StoreTypes';
import { InputGroup, Form, ListGroup, Button } from 'react-bootstrap';
import { MessageStateProps, MessageDispatchProps, MessageProps } from '../../types/components/MessageTypes';
import { ListGroupItem } from 'react-bootstrap';
import { fetchMessages, saveMessage as saveMessage, deleteMessage, selectMessage, editMessage, cancelOrCommenceEdit as cancelOrCommenceEdit } from '../../store/actions/MessageActions';
import { ThunkDispatch } from 'redux-thunk';
import { MessageState } from '../../types/store/MessageReducerTypes';
import { MessageModel, messageEquals } from '../../types/model/Message';
import { isUndefined } from 'util';
import { getEditOrSaveText, editOrSave, deleteEntity } from '../../types/util/Editable';

export class Message extends Component<MessageProps, MessageState> {

    componentDidMount() {
        this.props.fetchMessages();
    }

    constructor(props: MessageProps) {
        super(props);
        const mockMessages = [
            { id: 1, title: 'ROOM CHANGE ALERT', content: '<h1>ALERT</h1><p1>Room changed b1 to b2</p1>' },
            { id: 2, title: 'New Workshop', content: '<h1>New Workshop</h1><p1>New workshop announced</p1>' }
        ];
        this.state = {
            selectedMessage: mockMessages[0],
            editing: false,
            newMessage: mockMessages[0],
            messages: mockMessages,
            isLoaded: false
        };
        this.props.fetchMessages();
    }

    render(): ReactNode {
        return (
            <div className='row h-100 overflow-auto'>
                <div className='col-lg-2 border-right'>
                    <div>
                        <InputGroup className='align-self-stretch d-flex pb-3 sticky-top right-pad'>
                            <Form.Control type='text'
                                className='flex-fill'
                                placeholder='Search...'
                                onChange={(e: any) => this.updateSearch(e)}
                            />
                        </InputGroup>
                    </div>

                    <ListGroup className='m-3 sticky-top'>
                        {this.makeMessagesDisplayList()}
                    </ListGroup>
                </div>

                <div className='col-lg-10'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-5'>
                            {this.getInputFieldsIfLoaded()}
                            {this.renderEditButtons()}
                            <Button onClick={(e: any) => this.deleteMessage(e)} className='w-100 mt-2'>
                                Delete
                    </Button>
                        </div>

                    </div>

                    <div className='row mt-5 h-25 justify-content-center'>
                        <div className='w-50'>
                            <div className='d-flex h-100 justify-content-center'>
                                <div className='shadow h-100 w-100 login-container'>
                                    <p dangerouslySetInnerHTML={{ __html: this.props.newMessage.content }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >);

    }

    private renderEditButtons = () => {
        return this.props.editing ?
            (<div>
                <Button onClick={(e: any) => this.props.cancelOrCommenceEdit()} className='w-50 mt-4 p-1'>
                    Cancel
                </Button>
                <Button onClick={(e: any) => this.editOrSave()} className='w-50 mt-4 p-1' disabled={this.editOrSaveIsDisabled()}>
                    {getEditOrSaveText(this.props)}
                </Button>
            </div>) :
            (<Button onClick={(e: any) => this.editOrSave()} className='w-100 mt-4' disabled={this.editOrSaveIsDisabled()}>
                {getEditOrSaveText(this.props)}
            </Button>);

    }

    private getInputFieldsIfLoaded = (): JSX.Element => {
        if (this.props.isLoaded) {
            return <div>
                <Form.Group controlId='formTitle'>
                    <Form.Label className='mt-4'>Title</Form.Label>
                    <Form.Control
                        type='text'
                        className='flex-fill'
                        value={this.props.newMessage.title}
                        disabled={!this.props.editing}
                        onChange={(e: any) => this.editMessage(e, 'title')}
                    />
                </Form.Group>
                <Form.Group controlId='formContent'>
                    <Form.Label className='mt-1'>Message Content</Form.Label>

                    <Form.Control
                        as='textarea'
                        className='flex-fill'
                        value={this.props.newMessage.content}
                        disabled={!this.props.editing}
                        onChange={(e: any) => this.editMessage(e, 'content')}
                    />
                </Form.Group></div>;
        } else {
            return <div></div>;
        }
    }

    private editOrSaveIsDisabled = (): boolean => {
        return isUndefined(this.props.editing) ||
            (this.props.editing && messageEquals(this.props.selectedMessage, this.props.newMessage));
    }

    private editOrSave = (): void => {
        editOrSave(
            this.props,
            `Save Message`,
            () => this.props.saveMessage(this.props.newMessage),
            () => this.props.cancelOrCommenceEdit()
        );
    }

    private editMessage<S extends keyof MessageModel>(e: any, property: S): void {
        this.props.editMessage(Object.assign({}, this.props.newMessage, { [property]: e.target.value }));
    }

    private deleteMessage(e: any): void {
        deleteEntity('Message', (id: number) => this.props.deleteMessage(id), () => this.props.selectedMessage.id);
    }

    private updateSearch(e: any): void {

    }

    private makeMessagesDisplayList = (): ReactElement[] => {
        const messageElements: ReactElement[] = [];
        // const messages = this.props.messages;
        const messages = this.props.messages;
        messages.forEach((message) => {
            messageElements.push(<ListGroupItem
                key={message.id}
                style={{ cursor: 'pointer' }}
                active={this.isActive(message)}
                onClick={(e: any) => this.selectMessage(message)}>
                {message.title}
            </ListGroupItem>);
        });
        return messageElements;
    }

    private isActive = (message: MessageModel): boolean => {
        return !isUndefined(this.props.selectedMessage) && this.props.selectedMessage.id === message.id;
    };

    private selectMessage = (message: MessageModel): void => {
        this.props.selectMessage(message);
    };
}

const mapStateToProps = (state: AppState): MessageStateProps => {
    return {
        messages: state.message.messages,
        selectedMessage: state.message.selectedMessage,
        newMessage: state.message.newMessage,
        editing: state.message.editing,
        isLoaded: state.message.isLoaded
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): MessageDispatchProps =>
    ({
        fetchMessages: () => dispatch(fetchMessages()),
        saveMessage: (message: MessageModel) => dispatch(saveMessage(message)),
        deleteMessage: (messageId: number) => dispatch(deleteMessage(messageId)),
        selectMessage: (message: MessageModel) => dispatch(selectMessage(message)),
        editMessage: (message: MessageModel) => dispatch(editMessage(message)),
        cancelOrCommenceEdit: () => dispatch(cancelOrCommenceEdit())
    });

export default connect<MessageStateProps, MessageDispatchProps, any, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(Message);