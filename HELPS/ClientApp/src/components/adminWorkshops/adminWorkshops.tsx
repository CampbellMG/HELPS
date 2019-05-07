import {
    Collapse,
    Container,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import {AppState} from '../../types/store/StoreTypes';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as React from 'react';
import {Component} from 'react';
import {
    WorkshopEvent,
    AdminWorkshopDispatchProps,
    AdminWorkshopProps,
    AdminWorkshopStateProps
} from '../../types/components/AdminWorkshopsTypes';
import {
    addSkill
} from '../../store/actions/AdminWorkshopActions';


class AdminWorkshops extends Component{

    componentDidMount(): void {
        //this.props.retrieveWorkshops();
    }

    addSkillSet = (skill) => {
       
        adminWorkshops.dispatch({type: 'ADD_SKILL'
                
            });     
    }

    setWorkshops = () => {
        //pass in skill name
    }

    isCurrent = () => {
        if(this.isCurrent === true){
            return( 
                <text>CURRENT!!!</text>
            )
        }
    }
    render() {
       
        return (
            <Container>
                
                {this.isCurrent()}
                <Button>Current</Button>
                <Button>Archived</Button>
                
                <Form>
                    <FormGroup>
                        <Label for="skillset">Skill-set:</Label>
                        <Input type="textarea" rows="1"  name="skilltext"/>
                        <Button onClick={() => this.addSkillSet("NEW SKILL")} >Add</Button>
                    </FormGroup>
                    
                </Form>
                <text>Skill-sets:</text>
                <div>
                    <Input type="radio" name="radioSelect"/>
                    <text>Improve your writing</text>
                    <Input type="textarea" rows="1" name="shortTitle"/>
                    <Button onClick={() => this.setWorkshops()} >Set Workshops</Button>
                </div>
                <div>
                    <Button>Update</Button>
                    <Button>Archive</Button>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state: AppState): AdminWorkshopStateProps => ({
    workshops: state.admin.workshops,
    isCurrent: state.admin.isCurrent,
    skills: state.admin.skills
});


const mapDispatchToProps = (dispatch: Dispatch<{}>): AdminWorkshopDispatchProps => ({
    addSKill: () => dispatch(addSkill()),
});

export default connect<AdminWorkshopStateProps, AdminWorkshopDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(AdminWorkshops);
