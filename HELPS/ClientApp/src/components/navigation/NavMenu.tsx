import './NavMenu.css';
import * as React from 'react';
import {Component} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default class NavMenu extends Component<{}> {
    render() {
        return (
            <header>
                <Navbar
                    className='navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3'
                    bg='light'>
                    <Container>
                        <Navbar.Brand href='/'>HELPS</Navbar.Brand>
                        <ul className='navbar-nav flex-grow'>
                            <Nav.Item>
                                <Nav.Link className='text-dark' href='/workshop_registration'>
                                    Workshop Registration
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className='text-dark' href='/user'>
                                    My Information
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className='text-dark' href='/'>
                                    Logout
                                </Nav.Link>
                            </Nav.Item>
                        </ul>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
