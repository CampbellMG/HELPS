import * as React from 'react';
import {Field, reduxForm} from 'redux-form';
import Form from 'react-bootstrap/Form';
import {
    AdminSessionDetailFormProps,
    AdminSessionDetailFormState,
    AdminSessionDetailProps,
    SessionFormData, StudentSessionDetailFormProps
} from '../../../types/components/WorkshopRegistrationTypes';
import 'react-datetime/css/react-datetime.css';
import {Button, ListGroup} from 'react-bootstrap';
import {MdDelete, MdFileDownload} from 'react-icons/md';
import EmailSubmit from '../eventView/EmailSubmit';
import Dropzone from 'react-dropzone';
import './EventForm.css';
import {
    AdvisorListInput,
    DatePickerInput,
    RoomListInput,
    StudentListInput,
    TextArea,
    TextInput
} from '../../forms/Components';
import {authenticatedFetch} from "../../../util";
import {ENDPOINT_FILE} from "../../../store/actions/SessionActions";
import {SessionFile} from "../../../types/model/Session";
import {fetchToken} from "../../../store/actions/AuthActions";

class AdminSessionDetailForm extends React.Component<AdminSessionDetailFormProps, AdminSessionDetailFormState> {

    constructor(props: AdminSessionDetailFormProps) {
        super(props);

        this.state = {
            sessionFiles: []
        };s
    }

    render() {
        return this.props.isAssigning ? this.getAssigningForm() : this.getBookingForm();
    }


    componentDidUpdate(): void {
        console.log(this.props.initialValues);
        if(this.state.sessionFiles.length === 0 && this.props.initialValues.files && this.props.initialValues.files.length > 0){
            this.setState({sessionFiles: this.props.initialValues.files})
        }
    }

    private getAssigningForm = () => (
        <form onSubmit={this.props.handleSubmit} className='p-3 pl-4'>
            <Form.Group>
                <Form.Label>Start</Form.Label>
                <Field name='startTime'
                       component={DatePickerInput}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>End</Form.Label>
                <Field name='endTime'
                       component={DatePickerInput}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Room</Form.Label>
                <Field name='roomId'
                       component={RoomListInput}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Advisor</Form.Label>
                <Field name='advisorId'
                       component={AdvisorListInput}/>
            </Form.Group>

            <EmailSubmit buttonText='Save' onSubmit={() => {
            }}/>
            <EmailSubmit buttonText='Cancel'
                         onSubmit={() => this.props.change('delete', true)}/>
        </form>
    );

    private getBookingForm = () => (
        <form onSubmit={this.props.handleSubmit} className='p-3 pl-4'>
            <Form.Group>
                <Form.Label>Student</Form.Label>
                <Field name='studentId'
                       component={StudentListInput}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Type</Form.Label>
                <Field name='type'
                       component={TextInput}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Appointment Purpose</Form.Label>
                <Field name='purpose'
                       component={this.ReasonListInput}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Subject Name</Form.Label>
                <Field name='subjectName'
                       component={TextInput}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Assignment Type</Form.Label>
                <Field name='assignmentType'
                       component={this.AssignmentTypeInput}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Student Assistance Requirements</Form.Label>
                <Field name='assistance'
                       component={TextInput}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Comments</Form.Label>
                <Field name='comments'
                       component={TextArea}/>
            </Form.Group>
            <Form.Group controlId="groupAssignment">
                <Form.Check type="checkbox" label="Group Assignment"/>
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
            <EmailSubmit buttonText='Save' onSubmit={() => {
            }}/>
            <EmailSubmit buttonText='Cancel'
                         onSubmit={() => this.props.change('delete', true)}/>
        </form>
    );

    private ReasonListInput = (props: any) => (
        <Form.Control as='select' {...props} value={props.input.value}
                      onChange={props.input.onChange}>
            <option/>
            <option value='Discussing an assignment draft'>Discussing an assignment draft</option>
            <option value='Practicing a seminar presentation'>Practicing a seminar presentation
            </option>
            <option value='Other'>Other</option>
        </Form.Control>
    );

    private AssignmentTypeInput = (props: any) => (
        <Form.Control as='select' {...props} value={props.input.value}
                      onChange={props.input.onChange}>
            <option/>
            <option value='Essay'>Essay</option>
            <option value='Report'>Report</option>
            <option value='Other'>Other</option>
        </Form.Control>
    );

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

export default reduxForm<SessionFormData, AdminSessionDetailProps>({
    form: 'admin_session_detail',
    enableReinitialize: true
})(AdminSessionDetailForm);