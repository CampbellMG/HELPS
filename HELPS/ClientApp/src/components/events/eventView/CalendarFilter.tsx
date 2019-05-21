import * as React from 'react';
import {FunctionComponent} from 'react';
import {CalendarFilterProps} from '../../../types/components/WorkshopRegistrationTypes';
import {Form, InputGroup} from 'react-bootstrap';

export const CalendarFilter: FunctionComponent<CalendarFilterProps> = ({searchTerm, filterNotBooked, onSearchUpdated, onFilterNotBookedToggled}) => (
    <InputGroup className='align-self-stretch d-flex pb-3 sticky-top'>

        <Form.Control type='text'
                      className='flex-fill'
                      placeholder='Search...'
                      value={searchTerm}
                      onChange={onSearchUpdated}/>

        <InputGroup.Append>
            <InputGroup.Text>
                Already booked
                <input type='checkbox'
                       className='ml-3'
                       checked={filterNotBooked}
                       onChange={onFilterNotBookedToggled}/>
            </InputGroup.Text>
        </InputGroup.Append>

    </InputGroup>
);