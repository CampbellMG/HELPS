import * as React from 'react';
import {Field, reduxForm, submit} from 'redux-form';
import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap';
import {
    StudentFormData,
    StudentFormDispatchProps, UserFormExtraProps,
    UserFormProps,
    UserFormState
} from '../../types/components/UserTypes';
import {ThunkDispatch} from 'redux-thunk';
import {connect} from 'react-redux';
import {AppState} from '../../types/store/StoreTypes';
import {renderEditButtons} from '../../types/util/Editable';
import {TextInput} from '../forms/Components';

class UserDetailsForm extends React.Component<UserFormProps, UserFormState> {
    constructor(props: UserFormProps) {
        super(props);

        this.state = {
            editing: false,
            isNewMode: false
        };
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className='m-5'>
                <div className='row'>
                    <Form.Group className='col'>
                        <Form.Label>Student ID</Form.Label>
                        <Field
                            name='id'
                            component={TextInput}
                            type='text'
                            placeholder='Id'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>First Name</Form.Label>
                        <Field
                            name='name'
                            component={TextInput}
                            type='text'
                            placeholder='First Name'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Preferred First Name</Form.Label>
                        <Field
                            name='prefFirstName'
                            component={TextInput}
                            type='text'
                            placeholder='Preferred First Name'/>
                    </Form.Group>
                </div>
                <div className='row'>
                    <Form.Group className='col'>
                        <Form.Label>Faculty</Form.Label>
                        <Field
                            name='faculty'
                            component={TextInput}
                            type='text'
                            placeholder='Faculty'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Course</Form.Label>
                        <Field
                            name='course'
                            component={TextInput}
                            type='text'
                            placeholder='Course'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Email</Form.Label>
                        <Field
                            name='email'
                            component={TextInput}
                            type='text'
                            placeholder='Email'/>
                    </Form.Group>
                </div>
                <div className='row'>
                    <Form.Group className='col'>
                        <Form.Label>Home Phone</Form.Label>
                        <Field
                            name='homePhone'
                            component={TextInput}
                            type='text'
                            placeholder='Home Phone'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Mobile</Form.Label>
                        <Field
                            name='mobile'
                            component={TextInput}
                            type='text'
                            placeholder='Mobile'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Best Contact Number</Form.Label>
                        <Field
                            name='bestContactNumber'
                            component={TextInput}
                            type='text'
                            placeholder='Best Contact Number'/>
                    </Form.Group>
                </div>
                <div className='row'>
                    <Form.Group className='col'>
                        <Form.Label>Date of Birth</Form.Label>
                        <Field
                            name='dob'
                            component={TextInput}
                            type='text'
                            placeholder='Date of Birth'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Gender</Form.Label>
                        <Field
                            name='gender'
                            component={TextInput}
                            type='text'
                            placeholder='Gender'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Degree</Form.Label>
                        <Field
                            name='degree'
                            component={TextInput}
                            type='text'
                            placeholder='Degree'/>
                    </Form.Group>
                </div>
                <div className='row'>
                    <Form.Group className='col'>
                        <Form.Label>Year</Form.Label>
                        <Field
                            name='year'
                            component={TextInput}
                            type='text'
                            placeholder='Year'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Status</Form.Label>
                        <Field
                            name='status'
                            component={TextInput}
                            type='text'
                            placeholder='Status'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>First Language</Form.Label>
                        <Field
                            name='firstLanguage'
                            component={TextInput}
                            type='text'
                            placeholder='First Language'/>
                    </Form.Group>
                </div>
                <div className='row'>
                    <Form.Group className='col'>
                        <Form.Label>Country of Origin</Form.Label>
                        <Field
                            name='countryOfOrigin'
                            component={TextInput}
                            type='text'
                            placeholder='Country Of Origin'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Educational Background</Form.Label>
                        <Field
                            name='educationalBackground'
                            component={TextInput}
                            type='text'
                            placeholder='Educational Background'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Other</Form.Label>
                        <Field
                            name='other'
                            component={TextInput}
                            type='text'
                            placeholder='Other'/>
                    </Form.Group>
                </div>
                {this.props.isAdmin &&
                <div className='row'>
                    <div className='col'/>
                    <div className='col-lg-4 mx-auto mt-4'>
                        {this.renderEditButtons()}
                        <Button className='w-100 mt-1'
                                onClick={() => this.props.change('delete', true)}
                                type='submit'>
                            Delete
                        </Button>
                    </div>
                    <div className='col'/>
                </div>}
            </form>
        );

    }

    private renderEditButtons = (): JSX.Element => renderEditButtons(
        this.state,
        this.state.editing && this.props.pristine,
        this.onCancel,
        this.editOrSave
    );

    private editOrSave = (): void => {
        if (this.state.editing) {
            this.props.change('delete', false);
            this.props.submit();
        }

        this.setState({editing: !this.state.editing});
    };

    private onCancel = () => {
        this.setState({editing: false});
        this.props.reset();
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): StudentFormDispatchProps => ({
    submit: () => dispatch(submit('user_details'))
});

const userForm = connect<{}, StudentFormDispatchProps, {}, AppState>(
    undefined,
    mapDispatchToProps
)(UserDetailsForm);

export default reduxForm<StudentFormData, UserFormExtraProps>({
    form: 'user_details',
    enableReinitialize: true
})(userForm);