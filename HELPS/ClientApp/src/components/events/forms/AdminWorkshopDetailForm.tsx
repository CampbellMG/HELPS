import * as React from 'react';
import {Field, reduxForm} from 'redux-form';
import Form from 'react-bootstrap/Form';
import {Workshop} from '../../../types/model/Workshop';
import {
    AdminWorkshopDetailFormProps,
    AdminWorkshopDetailProps
} from '../../../types/components/WorkshopRegistrationTypes';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import RoomList from '../lists/RoomList';
import {ListGroup} from 'react-bootstrap';
import SkillList from '../lists/SkillList';
import {MdDelete, MdFileDownload} from 'react-icons/md';
import EmailSubmit from '../eventView/EmailSubmit';

class AdminWorkshopDetailForm extends React.Component<AdminWorkshopDetailFormProps> {

    render() {
        const {handleSubmit, initialValues} = this.props;
        console.log(initialValues);
        return (
            <form onSubmit={handleSubmit} className='p-3 pl-4'>
                <Form.Group>
                    <Form.Label>Workshop Title</Form.Label>
                    <Field name='title'
                           type='text'
                           component={this.TextInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date / Time</Form.Label>
                    <Field name='time'
                           component={this.DatePickerInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Skill Set</Form.Label>
                    <Field name='skillId'
                           component={this.SkillListInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Duration (minutes)</Form.Label>
                    <Field name='duration'
                           component={this.TextInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Room</Form.Label>
                    <Field name='roomId'
                           component={this.RoomListInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Target Group</Form.Label>
                    <Field name='targetGroup'
                           component={this.TextInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Field name='description'
                           component={this.TextArea}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Available Places</Form.Label>
                    <Field
                        name='availablePlaces'
                        component={this.TextInput}/>
                </Form.Group>
                <ListGroup as='ul'>
                    {initialValues.assignedStudentIds && initialValues.assignedStudentIds.map(studentId => (
                        <ListGroup.Item>
                            {studentId}
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
    private DatePickerInput = (props: any) => <Datetime {...props} value={props.input.value} onChange={props.input.onChange}/>;
    private RoomListInput = (props: any) => <RoomList {...props}/>;
    private SkillListInput = (props: any) => <SkillList {...props}/>;
}

export default reduxForm<Workshop, AdminWorkshopDetailProps>({
    form: 'admin_workshop_detail',
    enableReinitialize: true
})(AdminWorkshopDetailForm);