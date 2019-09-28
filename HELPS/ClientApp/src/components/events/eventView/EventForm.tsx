import * as React from 'react';
import {ReactElement} from 'react';
import {
    CalendarEvent,
    EventFormComponentProps,
    EventFormComponentState,
    EventFormComponentTabType
} from '../../../types/components/WorkshopRegistrationTypes';
import {isSession} from '../../../types/model/Session';
import AdminWorkshopDetailForm from '../forms/AdminWorkshopDetailForm';
import StudentSessionDetailForm from '../forms/StudentSessionDetailForm';
import StudentWorkshopDetailForm from '../forms/StudentWorkshopDetailForm';
import AdminSessionDetailForm from '../forms/AdminSessionDetailForm';
import '../../editorlist/EditorList.css'
import {Tab, Tabs} from "react-bootstrap";

export class EventForm extends React.Component<EventFormComponentProps, EventFormComponentState> {

    constructor(props: EventFormComponentProps) {
        super(props);

        this.state = {
            selectedTab: "ASSIGNING"
        }
    }


    render() {
        const {selectedEvent} = this.props;
        if (!selectedEvent) return <div/>;

        const form = this.getForm(selectedEvent);
        const formPotentiallyInTabs = this.wrapInTabs(form, isSession(selectedEvent));

        return (
            <div
                className='col-lg-3 border-right sticky-top h-100 no-gutters overflow-auto list shadow'>
                {formPotentiallyInTabs}
            </div>
        );
    }

    private wrapInTabs(innerContent: ReactElement, isSession: boolean) {
        if (!this.props.isAdmin || !isSession) {
            return innerContent
        }

        return (
            <Tabs id='event-form-tabs' activeKey={this.state.selectedTab}
                  onSelect={this.selectTabKey}>
                <Tab eventKey='ASSIGNING' title='Assign'>{innerContent}</Tab>
                <Tab eventKey='BOOKING' title='Book'>{innerContent}</Tab>
            </Tabs>
        )
    }

    private getForm(event: CalendarEvent): ReactElement {
        const {isAdmin, onEventSubmitted, eventChanged, eventSelected, selectedEvent} = this.props
        const {selectedTab} = this.state;
        const formProps = {
            onSubmit: onEventSubmitted,
            onChange: eventChanged,
            booked: eventSelected,
            initialValues: selectedEvent
        };

        if (isAdmin) {
            if (isSession(event)) {
                return <AdminSessionDetailForm {...formProps} isAssigning={selectedTab === "ASSIGNING"}/>;
            }

            return <AdminWorkshopDetailForm {...formProps}/>;
        }

        if (isSession(event)) {
            return <StudentSessionDetailForm {...formProps}/>;
        }

        return <StudentWorkshopDetailForm {...formProps}/>;
    }

    selectTabKey = (selectedTab: EventFormComponentTabType) => this.setState({selectedTab})
};