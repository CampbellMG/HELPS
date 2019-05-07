export interface AppStateProps {
    authenticated: boolean
}

export interface AppDispatchProps {
    loadExistingSession: () => void
}

export interface AppProps extends AppStateProps, AppDispatchProps {

}