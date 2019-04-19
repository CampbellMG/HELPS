import * as React from 'react';
import {Component} from 'react';
import {AppState} from '../../types/store/StoreTypes';
import {ThunkDispatch} from 'redux-thunk';
import {connect} from 'react-redux';
import {
    EmailDispatchProps,
    EmailEditProps,
    EmailEditState,
    EmailStateProps
} from '../../types/components/EmailTypes';
import {retrieveEmails, updateEmail} from '../../store/actions/EmailActions';
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import {EmailVariable} from '../../types/model/Email';

class EmailEdit extends Component<EmailEditProps, EmailEditState> {

    private get words(): string[] {
        if (!this.props.email) {
            return [];
        }

        return this.props.email.content.split(' ');
    }

    private get variables(): EmailVariable[] {
        if (!this.props.email) {
            return [];
        }

        return this.props.email.variables;
    }

    constructor(props: EmailEditProps) {
        super(props);

        this.state = {
            isEditing: true
        };
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onVariableDropped}>
                <div className='row w-100 flex-fill'>
                    <div className='col border mr-2'>
                        {this.getEmailContent()}
                    </div>
                    <div className='col-lg-2 border'>
                        {this.getEmailVariables()}
                    </div>
                </div>
            </DragDropContext>
        );
    }

    private getEmailContent() {
        if (this.state.isEditing) {
            return (
                <div contentEditable onBlur={() => this.setState({isEditing: false})}>
                    {this.words.map(word => <span>{word}&nbsp;</span>)}
                </div>
            );

        }

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
        return this.props.email && this.props.email.variables.map((variable, index) => (
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
            || !this.props.email
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

        this.props.email.content = words.join(' ');

        this.props.onEmailChanged(this.props.email);

        this.setState({isEditing: true});
    };

    private isVariable(value: string) {
        return this.props.email
            && this.props.email.variables.findIndex(variable => {
                return variable.variable === value;
            }) !== -1;
    }
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