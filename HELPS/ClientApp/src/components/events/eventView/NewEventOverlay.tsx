import {FunctionComponent} from 'react';
import {NewEventOverlayProps} from '../../../types/components/WorkshopRegistrationTypes';
import {Button, Overlay, Popover} from 'react-bootstrap';
import * as React from 'react';

export const NewEventOverlay: FunctionComponent<NewEventOverlayProps> = ({newEventRef, container, onSelect}) => (
    <Overlay target={newEventRef}
             show={newEventRef !== undefined && newEventRef !== null}
             placement='auto'
             container={container}>
        {(props: any) => (
            <Popover {...props} id='new-event-pop' title='Please select event type'>
                <Button className='m-1'
                        onClick={() => onSelect('SESSION')}>Session</Button>
                <Button className='m-1'
                        onClick={() => onSelect('WORKSHOP')}>Workshop</Button>
            </Popover>
        )}
    </Overlay>
);