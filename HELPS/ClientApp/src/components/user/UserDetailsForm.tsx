import * as React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Student} from '../../types/model/Student';

class UserDetailsForm extends React.Component<InjectedFormProps<Student>> {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div>
                    <label>ID</label>
                    <div>
                        <Field
                            name='id'
                            component='input'
                            type='text'
                            placeholder='Username'/>
                    </div>
                </div>
                <div>
                    <label>First Name</label>
                    <div>
                        <Field
                            name='name'
                            component='input'
                            type='text'
                            placeholder='Username'/>
                    </div>
                </div>
                <div>
                    <label>Preferred First Name</label>
                    <div>
                        <Field
                            name='prefFirstName'
                            component='input'
                            type='text'
                            placeholder='Preferred first name'/>
                    </div>
                </div>
                <div>
                    <label>Faculty</label>
                    <div>
                        <Field
                            name='faculty'
                            component='input'
                            type='text'
                            placeholder='Faculty'/>
                    </div>
                </div>
                <div>
                    <label>Course</label>
                    <div>
                        <Field
                            name='course'
                            component='input'
                            type='text'
                            placeholder='Faculty'/>
                    </div>
                </div>
                <div>
                    <label>Email</label>
                    <div>
                        <Field
                            name='email'
                            component='input'
                            type='text'
                            placeholder='Email'/>
                    </div>
                </div>
                <div>
                    <label>Home Phone</label>
                    <div>
                        <Field
                            name='homePhone'
                            component='input'
                            type='text'
                            placeholder='>Home Phone'/>
                    </div>
                </div>
                <div>
                    <label>Mobile</label>
                    <div>
                        <Field
                            name='mobile'
                            component='input'
                            type='text'
                            placeholder='Mobile'/>
                    </div>
                </div>
                <div>
                    <label>Best Contact Number</label>
                    <div>
                        <Field
                            name='bestContactNumber'
                            component='input'
                            type='text'
                            placeholder='Best Contact Number'/>
                    </div>
                </div>
                <div>
                    <label>Date of Birth</label>
                    <div>
                        <Field
                            name='dob'
                            component='input'
                            type='text'
                            placeholder='Date of Birth'/>
                    </div>
                </div>
                <div>
                    <label>Gender</label>
                    <div>
                        <Field
                            name='gender'
                            component='input'
                            type='text'
                            placeholder='Gender'/>
                    </div>
                </div>
                <div>
                    <label>Degree</label>
                    <div>
                        <Field
                            name='degree'
                            component='input'
                            type='text'
                            placeholder='Degree'/>
                    </div>
                </div>
                <div>
                    <label>Year</label>
                    <div>
                        <Field
                            name='year'
                            component='input'
                            type='text'
                            placeholder='Year'/>
                    </div>
                </div>
                <div>
                    <label>Status</label>
                    <div>
                        <Field
                            name='status'
                            component='input'
                            type='text'
                            placeholder='Status'/>
                    </div>
                </div>
                <div>
                    <label>First Language</label>
                    <div>
                        <Field
                            name='firstLanguage'
                            component='input'
                            type='text'
                            placeholder='First Language'/>
                    </div>
                </div>
                <div>
                    <label>Country of Origin</label>
                    <div>
                        <Field
                            name='countryOfOrigin'
                            component='input'
                            type='text'
                            placeholder='Country of Origin'/>
                    </div>
                </div>
                <div>
                    <label>Education Background</label>
                    <div>
                        <Field
                            name='educationalBackground'
                            component='input'
                            type='text'
                            placeholder='Education Background'/>
                    </div>
                </div>
                <div>
                    <label>Other</label>
                    <div>
                        <Field
                            name='other'
                            component='input'
                            type='text'
                            placeholder='Other'/>
                    </div>
                </div>
                <div>
                    <button type='submit'>Login</button>
                </div>
            </form>
        );
    }
}

export default reduxForm<Student>({
    form: 'user_details'
})(UserDetailsForm);