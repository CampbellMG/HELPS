import * as React from 'react';
import {Field, reduxForm, submit} from 'redux-form';
import Form from 'react-bootstrap/Form';
import {renderEditButtons} from '../../types/util/Editable';
import {
    AdvisorFormData,
    AdvisorFormDispatcProps,
    AdvisorFormProps,
    AdvisorFormState
} from '../../types/components/AdvisorTypes';
import {Button} from 'react-bootstrap';
import {AppState} from "../../types/store/StoreTypes";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";
import {TextInput} from '../forms/Components';

class AdvisorForm extends React.Component<AdvisorFormProps, AdvisorFormState> {
    constructor(props: AdvisorFormProps) {
        super(props);

        this.state = {
            editing: false,
            isNewMode: false
        };
    }

    render() {
        const {editing} = this.state;
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className='row no-gutters'>
                    <Form.Group className='col-lg-4 col mx-auto'>
                        <Form.Label>Staff Number</Form.Label>
                        <Field
                            name='id'
                            component={TextInput}
                            disabled={!editing}
                            type='text'
                            placeholder='123456789'/>
                    </Form.Group>
                    <Form.Group className='col-lg-4 col mx-auto'>
                        <Form.Label>Email</Form.Label>
                        <Field
                            name='email'
                            component={TextInput}
                            disabled={!editing}
                            type='text'
                            placeholder='Steve.Smith@uts.edu.au'/>
                    </Form.Group>
                </div>
                <div className='row no-gutters'>
                    <Form.Group className='col-lg-4 col mx-auto'>
                        <Form.Label>First Name</Form.Label>
                        <Field
                            name='firstName'
                            component={TextInput}
                            disabled={!editing}
                            type='text'
                            placeholder='Steve'/>
                    </Form.Group>
                    <Form.Group className='col-lg-4 col mx-auto'>
                        <Form.Label>Last Name</Form.Label>
                        <Field
                            name='lastName'
                            component={TextInput}
                            disabled={!editing}
                            type='text'
                            placeholder='Smith'/>
                    </Form.Group>
                </div>
                <div className='row no-gutters'>
                    <Form.Group className='col-lg-4 col mx-auto'>
                        <Form.Label>Status</Form.Label>
                        <Field
                            name='isActive'
                            component={TextInput}
                            disabled={!editing}
                            type='text'
                            placeholder='Active'/>
                    </Form.Group>
                </div>
                <div className='row '>
                    <div className='col-lg-4 mx-auto mt-4'>
                        {this.renderEditButtons()}
                        <Button className='w-100 mt-1'
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
            this.props.submit();
        }

        this.setState({editing: !this.state.editing});
    };

    private onCancel = () => {
        this.setState({editing: false});
        this.props.reset();
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): AdvisorFormDispatcProps => ({
    submit: () => dispatch(submit('advisor_details'))
});

const advisorForm = connect<{}, AdvisorFormDispatcProps, {}, AppState>(
    undefined,
    mapDispatchToProps
)(AdvisorForm);

export default reduxForm<AdvisorFormData>({
    form: 'advisor_details',
    enableReinitialize: true
})(advisorForm);