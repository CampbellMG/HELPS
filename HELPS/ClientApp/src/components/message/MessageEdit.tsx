import * as React from 'react';
import {Component, ReactNode} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../types/store/StoreTypes';
import {Button, Form} from 'react-bootstrap';
import {MessageDispatchProps, MessageProps, MessageStateProps} from '../../types/components/MessageTypes';
import {
    cancelOrCommenceEdit as cancelOrCommenceEdit,
    deleteMessage,
    editMessage,
    fetchMessages,
    saveMessage as saveMessage,
    selectMessage
} from '../../store/actions/MessageActions';
import {ThunkDispatch} from 'redux-thunk';
import {MessageState} from '../../types/store/MessageReducerTypes';
import {Message, messageEquals} from '../../types/model/Message';
import {isUndefined} from 'util';
import {deleteEntity, editOrSave, getEditOrSaveText} from '../../types/util/Editable';
import EditorList from "../editorlist/EditorList";

class MessageEdit extends Component<MessageProps, MessageState> {

    componentDidMount() {
        this.props.fetchMessages();
    }

    constructor(props: MessageProps) {
        super(props);
        const mockMessages = [
            {id: 1, title: 'ROOM CHANGE ALERT', content: '<h1>ALERT</h1><p1>Room changed b1 to b2</p1>'},
            {id: 2, title: 'New Workshop', content: '<h1>New Workshop</h1><p1>New workshop announced</p1>'}
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
        const {messages, selectedMessage} = {...this.props, ...this.state};

        return (
            <EditorList items={messages}
                        activeItem={selectedMessage}
                        onSelect={this.selectMessage}
                        keyExtractor={message => message.id.toString()}
                        titleExtractor={message => message.title}>

                <div className='col-lg-10'>

                    <div className='row justify-content-center'>
                        <div className='col-lg-5'>
                            {this.getInputFieldsIfLoaded()}
                            {this.renderEditButtons()}
                            <Button onClick={() => this.deleteMessage()} className='w-100 mt-2'>
                                Delete
                            </Button>
                        </div>

                    </div>

                    <div className='row mt-5 h-25 justify-content-center'>
                        <div className='w-50'>
                            <div className='d-flex h-100 justify-content-center'>
                                <div className='shadow h-100 w-100 login-container'>
                                    <p dangerouslySetInnerHTML={{__html: this.props.newMessage.content}}/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </EditorList>
        );
    }

    private renderEditButtons = () => {
        return this.props.editing ?
            (<div>
                <Button onClick={() => this.props.cancelOrCommenceEdit()} className='w-50 mt-4 p-1'>
                    Cancel
                </Button>
                <Button onClick={() => this.editOrSave()} className='w-50 mt-4 p-1'
                        disabled={this.editOrSaveIsDisabled()}>
                    {getEditOrSaveText(this.props)}
                </Button>
            </div>) :
            (<Button onClick={() => this.editOrSave()} className='w-100 mt-4'
                     disabled={this.editOrSaveIsDisabled()}>
                {getEditOrSaveText(this.props)}
            </Button>);

    };

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
            return <div/>;
        }
    };

    private editOrSaveIsDisabled = (): boolean => {
        return isUndefined(this.props.editing) ||
            (this.props.editing && messageEquals(this.props.selectedMessage, this.props.newMessage));
    };

    private editOrSave = (): void => {
        editOrSave(
            this.props,
            `Save Message`,
            () => this.props.saveMessage(this.props.newMessage),
            () => this.props.cancelOrCommenceEdit()
        );
    };

    private editMessage<S extends keyof Message>(e: any, property: S): void {
        this.props.editMessage(Object.assign({}, this.props.newMessage, {[property]: e.target.value}));
    }

    private deleteMessage(): void {
        deleteEntity('Message', (id: number) => this.props.deleteMessage(id), () => this.props.selectedMessage.id);
    }

    private selectMessage = (message: Message) => {
        this.setState({selectedMessage: message});
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
        saveMessage: (message: Message) => dispatch(saveMessage(message)),
        deleteMessage: (messageId: number) => dispatch(deleteMessage(messageId)),
        selectMessage: (message: Message) => dispatch(selectMessage(message)),
        editMessage: (message: Message) => dispatch(editMessage(message)),
        cancelOrCommenceEdit: () => dispatch(cancelOrCommenceEdit())
    });

export default connect<MessageStateProps, MessageDispatchProps, any, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(MessageEdit);
