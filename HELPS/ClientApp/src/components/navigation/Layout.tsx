import NavMenu from './NavMenu';
import * as React from 'react';
import {AppState} from '../../types/store/StoreTypes';
import {connect} from 'react-redux';
import {LayoutProps} from '../../types/components/LayoutTypes';
import './Layout.css';

class Layout extends React.Component<LayoutProps> {
    render(): React.ReactNode {
        return (
            <div className='h-100 full-container shadow-lg rounded'>
                {
                    this.props.authenticated &&
                    <NavMenu/>
                }
                <div className='m-3 h-100'>
                    {this.props.children}
                </div>
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