import {
    Collapse,
    Container,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink
} from 'reactstrap';
import {Link} from 'react-router-dom';
import './NavMenu.css';
import * as React from 'react';
import {Component} from 'react';

export default class NavMenu extends Component<any, any> {
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
                                    <NavLink tag={Link} className='text-dark' to='/workshop_registration'>
                                        Workshop Registration
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className='text-dark' to='/user'>
                                        My Information
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className='text-dark' to='/'>
                                        Logout
                                    </NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
