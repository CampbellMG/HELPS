import * as React from 'react';
import {Component} from 'react';
import {EmailEditProps, EmailEditState} from '../../types/components/EmailTypes';
import {Email, EmailVariable} from '../../types/model/Email';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {ContentState, EditorState, Modifier} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import './EmailEdit.css';
import Button from 'react-bootstrap/Button';
// @ts-ignore
import htmlToDraft from 'html-to-draftjs';
import EmailList from './EmailList';
import {MdSave, MdSend} from 'react-icons/md';

export default class EmailEdit extends Component<EmailEditProps, EmailEditState> {

    private get variables(): EmailVariable[] {
        return !this.props.email ? [] : this.props.email.variables;
    }

    private originalEmailText: string = '';
    private readonly editorDecorator: object[];

    private static renderVariable(variable: EmailVariable, onClick?: () => void) {
        return (
            <Button onClick={onClick}
                    className='mr-1 ml-1'
                    contentEditable={false}
                    size={onClick ? undefined : 'sm'}
                    disabled={onClick === undefined}>
                {variable.name}
            </Button>
        );
    }

    constructor(props: EmailEditProps) {
        super(props);

        this.editorDecorator = [{
            strategy: EmailList.variableStrategy,
            component: this.variableSpan
        }];

        this.state = {
            editorState: EditorState.createEmpty()
        };

        this.updateEditorState(props.email);
    }

    componentWillReceiveProps(nextProps: Readonly<EmailEditProps>, nextContext: any): void {
        if (nextProps.email &&
            (!this.state.editorState.getCurrentContent().hasText() || nextProps.email.content !== this.originalEmailText)) {
            return this.updateEditorState(nextProps.email);
        }
    }

    render() {
        return (
            <div className='row w-100 flex-fill'>
                <div className='col border mr-2 d-flex flex-column overflow-hidden p-1'>
                    {this.getEmailContent()}
                </div>
                <div className='col-lg-2 border overflow-auto pt-2 pb-2'>
                    {this.getEmailVariables()}
                </div>

            </div>
        );
    }

    private updateEditorState(email?: Email) {
        if (email) {
            const editorState = EditorState.createWithContent(
                ContentState.createFromBlockArray(htmlToDraft(email.content))
            );

            this.originalEmailText = email.content;
            this.props.onContentChanged(editorState.getCurrentContent());

            this.setState({
                editorState: editorState
            });
        }
    }

    private getEmailContent() {
        return (
            <Editor editorState={this.state.editorState}
                    wrapperClassName='flex-fill'
                    customDecorators={this.editorDecorator}
                    toolbarCustomButtons={this.renderExtraButtons()}
                    onEditorStateChange={this.onContentUpdated}
                    mention={this.getMentions()}/>
        );
    }

    private getEmailVariables() {
        return this.variables.map(variable => (
            EmailEdit.renderVariable(variable, () => this.onVariableSelected(variable))
        ));
    }

    private getMentions() {
        return {
            separator: '',
            trigger: ' ',
            suggestions: this.variables.map(variable =>
                ({text: variable.name, value: variable.variable})
            )
        };
    }

    private renderExtraButtons() {
        return [
            <div className='rdw-remove-wrapper'>
                <div className='rdw-option-wrapper pl-2 pr-2 text-danger'
                     onClick={() => {/*todo*/}}>
                    <MdSend color='red'/>
                </div>
            </div>,
            <div className='rdw-remove-wrapper'>
                <div className='rdw-option-wrapper pl-2 pr-2 text-success'
                     onClick={() => this.props.onEmailSaved(this.props.email)}>
                    <MdSave/>
                </div>
            </div>
        ];
    };

    private onVariableSelected = (variable: EmailVariable) => {
        const {editorState} = this.state;
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();
        let nextEditorState = EditorState.createEmpty();

        if (selection.isCollapsed()) {
            const nextContentState = Modifier.insertText(contentState, selection, variable.variable + ' ');
            nextEditorState = EditorState.push(
                editorState,
                nextContentState,
                'insert-characters'
            );
        } else {
            const nextContentState = Modifier.replaceText(contentState, selection, variable.variable + ' ');
            nextEditorState = EditorState.push(
                editorState,
                nextContentState,
                'insert-characters'
            );
        }

        this.onContentUpdated(nextEditorState);
    };

    private onContentUpdated = (editorState: EditorState) => {
        if (!this.props.email) {
            return;
        }

        this.props.onContentChanged(editorState.getCurrentContent());

        this.setState({editorState: editorState});
    };

    private variableSpan = (props: any) => {
        const index = this.variables.findIndex(variable => variable.variable === props.decoratedText);
        if (index === -1) {
            return <span>{props.decoratedText}</span>;
        }

        return EmailEdit.renderVariable(this.variables[index]);
    };

}