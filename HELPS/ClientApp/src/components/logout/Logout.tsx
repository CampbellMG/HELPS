import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import * as React from 'react';
import {Component} from 'react';
import {AppState} from '../../types/store/StoreTypes';
import { logoutUser } from '../../store/actions/AuthActions';
import Home from '../home/Home';
import { LogoutStateProps, LogoutDispatchProps, LogoutProps } from '../../types/components/LogoutTypes';

class Logout extends Component<LogoutProps> {

  componentDidMount() {
    if (this.props.authenticated) {
      this.props.logOut();
    }
  }

  render() {
    return (
      <Home />
    )}
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
)(Logout);
