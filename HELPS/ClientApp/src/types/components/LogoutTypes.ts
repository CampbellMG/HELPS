export interface LogoutStateProps {
    authenticated: boolean,
}

export interface LogoutDispatchProps {
    logOut: () => void
}

export interface LogoutProps extends LogoutStateProps, LogoutDispatchProps {

}