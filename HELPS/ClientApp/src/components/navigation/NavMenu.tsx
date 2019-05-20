import './NavMenu.css';
import * as React from 'react';
import {Component} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import uts from '../../res/uts-white.png';
import {IndexLinkContainer} from 'react-router-bootstrap';
import {AppState} from '../../types/store/StoreTypes';
import {connect} from 'react-redux';
import {NavMenuProps, NavMenuStateProps} from '../../types/components/NavMenuTypes';
import {AdminMenu, StudentMenu} from './Menu';
import {withRouter} from 'react-router';

class NavMenu extends Component<NavMenuProps> {

    render() {
        let {isAdmin, location} = this.props;
        const menuItems = isAdmin ? AdminMenu : StudentMenu;
        const currentPath = this.stripSlash(location.pathname)
        return (
            <header className='nav-menu'>
                <Navbar className='navbar-custom d-flex shadow'>
                    <Navbar.Brand href='/user' className='text-light ml-3'>
                        <img src={uts} alt='UTS Logo'/>
                    </Navbar.Brand>
                    <ul className='navbar-nav col ml-5'>
                        {menuItems.map((menuItem, index) => (
                            <IndexLinkContainer to={`/${menuItem.route}`}
                                                key={`${menuItem.route} ${index}`}
                                                className='text-light font-weight-bold link'>
                                <Nav.Item className={`mr-5 pb-1 ${currentPath === this.stripSlash(menuItem.route) ? 'border-bottom border-white' : ''}`}>
                                    {menuItem.title}
                                </Nav.Item>
                            </IndexLinkContainer>
                        ))}
                    </ul>
                    <IndexLinkContainer to='/' className='text-light font-weight-bold link'>
                        <Nav.Item className='mr-3 border border-white rounded p-1'>
                            Logout
                        </Nav.Item>
                    </IndexLinkContainer>
                </Navbar>
            </header>
        );
    }

    private stripSlash = (path: string) => path.replace(/\//g, '');
}

const mapStateToProps = (state: AppState): NavMenuStateProps => ({
    isAdmin: state.auth.isAdmin
});

const connectedNavMenu = connect<NavMenuStateProps, {}, {}, AppState>(
    mapStateToProps
)(NavMenu);

export default withRouter(connectedNavMenu);
