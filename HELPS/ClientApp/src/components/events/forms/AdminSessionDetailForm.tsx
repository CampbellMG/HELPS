import * as React from 'react';
import {Field, reduxForm} from 'redux-form';
import Form from 'react-bootstrap/Form';
import {
    AdminSessionDetailFormProps,
    AdminSessionDetailFormState,
    AdminSessionDetailProps,
    SessionFormData
} from '../../../types/components/WorkshopRegistrationTypes';
import 'react-datetime/css/react-datetime.css';
import {Button, ListGroup} from 'react-bootstrap';
import {MdDelete, MdFileDownload} from 'react-icons/md';
import EmailSubmit from '../eventView/EmailSubmit';
import Dropzone from 'react-dropzone';
import './EventForm.css';
import {
    AdvisorListInput,
    BooleanInput,
    DatePickerInput,
    RoomListInput,
    StudentListInput,
    TextArea,
    TextInput
} from '../../forms/Components';

class AdminSessionDetailForm extends React.Component<AdminSessionDetailFormProps, AdminSessionDetailFormState> {

    private get nextFileId(): number {
        return Math.max(...this.state.sessionFiles.map(file => file.id)) + 1;
    }

    constructor(props: AdminSessionDetailFormProps) {
        super(props);

        this.state = {
            sessionFiles: []
        };
    }

    render() {
        return this.props.isAssigning ? this.getAssigningForm() : this.getBookingForm();
    }

    private getAssigningForm = () => (
        <form onSubmit={this.props.handleSubmit} className='p-3 pl-4'>
            <Form.Group>
                <Form.Label>Type</Form.Label>
                <Field name='type'
                       component={TextInput}/>
            </Form.Group>
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
                        {file.title}
                        <Button className='m-1'>
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
        <Form.Control as='select' {...props}>
            <option>Discussing an assignment draft</option>
            <option>Practicing a seminar presentation</option>
            <option>Other</option>
        </Form.Control>
    );

    private AssignmentTypeInput = (props: any) => (
        <Form.Control as='select' {...props}>
            <option>Essay</option>
            <option>Report</option>
            <option>Other</option>
        </Form.Control>
    );

    private onFileAdded = (files: File[]) => {
        const sessionFiles = this.state.sessionFiles;
        files.forEach(file => {
            sessionFiles.push({
                id: this.nextFileId,
                title: file.name
            });
        });

        this.props.change('files', sessionFiles);
        this.setState({sessionFiles});
    };

    private onFileDeleted = (id: number) => {
        let sessionFiles = this.state.sessionFiles;
        sessionFiles = sessionFiles.filter(file => file.id !== id);
        this.props.change('files', sessionFiles);
        this.setState({sessionFiles});
    };
}

export default reduxForm<SessionFormData, AdminSessionDetailProps>({
    form: 'admin_session_detail',
    enableReinitialize: true
})(AdminSessionDetailForm);