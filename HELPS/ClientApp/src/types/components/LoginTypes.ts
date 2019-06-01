export interface LoginFields {
    username: string,
    password: string
}

export interface RegisterFields extends LoginFields {
    isAdmin: boolean;
}

export interface HomeStateProps {
    authenticated: boolean,
    error?: string
}

export interface HomeDispatchProps {
    login: (username: string, password: string) => void
    logout: () => void
}

export interface HomeProps extends HomeStateProps, HomeDispatchProps {

}