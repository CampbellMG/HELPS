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

class WorkshopRegistration extends Component<WorkshopRegistrationProps> {
    private localizer = BigCalendar.momentLocalizer(moment);

    private get events(): WorkshopEvent[] {
        return this.props.workshops.map(workshop => {
            const startTime = moment(workshop.time);
            const endTime = startTime.clone().add(workshop.duration, 'minute');

            return {
                ...workshop,
                start: startTime.toDate(),
                end: endTime.toDate(),
                
            };
        });
    }

    componentDidMount(): void {
        this.props.retrieveWorkshops();
        this.props.retrieveUserWorkshops();
    }

    render(): React.ReactNode {
        return (
            <div>
                {this.props.error && <p>{this.props.error}</p>}
                {!this.props.authenticated && <p>Not authenticated</p>}
                {
                    this.props.authenticated &&
                    <BigCalendar
                        localizer={this.localizer}
                        events={this.events}
                        onSelectEvent={this.onSelectEvent}
                        eventPropGetter={(event, start, end, isSelected) => {
                            let newStyle = {
                              backgroundColor: "lightgrey",
                              color: 'black',
                              borderRadius: "0px",
                              border: "none",
                              opacity: 1
                            };
                      
                            if (this.props.userWorkshops.findIndex(workshop => workshop.id === event.id) !== -1){
                              newStyle.backgroundColor = "lightgreen"
                              newStyle.opacity = .5
                            }
                      
                            return {
                              className: "",
                              style: newStyle
                            };
                            }
                        }
                          />
                }
            </div>
        );
    }

    private eventSelected(event: WorkshopEvent) {
        return this.props.userWorkshops.findIndex(workshop => workshop.id === event.id) !== -1;
    }

    private onSelectEvent = (event: WorkshopEvent) => {
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
