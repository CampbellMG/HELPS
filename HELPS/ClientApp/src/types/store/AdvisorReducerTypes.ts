import {Advisor} from '../model/Advisor';

export interface AdvisorState {
    isLoading: boolean,
    advisors: Advisor[],
    error?: string
}