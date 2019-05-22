import * as React from 'react';
import {Field, reduxForm} from 'redux-form';
import Form from 'react-bootstrap/Form';
import {
    AdminSessionDetailFormProps,
    AdminSessionDetailProps
} from '../../../types/components/WorkshopRegistrationTypes';
import {Session} from '../../../types/model/Session';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import RoomList from '../lists/RoomList';
import StudentList from '../lists/StudentList';
import AdvisorList from '../lists/AdvisorList';
import {ListGroup, Row} from 'react-bootstrap';
import {MdDelete, MdFileDownload} from 'react-icons/md';
import EmailSubmit from '../eventView/EmailSubmit';

class AdminSessionDetailForm extends React.Component<AdminSessionDetailFormProps> {
    render() {
        const {handleSubmit, initialValues} = this.props;
        return (
            <form onSubmit={handleSubmit} className='p-3 pl-4'>
                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Field name='type'
                           component={this.TextInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date / Time</Form.Label>
                    <Field name='time'
                           component={this.DatePickerInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Duration</Form.Label>
                    <Field name='duration'
                           component={this.TextInput}/>
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
                <Form.Group as={Row}>
                    <Form.Label>Group Assignment</Form.Label>
                    <Field name='groupAssignment'
                           component={this.BooleanInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Student Assistance Requirements</Form.Label>
                    <Field name='assistance'
                           component={this.TextInput}/>
                </Form.Group>
                <Form.Group as={Row}>
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
                    {initialValues.files && initialValues.files.map(file => (
                        <ListGroup.Item>
                            {file.title}
                            <div>
                               <MdFileDownload/>
                            </div>
                            <div>
                                <MdDelete/>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <EmailSubmit buttonText='Send' onSubmit={() => {}}/>
                <EmailSubmit buttonText='Cancel' onSubmit={() => {}}/>
            </form>
        );
    }

    private TextArea = (props: any) => <Form.Control as="textarea" {...props} value={props.input.value} onChange={props.input.onChange}/>;
    private TextInput = (props: any) => <Form.Control {...props} value={props.input.value} onChange={props.input.onChange}/>;
    private BooleanInput = (props: any) => <Form.Check {...props} value={props.input.value} onChange={props.input.onChange}/>;
    private DatePickerInput = (props: any) => <Datetime {...props} value={props.input.value} onChange={props.input.onChange}/>;
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
}

export default reduxForm<Session, AdminSessionDetailProps>({
    form: 'admin_session_detail',
    enableReinitialize: true
})(AdminSessionDetailForm);