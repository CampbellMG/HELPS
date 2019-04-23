import * as React from 'react';
import {Component} from 'react';
import {AppState} from '../../types/store/StoreTypes';
import {ThunkDispatch} from 'redux-thunk';
import {connect} from 'react-redux';
import {EmailDispatchProps, EmailProps, EmailState, EmailStateProps} from '../../types/components/EmailTypes';
import {retrieveEmails, updateEmail} from '../../store/actions/EmailActions';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import {Email, EmailVariable} from '../../types/model/Email';
import EmailEdit from './EmailEdit';
import {CompositeDecorator, ContentState, EditorState, ContentBlock} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';

class EmailList extends Component<EmailProps, EmailState> {

    private get variables(): EmailVariable[] {
        return !this.state.selectedEmail ? [] : this.state.selectedEmail.variables;
    }

    private get formattedEmail(): string {
        const {selectedEmail} = this.state;

        if (!selectedEmail) {
            return '';
        }

        let formattedEmailContent = selectedEmail.content;

        selectedEmail.variables.forEach(variable => {
            formattedEmailContent = formattedEmailContent.replace(variable.variable, variable.example);
        });

        return formattedEmailContent;
    }

    constructor(props: EmailProps) {
        super(props);

        this.state = {
            isEditingText: true,
            editorState: EditorState.createEmpty()
        };
    }

    componentWillReceiveProps(nextProps: Readonly<EmailProps>, nextContext: any): void {
        if (!this.state.selectedEmail) {
            this.setState({
                selectedEmail: nextProps.emails.length > 0 ? nextProps.emails[0] : undefined
            });
        }
    }

    componentDidMount(): void {
        this.props.requestEmails();
    }

    render() {
        return (
            <div className='row h-100 overflow-auto'>
                <div className='col-lg-2 border-right'>
                    {this.getEmailList()}
                </div>
                <div className='col m-3 d-flex flex-column'>
                    <EmailEdit email={this.state.selectedEmail}
                               onContentChanged={this.onEmailContentChanged}
                               onEmailChanged={this.onEmailChanged}/>
                    <div className='row border w-100 mt-2 flex-fill'>
                        <Editor editorState={this.state.editorState}
                                toolbarHidden
                                customDecorators={this.previewDecorator}
                                readOnly/>
                    </div>

                </div>

            </div>
        );
    }

    private getEmailList() {
        const {emails} = this.props;
        const {selectedEmail} = this.state;

        return (
            <ListGroup className='m-3 sticky-top'>
                {emails.map(email => (
                    <ListGroupItem onClick={() => this.setState({selectedEmail: email})}
                                   style={{cursor: 'pointer'}}
                                   active={selectedEmail && selectedEmail.id === email.id}>
                        {email.title}
                    </ListGroupItem>
                ))}
            </ListGroup>
        );
    }

    private onEmailContentChanged = (contentState: ContentState) => {
        this.setState({
            editorState: EditorState.createWithContent(contentState)
        });
    };

    private onEmailChanged = (email: Email) => {
        this.setState({
            selectedEmail: {
                ...this.state.selectedEmail,
                ...email
            }
        });
    };

    private variableStrategy = (block: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) => {
        const text = block.getText();
        this.variables.forEach(variable => {
            const index = text.indexOf(variable.variable);
            if (index !== -1) {
                callback(index, index + variable.variable.length);
            }
        });
    };

    private variableSpan = (props: any) => {
        const index = this.variables.findIndex(variable => variable.variable === props.decoratedText);
        return <span>{index === -1 ? props.decoratedText : this.variables[index].example}</span>;
    };

    private previewDecorator = [{
        strategy: this.variableStrategy,
        component: this.variableSpan
    }];
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