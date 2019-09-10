import { AppState } from '../../types/store/StoreTypes';
import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { RegisterDispatchProps, RegisterStateProps, RegisterProps } from '../../types/components/RegisterTypes';
import { ThunkDispatch } from 'redux-thunk';
import { register } from '../../store/actions/AuthActions';
import { RegisterFields } from '../../types/components/LoginTypes';
import { isUndefined } from 'util';
import { isEmpty } from '../../util';
import { Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CHECKBOX_TYPE = 'checkbox';

export class Register extends Component<RegisterProps> {

    constructor(props: RegisterProps) {
        super(props);
        this.state = Register.getDefaultFormValues();
    }

    render(): React.ReactNode {
        return (
            <div className='d-flex h-100 justify-content-center'>
                <div className='align-self-center w-50 h-50'>
                    <div className='shadow bg-white d-flex h-100 justify-content-center flex-column login-container'>
                        <div className='align-self-center mt-5'><h1>Create account</h1></div>
                        <div className='align-self-center w-50'>
                            <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.submit(e)}>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    {this.inputControl('username', 'text')}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    {this.inputControl('password', 'password')}
                                </Form.Group>
                                <Form.Group className='form-inline'>
                                    <Form.Label className='mr-2'>Admin</Form.Label>
                                    {this.inputControl('isAdmin', CHECKBOX_TYPE, false)}
                                </Form.Group>
                                <Link to='/'><Button className='w-50 mt-4'>Cancel</Button></Link>
                                <Button type='submit' className='w-50 mt-4'>Register</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private inputControl = (name: string, type: string, isRequired: boolean = true) =>
        (<FormControl
            name={name}
            onChange={(event: any) => this.handleChange(event, type)}
            type={type}
            required={isRequired}
            autoComplete={name}
        ></FormControl>)

    private handleChange = (event: any, type: string) => {
        if (type === CHECKBOX_TYPE) {
            this.setState({ [event.target.name]: event.target.checked });
        } else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }

    private submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const registerRequest: RegisterFields | undefined = Register.isValid(this.state);
        this.props.register(registerRequest);
    }

    // tslint:disable-next-line:member-ordering
    public static getDefaultFormValues(): RegisterFields {
        return {
            username: '',
            password: '',
            isAdmin: false
        };
    }

    // tslint:disable-next-line:member-ordering
    private static isValid(request: Partial<RegisterFields>): RegisterFields | undefined {
        if (isUndefined(request.username) || isEmpty(request.username) ||
            isUndefined(request.password) || isEmpty(request.password) ||
            isUndefined(request.isAdmin)) {
            return undefined;
        } else {
            return {
                username: request.username,
                password: request.password,
                isAdmin: request.isAdmin
            };
        }
    }

}

const mapStateToProps = (state: AppState): RegisterStateProps => (Register.getDefaultFormValues());

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): RegisterDispatchProps => ({
    register: (registerRequest: RegisterFields | undefined) => dispatch(register(registerRequest))
});

export default connect<RegisterStateProps, RegisterDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(Register);
