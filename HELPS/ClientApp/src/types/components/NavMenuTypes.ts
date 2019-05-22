import {RouteComponentProps} from 'react-router';

export interface NavMenuStateProps {
    isAdmin: boolean
}

export interface NavMenuProps extends NavMenuStateProps, RouteComponentProps {

}

export type HELPSRoute =
    'register' |
    'message' |
    'room' |
    'user' |
    'events' |
    'info' |
    'email' |
    'advisors' |
    'reports' |
    'skill';

export interface MenuItem {
    route: HELPSRoute
    title: string
}