import * as React from 'react';
import {Component} from 'react';
import {
    CalendarFilterProps,
    CalendarFilterState,
    Filter
} from '../../../types/components/WorkshopRegistrationTypes';
// @ts-ignore
import Chips from 'react-chips';

export class CalendarFilter extends Component<CalendarFilterProps, CalendarFilterState> {

    private static readonly FILTERS: Filter[] = ['Booked', 'Not Booked', 'Sessions', 'Workshops'];

    constructor(props: CalendarFilterProps) {
        super(props);

        this.state = {
            filters: []
        };
    }

    render() {
        return (
            <div className='align-self-stretch d-flex pb-3 sticky-top flex-column'>
                <Chips
                    placeholder='Type to filter events or view preset filters...'
                    value={this.state.filters}
                    onChange={this.onFilterChanged}
                    fromSuggestionsOnly
                    highlightFirstSuggestion
                    fetchSuggestions={this.onSearchTermUpdated}/>
            </div>
        );
    }

    private onSearchTermUpdated = async (searchTerm: string): Promise<string[]> => {
        this.props.onSearchUpdated(searchTerm);
        return CalendarFilter.FILTERS.filter(filter => !this.state.filters.includes(filter));
    };

    private onFilterChanged = (filters: Filter[]) => {
        this.setState({filters});
        this.props.onFilterUpdated(filters);
        this.props.onSearchUpdated('');
    };
}