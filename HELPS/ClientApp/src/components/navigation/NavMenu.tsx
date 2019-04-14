import './NavMenu.css';
import * as React from 'react';
import {Component} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import uts from '../../res/uts-white.png';

export default class NavMenu extends Component<{}> {
    render() {
        return (
            <header>
                <Navbar className='rounded-top navbar-custom d-flex shadow'>
                    <Navbar.Brand href='/' className='text-light'>
                        <div>
                            <img src={uts} alt='UTS Logo' width='20%'/>
                        </div>
                    </Navbar.Brand>
                    <ul className='navbar-nav col ml-5'>
                        <Nav.Item>
                            <Nav.Link className='text-light font-weight-bold'
                                      href='/workshop_registration'>
                                Workshop Registration
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className='text-light font-weight-bold' href='/user'>
                                My Information
                            </Nav.Link>
                        </Nav.Item>
                    </ul>
                    <Nav.Item>
                        <Nav.Link className='text-light font-weight-bold' href='/'>
                            Logout
                        </Nav.Link>
                    </Nav.Item>
                </Navbar>
            </header>
        );
    }
}
