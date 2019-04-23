import * as React from 'react';
import {Component} from 'react';
import {EmailEditProps, EmailEditState} from '../../types/components/EmailTypes';
import {Email, EmailVariable} from '../../types/model/Email';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {ContentState, convertToRaw, EditorState, Modifier} from 'draft-js';
// @ts-ignore
import draftToHtml from 'draftjs-to-html';
import {Editor} from 'react-draft-wysiwyg';

export default class EmailEdit extends Component<EmailEditProps, EmailEditState> {

    private get variables(): EmailVariable[] {
        return !this.props.email ? [] : this.props.email.variables;

    }

    constructor(props: EmailEditProps) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty()
        };

        this.updateEditorState(props.email);
    }

    render() {
        return (
            <div className='row w-100 flex-fill'>
                <div className='col border mr-2 d-flex flex-column'>
                    {this.getEmailContent()}
                </div>
                <div className='col-lg-2 border'>
                    {this.getEmailVariables()}
                </div>
            </div>
        );
    }

    componentWillReceiveProps(nextProps: Readonly<EmailEditProps>, nextContext: any): void {
        //this.updateEditorState(nextProps.email);
    }

    private updateEditorState(email?: Email) {
        if (email) {
            this.setState({
                editorState: EditorState.createWithContent(
                    ContentState.createFromText(email.content)
                )
            });
        }
    }

    private getEmailContent() {
        return (
            <Editor editorState={this.state.editorState}
                    wrapperClassName='flex-fill'
                    onEditorStateChange={this.onContentUpdated}
                    mention={this.getMentions()}/>
        );
    }

    private getEmailVariables() {
        return this.variables.map(variable => (
            <div onClick={() => this.onVariableSelected(variable)} >
                {variable.name}
            </div>
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

    private onVariableSelected = (variable: EmailVariable) => {
        const { editorState } = this.state;
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();
        let nextEditorState = EditorState.createEmpty();
        if (selection.isCollapsed()) {
            const nextContentState = Modifier.insertText(contentState, selection, variable.variable);
            nextEditorState = EditorState.push(
                editorState,
                nextContentState,
                'insert-characters'
            );
        } else {
            const nextContentState = Modifier.replaceText(contentState, selection, variable.variable);
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
}