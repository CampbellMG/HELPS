import * as React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import Form from 'react-bootstrap/Form';
import {renderEditButtons} from '../../types/util/Editable';
import {AdvisorFormData, AdvisorFormState} from '../../types/components/AdvisorTypes';
import {Button} from 'react-bootstrap';

class AdvisorForm extends React.Component<InjectedFormProps<AdvisorFormData>, AdvisorFormState> {
    TextInput = (props: any) => (
        <Form.Group controlId='login'>
            <Form.Control value={props.input.value}
                          onChange={props.input.onChange}
                          {...props} />
        </Form.Group>
    );

    constructor(props: InjectedFormProps<AdvisorFormData>) {
        super(props);

        this.state = {
            editing: false,
            isNewMode: false
        };
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className='row no-gutters'>
                    <Form.Group className='col-lg-4 col mx-auto'>
                        <Form.Label>Staff Number</Form.Label>
                        <Field
                            name='id'
                            component={this.TextInput}
                            type='text'
                            placeholder='123456789'/>
                    </Form.Group>
                    <Form.Group className='col-lg-4 col mx-auto'>
                        <Form.Label>Email</Form.Label>
                        <Field
                            name='email'
                            component={this.TextInput}
                            type='text'
                            placeholder='Steve.Smith@uts.edu.au'/>
                    </Form.Group>
                </div>
                <div className='row no-gutters'>
                    <Form.Group className='col-lg-4 col mx-auto'>
                        <Form.Label>First Name</Form.Label>
                        <Field
                            name='firstName'
                            component={this.TextInput}
                            type='text'
                            placeholder='Steve'/>
                    </Form.Group>
                    <Form.Group className='col-lg-4 col mx-auto'>
                        <Form.Label>Last Name</Form.Label>
                        <Field
                            name='lastName'
                            component={this.TextInput}
                            type='text'
                            placeholder='Smith'/>
                    </Form.Group>
                </div>
                <div className='row no-gutters'>
                    <Form.Group className='col-lg-4 col mx-auto'>
                        <Form.Label>Status</Form.Label>
                        <Field
                            name='isActive'
                            component={this.TextInput}
                            type='text'
                            placeholder='Active'/>
                    </Form.Group>
                    <div className='row'>
                        {this.renderEditButtons()}
                        <Button className='col-lg-4 mx-auto mt-4'
                                onClick={() => this.props.change('delete', true)}
                                type='submit'>
                            Delete
                        </Button>
                    </div>
                </div>
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
        }
        this.setState({editing: !this.state.editing});
    };

    private onCancel = () => {
        this.setState({editing: false});
        this.props.reset();
    };
}

export default reduxForm<AdvisorFormData>({
    form: 'advisorDetails',
    enableReinitialize: true
})(AdvisorForm);