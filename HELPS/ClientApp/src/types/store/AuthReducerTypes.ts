export interface AuthState {
    isAuthenticating: boolean,
    authenticated: boolean
    error?: string,
    isAdmin: boolean
}