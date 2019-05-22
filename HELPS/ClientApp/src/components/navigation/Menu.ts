import {MenuItem} from '../../types/components/NavMenuTypes';

export const AdminMenu: MenuItem[] = [
    {
        route: 'events',
        title: 'Events'
    },
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
        route: 'skill',
        title: 'Workshop Skill Sets'
    },
    {
        route: 'advisors',
        title: 'Advisors'
    },
    {
        route: 'reports',
        title: 'Reports'
    }
];

export const StudentMenu: MenuItem[] = [
    {
        route: 'events',
        title: 'Events'
    },
    {
        route: 'user',
        title: 'My Information'
    },
    {
        route: 'info',
        title: 'Information'
    }
];