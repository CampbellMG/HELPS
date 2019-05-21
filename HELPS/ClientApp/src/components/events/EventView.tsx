import {connect} from 'react-redux';
import * as React from 'react';
import {Children, cloneElement, Component, ReactElement} from 'react';
import {AppState} from '../../types/store/StoreTypes';
import {
    CalendarEvent,
    EventViewDispatchProps,
    EventViewProps,
    EventViewState,
    EventViewStateProps,
    HELPSEventType
} from '../../types/components/WorkshopRegistrationTypes';
import {
    addWorkshop,
    bookWorkshop,
    cancelWorkshop,
    retrieveUserWorkshops,
    retrieveWorkshops
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
    retrieveUserSessions
} from '../../store/actions/SessionActions';
import {HELPSEvent} from '../../types/model/HELPSEvent';
import {NewEventOverlay} from './eventView/NewEventOverlay';
import {CalendarFilter} from './eventView/CalendarFilter';
import {EventForm} from './eventView/EventForm';

class EventView extends Component<EventViewProps, EventViewState> {
    private localizer = BigCalendar.momentLocalizer(moment);

    private get sessions(): Session[] {
        const {filterNotBooked} = this.state;
        return this.props.sessions
            .filter(session => !filterNotBooked || this.eventSelected(session));
    }

    private get workshops(): Workshop[] {
        const {filterNotBooked, searchTerm} = this.state;
        return this.props.workshops
            .filter(workshop => !filterNotBooked || this.eventSelected(workshop))
            .filter(workshop => searchTerm.length === 0 || workshop.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    private get events(): CalendarEvent[] {
        const events: HELPSEvent[] = this.sessions;
        const calendarEvents = events
            .concat(this.workshops)
            .map(event => {
                const startTime = moment(event.time);
                const endTime = startTime.clone().add(event.duration, 'minute');

                return {
                    ...event,
                    start: startTime.toDate(),
                    end: endTime.toDate()
                };
            });

        if (this.state.newEvent) {
            calendarEvents.push(this.state.newEvent);
        }

        return calendarEvents;
    }

    componentDidMount(): void {
        this.props.retrieveWorkshops();
        this.props.retrieveUserWorkshops();
        this.props.retrieveSessions();
        this.props.retrieveUserSessions();
    }

    constructor(props: EventViewProps) {
        super(props);

        this.state = {
            searchTerm: '',
            filterNotBooked: false
        };
    }

    render(): React.ReactNode {
        const {searchTerm, filterNotBooked, isAdmin, newEventRef, selectedEvent} = {...this.props, ...this.state};
        return (
            <div className='row h-100 overflow-auto' >

                <EventForm isAdmin={isAdmin}
                           selectedEvent={selectedEvent}
                           onEventSubmitted={this.onEventSubmitted}
                           eventSelected={selectedEvent !== undefined && this.eventSelected(selectedEvent)}/>

                <div className='col m-3'>
                    <div className='h-100 flex-column'>

                        <CalendarFilter searchTerm={searchTerm}
                                        filterNotBooked={filterNotBooked}
                                        onSearchUpdated={this.onSearchUpdated}
                                        onFilterNotBookedToggled={this.onFilterNotBookedToggled}/>

                        <BigCalendar
                            localizer={this.localizer}
                            events={this.events}
                            selectable={isAdmin}
                            onSelectSlot={this.onSelectSlot}
                            onSelectEvent={this.onSelectEvent}
                            eventPropGetter={event => this.getEventStyle(event, this.eventSelected(event))}
                            components={{
                                eventWrapper: this.renderEventWrapper
                            }}/>

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

    private onSearchUpdated = (event: any) => this.setState({searchTerm: event.target.value});
    private onFilterNotBookedToggled = () => this.setState({filterNotBooked: !this.state.filterNotBooked});
    private onSelectEvent = (event: CalendarEvent) => this.setState({selectedEvent: event});
    private populateRef = (newEventRef: any) => this.setState({newEventRef});
    private clearNewEvent = () => this.setState({newEvent: undefined, newEventRef: undefined});

    private onEventSubmitted = (event: HELPSEvent) => {
        if (this.eventSelected(event)) {
            if (isSession(event)) {
                return this.props.cancelSession(event);
            }

            if (isWorkshop(event)) {
                return this.props.cancelWorkshop(event);
            }
        }

        if (isSession(event)) {
            return this.props.bookSession(event);
        }

        if (isWorkshop(event)) {
            this.props.bookWorkshop(event);
        }
    };

    private onSelectSlot = ({start, end}: { start: stringOrDate, end: stringOrDate }) => {
        const startTime = moment(start);
        const endTime = moment(end);
        const duration = moment.duration(endTime.diff(startTime));

        this.setState({
            newEvent: {
                id: -1,
                start: startTime.toDate(),
                end: endTime.toDate(),
                roomId: -1,
                time: start.toString(),
                duration: duration.asMinutes()
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
                type: ''
            });
        }

        this.props.addWorkshop({
            ...newEvent,
            title: '',
            cutOff: 0,
            maximum: 0,
            targetGroup: '',
            description: '',
            availablePlaces: 0
        });
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
    workshops: state.workshops.workshops,
    userWorkshops: state.workshops.userWorkshops,
    sessions: state.session.sessions,
    userSessions: state.session.userSessions,
    error: state.workshops.error,
    isAdmin: state.auth.isAdmin
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): EventViewDispatchProps => ({
    retrieveWorkshops: () => dispatch(retrieveWorkshops()),
    retrieveUserWorkshops: () => dispatch(retrieveUserWorkshops()),
    bookWorkshop: workshop => dispatch(bookWorkshop(workshop)),
    cancelWorkshop: workshop => dispatch(cancelWorkshop(workshop)),
    addWorkshop: workshop => dispatch(addWorkshop(workshop)),
    retrieveSessions: () => dispatch(retrieveSessions()),
    retrieveUserSessions: () => dispatch(retrieveUserSessions()),
    bookSession: session => dispatch(bookSession(session)),
    cancelSession: session => dispatch(cancelSession(session)),
    addSession: session => dispatch(addSession(session))
});

export default connect<EventViewStateProps, EventViewDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(EventView);
