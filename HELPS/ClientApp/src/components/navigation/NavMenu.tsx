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
