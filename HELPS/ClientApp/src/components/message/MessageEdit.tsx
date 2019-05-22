import * as React from 'react';
import {Component, ReactNode} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../types/store/StoreTypes';
import {
    MessageDispatchProps,
    MessageProps,
    MessageState,
    MessageStateProps
} from '../../types/components/MessageTypes';
import {ThunkDispatch} from 'redux-thunk';
import {Message} from '../../types/model/Message';
import EditorList from '../editorlist/EditorList';
import {fetchMessages, saveMessage} from '../../store/actions/MessageActions';
import {Editor} from 'react-draft-wysiwyg';
import {ContentState, convertToRaw, EditorState} from 'draft-js';
import {MdSave} from 'react-icons/md';
// @ts-ignore
import draftToHtml from 'draftjs-to-html';
// @ts-ignore
import htmlToDraft from 'html-to-draftjs';
import Dialog from '../dialog/Dialog';
import {DialogButtons} from '../../types/components/DialogTypes';

class MessageEdit extends Component<MessageProps, MessageState> {

    private readonly dialogButtons: DialogButtons = {
        POSITIVE: {
            text: 'Save',
            onClick: () => {
                this.onSave();
                this.setState({selectedMessage: this.state.newSelectedMessage});
            }
        },
        NEUTRAL: {
            text: 'Continue Editing',
            onClick: () => {
                // Do nothing
            }
        },
        NEGATIVE: {
            text: 'Discard Changes',
            onClick: () => {
                this.setState({selectedMessage: this.state.newSelectedMessage});
            }
        }
    };

    private get filteredMessages(): Message[] {
        let {messages, filter} = {...this.state, ...this.props};
        if (!messages) return [];

        filter = filter.trim().toLowerCase();

        if (filter.length === 0) {
            return messages;
        }

        return messages.filter(message => (
            message.title.toLowerCase().includes(filter)
        ));
    }

    private get selectedEmailContent(): string {
        if (!this.state.selectedMessage) return '';

        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    }

    constructor(props: Readonly<MessageProps>) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            filter: ''
        };
    }

    componentDidMount(): void {
        this.props.fetchMessages();
    }

    render(): ReactNode {
        const {selectedMessage, editorState, newSelectedMessage} = this.state;
        return (
            <EditorList items={this.filteredMessages}
                        activeItem={selectedMessage}
                        onSelect={this.onMessageSelected}
                        keyExtractor={email => email.id.toString()}
                        onFilter={filter => this.setState({filter})}
                        titleExtractor={message => message.title}>

                <div className='m-2 p-1 border d-flex flex-fill'>
                    <Editor editorState={editorState}

                            wrapperClassName='flex-fill'
                            toolbarCustomButtons={this.renderExtraButtons()}
                            onEditorStateChange={editorState => this.setState({editorState})}/>

                </div>
                <Dialog visible={newSelectedMessage !== undefined}
                        onHidden={() => this.setState({newSelectedMessage: undefined})}
                        title='Are you sure?'
                        content='You have unsaved changes, do you want discard the current email content?'
                        buttons={this.dialogButtons}/>

            </EditorList>
        );
    }

    private onMessageSelected = (newMessage: Message) => {
        const {selectedMessage} = this.state;
        if (selectedMessage && selectedMessage.content !== this.selectedEmailContent) {
            return this.setState({newSelectedMessage: newMessage});
        }

        this.setState({
            selectedMessage: newMessage,
            editorState: EditorState.createWithContent(
                ContentState.createFromBlockArray(htmlToDraft(newMessage.content))
            )
        });
    };

    private renderExtraButtons() {
        return [
            <div className='rdw-remove-wrapper'>
                <div className='rdw-option-wrapper pl-2 pr-2 text-success'
                     onClick={this.onSave}>
                    <MdSave/>
                </div>
            </div>
        ];
    }

    private onSave = () => {
        const {selectedMessage} = this.state;
        if (!selectedMessage) return;

        this.props.saveMessage({
            ...selectedMessage,
            content: this.selectedEmailContent
        });
    };
}

const mapStateToProps = (state: AppState): MessageStateProps => ({
    messages: state.message.messages
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): MessageDispatchProps => ({
    fetchMessages: () => dispatch(fetchMessages()),
    saveMessage: message => dispatch(saveMessage(message))
});

export default connect<MessageStateProps, MessageDispatchProps, any, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(MessageEdit);
