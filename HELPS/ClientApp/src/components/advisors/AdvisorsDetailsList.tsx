import * as React from 'react';
import {Component} from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import Form from 'react-bootstrap/Form';
import { Advisor } from '../../types/model/Advisor';
import Button from 'react-bootstrap/Button';
import AdvisorDatabase from '../../../database/database.json'
import AdvisorsDetailsForm from './AdvisorsDetailsForm'
import { Container, Col, Row } from 'react-bootstrap';
import { AdvisorStateProps, AdvisorDispatchProps, AdvisorProps } from '../../types/components/AdvisorTypes';
import {AppState} from '../../types/store/StoreTypes';
import { ThunkDispatch } from 'redux-thunk';
import { retrieveAdvisorList, retrieveAdvisor } from '../../store/actions/AdvisorActions';

class AdvisorsDetailsList extends Component<AdvisorProps> {
    TextInput = (props: any) => (
        <Form.Group controlId='login'>
            <Form.Control value={props.input.value}
                          onChange={props.input.onChange}
                          containerStyle={{flexGrow: 1}}
                          {...props}/>
        </Form.Group>
    );

    render() {
        return (
            <div className='row h-100 overflow-auto'>
                <Container className='col-lg-2 mx-3 border-right'>
                    <Row>
                        {this.createSearch()}
                    </Row>
                    <Row>
                        <div className='col mt-3'>
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
            <Row className='m-3 flex-fill'>
                <div className='flex-fill'>
                    <Field
                        name='searchAdvisor'
                        component={this.TextInput}
                        type='text'
                        placeholder='Search Advisors'/>
                </div>
                <Button className='ml-3 mb-3' variant="light">+</Button>
            </Row>   
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

const mapStateToProps = (state: AppState): AdvisorStateProps => ({
    authenticated: state.auth.authenticated,
    advisors: state.advisors.advisors,
    error:state.advisors.error
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{},{}, any>): AdvisorDispatchProps => ({
    loadAdvisorList: () => dispatch(retrieveAdvisorList()), //TODO EMPTY FUNCTION
    loadAdvisorDetails: () => dispatch(retrieveAdvisor()) //TODO EMPTY FUNCTION
})

export default connect<AdvisorStateProps, AdvisorDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(AdvisorsDetailsList);