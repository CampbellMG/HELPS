import {connect} from 'react-redux';
import * as React from 'react';
import {Component} from 'react';
import {AppState} from '../../types/store/StoreTypes';
import {Dispatch} from 'redux';
import {
    WorkshopEvent,
    WorkshopRegistrationDispatchProps,
    WorkshopRegistrationProps, WorkshopRegistrationState,
    WorkshopRegistrationStateProps
} from '../../types/components/WorkshopRegistrationTypes';
import {
    bookWorkshop,
    cancelWorkshop,
    retrieveUserWorkshops,
    retrieveWorkshops
} from '../../store/actions/WorkshopActions';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './WorkshopRegistration.css';
import WorkshopDetailsForm from './WorkshopDetailsForm';
import {Workshop} from '../../types/model/Workshop';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { ThunkDispatch } from 'redux-thunk';

class WorkshopRegistration extends Component<WorkshopRegistrationProps, WorkshopRegistrationState> {
    private localizer = BigCalendar.momentLocalizer(moment);

    private get events(): WorkshopEvent[] {
        const {filterNotBooked, searchTerm} = this.state;

        return this.props.workshops
            .filter(workshop => !filterNotBooked || this.eventSelected(workshop))
            .filter(workshop => searchTerm.length === 0 || workshop.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(workshop => {
                const startTime = moment(workshop.time);
                const endTime = startTime.clone().add(workshop.duration, 'minute');

                return {
                    ...workshop,
                    start: startTime.toDate(),
                    end: endTime.toDate()

                };
            });
    }

    componentDidMount(): void {
        this.props.retrieveWorkshops();
        this.props.retrieveUserWorkshops();
    }

    constructor(props: WorkshopRegistrationProps) {
        super(props);

        this.state = {
            searchTerm: '',
            filterNotBooked: false
        };
    }

    render(): React.ReactNode {
        const {selectedWorkshop} = this.state;
        return (
            <div className='row h-100 overflow-auto'>
                {this.props.error && <p>{this.props.error}</p>}
                {!this.props.authenticated && <p>Not authenticated</p>}
                <div className='col-lg-2 border-right'>
                    <div className='sticky-top'>
                        <WorkshopDetailsForm onSubmit={this.onEventSubmitted}
                                             disabled={selectedWorkshop === undefined}
                                             booked={selectedWorkshop !== undefined && this.eventSelected(selectedWorkshop)}
                                             initialValues={this.state.selectedWorkshop}/>
                    </div>
                </div>
                <div className='col m-3'>
                    {
                        this.props.authenticated &&
                        <div className='h-100 flex-column'>

                            <InputGroup className='align-self-stretch d-flex pb-3 sticky-top'>
                                <Form.Control type='text'
                                              className='flex-fill'
                                              placeholder='Search...'
                                              value={this.state.searchTerm}
                                              onChange={this.onSearchUpdated}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        Already booked
                                        <input type='checkbox'
                                               className='ml-3'
                                               checked={this.state.filterNotBooked}
                                               onChange={this.onFilterNotBookedToggled}/>
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>

                            <BigCalendar
                                localizer={this.localizer}
                                events={this.events}
                                onSelectEvent={this.onSelectEvent}
                                eventPropGetter={this.getEventStyle}
                            />

                        </div>
                    }
                </div>
            </div>
        );
    }

    private onSearchUpdated = (event: any) => this.setState({searchTerm: event.target.value});
    private onFilterNotBookedToggled = () => this.setState({filterNotBooked: !this.state.filterNotBooked});

    private eventSelected(event: Workshop) {
        return this.props.userWorkshops.findIndex(workshop => workshop.id === event.id) !== -1;
    }

    private onSelectEvent = (event: Workshop) => this.setState({selectedWorkshop: event});

    private onEventSubmitted = (event: Workshop) => {
        if (this.eventSelected(event)) {
            return this.props.cancelWorkshop(event);
        }

        this.props.bookWorkshop(event);
    };

    private getEventStyle = (event: WorkshopEvent) => {
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
}

const mapStateToProps = (state: AppState): WorkshopRegistrationStateProps => ({
    authenticated: state.auth.authenticated,
    workshops: state.workshops.workshops,
    userWorkshops: state.workshops.userWorkshops,
    error: state.workshops.error
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): WorkshopRegistrationDispatchProps => ({
    retrieveWorkshops: () => dispatch(retrieveWorkshops()),
    retrieveUserWorkshops: () => dispatch(retrieveUserWorkshops()),
    bookWorkshop: (workshop) => dispatch(bookWorkshop(workshop)),
    cancelWorkshop: workshop => dispatch(cancelWorkshop(workshop))
});

export default connect<WorkshopRegistrationStateProps, WorkshopRegistrationDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(WorkshopRegistration);
