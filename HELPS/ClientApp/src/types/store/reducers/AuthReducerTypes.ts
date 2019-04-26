export interface AuthState {
    isAuthenticating: boolean,
    authenticated: boolean
    error?: string,
    registered?: boolean
}