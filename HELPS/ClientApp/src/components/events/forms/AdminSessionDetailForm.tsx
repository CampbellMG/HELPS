import * as React from 'react';
import {Field, reduxForm} from 'redux-form';
import Form from 'react-bootstrap/Form';
import {
    AdminSessionDetailFormProps,
    AdminSessionDetailFormState,
    AdminSessionDetailProps,
    SessionFormData
} from '../../../types/components/WorkshopRegistrationTypes';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import RoomList from '../lists/RoomList';
import StudentList from '../lists/StudentList';
import AdvisorList from '../lists/AdvisorList';
import {Button, ListGroup, Row} from 'react-bootstrap';
import {MdDelete, MdFileDownload} from 'react-icons/md';
import EmailSubmit from '../eventView/EmailSubmit';
import Dropzone from 'react-dropzone';
import './EventForm.css';

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
        const {handleSubmit, sessionFiles} = {...this.props, ...this.state};

        return (
            <form onSubmit={handleSubmit} className='p-3 pl-4'>
                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Field name='type'
                           component={this.TextInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Start</Form.Label>
                    <Field name='startDate'
                           component={this.DatePickerInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>End</Form.Label>
                    <Field name='endDate'
                           component={this.DatePickerInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Room</Form.Label>
                    <Field name='roomId'
                           component={this.RoomListInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Advisor</Form.Label>
                    <Field name='advisorId'
                           component={this.AdvisorListInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Student</Form.Label>
                    <Field name='studentId'
                           component={this.StudentListInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Appointment Purpose</Form.Label>
                    <Field name='purpose'
                           component={this.ReasonListInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Subject Name</Form.Label>
                    <Field name='subjectName'
                           component={this.TextInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Assignment Type</Form.Label>
                    <Field name='assignmentType'
                           component={this.AssignmentTypeInput}/>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Group Assignment</Form.Label>
                    <Field name='groupAssignment'
                           component={this.BooleanInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Student Assistance Requirements</Form.Label>
                    <Field name='assistance'
                           component={this.TextInput}/>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Student Attendance</Form.Label>
                    <Field name='attendance'
                           component={this.BooleanInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Comments</Form.Label>
                    <Field name='comments'
                           component={this.TextArea}/>
                </Form.Group>
                <ListGroup as='ul'>
                    {sessionFiles.map(file => (
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
                                <p>Click here or drop files to add...</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
                <EmailSubmit buttonText='Send' onSubmit={() => {
                }}/>
                <EmailSubmit buttonText='Cancel'
                             onSubmit={() => this.props.change('delete', true)}/>
            </form>
        );
    }

    private TextArea = (props: any) => <Form.Control as='textarea' {...props}
                                                     value={props.input.value}
                                                     onChange={props.input.onChange}/>;
    private TextInput = (props: any) => <Form.Control {...props} value={props.input.value}
                                                      onChange={props.input.onChange}/>;
    private BooleanInput = (props: any) => <Form.Check {...props} value={props.input.value}
                                                       onChange={props.input.onChange}/>;
    private DatePickerInput = (props: any) => <Datetime {...props} value={props.input.value}
                                                        onChange={props.input.onChange}/>;
    private RoomListInput = (props: any) => <RoomList {...props}/>;
    private AdvisorListInput = (props: any) => <AdvisorList {...props}/>;
    private StudentListInput = (props: any) => <StudentList {...props}/>;

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