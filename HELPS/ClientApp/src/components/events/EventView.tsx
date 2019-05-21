import {connect} from 'react-redux';
import * as React from 'react';
import {Children, cloneElement, Component, ReactElement, ReactPropTypes} from 'react';
import {AppState} from '../../types/store/StoreTypes';
import {
    EventViewDispatchProps,
    EventViewProps,
    EventViewState,
    EventViewStateProps,
    CalendarEvent
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
import './EventView.css';
import {isWorkshop, Workshop} from '../../types/model/Workshop';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import {ThunkDispatch} from 'redux-thunk';
import StudentWorkshopDetailForm from './forms/StudentWorkshopDetailForm';
import {isSession, Session} from '../../types/model/Session';
import AdminSessionDetailForm from './forms/AdminSessionDetailForm';
import AdminWorkshopDetailForm from './forms/AdminWorkshopDetailForm';
import StudentSessionDetailForm from './forms/StudentSessionDetailForm';
import {
    addSession,
    bookSession,
    cancelSession,
    retrieveSessions,
    retrieveUserSessions
} from '../../store/actions/SessionActions';
import {HELPSEvent} from '../../types/model/HELPSEvent';
import {Button, Overlay, Popover} from 'react-bootstrap';

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
        const calendarEvents = events.concat(this.workshops)
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
        const {searchTerm, filterNotBooked, isAdmin, newEventRef} = {...this.props, ...this.state};
        return (
            <div className='row h-100 overflow-auto'>

                <div className='col-lg-2 border-right sticky-top'>
                    {this.renderForm()}
                </div>

                <div className='col m-3'>
                    <div className='h-100 flex-column'>

                        <InputGroup className='align-self-stretch d-flex pb-3 sticky-top'>
                            <Form.Control type='text'
                                          className='flex-fill'
                                          placeholder='Search...'
                                          value={searchTerm}
                                          onChange={this.onSearchUpdated}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>
                                    Already booked
                                    <input type='checkbox'
                                           className='ml-3'
                                           checked={filterNotBooked}
                                           onChange={this.onFilterNotBookedToggled}/>
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>

                        <BigCalendar
                            localizer={this.localizer}
                            events={this.events}
                            selectable={isAdmin}
                            onSelectSlot={this.onSelectSlot}
                            onSelectEvent={this.onSelectEvent}
                            eventPropGetter={this.getEventStyle}
                            components={{
                                eventWrapper: this.renderEventWrapper
                            }}/>

                        <Overlay target={newEventRef}
                                 show={newEventRef !== undefined}
                                 placement='bottom'
                                 container={this}>
                            {(props: any) => (
                                <Popover {...props} id='new-event-pop' title='Please select event type'>
                                    <Button className='m-1'
                                            onClick={() => this.onEventCreated('SESSION')}>Session</Button>
                                    <Button className='m-1'
                                            onClick={() => this.onEventCreated('WORKSHOP')}>Workshop</Button>
                                </Popover>
                            )}
                        </Overlay>

                    </div>
                </div>
            </div>
        );
    }

    private renderForm(): ReactElement {
        const {selectedEvent, isAdmin} = {...this.state, ...this.props};

        if (!selectedEvent) return <div/>;

        const props = {
            onSubmit: this.onEventSubmitted,
            booked: this.eventSelected(selectedEvent),
            initialValues: selectedEvent
        };

        if (isAdmin) {
            if (isSession(selectedEvent)) {
                return <AdminSessionDetailForm {...props}/>;
            }

            return <AdminWorkshopDetailForm {...props}/>;
        }

        if (isSession(selectedEvent)) {
            return <StudentSessionDetailForm {...props}/>;
        }

        return <StudentWorkshopDetailForm {...props}/>;
    }

    private getEventStyle = (event: CalendarEvent) => {
        let newStyle = {
            backgroundColor: 'lightgrey',
            color: 'black',
            borderRadius: '0px',
            border: 'none',
            opacity: 1
        };

        if (this.eventSelected(event)) {
            newStyle.backgroundColor = '#FF5168';
            newStyle.opacity = .5;
        }

        return {
            className: '',
            style: newStyle
        };
    };

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

    private onEventCreated(type: 'SESSION' | 'WORKSHOP') {
        const {newEvent} = this.state;
        if (!newEvent) return;

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
    }

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
