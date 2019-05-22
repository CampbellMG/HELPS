import * as React from 'react';
import {Field, reduxForm} from 'redux-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Workshop} from '../../../types/model/Workshop';
import {
    AdminWorkshopDetailFormProps,
    AdminWorkshopDetailProps
} from '../../../types/components/WorkshopRegistrationTypes';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import RoomList from '../lists/RoomList';
import {InputGroup, ListGroup} from 'react-bootstrap';
import SkillList from '../lists/SkillList';
import {MdDelete, MdFileDownload} from 'react-icons/md';

class AdminWorkshopDetailForm extends React.Component<AdminWorkshopDetailFormProps> {
    render() {
        const {handleSubmit, initialValues} = this.props;
        return (
            <form onSubmit={handleSubmit} className='p-3 pl-4'>
                <Form.Group>
                    <Form.Label>Workshop Title</Form.Label>
                    <Field name='title'
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
                           component={this.TextInput}/>
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
                <InputGroup className='align-self-stretch d-flex pb-3 sticky-top'>

                    <Button type='submit'
                            className='w-100 mt-4'>
                        Save
                    </Button>

                    <InputGroup.Append>
                        <InputGroup.Text>
                            Email Student
                            <input type='checkbox'
                                   className='ml-3'/>
                        </InputGroup.Text>
                    </InputGroup.Append>

                    <InputGroup.Append>
                        <InputGroup.Text>
                            Email Advisor
                            <input type='checkbox'
                                   className='ml-3'/>
                        </InputGroup.Text>
                    </InputGroup.Append>

                </InputGroup>
                <InputGroup className='align-self-stretch d-flex pb-3 sticky-top'>

                    <Button type='submit'
                            className='w-100 mt-4'>
                        Cancel
                    </Button>

                    <InputGroup.Append>
                        <InputGroup.Text>
                            Email Student
                            <input type='checkbox'
                                   className='ml-3'/>
                        </InputGroup.Text>
                    </InputGroup.Append>

                    <InputGroup.Append>
                        <InputGroup.Text>
                            Email Advisor
                            <input type='checkbox'
                                   className='ml-3'/>
                        </InputGroup.Text>
                    </InputGroup.Append>

                </InputGroup>
            </form>
        );
    }

    private TextInput = (props: any) => <Form.Control {...props}/>;
    private DatePickerInput = (props: any) => <Datetime {...props}/>;
    private RoomListInput = (props: any) => <RoomList {...props}/>;
    private SkillListInput = (props: any) => <SkillList {...props}/>;
}

export default reduxForm<Workshop, AdminWorkshopDetailProps>({
    form: 'admin_workshop_detail',
    enableReinitialize: true
})(AdminWorkshopDetailForm);