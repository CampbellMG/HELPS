import {Container} from 'reactstrap';
import NavMenu from './NavMenu';
import * as React from 'react';
import {AppState} from '../../types/store/StoreTypes';
import {connect} from 'react-redux';
import {LayoutProps} from '../../types/components/LayoutTypes';

class Layout extends React.Component<LayoutProps> {
    render(): React.ReactNode {
        return (
            <div>
                {
                    this.props.authenticated &&
                    <NavMenu/>
                }
                <Container>
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