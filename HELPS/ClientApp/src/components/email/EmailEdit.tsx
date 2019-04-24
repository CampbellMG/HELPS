import * as React from 'react';
import {Component} from 'react';
import {EmailEditProps, EmailEditState} from '../../types/components/EmailTypes';
import {Email, EmailVariable} from '../../types/model/Email';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {ContentBlock, ContentState, convertToRaw, EditorState, Modifier} from 'draft-js';
// @ts-ignore
import draftToHtml from 'draftjs-to-html';
import {Editor} from 'react-draft-wysiwyg';
import './EmailEdit.css';
import Button from 'react-bootstrap/Button';

export default class EmailEdit extends Component<EmailEditProps, EmailEditState> {

    private static readonly VARIABLE_REGEX = /\[(?:.|\n)*?]/g;

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
                <div className='col border mr-2 d-flex flex-column overflow-hidden p-1'>
                    {this.getEmailContent()}
                </div>
                <div className='col-lg-2 border overflow-auto pt-2 pb-2'>
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
                    customDecorators={this.editorDecorator}
                    onEditorStateChange={this.onContentUpdated}
                    mention={this.getMentions()}/>
        );
    }

    private getEmailVariables() {
        return this.variables.map(variable => (
            this.renderVariable(variable, () => this.onVariableSelected(variable))
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

    private variableStrategy = (block: ContentBlock, callback: (start: number, end: number) => void) => {
        const text = block.getText();
        let matchArr, start;
        while ((matchArr = EmailEdit.VARIABLE_REGEX.exec(text)) !== null) {
            start = matchArr.index;
            callback(start, start + matchArr[0].length);
        }
    };

    private variableSpan = (props: any) => {
        const index = this.variables.findIndex(variable => variable.variable === props.decoratedText);
        if (index === -1) {
            return <span>{props.decoratedText}</span>;
        }

        return this.renderVariable(this.variables[index]);
    };

    private editorDecorator = [{
        strategy: this.variableStrategy,
        component: this.variableSpan
    }];

    private renderVariable(variable: EmailVariable, onClick?: () => void) {
        return (
            <Button onClick={onClick}
                    contentEditable={false}>
                {variable.name}
            </Button>
        );
    }
}