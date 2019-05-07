
import {Workshop, Skill} from '../model/Workshop';


export interface WorkshopEvent extends Event, Workshop {
    start: Date
    end: Date
}

export interface AdminWorkshopStateProps {
    isCurrent: boolean
    workshops: Workshop[]
    skills: Skill[]
}

export interface AdminWorkshopDispatchProps {
     addSkill: () => void
    // retrieveUserWorkshops: () => void
    // bookWorkshop: (workshop: Workshop) => void
}

export interface AdminWorkshopProps extends AdminWorkshopStateProps, AdminWorkshopDispatchProps {

}

