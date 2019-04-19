import * as React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Student} from '../../types/model/Student';
import Form from 'react-bootstrap/Form';

class UserDetailsForm extends React.Component<InjectedFormProps<Student>> {
    TextInput = (props: any) => (
        <Form.Group controlId='login'>
            <Form.Control name='email'
                          placeholder='Login'
                          value={props.input.value}
                          onChange={props.input.onChange}
                          {...props}/>
        </Form.Group>
    );

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className='row'>
                    <Form.Group className='col'>
                        <Form.Label>Student ID</Form.Label>
                        <Field
                            name='id'
                            component={this.TextInput}
                            type='text'
                            placeholder='Id'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>First Name</Form.Label>
                        <Field
                            name='name'
                            component={this.TextInput}
                            type='text'
                            placeholder='First Name'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Preferred First Name</Form.Label>
                        <Field
                            name='prefFirstName'
                            component={this.TextInput}
                            type='text'
                            placeholder='Preferred First Name'/>
                    </Form.Group>
                </div>
                <div className='row'>
                    <Form.Group className='col'>
                        <Form.Label>Faculty</Form.Label>
                        <Field
                            name='faculty'
                            component={this.TextInput}
                            type='text'
                            placeholder='Faculty'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Course</Form.Label>
                        <Field
                            name='course'
                            component={this.TextInput}
                            type='text'
                            placeholder='Course'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Email</Form.Label>
                        <Field
                            name='email'
                            component={this.TextInput}
                            type='text'
                            placeholder='Email'/>
                    </Form.Group>
                </div>
                <div className='row'>
                    <Form.Group className='col'>
                        <Form.Label>Home Phone</Form.Label>
                        <Field
                            name='homePhone'
                            component={this.TextInput}
                            type='text'
                            placeholder='Home Phone'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Mobile</Form.Label>
                        <Field
                            name='mobile'
                            component={this.TextInput}
                            type='text'
                            placeholder='Mobile'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Best Contact Number</Form.Label>
                        <Field
                            name='bestContactNumber'
                            component={this.TextInput}
                            type='text'
                            placeholder='Best Contact Number'/>
                    </Form.Group>
                </div>
                <div className='row'>
                    <Form.Group className='col'>
                        <Form.Label>Date of Birth</Form.Label>
                        <Field
                            name='dob'
                            component={this.TextInput}
                            type='text'
                            placeholder='Date of Birth'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Gender</Form.Label>
                        <Field
                            name='gender'
                            component={this.TextInput}
                            type='text'
                            placeholder='Gender'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Degree</Form.Label>
                        <Field
                            name='degree'
                            component={this.TextInput}
                            type='text'
                            placeholder='Degree'/>
                    </Form.Group>
                </div>
                <div className='row'>
                    <Form.Group className='col'>
                        <Form.Label>Year</Form.Label>
                        <Field
                            name='year'
                            component={this.TextInput}
                            type='text'
                            placeholder='Year'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Status</Form.Label>
                        <Field
                            name='status'
                            component={this.TextInput}
                            type='text'
                            placeholder='Status'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>First Language</Form.Label>
                        <Field
                            name='firstLanguage'
                            component={this.TextInput}
                            type='text'
                            placeholder='First Language'/>
                    </Form.Group>
                </div>
                <div className='row'>
                    <Form.Group className='col'>
                        <Form.Label>Country of Origin</Form.Label>
                        <Field
                            name='countryOfOrigin'
                            component={this.TextInput}
                            type='text'
                            placeholder='Country Of Origin'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Educational Background</Form.Label>
                        <Field
                            name='educationalBackground'
                            component={this.TextInput}
                            type='text'
                            placeholder='Educational Background'/>
                    </Form.Group>
                    <Form.Group className='col'>
                        <Form.Label>Other</Form.Label>
                        <Field
                            name='other'
                            component={this.TextInput}
                            type='text'
                            placeholder='Other'/>
                    </Form.Group>
                </div>
            </form>
        );
    }
}

export default reduxForm<Student>({
    form: 'user_details'
})(UserDetailsForm);