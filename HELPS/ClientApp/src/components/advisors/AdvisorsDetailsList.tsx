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
import { AdvisorState } from '../../types/store/AdvisorReducerTypes';

class AdvisorsDetailsList extends Component<AdvisorProps, AdvisorState> {
    TextInput = (props: any) => (
        <Form.Group controlId='login'>
            <Form.Control value={props.input.value}
                          onChange={props.input.onChange}
                          containerStyle={{flexGrow: 1}}
                          {...props}/>
        </Form.Group>
    );

    componentDidMount(): void {
        this.props.loadAdvisorList();
        this.props.loadAdvisorDetails();
    }

    render() {
        return (
            <AdvisorsDetailsForm/>
            );
    }
}

const mapStateToProps = (state: AppState): AdvisorStateProps => ({
    authenticated: state.auth.authenticated,
    advisors: state.advisors.advisors,
    error:state.advisors.error
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{},{}, any>): AdvisorDispatchProps => ({
    loadAdvisorList: () => dispatch(retrieveAdvisorList()),
    loadAdvisorDetails: () => dispatch(retrieveAdvisor())
})

export default connect<AdvisorStateProps, AdvisorDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(AdvisorsDetailsList);