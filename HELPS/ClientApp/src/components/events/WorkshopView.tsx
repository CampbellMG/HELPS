import EventView, {mapEventViewDispatchToProps, mapEventViewStateToProps} from './EventView';
import * as React from 'react';
import {connect} from 'react-redux';
import {EventViewDispatchProps, EventViewStateProps} from '../../types/components/WorkshopRegistrationTypes';
import {AppState} from '../../types/store/StoreTypes';

class WorkshopView extends EventView {
    showSessions = false;
    showWorkshops = true;
}

export default connect<EventViewStateProps, EventViewDispatchProps, {}, AppState>(
    mapEventViewStateToProps,
    mapEventViewDispatchToProps
)(WorkshopView);