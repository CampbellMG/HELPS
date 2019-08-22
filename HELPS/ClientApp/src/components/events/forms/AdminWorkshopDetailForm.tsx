import * as React from 'react';
import {Field, reduxForm} from 'redux-form';
import Form from 'react-bootstrap/Form';
import {
    AdminWorkshopDetailFormProps,
    AdminWorkshopDetailFormState,
    AdminWorkshopDetailProps,
    AdminWorkshopFormDispatchProps,
    AdminWorkshopFormStateProps,
    WorkshopFormData
} from '../../../types/components/WorkshopRegistrationTypes';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import RoomList from '../../forms/lists/RoomList';
import {Button, ListGroup, Modal} from 'react-bootstrap';
import SkillList from '../../forms/lists/SkillList';
import {MdAdd, MdDelete} from 'react-icons/md';
import EmailSubmit from '../eventView/EmailSubmit';
import StudentList from '../../forms/lists/StudentList';
// @ts-ignore
import RRuleGenerator from 'react-rrule-generator';
import './EventForm.css';
import {NOOP} from '../../../util';
import {ThunkDispatch} from 'redux-thunk';
import {connect} from 'react-redux';
import {AppState} from '../../../types/store/StoreTypes';
import {retrieveUser} from '../../../store/actions/UserActions';
import {DatePickerInput, RoomListInput, SkillListInput, TextArea, TextInput} from '../../forms/Components';

class AdminWorkshopDetailForm extends React.Component<AdminWorkshopDetailFormProps, AdminWorkshopDetailFormState> {

    constructor(props: AdminWorkshopDetailFormProps) {
        super(props);

        this.state = {
            recurrenceModalVisible: false,
            recurrenceRule: '',
            workshopStudentIds: []
        };
    }

    componentDidMount(): void {
        this.props.retrieveStudents();
    }

    render() {
        const {handleSubmit, workshopStudentIds, recurrenceModalVisible} = {...this.props, ...this.state};
        return (
            <form onSubmit={handleSubmit} className='p-3 pl-4'>
                <Form.Group>
                    <Form.Label>Topic</Form.Label>
                    <Field name='title'
                           type='text'
                           component={TextInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Start</Form.Label>
                    <div className='d-flex'>
                        <Field name='startDate'
                               component={DatePickerInput}/>
                        <Button onClick={() => this.setState({recurrenceModalVisible: true})}>
                            <MdAdd size={22}/>
                        </Button>
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>End</Form.Label>
                    <Field name='endDate'
                           component={DatePickerInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Skill Set</Form.Label>
                    <Field name='skillId'
                           component={SkillListInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Room</Form.Label>
                    <Field name='roomId'
                           component={RoomListInput}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Target Group</Form.Label>
                    <Field name='targetGroup'
                           component={TextInput}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Field name='description'
                           component={TextArea}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Available Places</Form.Label>
                    <Field
                        name='availablePlaces'
                        component={TextInput}/>
                </Form.Group>
                <ListGroup as='ul'>
                    {workshopStudentIds.map(studentId => (
                        <ListGroup.Item className='d-flex justify-content-between'>
                            {this.getStudentName(studentId)}
                            <Button onClick={() => this.onStudentDeleted(studentId)}>
                                <MdDelete/>
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <div className='mt-2'>
                    <StudentList
                        onChange={(event: any) => this.onStudentSelected(event.target.value)}/>
                </div>
                <EmailSubmit buttonText='Send' onSubmit={NOOP}/>
                <EmailSubmit buttonText='Cancel'
                             onSubmit={this.onDialogOpened}/>

                <Modal size='xl'
                       show={recurrenceModalVisible}
                       onHide={this.onDialogClosed}>
                    <Modal.Header closeButton>
                        <Modal.Title>Recurring Workshop</Modal.Title>
                    </Modal.Header>

                    <RRuleGenerator
                        onChange={this.onRecurrenceRuleChanged}/>

                    <Modal.Footer>
                        <Button variant='success'
                                onClick={this.onRecurrenceRuleSaved}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>

            </form>
        );
    }

    private onStudentSelected = (id: number) => {
        const workshopStudentIds = this.state.workshopStudentIds;
        workshopStudentIds.push(id);
        this.setState({workshopStudentIds});
        this.props.change('studentIds', workshopStudentIds);
    };

    private onStudentDeleted = (id: number) => {
        let workshopStudentIds = this.state.workshopStudentIds;
        workshopStudentIds = workshopStudentIds.filter(studentId => studentId !== id);
        this.setState({workshopStudentIds});
        this.props.change('studentIds', workshopStudentIds);
    };

    private onDialogClosed = () => this.setState({recurrenceModalVisible: false});
    private onDialogOpened = () => this.setState({recurrenceModalVisible: true});
    private onRecurrenceRuleChanged = (recurrenceRule: string) => this.setState({recurrenceRule});
    private onRecurrenceRuleSaved = () => {
        this.onDialogClosed();
        return this.props.change('rRule', this.state.recurrenceRule);
    };

    private getStudentName(id: number) {
        const student = this.props.students.find(currentStudent => currentStudent.id == id);
        return student ? student.name : '';
    }
}

const mapStateToProps = (state: AppState): AdminWorkshopFormStateProps => ({
    students: state.user.user
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): AdminWorkshopFormDispatchProps => ({
    retrieveStudents: () => dispatch(retrieveUser())
});

const adminWorkshopForm = connect<AdminWorkshopFormStateProps, AdminWorkshopFormDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(AdminWorkshopDetailForm);

export default reduxForm<WorkshopFormData, AdminWorkshopDetailProps>({
    form: 'admin_workshop_detail',
    enableReinitialize: true
})(adminWorkshopForm);