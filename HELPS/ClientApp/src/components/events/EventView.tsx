import {connect} from 'react-redux';
import * as React from 'react';
import {Children, cloneElement, Component, ReactElement} from 'react';
import {AppState} from '../../types/store/StoreTypes';
import {
    CalendarEvent, DeleteableHELPSEvent,
    EventViewDispatchProps,
    EventViewProps,
    EventViewState,
    EventViewStateProps, Filter,
    HELPSEventType, WorkshopFormData
} from '../../types/components/WorkshopRegistrationTypes';
import {
    addWorkshop,
    bookWorkshop,
    cancelWorkshop,
    retrieveUserWorkshops,
    retrieveWorkshops,
    updateWorkshop
} from '../../store/actions/WorkshopActions';
import BigCalendar, {EventWrapperProps, stringOrDate} from 'react-big-calendar';
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
import {NewEventOverlay} from './eventView/NewEventOverlay';
import {CalendarFilter} from './eventView/CalendarFilter';
import {EventForm} from './eventView/EventForm';
import RRule, {rrulestr} from 'rrule';

class EventView extends Component<EventViewProps, EventViewState> {
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
        const {filters, newEvent} = this.state;
        let events: HELPSEvent[] = [];

        if (!filters.includes('Sessions')) {
            events = events.concat(this.workshops);
        }

        if (!filters.includes('Workshops')) {
            events = events.concat(this.sessions);
        }

        const calendarEvents = events
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

        if (newEvent) {
            calendarEvents.push(newEvent);
        }

        return calendarEvents;
    }

    componentDidMount(): void {
        this.props.retrieveWorkshops();
        this.props.retrieveSessions();

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
        const {searchTerm, isAdmin, newEventRef, selectedEvent} = {...this.props, ...this.state};
        return (
            <div className='row h-100 overflow-auto'>

                <EventForm isAdmin={isAdmin}
                           selectedEvent={selectedEvent}
                           onEventSubmitted={this.onEventSubmitted}
                           eventSelected={selectedEvent !== undefined && this.eventSelected(selectedEvent)}
                           eventChanged={this.onEventChanged}/>

                <div className='col m-3'>
                    <div className='h-100 flex-column'>

                        <CalendarFilter onSearchUpdated={this.onSearchUpdated}
                                        onFilterUpdated={this.onFiltersUpdated}/>

                        <BigCalendar
                            localizer={this.localizer}
                            events={this.events}
                            selectable={isAdmin}
                            onSelectSlot={this.onSelectSlot}
                            onSelectEvent={this.onSelectEvent}
                            eventPropGetter={event => this.getEventStyle(event, this.eventSelected(event))}
                            components={{eventWrapper: this.renderEventWrapper}}/>

                        <NewEventOverlay container={this}
                                         newEventRef={newEventRef}
                                         onSelect={this.onEventCreated}/>

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

    private renderEventWrapper: React.FunctionComponent<EventWrapperProps<CalendarEvent>> = (props) => {
        const childElement = Children.only(props.children) as ReactElement;

        if (this.state.newEvent && props.event.id === this.state.newEvent.id) {
            return cloneElement(childElement, {ref: this.populateRef});
        }

        return childElement;
    };

    private onSearchUpdated = (searchTerm: string) => this.setState({searchTerm});
    private onFiltersUpdated = (filters: Filter[]) => this.setState({filters});
    private onSelectEvent = (event: CalendarEvent) => this.setState({selectedEvent: event});
    private populateRef = (newEventRef: any) => this.setState({newEventRef});
    private clearNewEvent = () => this.setState({newEvent: undefined, newEventRef: undefined});
    private onEventChanged = (selectedEvent: CalendarEvent) => {
        console.log(selectedEvent);
        this.setState({selectedEvent});
    }

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

        this.setState({
            newEvent: {
                id: -1,
                start: startTime.toDate(),
                end: endTime.toDate(),
                startDate: start.toString(),
                endDate: end.toString(),
                roomId: -1,
                time: start.toString(),
                duration: duration.asMinutes().toString()
            }
        });
    };

    private onEventCreated = (type: HELPSEventType) => {
        const {newEvent} = this.state;
        if (!newEvent) return;

        this.clearNewEvent();

        if (type === 'SESSION') {
            return this.props.addSession({
                ...newEvent,
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
            ...newEvent,
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

const mapStateToProps = (state: AppState): EventViewStateProps => ({
    authenticated: state.auth.authenticated,
    error: state.workshops.error,
    isAdmin: state.auth.isAdmin,
    workshops: state.workshops.workshops,
    userWorkshops: state.workshops.userWorkshops,
    sessions: state.session.sessions,
    userSessions: state.session.userSessions,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): EventViewDispatchProps => ({
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
    updateSession: session => dispatch(updateSession(session))
});

export default connect<EventViewStateProps, EventViewDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(EventView);
