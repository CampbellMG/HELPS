import {RouteComponentProps} from 'react-router';

export interface NavMenuStateProps {
    isAdmin: boolean
}

export interface NavMenuProps extends NavMenuStateProps, RouteComponentProps {

}

export interface MenuItem {
    route: string
    title: string
}