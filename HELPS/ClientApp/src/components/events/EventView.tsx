import * as React from 'react';
import {Component} from 'react';
import {AppState} from '../../types/store/StoreTypes';
import {
    CalendarEvent,
    DeleteableHELPSEvent,
    EventViewDispatchProps,
    EventViewProps,
    EventViewState,
    EventViewStateProps,
    Filter,
    WorkshopFormData
} from '../../types/components/WorkshopRegistrationTypes';
import {
    addWorkshop,
    bookWorkshop,
    cancelWorkshop,
    retrieveUserWorkshops,
    retrieveWorkshops,
    updateWorkshop
} from '../../store/actions/WorkshopActions';
import BigCalendar, {stringOrDate} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {isWorkshop, Workshop} from '../../types/model/Workshop';
import {ThunkDispatch} from 'redux-thunk';
import {isSession, Session} from '../../types/model/Session';
import {
    addSession,
    bookSession,
    cancelSession,
    retrieveSessions,
    retrieveUserSessions,
    updateSession
} from '../../store/actions/SessionActions';
import {HELPSEvent} from '../../types/model/HELPSEvent';
import {CalendarFilter} from './eventView/CalendarFilter';
import {EventForm} from './eventView/EventForm';
import {rrulestr} from 'rrule';
import {fetchMessages} from '../../store/actions/MessageActions';

export default abstract class EventView extends Component<EventViewProps, EventViewState> {
    abstract showWorkshops: boolean;
    abstract showSessions: boolean;

    private localizer = BigCalendar.momentLocalizer(moment);

