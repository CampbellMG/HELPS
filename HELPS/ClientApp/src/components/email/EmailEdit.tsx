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

class EmailEdit extends Component<EmailProps, EmailState> {

    private get words(): string[] {
        if (!this.state.selectedEmail) {
            return [];
        }

        return this.state.selectedEmail.content.split(' ');
    }

    constructor(props: EmailProps) {
        super(props);

        this.state = {
            hoveredWordIndex: -1,
            draggingVariableIndex: -1
        };
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
                <div className='col m-3'>
                    {this.getEmailContent()}
                    {this.getEmailVariables()}
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
                    <div key={email.id}>
                        <ListGroupItem onClick={() => this.setState({selectedEmail: email})}
                                       style={{cursor: 'pointer'}}
                                       active={selectedEmail && selectedEmail.id === email.id}>
                            {email.title}
                        </ListGroupItem>
                    </div>
                ))}
            </ListGroup>
        );
    }

    private getEmailContent() {
        const {hoveredWordIndex, draggingVariableIndex, selectedEmail} = this.state;
        return this.words.map((word, index) => {
            let spans = [
                <span key={word + index}
                      onDragEnter={() => this.setState({hoveredWordIndex: index})}>
                        {word}&nbsp;
                    </span>
            ];

            if (draggingVariableIndex !== -1 && hoveredWordIndex === index && selectedEmail) {
                const variable = selectedEmail.variables[draggingVariableIndex];
                spans.push(
                    <span key={variable.variable}
                          style={{color: 'blue'}}>
                            {variable.name}&nbsp;
                        </span>
                );
            }

            return spans;
        });
    }

    private getEmailVariables() {
        return this.state.selectedEmail && this.state.selectedEmail.variables
            .map((variable, index) => (
                <span key={variable.variable + index}
                      draggable
                      onDragStart={() => this.setState({draggingVariableIndex: index})}
                      onDragEnd={() => this.onVariableDropped(variable.variable)}
                      style={{color: 'blue'}}>
                    {variable.name}&nbsp;
                </span>
            ));
    }

    private onVariableDropped = (variable: string) => {
        const {hoveredWordIndex, selectedEmail} = this.state;

        if (hoveredWordIndex !== -1 && selectedEmail) {
            const words = this.words;
            words.splice(hoveredWordIndex + 1, 0, variable);
            selectedEmail.content = words.join(' ');
        }

        this.setState({hoveredWordIndex: -1});
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
)(EmailEdit);