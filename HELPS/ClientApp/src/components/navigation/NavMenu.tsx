import './NavMenu.css';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import * as React from 'react';
import {Component} from 'react';

import { logoutUser } from '../../store/actions/AuthActions';
import { LogoutStateProps, LogoutDispatchProps, LogoutProps } from '../../types/components/LogoutTypes';
import { AppState } from '../../types/store/StoreTypes';
import Logout from '../logout/Logout';

class NavMenu extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <header>
                <Navbar
                    className='navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3'
                    light>
                    <Container>
                        <NavbarBrand tag={Link} to='/'>HELPS</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className='mr-2'/>
                        <Collapse className='d-sm-inline-flex flex-sm-row-reverse'
                                  isOpen={this.state.isOpen} navbar>
                            <ul className='navbar-nav flex-grow'>
                                <NavItem>
                                    <NavLink tag={Link} className='text-dark' to='/'>Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className='text-dark' to='/fetch-data'>Fetch
                                        data</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className='text-dark' to='/logout-user'>Log Out</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import uts from '../../res/uts-white.png';
import {IndexLinkContainer} from 'react-router-bootstrap';

export default class NavMenu extends Component<{}> {
    render() {
        return (
            <header className='nav-menu'>
                <Navbar className='navbar-custom d-flex shadow'>
                    <Navbar.Brand href='/user' className='text-light ml-3'>
                        <img src={uts} alt='UTS Logo'/>
                    </Navbar.Brand>
                    <ul className='navbar-nav col ml-5'>
                        <IndexLinkContainer to='/user' className='text-light font-weight-bold link'>
                            <Nav.Item className='mr-5'>
                                My Information
                            </Nav.Item>
                        </IndexLinkContainer>
                        <IndexLinkContainer to='/workshop_registration' className='text-light font-weight-bold link'>
                            <Nav.Item className='mr-5'>
                                Workshop Registration
                            </Nav.Item>
                        </IndexLinkContainer>
                        <IndexLinkContainer to='/info' className='text-light font-weight-bold link'>
                            <Nav.Item className='mr-3'>
                                Information
                            </Nav.Item>
                        </IndexLinkContainer>
                    </ul>
                    <IndexLinkContainer to='/' className='text-light font-weight-bold link'>
                        <Nav.Item className='mr-3'>
                            Logout
                        </Nav.Item>
                    </IndexLinkContainer>

                </Navbar>
            </header>
        );
    }
}

const mapStateToProps = (state: AppState): LogoutStateProps => ({
    authenticated: state.auth.authenticated
  });
  
  const mapDispatchToProps = (dispatch: Dispatch<{}>): LogoutDispatchProps => ({
    logOut: () => dispatch(logoutUser())
  });
  
  export default connect<LogoutStateProps, LogoutDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(NavMenu);