    private get sessions(): Session[] {
        let {filters, searchTerm, selectedEvent, sessions} = {...this.state, ...this.props};

        if (selectedEvent && isSession(selectedEvent)) {
            sessions = sessions.filter(session => selectedEvent && session.id !== selectedEvent.id);
            sessions.push(selectedEvent);
        }

        if (filters.includes('Booked')) {
            sessions = sessions.filter(session => session.studentId);
        }

        return sessions
            .filter(workshop => searchTerm.length === 0 || workshop.type.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    private get workshops(): Workshop[] {
        let {searchTerm, selectedEvent, workshops} = {...this.state, ...this.props};

        if (selectedEvent && isWorkshop(selectedEvent)) {
            workshops = workshops.filter(workshop => selectedEvent && workshop.id !== selectedEvent.id);
            workshops.push(selectedEvent);
        }

        return workshops
            .filter(workshop => searchTerm.length === 0 || workshop.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    private get events(): CalendarEvent[] {
        let events: HELPSEvent[] = [];

        if (this.showWorkshops) {
            events = events.concat(this.workshops);
        }

        if (this.showSessions) {
            events = events.concat(this.sessions);
        }

        return events
            .map(event => {
                const startTime = moment(event.startDate);
                const endTime = moment(event.endDate);

                return {
                    ...event,
                    endDate: endTime.toISOString(),
                    start: startTime.toDate(),
                    end: endTime.toDate()
                };
            });
    }

    componentDidMount(): void {
        this.props.retrieveWorkshops();
        this.props.retrieveSessions();
        this.props.retrieveMessages();

        if (!this.props.isAdmin) {
            this.props.retrieveUserSessions();
            this.props.retrieveUserWorkshops();
        }
    }

    constructor(props: EventViewProps) {
        super(props);

        this.state = {
            searchTerm: '',
            filters: []
        };
    }

    render(): React.ReactNode {
        const {isAdmin, messages, selectedEvent} = {...this.props, ...this.state};
        return (
            <div className='row h-100 overflow-auto'>

                <EventForm isAdmin={isAdmin}
                           selectedEvent={selectedEvent}
                           onEventSubmitted={this.onEventSubmitted}
                           eventSelected={selectedEvent !== undefined && this.eventSelected(selectedEvent)}
                           eventChanged={this.onEventChanged}/>

                <div className='col m-3'>
                    <div className='h-100 flex-column'>

                        {
                            messages.eventNotification &&
                            <div className='bg-primary login-container mb-2 text-light justify-content-center d-flex pt-3'
                                 dangerouslySetInnerHTML={{__html: messages.eventNotification}}/>
                        }

                        <CalendarFilter onSearchUpdated={this.onSearchUpdated}
                                        onFilterUpdated={this.onFiltersUpdated}/>

                        <BigCalendar
                            localizer={this.localizer}
                            events={this.events}
                            selectable={isAdmin}
                            defaultView='week'
                            onSelectSlot={this.onSelectSlot}
                            onSelectEvent={this.onSelectEvent}
                            eventPropGetter={event => this.getEventStyle(event, this.eventSelected(event))}/>

                    </div>
                </div>

            </div>
        );
    }

    private getEventStyle = (event: CalendarEvent, eventSelected: boolean) => ({
        className: '',
        style: {
            backgroundColor: eventSelected ? '#FF5168' : 'lightgrey',
            color: 'black',
            borderRadius: '0px',
            border: 'none',
            opacity: eventSelected ? .5 : 1
        }
    });

    private onSearchUpdated = (searchTerm: string) => this.setState({searchTerm});
    private onFiltersUpdated = (filters: Filter[]) => this.setState({filters});
    private onSelectEvent = (event: CalendarEvent) => this.setState({selectedEvent: event});
    private onEventChanged = (selectedEvent: CalendarEvent) => this.setState({selectedEvent});

    private onEventSubmitted = (event: DeleteableHELPSEvent) => {
        this.setState({selectedEvent: undefined});

        if (isSession(event)) {
            if (this.props.isAdmin) {
                if (event.delete) {
                    return this.props.cancelSession(event);
                }

                return this.props.updateSession(event);
            }

            if (this.eventSelected(event)) {
                return this.props.cancelSession(event);
            }

            this.props.bookSession(event);
        }

        if (isWorkshop(event)) {
            if (this.props.isAdmin) {
                if (event.delete) {
                    return this.props.cancelWorkshop(event);
                }

                return this.saveWorkshop(event);
            }

            if (this.eventSelected(event)) {
                return this.props.cancelWorkshop(event);
            }

            this.props.bookWorkshop(event);
        }
    };

    private saveWorkshop(workshopFormData: WorkshopFormData) {
        if (workshopFormData.rRule) {
            const rule = rrulestr(workshopFormData.rRule);
            const workshops = rule.all().map(date => ({
                ...workshopFormData,
                time: date.toString()
            }));

            this.props.addWorkshops(workshops);
        }

        this.props.updateWorkshop(workshopFormData);
    }

    private onSelectSlot = ({start, end}: { start: stringOrDate, end: stringOrDate }) => {
        const startTime = moment(start);
        const endTime = moment(end);
        const duration = moment.duration(endTime.diff(startTime));
        const newEvent = {
            id: -1,
            start: startTime.toDate(),
            end: endTime.toDate(),
            startDate: start.toString(),
            endDate: end.toString(),
            roomId: -1,
            time: start.toString(),
            duration: duration.asMinutes().toString()
        };

        this.onEventCreated(newEvent);
    };

    private onEventCreated = (event: CalendarEvent) => {

        if (this.showSessions) {
            return this.props.addSession({
                ...event,
                advisorId: -1,
                studentId: -1,
                type: '',
                purpose: '',
                subjectName: '',
                assignmentType: '',
                groupAssignment: false,
                assistance: '',
                attendance: false,
                comments: '',
                files: []
            });
        }

        this.props.addWorkshops([{
            ...event,
            title: '',
            cutOff: 0,
            maximum: 0,
            targetGroup: '',
            description: '',
            availablePlaces: 0,
            skillId: -1,
            assignedStudentIds: []
        }]);
    };

    private eventSelected(event: HELPSEvent) {
        if (isSession(event)) {
            return this.props.userSessions.findIndex(session => session.id === event.id) !== -1;
        }

        return this.props.userWorkshops.findIndex(workshop => workshop.id === event.id) !== -1;
    }
}

export const mapEventViewStateToProps = (state: AppState): EventViewStateProps => ({
    authenticated: state.auth.authenticated,
    error: state.workshops.error,
    isAdmin: state.auth.isAdmin,
    workshops: state.workshops.workshops,
    userWorkshops: state.workshops.userWorkshops,
    sessions: state.session.sessions,
    userSessions: state.session.userSessions,
    messages: state.message.indexedMessages
});

export const mapEventViewDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): EventViewDispatchProps => ({
    retrieveWorkshops: () => dispatch(retrieveWorkshops()),
    retrieveUserWorkshops: () => dispatch(retrieveUserWorkshops()),
    bookWorkshop: workshop => dispatch(bookWorkshop(workshop)),
    cancelWorkshop: workshop => dispatch(cancelWorkshop(workshop)),
    addWorkshops: workshop => dispatch(addWorkshop(workshop)),
    updateWorkshop: workshop => dispatch(updateWorkshop(workshop)),

    retrieveSessions: () => dispatch(retrieveSessions()),
    retrieveUserSessions: () => dispatch(retrieveUserSessions()),
    bookSession: session => dispatch(bookSession(session)),
    cancelSession: session => dispatch(cancelSession(session)),
    addSession: session => dispatch(addSession(session)),
    updateSession: session => dispatch(updateSession(session)),

    retrieveMessages: () => dispatch(fetchMessages())
});
