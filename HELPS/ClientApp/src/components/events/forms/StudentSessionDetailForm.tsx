import * as React from 'react';
import {Field, reduxForm} from 'redux-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
    AdminSessionDetailFormProps, AdminSessionDetailFormState,
    SessionFormData,
    StudentSessionDetailFormProps,
    StudentSessionDetailProps
} from '../../../types/components/WorkshopRegistrationTypes';
import {DisabledTextInput} from '../../forms/Components';
import {ENDPOINT_FILE} from "../../../store/actions/SessionActions";
import {fetchToken} from "../../../store/actions/AuthActions";
import {SessionFile} from "../../../types/model/Session";
import {ListGroup} from "react-bootstrap";
import {MdDelete, MdFileDownload} from "react-icons/all";
import Dropzone from "react-dropzone";

class StudentSessionDetailForm extends React.Component<StudentSessionDetailFormProps, AdminSessionDetailFormState> {

    constructor(props: StudentSessionDetailFormProps) {
        super(props);

        this.state = {
            sessionFiles: []
        };
    }
    
    componentDidUpdate(prevProps: Readonly<StudentSessionDetailFormProps>, prevState: Readonly<AdminSessionDetailFormState>, snapshot?: any): void {
        if(this.state.sessionFiles.length === 0 && this.props.initialValues.files && this.props.initialValues.files.length > 0){
            this.setState({sessionFiles: this.props.initialValues.files})
        }
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className='p-3 pl-4'>
                <Form.Group>
                    <Form.Label>Workshop Title</Form.Label>
                    <Field name='title'
                           component={DisabledTextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Start</Form.Label>
                    <Field name='startTime'
                           component={DisabledTextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>End</Form.Label>
                    <Field name='endTime'
                           component={DisabledTextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Room</Form.Label>
                    <Field name='room'
                           component={DisabledTextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Target Group</Form.Label>
                    <Field name='targetGroup'
                           component={DisabledTextInput}
                           type='text'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Field name='description'
                           component={DisabledTextInput}
                           type='text'/>
                </Form.Group>
                <ListGroup as='ul'>
                    {this.state.sessionFiles.map(file => (
                        <ListGroup.Item className='d-flex flex-column'>
                            {file.name}
                            <Button className='m-1' onClick={() => this.onFileDownloaded(file.id)}>
                                <MdFileDownload/>
                            </Button>
                            <Button onClick={() => this.onFileDeleted(file.id)} className='m-1'>
                                <MdDelete/>
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Dropzone onDrop={this.onFileAdded}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps()} className='dropzone'>
                                <input {...getInputProps()} />
                                <p>Click here or drop files to add</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
                <Button type='submit'
                        className='w-100 mt-4'>
                    Save
                </Button>
            </form>
        );
    }

    private onFileAdded = async (files: File[]) => {
        const sessionFiles = this.state.sessionFiles;
        for (let file of files) {
            const id = await this.uploadFile(file);
            sessionFiles.push({
                id: id,
                name: file.name
            });
        }

        this.props.change('fileIds', sessionFiles.map(file => file.id));
        this.setState({sessionFiles});
    };

    private onFileDeleted = (id: number) => {
        let sessionFiles = this.state.sessionFiles;
        sessionFiles = sessionFiles.filter(file => file.id !== id);
        this.props.change('fileIds', sessionFiles.map(file => file.id));
        this.setState({sessionFiles});
    };

    private async uploadFile(file: File): Promise<number> {
        const data = new FormData();
        data.append('name', file.name);
        data.append('data', file);

        const result = await fetch(
            ENDPOINT_FILE, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${fetchToken()}`,
                }),
                body: data
            }
        );
        const resultantFile = await result.json();

        return (resultantFile as SessionFile).id
    }

    private async onFileDownloaded(id: number) {
        const downloadResult = await fetch(`${ENDPOINT_FILE}/${id}`,
            {
                headers: new Headers({
                    'Authorization': `Bearer ${fetchToken()}`,
                })
            }
        );

        const contentDisposition = downloadResult.headers.get('Content-Disposition');
        const filename = contentDisposition ? contentDisposition.match(/filename="(.+)"/) : 'Unknown File Type';
        const blob = await downloadResult.blob();
        const url = await URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = filename ? filename[1] : 'Unknown File Type';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
    }
}

export default reduxForm<SessionFormData, StudentSessionDetailProps>({
    form: 'student_session_detail',
    enableReinitialize: true
})(StudentSessionDetailForm);