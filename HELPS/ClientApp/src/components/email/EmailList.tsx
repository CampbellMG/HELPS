import * as React from 'react';
import {Component} from 'react';
import {AppState} from '../../types/store/StoreTypes';
import {ThunkDispatch} from 'redux-thunk';
import {connect} from 'react-redux';
import {
    EmailDispatchProps,
    EmailProps,
    EmailState,
    EmailStateProps
} from '../../types/components/EmailTypes';
import {retrieveEmails, updateEmail} from '../../store/actions/EmailActions';
import {Email, EmailVariable} from '../../types/model/Email';
import EmailEdit from './EmailEdit';
import {ContentBlock, ContentState, convertToRaw, EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import {DialogButtons} from '../../types/components/DialogTypes';
import Dialog from '../dialog/Dialog';
// @ts-ignore
import draftToHtml from 'draftjs-to-html';
import EditorList from '../editorlist/EditorList';

class EmailList extends Component<EmailProps, EmailState> {

    public static readonly VARIABLE_REGEX = /\[(?:.|\n)*?]/g;

    private newEmail?: Email;
    private readonly previewDecorator: object[];

    private get variables(): EmailVariable[] {
        return !this.state.selectedEmail ? [] : this.state.selectedEmail.variables;
    }

    private get selectedEmailHtml(): string {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    }

    private readonly dialogButtons: DialogButtons = {
        POSITIVE: {
            text: 'Save',
            onClick: () => {
                this.onEmailUpdated(this.newEmail);
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
                if (this.newEmail) {
                    this.setState({selectedEmail: this.newEmail});
                    this.newEmail = undefined;
                }
            }
        }
    };

    public static variableStrategy = (block: ContentBlock, callback: (start: number, end: number) => void) => {
        const text = block.getText();
        let matchArr, start;
        while ((matchArr = EmailList.VARIABLE_REGEX.exec(text)) !== null) {
            start = matchArr.index;
            callback(start, start + matchArr[0].length);
        }
    };

    constructor(props: EmailProps) {
        super(props);

        this.previewDecorator = [{
            strategy: EmailList.variableStrategy,
            component: this.variableSpan
        }];

        this.state = {
            filter: '',
            editorState: EditorState.createEmpty(),
            dialogVisible: false
        };
    }

    componentWillReceiveProps(nextProps: Readonly<EmailProps>, nextContext: any): void {
        const {selectedEmail} = this.state;

        if (!selectedEmail) {
            return this.setState({
                selectedEmail: nextProps.emails.length > 0 ? nextProps.emails[0] : undefined
            });
        }

        const selectedEmailIndex = nextProps.emails.findIndex(email => email.id === selectedEmail.id);

        if (selectedEmailIndex !== -1) {
            this.setState({selectedEmail: nextProps.emails[selectedEmailIndex]});
        }
    }

    componentDidMount(): void {
        this.props.requestEmails();
    }

    render() {
        let {emails, filter, selectedEmail} = {...this.props, ...this.state};

        if (this.state.filter.length > 0) {
            emails = emails.filter(email => {
                return email.title.toLowerCase().indexOf(filter) !== -1;
            });
        }

        return (
            <EditorList items={emails}
                        activeItem={selectedEmail}
                        onSelect={this.onEmailSelected}
                        keyExtractor={email => email.id.toString()}
                        onFilter={newFilter => this.setState({filter: newFilter})}
                        titleExtractor={email => email.title}>

                <div className='col m-3 d-flex flex-column'>
                    <EmailEdit email={this.state.selectedEmail}
                               onEmailSaved={this.onEmailUpdated}
                               onContentChanged={this.onEmailContentChanged}/>
                    <div className='row border w-100 mt-2 flex-fill d-flex p-1'>
                        <Editor editorState={this.state.editorState}
                                wrapperClassName='flex-fill'
                                toolbarHidden
                                customDecorators={this.previewDecorator}
                                readOnly/>
                    </div>
                    <Dialog visible={this.state.dialogVisible}
                            onHidden={() => this.setState({dialogVisible: false})}
                            title='Are you sure?'
                            content='You have unsaved changes, do you want discard the current email content?'
                            buttons={this.dialogButtons}/>
                </div>

            </EditorList>
        );
    }

    private onEmailSelected = (email: Email) => {
        const {selectedEmail} = this.state;

        if (!selectedEmail || selectedEmail.id === email.id) {
            return;
        }

        if (this.selectedEmailHtml !== selectedEmail.content) {
            this.newEmail = email;
            return this.setState({dialogVisible: true});
        }

        this.onEmailUpdated(email);
    };

    private onEmailUpdated = (newEmail?: Email) => {
        const {selectedEmail} = this.state;

        if (selectedEmail) {
            this.props.submitEmail({
                ...selectedEmail,
                content: this.selectedEmailHtml
            });
        }

        if (newEmail) {
            this.setState({selectedEmail: newEmail});
        }
    };

    private onEmailContentChanged = (contentState: ContentState) => this.setState({
        editorState: EditorState.createWithContent(contentState)
    });

    private variableSpan = (props: any) => {
        const index = this.variables.findIndex(variable => variable.variable === props.decoratedText);
        return <span>{index === -1 ? props.decoratedText : this.variables[index].example}</span>;
    };

}

const mapStateToProps = (state: AppState): EmailStateProps => ({
    emails: state.email.emails
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): EmailDispatchProps => ({
    requestEmails: () => dispatch(retrieveEmails()),
    submitEmail: email => dispatch(updateEmail(email))
});

export default connect<EmailStateProps, EmailDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(EmailList);