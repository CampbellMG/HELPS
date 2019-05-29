import {Advisor} from '../model/Advisor';
import {Editable} from '../util/Editable';
import {InjectedFormProps} from "redux-form";

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

export interface AdvisorFormDispatcProps {
    submit: () => void
}

export interface AdvisorFormProps extends InjectedFormProps<AdvisorFormData>, AdvisorFormDispatcProps{

}