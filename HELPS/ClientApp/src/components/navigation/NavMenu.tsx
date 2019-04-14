import './NavMenu.css';
import * as React from 'react';
import {Component} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import uts from '../../res/uts-white.png';
import {LinkContainer} from 'react-router-bootstrap';

export default class NavMenu extends Component<{}> {
    render() {
        return (
            <header>
                <Navbar className='rounded-top navbar-custom d-flex shadow'>
                    <Navbar.Brand href='/' className='text-light'>
                        <img src={uts} alt='UTS Logo' width='20%'/>
                    </Navbar.Brand>
                    <ul className='navbar-nav col ml-5'>
                        <LinkContainer to='/user' className='text-light font-weight-bold'>
                            <Nav.Item className='mr-5'>
                                My Information
                            </Nav.Item>
                        </LinkContainer>
                        <LinkContainer to='/workshop_registration' className='text-light font-weight-bold'>
                            <Nav.Item className='mr-3'>
                                Workshop Registration
                            </Nav.Item>
                        </LinkContainer>
                    </ul>
                    <LinkContainer to='/' className='text-light font-weight-bold'>
                        <Nav.Item className='mr-3'>
                            Logout
                        </Nav.Item>
                    </LinkContainer>
                </Navbar>
            </header>
        );
    }
}
