import './NavMenu.css';
import * as React from 'react';
import {Component} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import uts from '../../res/uts-white.png';
import {IndexLinkContainer} from 'react-router-bootstrap';

export default class NavMenu extends Component<{}> {
    render() {
        return (
<<<<<<< HEAD
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
                                    <NavLink tag={Link} className='text-dark' to='/workshop_registration'>
                                        Workshop Registration
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className='text-dark' to='/user'>
                                        User
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className='text-dark' to='/admin_workshops'>
                                        Admin Workshops
                                    </NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
=======
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
                            <Nav.Item className='mr-5'>
                                Information
                            </Nav.Item>
                        </IndexLinkContainer>
                        <IndexLinkContainer to='/email' className='text-light font-weight-bold link'>
                            <Nav.Item className='mr-5'>
                                Email
                            </Nav.Item>
                        </IndexLinkContainer>
                    </ul>
                    <IndexLinkContainer to='/' className='text-light font-weight-bold link'>
                        <Nav.Item className='mr-3'>
                            Logout
                        </Nav.Item>
                    </IndexLinkContainer>
>>>>>>> 4cc801208e3175e8aa811062f83d5776fa4c0b61
                </Navbar>
            </header>
        );
    }
}
