import EventView, {mapEventViewDispatchToProps, mapEventViewStateToProps} from './EventView';
import * as React from 'react';
import {connect} from 'react-redux';
import {EventViewDispatchProps, EventViewStateProps} from '../../types/components/WorkshopRegistrationTypes';
import {AppState} from '../../types/store/StoreTypes';

class WorkshopConsultationView extends EventView {
    showSessions = true;
    showWorkshops = true;
}

export default connect<EventViewStateProps, EventViewDispatchProps, {}, AppState>(
    mapEventViewStateToProps,
    mapEventViewDispatchToProps
)(WorkshopConsultationView);