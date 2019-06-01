import { RegisterFields } from './LoginTypes';

export interface RegisterStateProps {
    username: string;
    password: string;
    isAdmin: boolean;
}

export interface RegisterDispatchProps {
    register: (fields: RegisterFields | undefined) => void;
}

export interface RegisterProps extends RegisterStateProps, RegisterDispatchProps {

}