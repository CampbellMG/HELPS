export interface NavMenuStateProps {
    isAdmin: boolean
}

export interface NavMenuProps extends NavMenuStateProps {

}

export interface MenuItem {
    route: string
    title: string
}