import { Component, ReactNode } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../types/store/StoreTypes';
import { Form, Button } from 'react-bootstrap';
import { MessageStateProps, MessageDispatchProps, MessageProps } from '../../types/components/MessageTypes';
import { fetchMessages, saveMessage as saveMessage, deleteMessage, selectMessage } from '../../store/actions/MessageActions';
import { ThunkDispatch } from 'redux-thunk';
import { MessageState } from '../../types/store/MessageReducerTypes';
import { MessageModel, messageEquals, makeMockMessage, isMessage } from '../../types/model/Message';
import { editOrSave, deleteEntity, renderEditButtons, getHiddenProperty } from '../../types/util/Editable';
import EditorList from '../editorlist/EditorList';
import { isUndefined } from 'util';

export class Message extends Component<MessageProps, MessageState> {

    constructor(props: Readonly<MessageProps>) {
        super(props);
        this.props.fetchMessages();
        let initMessage: MessageModel = makeMockMessage();
        if (props.messages.length > 0) {
            initMessage = props.messages[0];
        }
        this.state = {
            messages: props.messages,
            selectedMessage: initMessage,
            editing: false,
            filter: '',
            newMessage: Object.assign({}, initMessage),
            isNewMode: false
        };
    }

    componentWillReceiveProps(newProps: MessageProps) {
        let newMessage: MessageModel = makeMockMessage();
        if (!isUndefined(newProps.selectedMessage) && isMessage(newProps.selectedMessage)) {
            newMessage = Object.assign({}, newProps.selectedMessage);
        }
        this.setState({
            selectedMessage: newProps.selectedMessage,
            newMessage,
            isNewMode: newProps.isNewMode,
            editing: newProps.editing
        });
    }

    render(): ReactNode {
        const filteredMessages: MessageModel[] = [];
        this.props.messages.forEach((message) => {
            if (message.title.includes(this.state.filter)) {
                filteredMessages.push(message);
            }
        });
        return (<EditorList items={filteredMessages}
            activeItem={this.state.selectedMessage}
            onSelect={this.selectMessage}
            renderEditor={this.renderMessageEditor}
            keyExtractor={email => email.id.toString()}
            onFilter={newFilter => this.setState({ filter: newFilter })}
            titleExtractor={(message) => message.title}
            addItem={this.newMessage} />);
    }

    private renderMessageEditor = () => {
        return (<div className='col-lg-10'>
            <div className='row justify-content-center'>
                <div className='col-lg-5'>
                    {this.getInputFields()}
                    {this.renderEditButtons()}
                    <Button style={getHiddenProperty(this.state)} onClick={(e: any) => this.deleteMessage} className='w-100 mt-2'>
                        Delete
                        </Button>
                </div>

            </div>

            <div className='row mt-5 h-25 justify-content-center'>
                <div className='w-50'>
                    <div className='d-flex h-100 justify-content-center'>
                        <div className='shadow h-100 w-100 login-container'>
                            <p dangerouslySetInnerHTML={{ __html: this.state.newMessage.content }} />
                        </div>
                    </div>
                </div>
            </div>
        </div >);
    }

    private selectMessage = (message: MessageModel): void => {
        this.props.selectMessage(message);
    }

    private renderEditButtons = (): JSX.Element =>
        renderEditButtons(
            this.state.editing,
            this.cancelOrCommenceEdit,
            this.state,
            this.editOrSaveIsDisabled,
            this.editOrSave
        )

    private editOrSave = (): void => {
        editOrSave(
            this.state,
            `Edit Message`,
            () => {
                this.props.saveMessage(this.state.selectedMessage.id, this.state.newMessage, this.state.isNewMode);
                this.props.fetchMessages();
            },
            () => this.cancelOrCommenceEdit()
        );
    }

    private editOrSaveIsDisabled = (): boolean =>
        this.state.editing && messageEquals(this.state.selectedMessage, this.state.newMessage)

    private cancelOrCommenceEdit = (): void => {
        if (this.state.editing) {
            this.setState({ newMessage: this.state.selectedMessage });
        }
        this.setState({ editing: !this.state.editing });
    }

    private getInputFields = (): JSX.Element => {
        return (<div>
            <Form.Group controlId='formTitle'>
                <Form.Label className='mt-4'>Title</Form.Label>
                <Form.Control
                    type='text'
                    className='flex-fill'
                    value={this.state.newMessage.title}
                    disabled={!this.state.editing}
                    onChange={(e: any) => this.editMessage(e, 'title')}
                />
            </Form.Group>
            <Form.Group controlId='formContent'>
                <Form.Label className='mt-1'>Message Content</Form.Label>

                <Form.Control
                    as='textarea'
                    className='flex-fill'
                    value={this.state.newMessage.content}
                    disabled={!this.state.editing}
                    onChange={(e: any) => this.editMessage(e, 'content')}
                />
            </Form.Group></div>);
    }

    private newMessage = (): void => {
        this.setState({
            newMessage: { title: 'New Room', content: 'Blank content', id: Number.MAX_SAFE_INTEGER },
            editing: true,
            isNewMode: true
        });
    }

    private editMessage = <T extends keyof MessageModel>(e: any, propertyName: T): void => {
        this.setState({
            newMessage: Object.assign({}, this.state.newMessage, { [propertyName]: e.target.value })
        });
    }

    private deleteMessage(e: any): void {
        deleteEntity(
            'Message',
            (id: number) => {
                this.props.deleteMessage(id);
                this.props.fetchMessages();
            },
            () => this.state.selectedMessage.id);
    }
}

const mapStateToProps = (state: AppState): MessageStateProps => {
    return ({
        messages: state.message.messages,
        editing: state.message.editing,
        selectedMessage: state.message.selectedMessage,
        isNewMode: state.message.isNewMode
    });
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): MessageDispatchProps =>
    ({
        fetchMessages: () => dispatch(fetchMessages()),
        saveMessage: (messageId: number, message: MessageModel, isNewMode: boolean) => dispatch(saveMessage(messageId, message, isNewMode)),
        deleteMessage: (messageId: number) => dispatch(deleteMessage(messageId)),
        selectMessage: (message: MessageModel) => dispatch(selectMessage(message))
    });

export default connect<MessageStateProps, MessageDispatchProps, any, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(Message);
