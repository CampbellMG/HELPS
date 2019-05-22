import * as React from 'react';
import {FunctionComponent, ReactElement} from 'react';
import {CalendarEvent, EventFormComponentProps} from '../../../types/components/WorkshopRegistrationTypes';
import {isSession} from '../../../types/model/Session';
import AdminWorkshopDetailForm from '../forms/AdminWorkshopDetailForm';
import StudentSessionDetailForm from '../forms/StudentSessionDetailForm';
import StudentWorkshopDetailForm from '../forms/StudentWorkshopDetailForm';
import AdminSessionDetailForm from '../forms/AdminSessionDetailForm';
import '../../editorlist/EditorList.css'

export const EventForm: FunctionComponent<EventFormComponentProps> = props => {
    const {selectedEvent, isAdmin, onEventSubmitted, eventSelected, eventChanged} = props;
    if (!selectedEvent) return <div/>;

    function getForm(event: CalendarEvent): ReactElement {
        if (isAdmin) {
            if (isSession(event)) {
                return <AdminSessionDetailForm {...formProps} />;
            }

            return <AdminWorkshopDetailForm {...formProps}/>;
        }

        if (isSession(event)) {
            return <StudentSessionDetailForm {...formProps}/>;
        }

        return <StudentWorkshopDetailForm {...formProps}/>;
    }

    const formProps = {
        onSubmit: onEventSubmitted,
        onChange: eventChanged,
        booked: eventSelected,
        initialValues: selectedEvent
    };

    return (
        <div className='col-lg-2 border-right sticky-top h-100 no-gutters overflow-auto list shadow'>
            {getForm(selectedEvent)}
        </div>
    );
};