import * as React from 'react';
import {Component} from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import Form from 'react-bootstrap/Form';
import { Advisor } from '../../types/model/Advisor';
import Button from 'react-bootstrap/Button';
import AdvisorDatabase from '../../../database/database.json'
import AdvisorsDetailsForm from './AdvisorsDetailsForm'
import { Container, Col, Row } from 'react-bootstrap';

class AdvisorsDetailsList extends React.Component<InjectedFormProps<Advisor>> {
    TextInput = (props: any) => (
        <Form.Group controlId='login'>
            <Form.Control value={props.input.value}
                          onChange={props.input.onChange}
                          containerStyle={{flexGrow: 1}}
                          {...props}/>
        </Form.Group>
    );

    /*render() {
        return (
            <div className='row h-100 overflow-auto'>
                <div className='col-sm-2 m-3'>
                    {this.createSearch()}
                </div>
                <div className='ml-n3 pt-0.5 m-3 border-right'>
                    <Button variant="light">+</Button>
                </div>
                <div className='col m-3 my-auto'>
                    {this.getAdvisorDetails()}
                </div>
            </div>
        );
    }*/

    render() {
        return (
            <div className='row h-100 overflow-auto'>
                <Container className='col-lg-2 border-right'>
                    <Row>
                        <div className='col-lg-10 m-3'>
                            {this.createSearch()}
                        </div>
                        <div className='pt-0.5 ml-n3 m-3'>
                            <Button variant="light">+</Button>
                        </div>
                    </Row>
                    <Row>
                        <div className='col m-5'>
                            {this.getAdvisors()}
                        </div>
                    </Row>
                </Container>
                <div className='col m-3 my-auto'>
                    {this.getAdvisorDetails()}
                </div>
            </div>
        );
    }

    private createSearch() {
        return (
            <Field
                name='searchAdvisor'
                component={this.TextInput}
                type='text'
                placeholder='Search Advisors'/>
        );
    }

    private getAdvisors() {
        return (
            <text>Advisors</text>
        );
    }

    private getAdvisorDetails() {
            return (
                <div style={{height: '100%'}} className='bg-white'>
                    <AdvisorsDetailsForm />
                </div>
            );
    }
}


export default reduxForm<Advisor>({
    form: 'searchAdvisor'
})(AdvisorsDetailsList);