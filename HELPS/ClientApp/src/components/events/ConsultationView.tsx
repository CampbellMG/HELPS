import EventView, {mapEventViewDispatchToProps, mapEventViewStateToProps} from './EventView';
import * as React from 'react';
import {connect} from 'react-redux';
import {EventViewDispatchProps, EventViewStateProps} from '../../types/components/WorkshopRegistrationTypes';
import {AppState} from '../../types/store/StoreTypes';

class ConsultationView extends EventView {
    showSessions = true;
    showWorkshops = false;
}

export default connect<EventViewStateProps, EventViewDispatchProps, {}, AppState>(
    mapEventViewStateToProps,
    mapEventViewDispatchToProps
)(ConsultationView);