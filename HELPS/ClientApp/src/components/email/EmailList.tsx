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
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import {Email, EmailVariable} from '../../types/model/Email';
import EmailEdit from './EmailEdit';

class EmailList extends Component<EmailProps, EmailState> {

    private get formattedEmail(): string {
        const {selectedEmail} = this.state;

        if (!selectedEmail) {
            return '';
        }

        return selectedEmail.content
            .split(' ')
            .map(word => {
                const index = selectedEmail.variables.findIndex(variable => variable.variable === word);

                if (index === -1) {
                    return word;
                }

                return selectedEmail.variables[index].example;
            })
            .join(' ');
    }

    constructor(props: EmailProps) {
        super(props);

        this.state = {
            isEditingText: true
        };
    }

    componentWillReceiveProps(nextProps: Readonly<EmailProps>, nextContext: any): void {
        if (!this.state.selectedEmail) {
            this.setState({selectedEmail: nextProps.emails.length > 0 ? nextProps.emails[0] : undefined});
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
                               onEmailChanged={this.onEmailChanged}/>
                    <div className='row border w-100 mt-2 flex-fill'>
                        <p>{this.formattedEmail}</p>
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

    private onEmailChanged = (email: Email) => {
        this.setState({
            selectedEmail: {
                ...this.state.selectedEmail,
                ...email
            }
        });
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