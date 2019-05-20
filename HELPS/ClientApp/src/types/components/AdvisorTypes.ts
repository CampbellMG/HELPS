import {Advisor} from '../model/Advisor';
import {Editable} from '../util/Editable';

export interface AdvisorStateProps {
    authenticated: boolean
    advisors: Advisor[]
    error?: string
}

export interface AdvisorDispatchProps {
    loadAdvisorList: () => void
    deleteAdvisor: (advisor: Advisor) => void
    updateAdvisor: (advisor: Advisor) => void
    addAdvisor: (advisor: Advisor) => void
}

export interface AdvisorProps extends AdvisorStateProps, AdvisorDispatchProps {

}

export interface AdvisorState {
    filter: string
    selectedAdvisor?: Advisor
}

export interface AdvisorFormState extends Editable {
}

export interface AdvisorFormData extends Advisor {
    delete: boolean
}