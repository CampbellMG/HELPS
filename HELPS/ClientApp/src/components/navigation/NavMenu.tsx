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