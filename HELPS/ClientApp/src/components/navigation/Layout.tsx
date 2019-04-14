import NavMenu from './NavMenu';
import * as React from 'react';
import {AppState} from '../../types/store/StoreTypes';
import {connect} from 'react-redux';
import {LayoutProps} from '../../types/components/LayoutTypes';
import Container from 'react-bootstrap/Container';
import './Layout.css'

class Layout extends React.Component<LayoutProps> {
    render(): React.ReactNode {
        return (
            <div className='h-100 full-container'>
                {
                    this.props.authenticated &&
                    <NavMenu/>
                }
                <Container className='h-100'>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): LayoutProps => ({
    authenticated: state.auth.authenticated
});

export default connect<LayoutProps, {}, {}, AppState>(
    mapStateToProps
)(Layout);