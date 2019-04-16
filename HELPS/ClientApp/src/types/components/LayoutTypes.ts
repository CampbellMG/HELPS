export interface LayoutStateProps {
    authenticated: boolean
}

export interface LayoutDispatchProps {
    login: () => void
}

export interface LayoutProps extends LayoutStateProps, LayoutDispatchProps {

}