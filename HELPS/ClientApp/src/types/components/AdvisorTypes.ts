import {Advisor} from '../model/Advisor';

export interface AdvisorStateProps {
    authenticated: boolean
    advisors: Advisor[]
    error?: string
}

export interface AdvisorDispatchProps {
    loadAdvisorList: () => void
    loadAdvisorDetails: () => void
}

export interface AdvisorProps extends 
AdvisorStateProps, AdvisorDispatchProps {
    
}