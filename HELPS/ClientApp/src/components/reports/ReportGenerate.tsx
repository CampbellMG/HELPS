import {connect} from 'react-redux';
import * as React from 'react';
import {Component} from 'react';
import {AppState} from '../../types/store/StoreTypes';
import {
    CalendarEvent,
    EventViewDispatchProps,
    EventViewProps,
    EventViewState,
    EventViewStateProps
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
import {Workshop} from '../../types/model/Workshop';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import {ThunkDispatch} from 'redux-thunk';
import ReportForm from "./ReportForm";

export default class ReportGenerate extends Component<any, any> {

    constructor(props: EventViewProps) {
        super(props);

        this.state = {
            searchTerm: '',
            filterNotBooked: false
        };
    }

    render(): React.ReactNode {
        const {selectedEvent} = this.state;
        return (
            <div className='row h-100 overflow-auto'>
                {/*{this.props.error && <p>{this.props.error}</p>}*/}
                {/*{!this.props.authenticated && <p>Not authenticated</p>}*/}
                {/*<div className='col-lg-2 border-right'>*/}
                    {/*<div className='sticky-top'>*/}
                        {/*<ReportForm onSubmit={this.onEventSubmitted}*/}
                                             {/*disabled={selectedEvent === undefined}*/}
                                             {/*booked={selectedEvent !== undefined && this.eventSelected(selectedEvent)}*/}
                                             {/*initialValues={this.state.selectedEvent}/>*/}
                    {/*</div>*/}
                {/*</div>*/}
                {/*<div className='col m-3'>*/}
                    {/*{*/}
                        {/*this.props.authenticated &&*/}
                        {/*<div className='h-100 flex-column'>*/}

                            {/*<InputGroup className='align-self-stretch d-flex pb-3 sticky-top'>*/}
                                {/*<Form.Control type='text'*/}
                                              {/*className='flex-fill'*/}
                                              {/*placeholder='Search...'*/}
                                              {/*value={this.state.searchTerm}*/}
                                              {/*onChange={this.onSearchUpdated}*/}
                                {/*/>*/}
                                {/*<InputGroup.Append>*/}
                                    {/*<InputGroup.Text>*/}
                                        {/*Already booked*/}
                                        {/*<input type='checkbox'*/}
                                               {/*className='ml-3'*/}
                                               {/*checked={this.state.filterNotBooked}*/}
                                               {/*onChange={this.onFilterNotBookedToggled}/>*/}
                                    {/*</InputGroup.Text>*/}
                                {/*</InputGroup.Append>*/}
                            {/*</InputGroup>*/}

                            {/*<BigCalendar*/}
                                {/*localizer={this.localizer}*/}
                                {/*events={this.events}*/}
                                {/*onSelectEvent={this.onSelectEvent}*/}
                                {/*eventPropGetter={this.getEventStyle}*/}
                            {/*/>*/}

                        {/*</div>*/}
                    {/*}*/}
                {/*</div>*/}
            </div>
        );
    }
}
