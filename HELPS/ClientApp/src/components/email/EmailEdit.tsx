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
import './EmailEdit.css';
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import {EmailVariable} from '../../types/model/Email';

class EmailEdit extends Component<EmailProps, EmailState> {

    private get words(): string[] {
        if (!this.state.selectedEmail) {
            return [];
        }

        return this.state.selectedEmail.content.split(' ');
    }

    private get variables(): EmailVariable[] {
        if (!this.state.selectedEmail) {
            return [];
        }

        return this.state.selectedEmail.variables;
    }

    constructor(props: EmailProps) {
        super(props);

        this.state = {
            hoveredWordIndex: -1,
            draggingVariableIndex: -1
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
            <div
                className={'row h-100 overflow-auto' + (this.state.hoveredWordIndex === -1 ? '' : ' no-cursor')}>
                <div className='col-lg-2 border-right'>
                    {this.getEmailList()}
                </div>
                <div className='col m-3'>
                    <DragDropContext onDragEnd={this.onVariableDropped}>
                        {this.getEmailContent()}
                        {this.getEmailVariables()}
                    </DragDropContext>
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

    private getEmailContent() {
        return (
            <Droppable droppableId='CONTENT' direction='horizontal'>
                {provided => {
                    return <div ref={provided.innerRef} {...provided.droppableProps}
                                className='d-flex'>
                        {this.getWords()}
                        {provided.placeholder}
                    </div>;

                }}
            </Droppable>
        );
    }

    private getWords() {
        return this.words.map((word, index) => (
            <Draggable index={index} draggableId={index.toString() + word}>
                {draggableProvided =>
                    <div {...draggableProvided.draggableProps}
                         {...draggableProvided.dragHandleProps}
                         ref={draggableProvided.innerRef}>
                                        <span>
                                            {word}&nbsp;
                                        </span>
                    </div>}
            </Draggable>
        ));
    }

    private getEmailVariables() {
        return (
            <Droppable droppableId='VARIABLES' direction='horizontal'>
                {provided => {
                    return <div ref={provided.innerRef} {...provided.droppableProps}
                                className='d-flex'>
                        {this.getVariables()}
                        {provided.placeholder}
                    </div>;

                }}
            </Droppable>
        );
    }

    private getVariables() {
        return this.state.selectedEmail && this.state.selectedEmail.variables.map((variable, index) => (
            <Draggable index={index}
                       draggableId={index.toString() + variable.variable}>
                {draggableProvided =>
                    <div {...draggableProvided.draggableProps}
                         {...draggableProvided.dragHandleProps}
                         ref={draggableProvided.innerRef}>
                                        <span>
                                            {variable.name}
                                        </span>
                    </div>}
            </Draggable>
        ));
    }

    private onVariableDropped = (result: DropResult) => {
        if (!result.destination
            || !this.state.selectedEmail
            || result.destination.droppableId !== 'CONTENT'
            || result.source.droppableId !== 'VARIABLES') {
            return;
        }

        const words = this.words;

        words.splice(
            result.destination.index,
            0,
            this.variables[result.source.index].variable
        );

        this.state.selectedEmail.content = words.join(' ');
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