import {MenuItem} from "../../types/components/NavMenuTypes";

export const AdminMenu: MenuItem[] = [
    {
        route: 'user',
        title: 'My Information'
    },
    {
        route: 'workshop_registration',
        title: 'Events'
    },
    {
        route: 'info',
        title: 'Information'
    }
];
export const StudentMenu: MenuItem[] = [
    {
        route: 'user',
        title: 'Students'
    },
    {
        route: 'email',
        title: 'Emails'
    },
    {
        route: 'message',
        title: 'Messages'
    },
    {
        route: 'room',
        title: 'Rooms'
    },
    {
        route: 'message',
        title: 'Messages'
    }
];