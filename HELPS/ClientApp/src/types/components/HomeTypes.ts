export interface HomeStateProps {
    authenticated: boolean,
    error?: string
}

export interface HomeDispatchProps {
    login: (username: string, password: string) => void
}

export interface HomeProps extends HomeStateProps, HomeDispatchProps {

}