import * as React from 'react';
import {Component} from 'react';
import {CalendarFilterProps, CalendarFilterState, Filter} from '../../../types/components/WorkshopRegistrationTypes';
// @ts-ignore
import Chips from 'react-chips';

export class CalendarFilter extends Component<CalendarFilterProps, CalendarFilterState> {

    private static readonly FILTERS: Filter[] = ['Booked', 'Sessions', 'Workshops'];

    constructor(props: CalendarFilterProps) {
        super(props);

        this.state = {
            filters: []
        };
    }

    render() {
        return (
            <Chips
                value={this.state.filters}
                onChange={(filters: any) => this.setState({filters})}
                fromSuggestionsOnly
                fetchSuggestions={this.onSearchTermUpdated}/>
        );
    }

    private onSearchTermUpdated = (searchTerm: string): string[] => {
        this.props.onSearchUpdated(searchTerm);
        return CalendarFilter.FILTERS.filter(filter => (
            !this.state.filters.includes(filter) && filter.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    };
}