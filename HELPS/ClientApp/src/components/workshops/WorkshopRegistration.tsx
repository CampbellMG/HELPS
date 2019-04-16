import {connect} from 'react-redux';
import * as React from 'react';
import {Component} from 'react';
import {AppState} from '../../types/store/StoreTypes';
import {Dispatch} from 'redux';
import {
    WorkshopEvent,
    WorkshopRegistrationDispatchProps,
    WorkshopRegistrationProps,
    WorkshopRegistrationStateProps
} from '../../types/components/WorkshopRegistrationTypes';
import {
    bookWorkshop,
    retrieveUserWorkshops,
    retrieveWorkshops
} from '../../store/actions/WorkshopActions';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './WorkshopRegistration.css';
import WorkshopDetailsForm from './WorkshopDetailsForm';
import {Workshop} from '../../types/model/Workshop';

interface WorkshopRegistrationState {
    selectedWorkshop?: Workshop
}

class WorkshopRegistration extends Component<WorkshopRegistrationProps, WorkshopRegistrationState> {
    private localizer = BigCalendar.momentLocalizer(moment);

    private get events(): WorkshopEvent[] {
        return this.props.workshops.map(workshop => {
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

        this.state = {};
    }

    render(): React.ReactNode {
        const {selectedWorkshop} = this.state;
        return (
            <div className='row h-100'>
                <div className='col-lg-2 border-right'>
                    <WorkshopDetailsForm onSubmit={this.onBookEvent}
                                         disabled={!selectedWorkshop || this.eventSelected(selectedWorkshop)}
                                         initialValues={this.state.selectedWorkshop}/>
                </div>
                <div className='col m-3'>
                    {this.props.error && <p>{this.props.error}</p>}
                    {!this.props.authenticated && <p>Not authenticated</p>}
                    {
                        this.props.authenticated &&
                        <BigCalendar
                            className='h-100'
                            localizer={this.localizer}
                            events={this.events}
                            onSelectEvent={this.onSelectEvent}
                            eventPropGetter={(event) => {
                                let newStyle = {
                                    backgroundColor: 'lightgrey',
                                    color: 'black',
                                    borderRadius: '0px',
                                    border: 'none',
                                    opacity: 1
                                };

                                if (this.props.userWorkshops.findIndex(workshop => workshop.id === event.id) !== -1) {
                                    newStyle.backgroundColor = '#FF5168';
                                    newStyle.opacity = .5;
                                }

                                return {
                                    className: '',
                                    style: newStyle
                                };
                            }
                            }
                        />
                    }
                </div>
            </div>
        );
    }

    private eventSelected(event: Workshop) {
        return this.props.userWorkshops.findIndex(workshop => workshop.id === event.id) !== -1;
    }

    private onSelectEvent = (event: Workshop) => this.setState({selectedWorkshop: event});

    private onBookEvent = (event: Workshop) => {
        if (this.eventSelected(event)) {
            return;
        }
        this.props.bookWorkshop(event);
    };
}

const mapStateToProps = (state: AppState): WorkshopRegistrationStateProps => ({
    authenticated: state.auth.authenticated,
    workshops: state.workshops.workshops,
    userWorkshops: state.workshops.userWorkshops,
    error: state.workshops.error
});

const mapDispatchToProps = (dispatch: Dispatch<{}>): WorkshopRegistrationDispatchProps => ({
    retrieveWorkshops: () => dispatch(retrieveWorkshops()),
    retrieveUserWorkshops: () => dispatch(retrieveUserWorkshops()),
    bookWorkshop: (workshop) => dispatch(bookWorkshop(workshop))
});

export default connect<WorkshopRegistrationStateProps, WorkshopRegistrationDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(WorkshopRegistration);
