import * as React from 'react';
import {Field, reduxForm} from 'redux-form';
import Form from 'react-bootstrap/Form';
import {
    AdminWorkshopDetailFormProps,
    AdminWorkshopDetailProps,
    WorkshopFormData
} from '../../../types/components/WorkshopRegistrationTypes';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import RoomList from '../lists/RoomList';
import {Button, ListGroup} from 'react-bootstrap';
import SkillList from '../lists/SkillList';
import {MdDelete} from 'react-icons/md';
import EmailSubmit from '../eventView/EmailSubmit';
import StudentList from '../lists/StudentList';
// @ts-ignore
import RRuleGenerator from 'react-rrule-generator';

class AdminWorkshopDetailForm extends React.Component<AdminWorkshopDetailFormProps> {

    private workshopStudentIds: number[] = [];

    componentWillReceiveProps(nextProps: Readonly<AdminWorkshopDetailFormProps>, nextContext: any): void {
        if (this.workshopStudentIds.length === 0 && nextProps.initialValues.assignedStudentIds) {
            this.workshopStudentIds = nextProps.initialValues.assignedStudentIds;
        }
    }

    render() {
        const {handleSubmit, initialValues} = this.props;
        console.log(initialValues);
        return (
            <form onSubmit={handleSubmit} className='p-3 pl-4'>
                <Form.Group>
                    <Form.Label>Topic</Form.Label>
                    <Field name='title'
                           type='text'
                           component={this.TextInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date / Time</Form.Label>
                    <Field name='time'
                           component={this.DatePickerInput}/>
                </Form.Group>
                <RRuleGenerator onChange={(rRule: string) => this.props.change('rRule', rRule)}/>
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
                            <Button onClick={() => this.onStudentDeleted(studentId)}>
                                <MdDelete/>
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <StudentList onChange={(event: any) => this.onStudentSelected(event.target.value)}/>
                <EmailSubmit buttonText='Send' onSubmit={() => {
                }}/>
                <EmailSubmit buttonText='Cancel' onSubmit={() => this.props.change('delete', true)}/>
            </form>
        );
    }

    private TextArea = (props: any) => <Form.Control as="textarea" {...props} value={props.input.value}
                                                     onChange={props.input.onChange}/>;
    private TextInput = (props: any) => <Form.Control {...props} value={props.input.value}
                                                      onChange={props.input.onChange}/>;
    private DatePickerInput = (props: any) => <Datetime {...props} value={props.input.value}
                                                        onChange={props.input.onChange}/>;
    private RoomListInput = (props: any) => <RoomList {...props}/>;
    private SkillListInput = (props: any) => <SkillList {...props}/>;

    private onStudentSelected = (id: number) => {
        this.workshopStudentIds.push(id);
        this.props.change('studentIds', this.workshopStudentIds);
    };

    private onStudentDeleted = (id: number) => {
        this.workshopStudentIds = this.workshopStudentIds.filter(studentId => studentId !== id);
        this.props.change('studentIds', this.workshopStudentIds);
    };
}

export default reduxForm<WorkshopFormData, AdminWorkshopDetailProps>({
    form: 'admin_workshop_detail',
    enableReinitialize: true
})(AdminWorkshopDetailForm);