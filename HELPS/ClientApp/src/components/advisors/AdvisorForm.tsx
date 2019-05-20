import * as React from 'react';
import { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { InfoState } from '../../types/components/InfoTypes';
import { Advisor } from '../../types/model/Advisor';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Col, Row } from 'react-bootstrap';

class AdvisorForm extends React.Component<InjectedFormProps<Advisor>> {
    TextInput = (props: any) => (
        <Form.Group controlId='login'>
            <Form.Control value={props.input.value}
                onChange={props.input.onChange}
                {...props} />
        </Form.Group>
    );

    render() {
        return (
            <div className='row h-100 overflow-auto'>
                <Container className='col-lg-2 mx-3 border-right'>
                    <Row>
                        <Row className='m-3'>
                            <div>
                                <Field
                                    name='searchAdvisor'
                                    component={this.TextInput}
                                    type='text'
                                    placeholder='Search Advisors' />
                            </div>
                            <Button className='ml-3 mb-3' variant="light">+</Button>
                        </Row>
                    </Row>
                    <Row>
                        <div className='col mt-3'>
                            <h1>Advisors</h1>
                        </div>
                    </Row>
                </Container>
                <div className='col m-3 my-auto'>
                    <div style={{ height: '100%' }} className='bg-white'>
                        <form onSubmit={this.props.handleSubmit}>
                            <div className='row no-gutters'>
                                <Form.Group className='col-lg-4 col mx-auto'>
                                    <Form.Label>Staff Number</Form.Label>
                                    <Field
                                        name='id'
                                        component={this.TextInput}
                                        type='text'
                                        placeholder='123456789' />
                                </Form.Group>
                                <Form.Group className='col-lg-4 col mx-auto'>
                                    <Form.Label>Email</Form.Label>
                                    <Field
                                        name='email'
                                        component={this.TextInput}
                                        type='text'
                                        placeholder='Steve.Smith@uts.edu.au' />
                                </Form.Group>
                            </div>
                            <div className='row no-gutters'>
                                <Form.Group className='col-lg-4 col mx-auto'>
                                    <Form.Label>First Name</Form.Label>
                                    <Field
                                        name='firstName'
                                        component={this.TextInput}
                                        type='text'
                                        placeholder='Steve' />
                                </Form.Group>
                                <Form.Group className='col-lg-4 col mx-auto'>
                                    <Form.Label>Last Name</Form.Label>
                                    <Field
                                        name='lastName'
                                        component={this.TextInput}
                                        type='text'
                                        placeholder='Smith' />
                                </Form.Group>
                            </div>
                            <div className='row no-gutters'>
                                <Form.Group className='col-lg-4 col mx-auto'>
                                    <Form.Label>Status</Form.Label>
                                    <Field
                                        name='isActive'
                                        component={this.TextInput}
                                        type='text'
                                        placeholder='Active' />
                                </Form.Group>
                            </div>
                            <div className='row'>
                                <Button className='col-lg-4 mx-auto mt-4' type='submit'>
                                    Delete
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    private createSearch = () => {
        return (
            <Row className='m-3 flex-fill'>
                <div className='flex-fill'>
                    <Field
                        name='searchAdvisor'
                        component={this.TextInput}
                        type='text'
                        placeholder='Search Advisors' />
                </div>
                <Button className='ml-3 mb-3' variant="light">+</Button>
            </Row>
        );
    }
}

export default reduxForm<Advisor>({
    form: 'advisorDetails'
})(AdvisorForm);