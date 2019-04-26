export interface RegisterStateProps {
    registerSuccess?: boolean;
    error?: string;
}

export interface RegisterDispatchProps {
    register: (username: string, password: string) => void;
}

export interface RegisterProps extends RegisterStateProps, RegisterDispatchProps {

}