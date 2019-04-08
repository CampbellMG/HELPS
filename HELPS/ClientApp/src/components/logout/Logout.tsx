import * as React from 'react';
import {Component} from 'react';
import {AppState} from '../../types/store/StoreTypes';
import {UserDispatchProps, UserProps, UserStateProps} from '../../types/components/UserTypes';
import { logoutUser } from '../../store/actions/AuthActions';
import Home from '../home/Home';
import { retrieveUser } from '../../store/actions/UserActions';

export default class Logout extends Component<UserProps> {

  render() {
    //console.log("output");
    return (
      <Home />
    )}
}

retrieveUser();

const mapStateToProps = (state: AppState): UserStateProps => ({
  authenticated: state.auth.authenticated,
});
