import './NavMenu.css';
import * as React from 'react';
import {Component} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import uts from '../../res/uts-white.png';
import {AppState} from '../../types/store/StoreTypes';
import {connect} from 'react-redux';
import {NavMenuProps, NavMenuStateProps} from '../../types/components/NavMenuTypes';
import {AdminMenu, StudentMenu} from './Menu';
import {withRouter} from 'react-router';
import {IndexLinkContainer} from 'react-router-bootstrap';

class NavMenu extends Component<NavMenuProps> {

    render() {
        let {isAdmin} = this.props;
        const menuItems = isAdmin ? AdminMenu : StudentMenu;
        return (
            <Navbar className='navbar-custom' expand='lg' variant='dark' >
                <Navbar.Brand href='/user'>
                    <img src={uts} alt='UTS Logos'/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse >
                    <Nav className='w-100'>
                        {menuItems.map((menuItem, index) => (
                            <IndexLinkContainer to={`/${menuItem.route}`}
                                                key={`${menuItem.route} ${index}`}
                                                className='nav-link'>

                                <span className='menu-item'>
                                    {menuItem.title}
                                </span>
                            </IndexLinkContainer>
                        ))}
                        <IndexLinkContainer to='/'
                                            key='logout'
                                            className='nav-link'>
                                <span className='border border-white rounded menu-item ml-3 logout'>
                                    Logout
                                </span>
                        </IndexLinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = (state: AppState): NavMenuStateProps => ({
    isAdmin: state.auth.isAdmin
});

const connectedNavMenu = connect<NavMenuStateProps, {}, {}, AppState>(
    mapStateToProps
)(NavMenu);

export default withRouter(connectedNavMenu);
