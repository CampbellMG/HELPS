import NavMenu from './NavMenu';
import * as React from 'react';
import {AppState} from '../../types/store/StoreTypes';
import {connect} from 'react-redux';
import {LayoutDispatchProps, LayoutProps, LayoutStateProps} from '../../types/components/LayoutTypes';
import './Layout.css';
import {Dispatch} from 'redux';
import {getExistingSession} from '../../store/actions/AuthActions';
import { ThunkDispatch } from 'redux-thunk';

class Layout extends React.Component<LayoutProps> {
    componentWillMount(): void {
        this.props.login();
    }

    render(): React.ReactNode {
        return (
            <div className='h-100 full-container full-wrapper shadow-lg d-flex flex-column'>
                {
                    this.props.authenticated &&
                    <NavMenu/>
                }
                {
                    <div className={(this.props.authenticated ? 'bg-white content-wrapper' : ' full-container') + ' flex-fill d-flex flex-column'}>
                        {this.props.children}
                    </div>
                }

            </div>
        );
    }
}

const mapStateToProps = (state: AppState): LayoutStateProps => ({
    authenticated: state.auth.authenticated
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): LayoutDispatchProps => ({
    login: () => dispatch(getExistingSession())
});

export default connect<LayoutStateProps, LayoutDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(Layout);